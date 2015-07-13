// Toteuta moduulisi tänne
var MovieApp = angular.module('MovieApp', ['firebase', 'ngRoute']);

MovieApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                controller: 'ListController',
                templateUrl: 'app/views/list.html'
            })
            .when('/movies', {
                controller: 'ListController',
                templateUrl: 'app/views/list.html'
            })
            .when('/movies/new', {
                controller: 'AddController',
                templateUrl: 'app/views/add.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    // Lisää reitit tänne
});