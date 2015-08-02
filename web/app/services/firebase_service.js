CourseApp.service('FirebaseService', function ($firebase) {

//    var ref = new Firebase("https://blistering-heat-4023.firebaseio.com");


    var firebaseRef = new Firebase('https://blistering-heat-4023.firebaseio.com/courses');
    var sync = $firebase(firebaseRef);
    var courses = sync.$asArray();

    this.getCourses = function () {
        return courses;
    }

    this.getCourse = function (key, done) {
        return courses.$loaded(function () {
            done(courses.$getRecord(key));
        });
    }
    
    this.saveCourse = function (movie) {
        courses.$save(movie);
    }

    this.addCourse = function (kurs) {
        courses.$add(kurs);
    }
    
    
    
    var firebaseRef2 = new Firebase('https://blistering-heat-4023.firebaseio.com/students');
    var sync = $firebase(firebaseRef2);
    var students = sync.$asArray();

    this.getStudents = function () {
        return students;
    }

    this.addStudent = function (movie) {
        students.$add(movie);
    }

    this.removeStudent = function (movie) {
        students.$remove(movie);
    };

    this.getStudent = function (key, done) {
        students.$loaded(function () {
            done(students.$getRecord(key));
        });
    }

    this.saveStudent = function (movie) {
        students.$save(movie);
    }

});


