(function () {    
    angular
        .module('int')
        .controller('intController', ['$scope', '$http', function ($scope, $http) {

        $scope.createTic = function(num) {
            var idVal = document.getElementById('getid').value;
            console.log(idVal)
            window.createTick(idVal);
        }
    }])
})();