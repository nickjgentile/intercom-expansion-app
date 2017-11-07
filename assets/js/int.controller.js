(function () {
    angular
        .module('int')
        .controller('intController', ['$scope', '$http', function ($scope, $http) {

        $scope.createTic = function(num) {
            console.log('Clicked button to create ticket...')
            window.createTick(num);
        }
    }])
})();