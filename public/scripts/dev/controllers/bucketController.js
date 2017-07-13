app.controller('bucketController', function($http) {
  console.log('bucketController');

  let vm = this;

  //make new bucket
  vm.createBucket = function() {
    console.log('clicked');
    let obj = {
      user: localStorage.getItem('user'),
      name: vm.bucketName,
      description: vm.bucketDescription,
    }
    if (obj.user && obj.name && obj.description) {
      $http.post('/bucket', obj).then(function(response) {
        console.log(response);
      }); //end http request
    } else {
      vm.bucketDescription = 'must fill out all fields';
    } //check if input fields are populated
  }; //end make new bucket


});
