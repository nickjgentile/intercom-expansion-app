(function () {
    var int = angular
        .module('int', ['ngRoute'])
        .config(['$routeProvider', function ($routeProvider) {

            $routeProvider
                .when('/settings', {
                    templateUrl: './views/settings.html',
                    controller: 'SettingsController'
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
                .when('/sendmessage', {
                    templateUrl: './views/sendmessage.html',
                    controller: 'SendMessageController'
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
