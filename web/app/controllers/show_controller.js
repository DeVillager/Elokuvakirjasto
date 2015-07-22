MovieApp.controller('ShowController', function ($scope, currentAuth, $routeParams, FirebaseService, $location) {
    
    if (!currentAuth) {
//        alert(currentAuth);
        $location.path('/');
    }
    
    $scope.movies = [];
    $scope.movies = FirebaseService.getMovies();
    
    
    FirebaseService.getMovie($routeParams.id, function (data) {
        $scope.movie = data;
//        alert($routeParams.id);
    });

    $scope.return = function () {
        $location.path('/movies');
    };

    $scope.edit = function () {
//        var id = $routeParams.id;
        $location.path('/movies/' + $routeParams.id + '/edit');
    };


});

