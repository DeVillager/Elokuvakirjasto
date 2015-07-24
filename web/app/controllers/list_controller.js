MovieApp.controller('ListController', function ($scope, currentAuth, $routeParams, FirebaseService, APIService, $location) {

    if (!currentAuth) {
//        alert(currentAuth);
        $location.path('/');
    }

//    alert(currentAuth);

    $scope.movies = [];
    $scope.imdb = [];
    $scope.found = 0;
//    $scope.movies = FirebaseService.getMovies();
    $scope.movies = FirebaseService.getMovies();
    $scope.etsiNimi = '';
    $scope.etsiVuosi = '';

//    APIService.findMovie('').success(function (movies) {
//        $scope.movies = movies;
//    });
//    $scope.testaa = function () {
//        $scope.message = currentAuth;
//    }

    $scope.newMovie = function () {
        $location.path('/movies/new');
    }

    $scope.remove = function (movie) {
        FirebaseService.removeMovie(movie);
    }

    $scope.edit = function (movie) {
        $location.path('/movies/' + key);
    }

    $scope.find = function () {

        $scope.imdb = [];
        APIService.findMovie($scope.etsiNimi, $scope.etsiVuosi).success(function (movies) {

            $scope.imdb = movies.Search;

            if ($scope.imdb.length) {
                $scope.found = $scope.imdb.length;
            } else {
                $scope.found = 0;
            }
        });
    };

});



