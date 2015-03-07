
app.controller('UsersCtrl', function ($scope, $http, ref) {
    ref.get().then(function(ref) {
        //
        $http.get('/api/users')
            .success(function (users) {
                _.each(users, function(user) {
                    user.group = _.findWhere(ref.groups, {id:user.GroupId});
                });
                $scope.users = users;
            })
            .error(function (res) {
                console.error(res);
            });
    });

    /**
     *
     * @param user
     */
    $scope.deleteUser = function (user) {
        if (!confirm('Are you sure you want to delete this user?')) {
            return;
        }

        $http.delete('/api/user/' + user.id)
            .success(function () {
                $scope.users = _.without($scope.users, user);
            })
            .error(function (res) {
                console.error(res);
            });
    };
});