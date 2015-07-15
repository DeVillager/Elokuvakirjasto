describe('Show movie', function () {
    var controller, scope;
    var FirebaseServiceMock, RouteParamsMock;
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
                getMovies: function () {
                    return movies;
                },
                getMovie: function (key, done) {
                    if (key == 'abc123') {
                        done({
                            name: 'Joku leffa',
                            director: 'Kalle Ilves',
                            release: 2015,
                            description: 'Mahtava leffa!'
                        });
                    } else {
                        done(null);
                    }
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

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('ShowController', {
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
     * Testaa, että Firebasesta (mockilta) saatu elokuva löytyy kontrollerista.
     * Testaa myös, että Firebasea käyttävästä palvelusta kutsutaan oikeaa funktiota
     * käyttämällä toBeCalled-oletusta.
     */
    it('should show current movie from Firebase', function () {
//        var leffa = null;
//        FirebaseServiceMock.getMovie(RouteParamsMock.key, leffa);
        expect(RouteParamsMock.key).toBe('abc123');
        expect(FirebaseServiceMock.getMovie).toHaveBeenCalled();
    });
});