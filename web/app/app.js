// Toteuta moduulisi tänne
var CourseApp = angular.module('CourseApp', ['firebase', 'ngRoute']);

CourseApp.config(['$httpProvider', function ($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"]
    }]);

CourseApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                controller: 'HomeController',
                templateUrl: 'app/views/home.html'
            })
            .when('/courses/:id', {
                controller: 'ShowController',
                templateUrl: 'app/views/show.html',
            })
            .when('/courses/:id/print', {
                controller: 'PrintController',
                templateUrl: 'app/views/print.html',
            })
            .otherwise({
                redirectTo: '/',
            });
}
);



