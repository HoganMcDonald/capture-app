app.controller('snippetController', function(snippetService, go) {
  let vm = this;
  vm.user = localStorage.getItem('user');
  vm.feed = localStorage.getItem('feedID');
  vm.snippets = [];
  vm.buckets = [];
  vm.currentSnippet = JSON.parse(localStorage.getItem('currentSnippet'));

  //get all snippets by username
  vm.getBucket = function(bucket_id) {
    if (bucket_id == undefined) {
      bucket_id = vm.feed;
    }
    let obj = {
      name: bucket_id,
      user: vm.user
    };
    snippetService.getBucket(obj).then(function(response) {
      vm.snippets = response.data;
    });
  }; //end getBucket

  //get all buckets
  vm.getBuckets = function(username) {
    snippetService.getAllBuckets(username).then(function(response) {
      vm.buckets = response.data;
      console.log(vm.buckets);
    }); //end get all buckets service
  }; //end get all buckets

  //delete snippet
  vm.deleteSnippet = function(obj) {
    snippetService.deleteSnippet(obj.id).then(function(response) {
      vm.getBucket(obj.bucket_id);
    });
  }; //end delete snippet

  vm.viewSnippet = function(obj) {
    localStorage.setItem('currentSnippet', JSON.stringify(obj));
    go.to('/snippet');
  }

});
