
app.controller('UserCtrl', function ($scope, $http, $stateParams, $state) {
    $http.get('/api/user/' + $stateParams.id)
        .success(function (user) {
            $scope.user = user;
        })
        .error(function (data) {
            $state.go('users');
        });

    $http.get('/api/user/' + $stateParams.id + '/simulations')
        .success(function (simulations) {
            $scope.simulations = simulations;
        });
});