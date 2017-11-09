(function () {

    const Intercom = require('intercom-client');

    var client = new Intercom.Client({ token: 'dG9rOjVlMzA5ZWRmXzY5ZjVfNGFkNV9iYzQ1XzlkOWJlMjEzZDQ3YzoxOjA=' });


    angular
        .module('int')
        .controller('ConversationController', ['$scope', function ($scope) {


            client
                .counts
                .conversationCounts()
                .then(function (r) {
                    $scope.countdata = r.body.conversation
                    $scope.$apply();
                })
                .catch(function (err) {
                    console.log(err)
                })

            client
                .conversations
                .list()
                .then(function (r) {
                    $scope.convos = (r.body.conversations)
                    console.log($scope.convos)
                    $scope.$apply();
                })
                .catch(function (err) {
                    console.log(err)
                })


        }])
})();