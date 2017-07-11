app.service('snippetService', function($http) {
  let sv = this;

  //get all snippets from bucket for user
  sv.getBucket = function(obj) {
    return $http.get('/snippet/' + obj.user + '/' + obj.name).then(function(response) {
      return response;
    });
  }; //end getBucket

  //post new snippet
  sv.postSnippet = function(obj) {
    return $http.post('/snippet', obj).then(function(response) {
      return response;
    })
  }; //end new snippet

  //delete snippet by snippet id
  sv.deleteSnippet = function(id) {
    console.log(id);
    return $http.delete('/snippet/' + id).then(function(response) {
      return response;
    }); //end $http
  }; //end delete snippet

})
