app.service('snippetService', function($http) {
  let sv = this;
  console.log('snippetService');

  //get all snippets from bucket for user
  sv.getBucket = function(obj) {
    return $http.get('/snippet/' + obj.user + '/' + obj.name, function(response) {
      console.log(response);
      return response;
    });
  }; //end getBucket



})
