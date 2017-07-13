app.controller('captureController', function(go, snippetService) {
  var vm = this;

  vm.captureText = false;
  vm.captureImage = false;

  vm.goToSuccess = function() {
    go.to('/success');
  };

  vm.uploadText = function() {
    //capture text toggle
    vm.captureText = !vm.captureText;
  };

  vm.uploadImage = function() {
    //capture image toggle
    vm.captureImage = !vm.captureImage;
  };

  //add snippet to feed
  vm.submitText = function() {
    let newSnippet = {
      bucket: 'Feed',
      user: localStorage.getItem('user'),
      text: vm.snippetText,
      img_url: vm.snippetImg
    }
    console.log(newSnippet);
    snippetService.postSnippet(newSnippet).then(function(response) {
      console.log(response);
    });
  }; //end submit text


});
