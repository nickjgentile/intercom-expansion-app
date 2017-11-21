(function () {


    angular
        .module('int')
        .controller('HomeController', ['$scope', '$http', '$rootScope', function ($scope, $http, $rootScope) {

            !$rootScope.apiKey ? $rootScope.apiKey = 'empty' : console.log('key already in place');

            if($rootScope.apiKey === 'empty') {
                alert('Please input a valid Access Token Before Using the App')
                location.href = 'index.html#!/settings'
            }

            const Intercom = require('intercom-client');

            var client = new Intercom.Client({ token: $rootScope.apiKey });

            $scope.loading = true;

            $scope.modalload = true;

            $scope.modal = false;

            $scope.users = [];

            $scope.imageplace = './assets/images/placeholder.png';

            $scope.getDate = (date) => {
                var newDate = new Date();
                newDate.setTime(date * 1000)
                var dateString = newDate.toUTCString();
                return dateString;
            }

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
                .users
                .list()
                .then(function (d) {
                    $scope.totalPages = d.body.pages.total_pages;
                    displayUsers();
                })
                .catch(function(err){
                    console.log(err)
                })

            var displayUsers = function () {
                for (let i = 1; i <= $scope.totalPages; i++) {
                    client
                        .users
                        .listBy({ per_page: 60, page: i })
                        .then(function (d) {
                            $scope.users.push(...d.body.users);
                            $scope.$apply();
                        })
                        .catch(function (err) {
                            console.log(err);
                            $scope.loading = false;
                            $scope.$apply();
                        })
                }
                $scope.loading = false;
            }
        }])
})();