
(function () {
    const Intercom = require('intercom-client');

    var client = new Intercom.Client({ token: 'dG9rOjVlMzA5ZWRmXzY5ZjVfNGFkNV9iYzQ1XzlkOWJlMjEzZDQ3YzoxOjA=' });

    angular
        .module('int')
        .controller('HomeController', ['$scope', '$http', function ($scope, $http) {

            $scope.loading = true;

            $scope.modalload = true;

            $scope.modal = false;

            $scope.imageplace = './assets/images/placeholder.png';


            

            $scope.hideModal = () => {
                var htmlclass = document.getElementsByTagName('html')[0];

                $scope.modal = false;
                htmlclass.style.overflow = "scroll";
            }

            $scope.userExpand = function (uid) {
                var htmlclass = document.getElementsByTagName('html')[0];

                $scope.modal = true;
                $scope.modalload = true;
                $scope.contentReady = false;
                htmlclass.style.overflow = "hidden"

                client
                    .users
                    .find({ user_id: uid })
                    .then(function (r) {
                        $scope.selectedUser = r.body
                        console.log($scope.selectedUser)

                        $scope.modalload = false;
                        $scope.contentReady = true;
                        $scope.$apply();
                    })
                    .catch(function (err) {
                        console.log(err)
                    })
            }

            client
                .conversations
                .list()
                .then(function (convos) {
                    console.log(convos);
                })
                .catch(function (err) {
                    console.log(err);
                })

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