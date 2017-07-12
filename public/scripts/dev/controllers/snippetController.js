app.controller('snippetController', function(snippetService, go) {
  let vm = this;
  vm.user = localStorage.getItem('user');
  vm.feed = localStorage.getItem('feedID');
  vm.snippets = [];
  vm.currentSnippet = JSON.parse(localStorage.getItem('currentSnippet'));
  console.log('snippetController', vm.currentSnippet);

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
      console.log(vm.snippets);
    });
  }; //end getBucket

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
