MovieApp.service('APIService', function($http){
  this.findMovie = function(name){
    return $http.get('http://www.omdbapi.com', { params: { s: name } });
  }
});


