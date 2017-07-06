app.controller('authController', function(go) {
  console.log('authController');
  let vm = this;

  //log in user
  vm.login = function() {
    go.to('/capture');
  }; //end login

});
