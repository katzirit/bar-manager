app.controller('MySimulationsCtrl', function ($scope, $http) {
    $http.get('/api/user/simulations')
        .success(function (simulations) {
            $scope.simulations = simulations;
        })
        .error(function (res) {
            console.error(res);
        });
});