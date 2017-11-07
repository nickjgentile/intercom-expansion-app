
(function () {
    const Intercom = require('intercom-client');
    
    var client = new Intercom.Client({ token: 'dG9rOjVlMzA5ZWRmXzY5ZjVfNGFkNV9iYzQ1XzlkOWJlMjEzZDQ3YzoxOjA=' });
    
    angular
        .module('int')
        .controller('HomeController', ['$scope', '$http', function ($scope, $http) {

            $scope.loading = true;

            $scope.userExpand = function (e) {
                console.log(e)
            };

            client
                .users
                .list()
                .then(function (d) {
                    $scope.users = d.body.users;
                    $scope.loading = false;
                    $scope.$apply();
                })
                .catch(function (err) {
                    console.log(err);
                })
        }])
})();