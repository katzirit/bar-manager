
app.factory('sessionInjector', function ($q, $rootScope) {
    return {
        responseError: function (e) {
            if (e.status === 401) {
                // Unauthorized, logout the user
                $rootScope.$emit('logout');
            } else if (e.status === 403) {
                $rootScope.$emit('unauthenticated');
            } else {
                console.error(e);
            }
            return $q.reject(e);
        }
    };
});