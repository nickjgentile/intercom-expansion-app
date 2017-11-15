(function () {
    angular
        .module('int', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {

            $routeProvider
                .when('/settings', {
                    templateUrl: './views/settings.html'
                })
                .when('/addticket', {
                    templateUrl: './views/addticket.html',
                    controller: 'intController'
                })
                .when('/company', {
                    templateUrl: './views/company.html'
                })
                .when('/conversations', {
                    templateUrl: './views/conversations.html',
                    controller: 'ConversationController'
                })
                .when('/userid', {
                    templateUrl: './views/userid.html'
                })
                .when('/home', {
                    templateUrl: './views/home.html',
                    controller: 'HomeController'
                })
                .otherwise({
                    redirectTo: '/home'
                })

        }])
})();
