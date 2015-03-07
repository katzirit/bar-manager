
app.controller('UserEditCtrl', function ($scope, ref, $http, $state, $stateParams) {
    $http.get('/api/user/' + $stateParams.id)
        .success(function (user) {
            // Default form values
            $scope.data = user;
        })
        .error(function () {
            $state.go('users');
        });

    /**
     *
     */
    $scope.submitHandler = function () {
        $http.post('/api/user/' + $stateParams.id, $scope.data)
            .success(function () {
                $state.go('user', {id: $stateParams.id});
            })
            .error(function (data) {
                console.error(data.info);
            });
    };
});