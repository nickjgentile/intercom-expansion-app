const Intercom = require('intercom-client');

var client = new Intercom.Client({ token: 'dG9rOjVlMzA5ZWRmXzY5ZjVfNGFkNV9iYzQ1XzlkOWJlMjEzZDQ3YzoxOjA=' });

(function () {
    angular
        .module('int')
        .controller('HomeController', ['$scope', '$http', function ($scope, $http) {

        console.log($scope.users)

        client.users.list()
        .then(function(d){
            
            $scope.users=d.body.users;
            console.log($scope.users)
        })
        .catch(function(err){
            console.log(err);
        })
    }])
})();