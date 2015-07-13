MovieApp.service('FirebaseService', function ($firebase) {

    var firebaseRef = new Firebase('https://blistering-heat-4023.firebaseio.com/movies');
    var sync = $firebase(firebaseRef);
    var movies = sync.$asArray();

    this.getMovies = function () {
        return movies;
    }

    this.addMovie = function (movie) {
        movies.$add(movie);
    }

    this.removeMovie = function (movie) {
        movies.$remove(movie);
    };

});


