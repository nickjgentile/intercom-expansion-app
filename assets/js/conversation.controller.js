(function () {

    const Intercom = require('intercom-client');

    var client = new Intercom.Client({ token: 'dG9rOjVlMzA5ZWRmXzY5ZjVfNGFkNV9iYzQ1XzlkOWJlMjEzZDQ3YzoxOjA=' });


    angular
        .module('int')
        .controller('ConversationController', ['$scope', function ($scope) {

            $scope.loadingConvs = false;
            $scope.allConvs = [];
            $scope.pages;

            $scope.getDate = (date) => {
                var newDate = new Date();
                newDate.setTime(date * 1000)
                var dateString = newDate.toUTCString();
                return dateString;
            }

            $scope.removeTags = (str) => {
                return str.replace(/<[^>]*>/g, '').replace('</p>', '');
            }

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
                .list({ per_page: 60 })
                .then(function (r) {
                    console.log(r)
                    $scope.pages = r.body.pages.total_pages;
                    $scope.listConvs()
                })
                .catch(function (err) {
                    console.log(err)
                })


            $scope.listConvs = function () {
                let count = 1;
                console.log($scope.pages);
                console.log(count);

                for(let count = 1; count <= $scope.pages; count++) {         
                    client
                        .conversations
                        .list({ per_page: 60, page: count })
                        .then(function (r) {
                            $scope.allConvs.push(...r.body.conversations)
                            console.log($scope.allConvs)
                            $scope.$apply();
                        })
                        .catch(function (err) {
                            console.log(err)
                        })
                }
                $scope.loadingConvs = true;
            }


        }])
})();