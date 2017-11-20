(function () {

    angular
        .module('int')
        .controller('ConversationController', ['$scope', '$rootScope', function ($scope, $rootScope) {

            console.log($rootScope.apiKey)
            
            const Intercom = require('intercom-client');
            
            var client = new Intercom.Client({ token: $rootScope.apiKey });

            $scope.loadingConvs = false;
            $scope.allConvs = [];
            $scope.pages;
            $scope.searchFilter = false;
            $scope.timeFilter = false;
            $scope.order = '-conversation_message.author.id';
            $scope.userGrab = [];

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
                    listUsers();
                })
                .catch(function (err) {
                    console.log(err)
                })

            listUsers = function () {
                var userList = []
                var page = 0;

                client.users.list().then(function (pages) {
                    page = pages.body.pages.total_pages
                    display();
                })

                function display() {
                    console.log(page)
                    for (let i = 1; i <= page; i++) {
                        client.users.listBy({ per_page: 60, page: 1 }).then(function (r) {
                            r.body.users.forEach(user => {
                                userList.push({ id: user.id, email: user.email, name: user.name })
                            })
                        })
                        $scope.userGrab = userList
                    }
                    console.log($scope.userGrab); 
                }
                $scope.listConvs()
            }

            $scope.listConvs = function () {
                var users = new Set();
                var userNames = [];
                var allConvs = [];
                var promises = [];

                console.log('here')


                // push all api calls to get each page of conversations into promises array
                for (let count = 1; count <= $scope.pages; count++) {
                    promises.push(client.conversations.list({ per_page: 60, page: count }))
                };

                //once the calls in promises are all resolved, then push each page's convs to allConvs and then 
                //also, for each page, iterate through each conv and then add userId of conv to users SET, which will ONLY 
                //take unique Ids
                Promise.all(promises).then((pages) => {
                    pages.forEach((page) => {
                        allConvs.push(...page.body.conversations)

                        page.body.conversations.forEach((r) => {
                            users.add(r.user.id);
                        })
                    })

                    //declare a second promises array
                    var promises2 = [];

                    //once all that is done, i will iterate through each user in users array, and push an api call to find
                    //the user associated with that ID to promises2 array.
                    users.forEach(user => {
                        promises2.push(
                            client.users
                                .find({ id: user }))
                    })

                    //make sure all promises in promises2 have been made, then, with all of the responses (uniqueUsers), do this:
                    Promise.all(promises2).then((uniqueUsers) => {
                        users = [];

                        //create new users array and set it to have user ID, Name, and Email.
                        uniqueUsers.forEach(user => {
                            users[user.body.id] = { name: user.body.name, email: user.body.email, id: user.body.id };
                        })


                        //then, take each conversation (stored in scope previously in allConvs array), and set the conversation's
                        //user the matching users value with the same id. 
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