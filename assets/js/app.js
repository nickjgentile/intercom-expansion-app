var int = angular.module('int', ['ngRoute']);

int.config(['$routeProvider', function($routeProvider) {
    
        $routeProvider
        .when('/settings', {
            templateUrl: './views/settings.html'
        })
        .when('/addticket', {
            templateUrl: './views/addticket.html'
        })
        .when('/company', {
            templateUrl: './views/company.html'
        })
        .when('/user', {
            templateUrl: './views/user.html'
        })
        .when('/userid', {
            templateUrl: './views/userid.html'
        })
        .when('/home', {
            redirectTo: 'index.html'
        })
        .otherwise({
            redirectTo: 'index.html'
        })
    }])


int.controller('intController', ['$scope', '$http', function($scope, $http){

    var users = [
        {name: "Steve Harrington", age: 17},
        {name: "Nick Gentile", age: 26}
    ];
    
}])
