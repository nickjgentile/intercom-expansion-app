(function () {
    angular
        .module('int')
        .controller('intController', ['$scope', '$rootScope', '$http', function ($scope, $rootScope, $http) {

            if ($rootScope.apiKey === 'empty') {
                alert('Please input a valid Access Token First')
                location.href = 'index.html#!/settings'
            }

            $scope.createTic = function (num) {
                var idVal = document.getElementById('getid').value;
                document.getElementById('response').innerHTML = '';
                document.getElementById('ticketCreateSpin').style.display = "block";
                window.createTick(idVal, $rootScope.apiKey);
            }
        }])
})();