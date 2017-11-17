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

            $scope.dateRange = '';

            $scope.timeFrame = (e) => {
                let num = e.target.children[0].value;

                $scope.dateRange = function (conv) {
                    var today = new Date();
                    var endList = today.getTime();
                    var startList = (new Date()).setDate(today.getDate() - num);

                    return (conv.created_at * 1000 > startList &&
                        conv.created_at * 1000 < endList);
                }

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
                var currMonth = newDate.getMonth() + 1;
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
                })
                .catch(function (err) {
                    console.log(err)
                })

            client
                .conversations
                .list({ per_page: 60 })
                .then(function (r) {
                    $scope.pages = r.body.pages.total_pages;
                    $scope.listConvs()
                })
                .catch(function (err) {
                    console.log(err)
                })

            $scope.listConvs = function () {
                var users = new Set();
                var userNames = [];
                var allConvs = [];
                var promises = [];

                //
                for (let count = 1; count <= $scope.pages; count++) {
                    promises.push(client.conversations.list({ per_page: 60, page: count }))
                };

                Promise.all(promises).then((pages) => {
                    pages.forEach((page) => {
                        allConvs.push(...page.body.conversations)

                        page.body.conversations.forEach((r) => {
                            users.add(r.user.id);
                        })
                    })

                    var promises2 = [];

                    users.forEach(user => {
                        promises2.push(
                            client.users
                                .find({ id: user }))
                    })

                    Promise.all(promises2).then((uniqueUsers) => {
                        users = [];

                        uniqueUsers.forEach(user => {
                            users[user.body.id] = { name: user.body.name, email: user.body.email, id: user.body.id};
                        })
                        
                        allConvs.forEach((conv) => {
                            if (!!users[conv.user.id]) conv.user = users[conv.user.id];
                        })

                        $scope.allConvs = allConvs;
                        $scope.loadingConvs = true;
                        $scope.$apply();
                    })
                });
            }


        }])
})();