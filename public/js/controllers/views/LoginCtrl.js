app.controller('LoginCtrl', function ($scope, $state, user) {
    $scope.submitHandler = function () {
        user.login($scope.username, $scope.password)
            .success(function () {
                $state.go('home');
            })
            .error(function (response) {
                $scope.error = response.info;
            });
    };
});