app.service('go', function($location) {
  let vm = this;

  //takes a url and changes $location
  vm.to = function(url) {
    $location.url(url);
  }; // end to

});
