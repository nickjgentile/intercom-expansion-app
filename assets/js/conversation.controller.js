(function () {

    const Intercom = require('intercom-client');

    var client = new Intercom.Client({ token: 'dG9rOjVlMzA5ZWRmXzY5ZjVfNGFkNV9iYzQ1XzlkOWJlMjEzZDQ3YzoxOjA=' });


    angular
        .module('int')
        .controller('ConversationController', ['$scope', function ($scope) {


            $scope.allConvs = [];
            $scope.pages;

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
                    $scope.pages = r.body.pages.total_pages;
                    console.log($scope.pages)
                    $scope.listConvs()
                })
                .catch(function (err) {
                    console.log(err)
                })


            $scope.listConvs = function () {
                let count = 1;
                console.log($scope.pages);
                console.log(count);
                while (count < $scope.pages) {
                    client
                        .conversations
                        .list({ per_page: 60, page: $scope.count })
                        .then(function (r) {
                            console.log(r)
                            $scope.allConvs.push(...r.body.conversations)
                            console.log($scope.allConvs)
                            count++
                        })
                        .catch(function (err) {
                            console.log(err)
                        })
                }
                $scope.$apply();
            }


        }])
})();