(function () {    
    var int = angular
        .module('int')
        .controller('SettingsController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        
        $scope.updateKey = function(e, apikey) {
            $rootScope.apiKey = e.target.children[1].value;
            alert('Your Access Token is Updated')
            location.href = 'index.html#!/home'
        }
    }])
})();