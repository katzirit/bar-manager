
app.service('ref', function ($http, $rootScope, $q) {
    var defer;

    function updateRefData() {
        defer = $q.defer();
        $http.get('/api/ref/true').then(function (res) {
            $rootScope.ref = res.data;
            defer.resolve($rootScope.ref);
        });
    }

    updateRefData();

    return {
        get: function (reset) {
            if (reset) {
                updateRefData();
            }
            return defer.promise;
        }
    }
});