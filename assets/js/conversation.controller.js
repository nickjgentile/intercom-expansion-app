(function () {

    angular
        .module('int')
        .controller('ConversationController', ['$scope', function ($scope) {

            $scope.test = 'test';
            console.log($scope.test);

        }])
})();