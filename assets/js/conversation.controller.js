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
                            console.log(r)
                            $scope.allConvs.push(...r.body.conversations)
                            console.log($scope.allConvs)
                        })
                        .catch(function (err) {
                            console.log(err)
                        })
                }
                $scope.$apply();
            }


        }])
})();