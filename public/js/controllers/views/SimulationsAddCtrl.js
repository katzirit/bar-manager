
app.controller('SimulationsAddCtrl', function ($scope, $http, $state) {
    // Simulation default values
    $scope.simulation = {
        data: {
            costumers_per_hour: 100,
            num_of_waiters: 5,
            table_num: 20,
            shift_length: 8 * 60,
            avg_service_time: 15,
            avg_service_div: 3
        },
        numOfRuns: 5
    };

    /**
     *
     */
    $scope.submitHandler = function () {
        $http.put('/api/simulations', $scope.simulation)
            .success(function (simulation) {
                $state.go('simulation', {id: simulation.id});
            })
            .error(function (response) {
                $scope.error = response.info;
            });
    };
});