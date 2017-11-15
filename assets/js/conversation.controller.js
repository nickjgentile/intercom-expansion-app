(function () {

    const Intercom = require('intercom-client');

    var client = new Intercom.Client({ token: 'dG9rOjVlMzA5ZWRmXzY5ZjVfNGFkNV9iYzQ1XzlkOWJlMjEzZDQ3YzoxOjA=' });


    angular
        .module('int')
        .controller('ConversationController', ['$scope', function ($scope) {

            $scope.loadingConvs = false;
            $scope.allConvs = [];
            $scope.pages;
            $scope.searchFilter = false;
            $scope.timeFilter = false;
            $scope.order = '-conversation_message.author.id';

            $scope.dateRange = function(conv) {
                var today = new Date();
                var endList = today.getTime();
                var startList = (new Date()).setDate(today.getDate()-30);

                return (conv.created_at * 1000 > startList && 
                        conv.created_at * 1000 < endList);
            }

            $scope.timeFrame = () => {

                var today = new Date();
                var endList = today.getTime();
                var startList = (new Date()).setDate(today.getDate()-30);

                console.log(`Start time is ${startList} end time is ${endList}`)
            }

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
                var currMonth = newDate.getMonth()+1;
                var currYear = newDate.getFullYear();
                var dateString = currDay + '/' + currMonth + '/' + currYear
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