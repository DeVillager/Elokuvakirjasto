// Toteuta moduulisi tänne
var MovieApp = angular.module('MovieApp', ['firebase', 'ngRoute']);

MovieApp.config(['$httpProvider', function ($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"]
    }]);

MovieApp.config(function ($routeProvider) {
    $routeProvider
            .when('/', {
                controller: 'LoginController',
                templateUrl: 'app/views/login.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies', {
                controller: 'ListController',
                templateUrl: 'app/views/list.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies/new', {
                controller: 'AddController',
                templateUrl: 'app/views/add.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies/:id', {
                controller: 'ShowController',
                templateUrl: 'app/views/show.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .when('/movies/:id/edit', {
                controller: 'EditController',
                templateUrl: 'app/views/edit.html',
                resolve: {
                    currentAuth: function (AuthenticationService) {
                        return AuthenticationService.checkLoggedIn();
                    }
                }
            })
            .otherwise({
                redirectTo: '/',
//                resolve: {
//                    currentAuth: function (AuthenticationService) {
//                        return AuthenticationService.checkLoggedIn();
//                    }
//                }
            });
    // Lisää reitit tänne
}
);

MovieApp.run(function (AuthenticationService, $rootScope, $location) {
    $rootScope.logOut = function () {
        AuthenticationService.logUserOut();
        $location.path('/');
    };

    $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
});



