app.controller('authController', function(go) {
  console.log('authController');
  let vm = this;

  //log in user
  vm.login = function() {
    go.to('/capture');
  }; //end login

  //register new user
  vm.register = function() {
    go.to('/');
  }; //end register new user
});
