(function () {

    const Intercom = require('intercom-client');

    var client = new Intercom.Client({ token: 'dG9rOjVlMzA5ZWRmXzY5ZjVfNGFkNV9iYzQ1XzlkOWJlMjEzZDQ3YzoxOjA=' });


    angular
        .module('int')
        .controller('ConversationController', ['$scope', function ($scope) {

            $scope.loadingConvs = false;
            $scope.allConvs = [];
            // $scope.userIDs = {
            //     '5887d6d9b3366404b4915db1': 'Anthony'
            // };
            $scope.pages;
            $scope.searchFilter = false;
            $scope.timeFilter = false;
            $scope.order = '-conversation_message.author.id';

            $scope.inputToggle = () => {
                $scope.searchFilter = !$scope.searchFilter
            }

            $scope.changeOrder = function ($event) {
                if ($scope.order == $event.target.attributes[1].nodeValue) {
                    $scope.order = $scope.order.replace('-', '');
                } else {
                    $scope.order = $event.target.attributes[1].nodeValue;
                }
            }

            $scope.dateToggle = () => {
                $scope.timeFilter = !$scope.timeFilter
            }

            $scope.getDate = (date) => {
                var newDate = new Date();
                newDate.setTime(date * 1000)
                var currDay = newDate.getDate();
                var currMonth = newDate.getMonth();
                var currYear = newDate.getFullYear();
                var dateString = currDay + '/' + currMonth + '/' + currYear
                return dateString;
            }

            // $scope.getName = (id) => {
            //     console.log(id)
            //     client
            //         .users
            //         .find({ id: id })
            //         .then(function (r) {
            //             console.log(r.body.name)
            //             return r.body.name;
            //         })
            //         .catch(function (err) {
            //             console.log(err);
            //         })
            // }

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

                for (let count = 1; count <= $scope.pages; count++) {
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