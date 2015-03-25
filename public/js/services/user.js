
app.service('user', function ($http, $rootScope, $cookies, $state) {

    var user = isAuthenticated();
    if (user) {
        $rootScope.user = user;
        $http.get('/api/user/me')
            .success(function (user) {
                $cookies.user = JSON.stringify(user);
                $rootScope.user = user;
            })
            .error(logout);
    }

    /**
     *
     */
    $rootScope.$on('$stateChangeStart', function (e, toState) {
        if (toState.auth) {
            var user = isAuthenticated();
            if (!user) {
                e.preventDefault();
                $state.go('login');
            } else {
                if (toState.group) {
                    if (toState.group !== user.GroupId) {
                        e.preventDefault();
                        $state.go('home');
                    }
                }

                if (toState.groups) {
                    if (!_.contains(toState.groups, user.GroupId)) {
                        e.preventDefault();
                        $state.go('home');
                    }
                }
            }
        }
    });

    $rootScope.$on('logout', function () {
        if (isAuthenticated()) {
            logout();
        }
    });

    $rootScope.$on('unauthenticated', function () {
        $state.go('home');
    });

    /**
     *
     * @returns {*}
     */
    function isAuthenticated() {
        var user;
        try {
            user = JSON.parse($cookies.user);
        } catch (e) {
        }
        return user;
    }

    /**
     *
     * @returns {*}
     */
    function isAllowed(stateName) {
        var user = isAuthenticated();
        var requestedState = _.findWhere($state.get(), {name: stateName});

        if (requestedState.auth && !user) {
            return false;
        }

        if (requestedState.group && user.GroupId !== requestedState.group) {
            return false;
        }

        if (requestedState.groups && !_.contains(requestedState.groups, user.GroupId)) {
            return false;
        }

        return true;
    }

    /**
     *
     * @returns {HttpPromise}
     */
    function logout() {
        delete $cookies.user;
        $rootScope.user = null;
        $state.go('logout');
        return $http.get('/api/auth/logout');
    }

    return {
        login: function (username, password) {
            return $http.post('/api/auth/login', {
                username: username,
                password: password
            })
                .success(function (user) {
                    $cookies.user = JSON.stringify(user);
                    $rootScope.user = user;
                });
        },
        logout: logout,
        isAuthenticated: isAuthenticated,
        isAllowed: isAllowed
    }
});