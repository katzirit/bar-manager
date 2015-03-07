
app.controller('SimulationsCtrl', function ($scope, $http) {
    $http.get('/api/simulations')
        .success(function (simulations) {
            $scope.simulations = simulations;
        })
        .error(function (res) {
            console.error(res);
        });
});