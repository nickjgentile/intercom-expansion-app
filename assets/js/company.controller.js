(function () {
    angular
        .module('int')
        .controller('CompanyController', ['$scope', '$rootScope', function ($scope, $rootScope) {

            const Intercom = require('intercom-client');
            var client = new Intercom.Client({ token: $rootScope.apiKey });

            if ($rootScope.apiKey === 'empty') {
                alert('Please input a valid Access Token First')
                location.href = 'index.html#!/settings'
            }

            client.companies.list()
                .then(function(r){
                    console.log(r);
                })
                .catch(function(err){
                    console.log(err);
                })

        }])
})();