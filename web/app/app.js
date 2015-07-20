// Toteuta moduulisi tänne
var MovieApp = angular.module('MovieApp', ['firebase', 'ngRoute']);

MovieApp.config(['$httpProvider', function($httpProvider) {
  delete $httpProvider.defaults.headers.common["X-Requested-With"]
}]);

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
            .when('/movies/:id', {
                controller: 'ShowController',
                templateUrl: 'app/views/show.html'
            })
            .when('/movies/:id/edit', {
                controller: 'EditController',
                templateUrl: 'app/views/edit.html'
            })
            .otherwise({
                redirectTo: '/'
            });
    // Lisää reitit tänne
}
//, ['$httpProvider', function ($httpProvider) {
//        delete $httpProvider.defaults.headers.common["X-Requested-With"];
);



