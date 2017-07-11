app.controller('snippetController', function(snippetService) {
  console.log('snippetController');
  let vm = this;
  vm.user = localStorage.getItem('user');
  vm.feed = localStorage.getItem('feedID');
  vm.snippets = [];





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


  //get snippet by snippet id




  //delete snippet
  vm.deleteSnippet = function(obj) {
    snippetService.deleteSnippet(obj.id).then(function(response) {
      vm.getBucket(obj.bucket_id);
    });
  }; //end delete snippet


});
