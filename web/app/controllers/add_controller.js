CourseApp.controller('AddController', function ($scope, FirebaseService, $location) {
    
//    if (!currentAuth) {
////        alert(currentAuth);
//        $location.path('/');
//    }
    
    $scope.movies = [];
    $scope.movies = FirebaseService.getMovies();

    $scope.addMovie = function () {
        if ($scope.nimi !== '' && $scope.ohjaaja !== '' && $scope.vuosi !== '' &&
                $scope.kuvaus !== '') {
            // Korvaa tämä kutsumalla sopivaa FirebaseService-palvelun funktiota

            var newMovie = {
                nimi: $scope.nimi,
                ohjaaja: $scope.ohjaaja,
                vuosi: $scope.vuosi,
                kuvaus: $scope.kuvaus
            };

            FirebaseService.addMovie(newMovie);
            $scope.movies = FirebaseService.getMovies();
            $scope.nimi = '';
            $scope.ohjaaja = '';
            $scope.vuosi = '';
            $scope.kuvaus = '';
        }
        $location.path('/movies');
    };
    
    $scope.cancel = function() {
        $location.path('/movies');
    };
    
    $scope.removeAllMovies = function () {
        // Korvaa tämä kutsumalla sopivaa FirebaseService-palvelun funktiota
        $scope.movies.forEach(function (movie) {
            $scope.removeMovie($scope.movies.indexOf(movie));
        });
    };
    
    $scope.removeMovie = function (index) {
        // Korvaa tämä kutsumalla sopivaa FirebaseService-palvelun funktiota
        var movie = $scope.movies[index];
        FirebaseService.removeMovie(movie);
    };
});


