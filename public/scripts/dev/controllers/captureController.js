app.controller('captureController', function(go) {
  console.log('captureController');
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

});
