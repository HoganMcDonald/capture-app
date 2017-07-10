app.controller('snippetController', (snippetService) => {
  console.log('snippetController');
  let vm = this;
  vm.user = LocalStorage.getItem('user');
  vm.snippets = [];





  //get all snippets by username
  vm.getBucket = (bucket, username) => {
    let obj = {
      name: bucket,
      user: username
    };
    snippetService.getBucket(obj).then((response) => {
      console.log(response);
    });
  }; //end getBucket


  //get snippet by snippet id





});
