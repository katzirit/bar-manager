app.controller('SimulationCtrl', function ($scope, $http, $stateParams, $state) {
    $http.get('/api/simulation/' + $stateParams.id)
        .success(function (simulation) {
            $scope.simulation = simulation;
        })
        .error(function () {
            $state.go('simulations');
        });
});