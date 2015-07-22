MovieApp.controller('EditController', function ($scope, $routeParams, FirebaseService, $location) {
    
    
//    alert($routeParams.id);
//    if (!currentAuth) {
////        alert(currentAuth);
//        $location.path('/');
//    }
//    $scope.movie = FirebaseService.getMovies()[0];
    $scope.movies = [];
    $scope.movies = FirebaseService.getMovies();
//    $scope.movie = null;
//    var movie = null;


    FirebaseService.getMovie($routeParams.id, function (data) {
        if (data !== null) {
            $scope.movie = data;
//            alert($scope.movie.nimi);
        } else {
//            $scope.movie = $scope.movies[0];
        }

        if ($scope.movie.nimi) {
            $scope.nimi = $scope.movie.nimi;
        } else {
            $scope.nimi = 'a';
            $scope.movie.nimi = 'a';
        }
        if ($scope.movie.ohjaaja) {
            $scope.ohjaaja = $scope.movie.ohjaaja;
        } else {
            $scope.ohjaaja = 'b';
            $scope.movie.ohjaaja = 'b';
        }
        if ($scope.movie.kuvaus) {
            $scope.kuvaus = $scope.movie.kuvaus;
        } else {
            $scope.kuvaus = 'c';
            $scope.movie.kuvaus = 'c';
        }
        if ($scope.movie.vuosi) {
            $scope.vuosi = $scope.movie.vuosi;
        } else {
            $scope.vuosi = '1900';
            $scope.movie.vuosi = '1900';
        }
//        alert($scope.movie.nimi);
//        $scope.ohjaaja = $scope.movie.ohjaaja;
//        $scope.vuosi = $scope.movie.vuosi;
//        $scope.kuvaus = $scope.movie.kuvaus;
    });


    $scope.update = function () {
        if ($scope.nimi !== '' && $scope.ohjaaja !== '' && $scope.vuosi !== '' &&
                $scope.kuvaus !== '') {
            
            $scope.movie.nimi = $scope.nimi;
            $scope.movie.ohjaaja = $scope.ohjaaja;
            $scope.movie.vuosi = $scope.vuosi;
            $scope.movie.kuvaus = $scope.kuvaus;
 
            FirebaseService.editMovie($scope.movie);
            $scope.movies = FirebaseService.getMovies();
        }
        $location.path('/movies');
    };

    $scope.cancel = function () {
        $location.path('/movies/' + $routeParams.id);
    };


//    $scope.removeMovie = function (index) {
//        // Korvaa tämä kutsumalla sopivaa FirebaseService-palvelun funktiota
//        var movie = $scope.movies[index];
//        FirebaseService.removeMovie(movie);
//    };
});


