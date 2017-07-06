app.controller('captureController', function(go) {
  console.log('captureController');
  var vm = this;

  vm.goToSuccess = function() {
    go.to('/success');
  };

});
