describe('Add movie', function () {
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
                    movies.$remove(movie);
                }
            }
        })();

        // Lisää vakoilijat
        // spyOn(FirebaseServiceMock, 'jokuFunktio').and.callThrough();
        spyOn(FirebaseServiceMock, 'addMovie').and.callThrough();
        spyOn(FirebaseServiceMock, 'getMovies').and.callThrough();
        spyOn(FirebaseServiceMock, 'removeMovie').and.callThrough();

        // Injektoi toteuttamasi kontrolleri tähän
        inject(function ($controller, $rootScope) {
            scope = $rootScope.$new();
            // Muista vaihtaa oikea kontrollerin nimi!
            controller = $controller('AddController', {
                $scope: scope,
                FirebaseService: FirebaseServiceMock
            });
        });
    });

    /*
     * Testaa alla esitettyjä toimintoja kontrollerissasi
     */

    /*
     * Testaa, että käyttäjä pystyy lisäämään elokuvan oikeilla tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * on kutsutta oikeaa funktiota lisäämällä siihen vakoilijan ja käyttämällä
     * toBeCalled-oletusta.
     */
    it('should be able to add a movie by its name, director, release date and description', function () {
        scope.nimi = 'gozilla';
        scope.ohjaaja = 'erkki';
        scope.kuvaus = 'BOOOM';
        scope.vuosi = '2012';
        scope.addMovie();
        expect(scope.movies.length).toBe(4);
        expect(FirebaseServiceMock.addMovie).toHaveBeenCalled();
    });

    /*	
     * Testaa, ettei käyttäjä pysty lisäämään elokuvaa väärillä tiedoilla.
     * Muista myös tarkistaa, että Firebasen kanssa keskustelevasta palvelusta
     * EI kutsuta funktiota, joka hoitaa muokkauksen. Voit käyttää siihen
     * not.toBeCalled-oletusta (muista not-negaatio!).
     */
    it('should not be able to add a movie if its name, director, release date or description is empty', function () {
        scope.nimi = '';
        scope.ohjaaja = 'erkki';
        scope.kuvaus = 'BOOOM';
        scope.vuosi = '2012';
        scope.addMovie();
        expect(scope.movies.length).toBe(3);

        scope.nimi = 'gozilla';
        scope.ohjaaja = '';
        scope.addMovie();
        expect(scope.movies.length).toBe(3);

        scope.ohjaaja = 'erkki';
        scope.kuvaus = '';
        scope.addMovie();
        expect(scope.movies.length).toBe(3);

        scope.kuvaus = 'BOOOM';
        scope.vuosi = '';
        scope.addMovie();
        expect(scope.movies.length).toBe(3);
        
        expect(FirebaseServiceMock.addMovie).not.toHaveBeenCalled();
        
        scope.vuosi = '1960';
        scope.addMovie();
        expect(scope.movies.length).toBe(4);
        
        
    });
});