app.controller('authController', function(go, $http) {
  console.log('authController');
  let vm = this;




  //log in user
  vm.login = function() {

    //object to send
    let obj = {
      username: 'hogan',
      password: 'hogan'
    };

    $http.post('/', obj).then((response) => {
      console.log(response);
      go.to('/capture');
    });

  }; //end login




  //register new user
  vm.register = function() {

    if (!vm.password0 === vm.password1) {
      vm.password0 = '';
      vm.password1 = '';
      vm.username = 'Passwords Don\'t Match';
      vm.email = '';
    } else if (vm.username.length <= 0) {
      vm.password0 = '';
      vm.password1 = '';
      vm.username = 'Must Enter Username';
      vm.email = '';
    } else if (vm.username.includes(' ')) {
      vm.password0 = '';
      vm.password1 = '';
      vm.username = 'Usernamen Can\'t Contain Spaces';
      vm.email = '';
    } else {
      let obj = {
        username: vm.username,
        password: vm.password0,
        email: vm.email
      }
      $http.post('/register', obj).then((response) => {
        if (response.data === 'registered') {
          go.to('/');
        } else {
          vm.password0 = '';
          vm.password1 = '';
          vm.username = response.data;
          vm.email = '';
        }
      });
    }
  }; //end register new user



});
