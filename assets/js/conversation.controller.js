(function () {

    angular
        .module('int')
        .controller('ConversationController', ['$scope', '$rootScope', function ($scope, $rootScope) {
            !$rootScope.apiKey ? $rootScope.apiKey = 'empty' : console.log('key already in place');

            if($rootScope.apiKey === 'empty') {
                alert('Please Input a Valid Access Token First')
                location.href = 'index.html#!/settings'
            }

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
                        client.users.listBy({ per_page: 60, page: i }).then(function (r) {
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
                        //Create a single page of all conversations
                        allConvs.push(...page.body.conversations)

                        //Go through each conversation
                        allConvs.forEach((r) => {
                            //Replace user object with user data pulled from listusers function
                            r.user = $scope.userGrab.find(user => user.id === r.user.id);
                        })
                    })

                    $scope.allConvs = allConvs;
                    $scope.loadingConvs = true;
                    $scope.$apply();

                });
            }
        }])
})();