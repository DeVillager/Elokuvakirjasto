MovieApp.service('FirebaseService', function ($firebase) {

//    var ref = new Firebase("https://blistering-heat-4023.firebaseio.com");
    

    var firebaseRef = new Firebase('https://blistering-heat-4023.firebaseio.com/movies');
//    firebaseRef.resetPassword({
//        email: "tommi.makelainen@helsinki.fi"
//    }, function (error) {
//        if (error) {
//            switch (error.code) {
//                case "INVALID_USER":
//                    console.log("The specified user account does not exist.");
//                    break;
//                default:
//                    console.log("Error resetting password:", error);
//            }
//        } else {
//            console.log("Password reset email sent successfully!");
//        }
//    });

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

    this.getMovie = function (key, done) {
        movies.$loaded(function () {
            done(movies.$getRecord(key));
        });
    }

    this.editMovie = function (movie) {
        movies.$save(movie);
    }

});


