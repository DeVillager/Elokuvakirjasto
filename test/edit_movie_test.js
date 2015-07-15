describe('Edit movie', function () {
    var controller, scope;

    var FirebaseServiceMock, RouteParamsMock;

    beforeEach(function () {
        // Lisää moduulisi nimi tähän
        module('MovieApp');
        FirebaseServiceMock = (function () {
            var movies = [
                {
                    kuvaus: 'Mahtava leffa!',
                    nimi: 'Joku leffa',
                    ohjaaja: 'Kalle Ilves',
                    vuosi: '2015'         
                },
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
                }
            ];
            return {
                // Toteuta FirebaseServicen mockatut metodit tähän
                getMovies: function () {
                    return movies;
                },
                getMovie: function (key, done) {
                    if (key == 'abc123') {
                        scope.movie = done;
                    } else {
                        done(null);
                    }
                },
                editMovie: function (movie) {
                   movies.forEach(function (movie) {
                       if (movie === scope.movie) {
                           movie.nimi = scope.nimi;
                           movie.ohjaaja = scope.ohjaaja;
                           movie.vuosi = scope.vuosi;
                           movie.kuvaus = scope.kuvaus;
                       }
                   }); 
                }
            }
        })();
        RouteParamsMock = (function () {
            // Toteuta mockattu $routeParams-muuttuja tähän
            return {
                key: 'abc123'
            }
        })();

        // Lisää vakoilijat
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'editMovie').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('EditController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock,
                $routeParams: RouteParamsMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että muokkauslomakkeen tiedot täytetään muokattavan elokuvan tiedoilla.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should fill the edit form with the current information about the movie', function () {
        expect(scope.nimi).toBe('Joku leffa');
        expect(scope.ohjaaja).toBe('Kalle Ilves');
        expect(scope.vuosi).toBe('2015');
        expect(scope.kuvaus).toBe('Mahtava leffa!');
    })

    /* 
     * Testaa, että käyttäjä pystyy muokkaamaan elokuvaa, jos tiedot ovat oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota,
     * käyttämällä toBeCalled-oletusta.
     */
    it('should be able to edit a movie by its name, director, release date and description', function () {
        scope.nimi = 'uusinimi';
        scope.update();
        expect(scope.movie.nimi).toBe('uusinimi');
        expect(FirebaseServiceMock.editMovie).toHaveBeenCalled();
    });

    /*
     * Testaa, ettei käyttäjä pysty muokkaaman elokuvaa, jos tiedot eivät ole oikeat
     * Testaa myös, että Firebasea käyttävästä palvelusta ei kutsuta muokkaus-funktiota,
     * käyttämällä not.toBeCalled-oletusta.
     */
    it('should not be able to edit a movie if its name, director, release date or description is empty', function () {
        scope.nimi = '';
        scope.update();
        expect(FirebaseServiceMock.editMovie).not.toHaveBeenCalled();
    });
});