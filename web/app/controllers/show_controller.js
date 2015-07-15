MovieApp.controller('ShowController', function ($scope, $routeParams, FirebaseService, $location) {
    $scope.movies = [];
    $scope.movies = FirebaseService.getMovies();
    
    
    FirebaseService.getMovie($routeParams.id, function (data) {
        $scope.movie = data;
//        alert($routeParams.id);
    });

    $scope.return = function () {
        $location.path('/');
    };

    $scope.edit = function () {
//        var id = $routeParams.id;
        $location.path('/movies/' + $routeParams.id + '/edit');
    };


});

