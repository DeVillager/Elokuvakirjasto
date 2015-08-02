CourseApp.controller('HomeController', function ($scope, $routeParams, FirebaseService, APIService, $location) {


    $scope.courses = [];
    $scope.found = 0;
    $scope.ready = false;
//    $scope.movies = FirebaseService.getMovies();
    $scope.courses = FirebaseService.getCourses();

    $("table")
            .on("click focus", ".item.inactive", function (e) {
//                this.id = 'joo';
                var curRow = $(this);
                curRow.clone().appendTo(document.getElementById('list'));
                curRow.removeClass("inactive").find("input:first").focus();
            })
            .on("click", ".icon.delete", function (e) {
                $(this).closest("tr").remove();
            });


    $scope.lisaaKurssi = function () {
//        $scope.nimi = nimi;
//        var b = [];
        var nimet = [];
        var pisteet = [];
        var a = document.getElementsByClassName('task');
        var b = document.getElementsByClassName('maxp');
//        alert(a.length);
        var newCourse = {
            nimi: $scope.nimi,
            tehtavat: [],
            students: ['eka']
        }

        for (i = 0; i < a.length; i++) {
            if (a[i].value && b[i].value) {
                var newTask = {
                    id: i,
                    nimi: a[i].value,
                    maxp: b[i].value,
                    gotp: '1'
                }
                newCourse.tehtavat[i] = newTask;
            }
        }
        FirebaseService.addCourse(newCourse);
//        alert(newCourse.key);
//        alert(newCourse.$id);
//        alert(newCourse.id);
//        alert(newCourse.$key);
//        while (!document.getElementById($scope.nimi)) {
//        document.getElementById($scope.nimi).click();


//        }
    }

    $scope.remove = function (movie) {
        FirebaseService.removeMovie(movie);
    }

    $scope.edit = function (movie) {
        $location.path('/movies/' + key);
    }

});



