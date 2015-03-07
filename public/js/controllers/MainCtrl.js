app.controller('MainCtrl', function($scope, $rootScope, user) {
    $rootScope.$on('$stateChangeSuccess', function(e, state) {
        $scope.stateClass = state.name;
    });

    $scope.logout = function() {
        if(confirm('Logout?')) {
            user.logout();
        }
    };

    $scope.isAllowed = user.isAllowed;
});