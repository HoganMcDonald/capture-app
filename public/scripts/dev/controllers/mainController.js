app.controller('mainController', function($location, go) {
  console.log('mainController');
  let vm = this;

  //display nav bar boolean
  vm.showNavBar = false;
  vm.showFeedButton = true;

  //watches current location and sets vm.showNavBar accordingly
  vm.checkCurrentLocation = function() {
    console.log($location.url());
    if ($location.url() === '/' || $location.url() === '/register' || $location.url() === '') {
      vm.showNavBar = false;
      vm.showFeedButton = true;
    } else if ($location.url() === '/feed') {
      vm.showNavBar = true;
      vm.showFeedButton = false;
    } else {
      vm.showNavBar = true;
      vm.showFeedButton = true;
    }
  }; //end checkCurrentLocation()

  //read local storage to see if user is logged in


  vm.goToFeed = function() {
    go.to('/feed');
    vm.checkCurrentLocation();
  };

  vm.goToCapture = function() {
    go.to('/capture');
    vm.checkCurrentLocation();
  };

  vm.goToLogin = function() {
    go.to('/');
    vm.checkCurrentLocation();
  };

});
