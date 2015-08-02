CourseApp.controller('ShowController', function ($scope, $routeParams, FirebaseService, $location) {


    $scope.courses = [];
    $scope.courses = FirebaseService.getCourses();
//    $scope.students = FirebaseService.getStudents();
    $scope.students = FirebaseService.getStudents();


    FirebaseService.getCourse($routeParams.id, function (data) {
        if (data !== null) {
            $scope.course = data;
//            alert($scope.movie.nimi);
        } else {
            $scope.course = $scope.courses[0];
        }
    });

    $scope.return = function () {
//        alert($scope.course.tehtavat[0]);
        $location.path('/courses');
    };


//    $scope.$watch('spy', function (newValue, oldValue) {
//        if (newValue != oldValue) {
//            FirebaseService.saveCourse($scope.course);
//        }
//    });
//    
//    $scope.$watch('spy2', function (newValue, oldValue) {
//        if (newValue != oldValue) {
//            FirebaseService.saveCourse($scope.course);
//        }
//    });

    $("table")
            .on("click focus", ".item.inactive", function (e) {
                var curRow = $(this);
                curRow.clone().appendTo(document.getElementById('list'));
                curRow.removeClass("inactive").find("input:first").focus();
            })
            .on("click", ".icon.delete", function (e) {
                $(this).closest("tr").remove();
            });

    $scope.tulosta = function () {

        var newCourse = $scope.course;
        if (newCourse.students[0] === 'eka') {
            newCourse.students.pop();
        }

        var a = document.getElementsByClassName('stud');
        var b = document.getElementsByClassName('task');
        var c = document.getElementsByClassName('numb');
        var d = document.getElementsByClassName('maxp');
//        alert(d.length);
//        alert(d[0].innerHTML);
//        alert(b.length);
//        alert(c.length);

        for (i = 0; i < a.length; i++) {
            if (a[i].value) {

                var newStudent = {
                    nimi: a[i].value,
                    tehtavat: [],
                    gotp: []
                };

                for (j = 0; j < b.length; j++) {
//                    alert(b.length);
                    if (b[j].innerHTML) {
                        var tehtava = {
                            id: j,
                            nimi: b[j].innerHTML,
                            maxp: d[j].innerHTML,
                            gotp: '1'
                        };

//                        alert(b.length - 1);
//                        alert(j === b.length - 1);
//                        alert(c[i*b.length + j].value + ' ' + d[j].innerHTML);
                        var max = parseInt(d[j].innerHTML);
                        
                        if (!c[i * b.length + j].value) {
                            tehtava.gotp = 0;
                        }
                        else if (j === b.length - 1) {

                            if (c[i * b.length + j].value > max) {
//                                alert(c[i * b.length + j].value + (max + 1) + (c[i * b.length + j].value > max) + 'joo');
                                tehtava.gotp = max;
                            }
                            else {
//                                alert(c[i * b.length + j].value + 'jee');
                                tehtava.gotp = c[i * b.length + j].value;
                            }
                        }
                        else if (c[i * b.length + j].value <= d[j].innerHTML) {
                            tehtava.gotp = c[i * b.length + j].value;
                        }
                        else {
                            tehtava.gotp = d[j].innerHTML;
                        }
                        newCourse.tehtavat[j] = tehtava;
                        newStudent.tehtavat[j] = tehtava;
//                        newStudent.gotp[j] = c[i * b.length + j].value;
                    }
                }
                newCourse.students.push(newStudent);
            }
        }
        FirebaseService.saveCourse(newCourse);
        $location.path('/courses/' + $routeParams.id + '/print');
    }


});

