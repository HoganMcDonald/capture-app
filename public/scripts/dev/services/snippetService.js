app.service('snippetService', function($http) {
  let sv = this;

  //get all snippets from bucket for user
  sv.getBucket = function(obj) {
    return $http.get('/snippet/' + obj.user + '/' + obj.name).then(function(response) {
      return response;
    });
  }; //end getBucket

  //get buckets
  sv.getAllBuckets = function(username) {
    return $http.get('/bucket/' + username).then(function(response) {
      return response;
    }); //end http request
  }; //end get all buckets

  //post new snippet
  sv.postSnippet = function(obj) {
    return $http.post('/snippet', obj).then(function(response) {
      return response;
    })
  }; //end new snippet

  //delete snippet by snippet id
  sv.deleteSnippet = function(id) {
    return $http.delete('/snippet/' + id).then(function(response) {
      return response;
    }); //end $http
  }; //end delete snippet

  //search the db
  sv.searchDB = function(text) {
    return $http.get('/search/' + text + '/' + user).then(function(response) {
      return response;
    }); //end http
  }; //end search db

})
