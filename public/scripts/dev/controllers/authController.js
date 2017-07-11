app.controller('authController', function(go, $http) {
  console.log('authController');
  let vm = this;




  //log in user
  vm.login = function() {

    //object to send
    let obj = {
      username: vm.username,
      password: vm.password
    };

    //send request to server
    $http.post('/', obj).then((response) => {
      if (response.data === 'error') {
        vm.username = 'Username or Password Incorrect';
        vm.password = '';
      } else {
        console.log(response);
        localStorage.setItem('user', response.data[0].username);
        localStorage.setItem('feedID', response.data[0].id)
        go.to('/capture');
      }
    }); //end $http

  }; //end login




  //register new user
  vm.register = function() {

    if (vm.password0 != vm.password1) {
      vm.password0 = '';
      vm.password1 = '';
      vm.username = 'Passwords Don\'t Match';
      vm.email = '';
    } else if (!vm.username) {
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
