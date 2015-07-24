MovieApp.controller('LoginController', function ($scope, currentAuth, $location, AuthenticationService, $rootScope) {
    
    $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
    if (!currentAuth) {
        $location.path('/');
    } else {
        $location.path('/movies');
    }
    
    
//    document.getElementById("user").defaultValue = "tommi.m@hotmail.com";
//    document.getElementById("pass").defaultValue = "Pikmin12";
////    $scope.message = 'viesti';
//    $scope.carryOn = function () {
//        $location.path('/movies');
//    }
    $scope.email = "itavuo@kajaani.fi";
    $scope.password = "Itis";
//    $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();

    $scope.logIn = function () {
//        alert($scope.email);
//        alert($scope.newEmail);
//        alert($scope.password);
//        alert($scope.newPassword);
//        $location.path('/movies');
//        $scope.message = 'Väärä sähköpostiosoite tai salasana!'
        $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
        if ($scope.email === undefined || $scope.password === undefined || $scope.email === '' || $scope.password === '') {
            alert('ei toimi');
        }
        AuthenticationService.logUserIn($scope.email, $scope.password)
                .then(function () {
                    $rootScope.userLoggedIn = AuthenticationService.getUserLoggedIn();
                    $location.path('/movies');
                })
                .catch(function () {
                    $scope.message = 'Väärä sähköpostiosoite tai salasana!'
                });
    }

    $scope.register = function () {
        alert($scope.newEmail);
        alert($scope.newPassword);
//        alert($scope.newEmail + $scope.newPassword);
//        $scope.message = 'Väärä sähköpostiosoite tai salasana!'
        AuthenticationService.createUser($scope.newEmail, $scope.newPassword)
                .then(function () {
                    $scope.message = 'Toimii';
                    AuthenticationService.logUserIn($scope.newEmail, $scope.newPassword)
                            .then(function () {
                                $location.path('/movies');
                            });
                })
                .catch(function () {
                    $scope.message = 'Tapahtui virhe! Yritä uudestaan';
                });
    }

});