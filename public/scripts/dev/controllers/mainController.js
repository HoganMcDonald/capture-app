app.controller('mainController', function($location) {
  console.log('mainController');
  let vm = this;

  //display nav bar boolean
  vm.showNavBar = false;

  //watches current location and sets vm.showNavBar accordingly
  vm.checkCurrentLocation = function() {
    console.log($location.url());
    if ($location.url() == '/' || $location.url() == '/register') {
      vm.showNavBar = false;
    } else {
      vm.showNavBar = true;
    }
  }; //end checkCurrentLocation()

  //read local storage to see if user is logged in
});
