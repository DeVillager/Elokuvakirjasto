describe('ListController', function () {
    var controller, scope;

    var FirebaseServiceMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MovieApp');

        FirebaseServiceMock = (function () {
            var movies = [
                {
                    kuvaus: 'iewfoi',
                    nimi: 'ihie',
                    ohjaaja: 'euhiueh',
                    vuosi: '2000',
                },
                {
                    kuvaus: 'iewewegweg',
                    nimi: 'hrehea',
                    ohjaaja: 'euhiueh',
                    vuosi: '2678',
                },
                {
                    kuvaus: 'rtntntss',
                    nimi: 'fdzdn',
                    ohjaaja: 'luflfyuk',
                    vuosi: '1999',
                },
            ];
            return {
                // Toteuta FirebaseServicen mockatut metodit tähän
                addMovie: function (movie) {
                    movies.push(movie);
                },
                getMovies: function () {
                    return movies;
                },               
                removeMovie: function (movie) {
                    movies.splice(movies.indexOf(movie), 1);
                }
            };
        })();

        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();

        spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('ListController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että Firebasesta (mockilta) saadut elokuvat löytyvät konrollerista
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should list all movies from the Firebase', function () {
        expect(scope.movies.length).toBe(3);
        expect(FirebaseServiceMock.getMovies).toHaveBeenCalled();
    });

    /* 
     * Testaa, että elokuvan pystyy poistamaan Firebasesta.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to remove a movie', function () {
//        var listanKoko = scope.movies.length;
        scope.remove(scope.movies[0]);
        scope.remove(scope.movies[0]);
        expect(scope.movies.length).toBe(1);
        expect(FirebaseServiceMock.removeMovie).toHaveBeenCalled();
    });
});