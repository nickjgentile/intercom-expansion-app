(function () {    
    angular
        .module('int')
        .controller('SendMessageController', ['$scope', '$rootScope', function ($scope, $rootScope) {

        const Intercom = require('intercom-client');
        var client = new Intercom.Client({ token: $rootScope.apiKey });
        
        $scope.response = '';
        $scope.completed = false;

        client.admins.list()
            .then(function(r){
            })

        $scope.sendMess = function(e) {
            console.log(e)

            var message = {
                message_type: "inapp",
                subject: "No Subject",
                body: e.target.children.message.value,
                template: "plain",
                from: {
                  type: "admin",
                  id: e.target.children.from.value
                },
                to: {
                  type: "user",
                  user_id: e.target.children.getid.value
                }
              }

              console.log(message);
              
              client.messages.create(message)
              .then(function(r){
                document.getElementById('sendResponse').innerHTML = '<strong style="color: green; text-shadow: 1px 1px black;">Message successfully sent</strong><br/>The message will appear in your intercom inbox as soon as the user responds.'
                $scope.completed=true;
                $scope.$apply();
              })
              .catch(function(err){
                  console.log(err);
                  document.getElementById('sendResponse').innerHTML = '<strong style="color: red; text-shadow: 1px 1px black;">There was an error with your request</strong><br/>Please ensure that your UserId, AdminId and Access Token are all valid.';
                  $scope.completed=true;
                  $scope.$apply();
              })
        }


    }])
})();