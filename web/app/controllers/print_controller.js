CourseApp.controller('PrintController', function ($scope, $routeParams, FirebaseService, $location) {



    $scope.courses = [];
    $scope.courses = FirebaseService.getCourses();
//    $scope.test = 'testaa!';

    

    FirebaseService.getCourse($routeParams.id, function (data) {
        if (data !== null) {
            $scope.course = data;
//            alert($scope.movie.nimi);
        } else {
            $scope.course = $scope.courses[0];
        }
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


