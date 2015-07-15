MovieApp.controller('ListController', function ($scope, $routeParams, FirebaseService, $location) {
    $scope.movies = [];
//    $scope.movies = FirebaseService.getMovies();
    $scope.movies = FirebaseService.getMovies();

    $scope.newMovie = function () {
        $location.path('/movies/new');
    }

    $scope.remove = function (movie) {
        FirebaseService.removeMovie(movie);
    }

    $scope.edit = function (movie) {
        $location.path('/movies/' + key);
    }

    

//    if (movies[$routeParams.movie.toLowerCase()]) {
//        $scope.movie = movies[$routeParams.movie.toLowerCase()];
//    } else {
//        $scope.movie = null;
//    }

});



