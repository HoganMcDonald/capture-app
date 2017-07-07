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

    let id = 0;

    let obj = {
      username: 'hogan',
      password: 'hogan',
      email: 'hogan@hogan.com'
    }

    $http.post('/register', obj).then((response) => {
      console.log(response);
      go.to('/');
    });

  }; //end register new user



});
