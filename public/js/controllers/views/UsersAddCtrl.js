
app.controller('UsersAddCtrl', function ($scope, ref, $http, $state) {
    ref.get().then(function (ref) {
        // Default form values
        $scope.data = {
            group: (_.findWhere(ref.groups, {name: 'user'}) || ref.groups[0]).id
        };
    });

    /**
     *
     */
    $scope.submitHandler = function () {
        $http.put('/api/users', $scope.data)
            .success(function (user) {
                $state.go('user', {id: user.id});
            })
            .error(function (data) {
                console.error(data.info);
            });
    };
});