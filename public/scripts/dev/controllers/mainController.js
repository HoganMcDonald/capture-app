var searchResults = [];
app.controller('mainController', function($location, go, snippetService) {
  console.log('mainController');
  let vm = this;

  //display nav bar boolean
  vm.showNavBar = false;
  vm.showFeedButton = true;

  //watches current location and sets vm.showNavBar accordingly
  vm.checkCurrentLocation = function(boolean) {
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

    if (boolean) {
      vm.showNavBar = true;
      vm.showFeedButton = true;
    }
  }; //end checkCurrentLocation()

  vm.searchSnippets = function() {
    snippetService.searchDB(vm.searchInput).then(function(response) {
      searchResults = response.data;
      go.to('/search');
    });
  };

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

  vm.goToMakeNewBucket = function() {
    go.to('/newBucket');
    vm.checkCurrentLocation();
  };

});
