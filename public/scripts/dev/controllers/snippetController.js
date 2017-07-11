app.controller('snippetController', function(snippetService) {
  console.log('snippetController');
  let vm = this;
  vm.user = localStorage.getItem('user');
  vm.snippets = [];





  //get all snippets by username
  vm.getFeed = function() {
    let obj = {
      name: 'feed',
      user: localStorage.getItem('user')
    };
    console.log(obj);
    snippetService.getBucket(obj).then(function(response) {
      vm.snippets = response.data;
      console.log(response.data);
    });
  }; //end getBucket


  //get snippet by snippet id





});
