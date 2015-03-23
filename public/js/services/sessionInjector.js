/**
 * Created by Daniel on 3/7/2015.
 */
app.factory('sessionInjector', function ($q, $rootScope) {
    return {
        responseError: function (e) {
            if (e.status === 401) {
                // Unauthorized, logout the user
                $rootScope.$emit('logout');
            } else if (e.status === 403) {
                $rootScope.$emit('unauthenticated');
            } else {
                console.log(e);
                console.error(e);
            }
            return $q.reject(e);
        }
    };
});