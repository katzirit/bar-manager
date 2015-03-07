'use strict';

var app = angular.module('myApp', ['ngCookies', 'ui.router']);

app.config(function ($urlRouterProvider, $stateProvider, $httpProvider) {
    // Now set up the states
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: 'partials/views/Home.html',
            controller: 'HomeCtrl',
            auth: true
        })
        .state('about', {
            url: '/about',
            templateUrl: 'partials/views/About.html',
            controller: 'AboutCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'partials/views/Login.html',
            controller: 'LoginCtrl'
        })
        .state('logout', {
            url: '/logout',
            templateUrl: 'partials/views/Logout.html',
            controller: 'LogoutCtrl'
        })
        .state('simulations', {
            url: '/simulations',
            templateUrl: 'partials/views/Simulations.html',
            controller: 'SimulationsCtrl',
            auth: true,
            group: 1
        })
        .state('simulationsAdd', {
            url: '/simulations/add',
            templateUrl: 'partials/views/SimulationsAdd.html',
            controller: 'SimulationsAddCtrl',
            auth: true,
            groups: [1, 2]
        })
        .state('simulation', {
            url: '/simulation/:id',
            templateUrl: 'partials/views/Simulation.html',
            controller: 'SimulationCtrl',
            auth: true,
            groups: [1, 2]
        })
        .state('mySimulations', {
            url: '/my-simulations',
            templateUrl: 'partials/views/MySimulations.html',
            controller: 'MySimulationsCtrl',
            auth: true,
            groups: [1, 2]
        })
        .state('users', {
            url: '/users',
            templateUrl: 'partials/views/Users.html',
            controller: 'UsersCtrl',
            auth: true,
            group: 1
        })
        .state('usersAdd', {
            url: '/users/add',
            templateUrl: 'partials/views/UsersAdd.html',
            controller: 'UsersAddCtrl',
            auth: true,
            group: 1
        })
        .state('user', {
            url: '/user/:id',
            templateUrl: 'partials/views/User.html',
            controller: 'UserCtrl',
            auth: true,
            group: 1
        })
        .state('userEdit', {
            url: '/user/:id/edit',
            templateUrl: 'partials/views/UserEdit.html',
            controller: 'UserEditCtrl',
            auth: true,
            group: 1
        });

    // For any unmatched url, redirect to /home
    $urlRouterProvider.otherwise("/home");

    // Global API error handling
    $httpProvider.interceptors.push('sessionInjector');
});

app.run(function (user) {

});