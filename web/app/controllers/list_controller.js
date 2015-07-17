MovieApp.controller('ListController', function ($scope, $routeParams, FirebaseService, APIService, $location) {
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
//        document.getElementById(otsikko).display = 'block';
        var lista = [];
        $scope.imdb = [];
        APIService.findMovie($scope.etsiNimi).success(function (movies) {
//            alert(movies.Search[0].Title);

//            $scope.imdb.forEach(function (movie) {
//                movie.nimi = movie.Title;
//                movie.ohjaaja = 'joku';
//                movie.
//            });
//            lista = $scope.imdb;
            if ($scope.etsiNimi !== '' && $scope.etsiVuosi !== '') {
                lista = movies.Search;
                lista.forEach(function (movie) {
                    if (movie.Year === $scope.etsiVuosi) {
//                alert(movie.Title);
//                    $scope.imdb.remove(movie);
                        $scope.imdb.push(movie);
                    }
                });
            }
//            else if ($scope.etsiNimi === '' && $scope.etsiVuosi !== '') {
//                APIService.findMovie($scope.etsiVuosi).success(function (movies2) {
//                    $scope.imdb = movies2.Search;
//                });
            else if ($scope.etsiNimi !== '' && $scope.etsiVuosi === '') {
                $scope.imdb = movies.Search;
            }

            if ($scope.imdb.length) {
                $scope.found = $scope.imdb.length;
            } else {
                $scope.found = 0;
            }


        });
//        $scope.imdb = lista;

//        $scope.imdb = lista;
//        var lista = [];
//        APIService.findMovie($scope.etsiVuosi).success(function (movies) {
//            $scope.imdb = movies.Search;
//
//        });

    };



//    if (movies[$routeParams.movie.toLowerCase()]) {
//        $scope.movie = movies[$routeParams.movie.toLowerCase()];
//    } else {
//        $scope.movie = null;
//    }

});



