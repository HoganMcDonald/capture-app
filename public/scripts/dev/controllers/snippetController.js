app.controller('snippetController', function(snippetService, go, $http) {
  let vm = this;
  vm.user = localStorage.getItem('user');
  vm.feed = JSON.parse(localStorage.getItem('feed'));
  vm.snippets = [];
  vm.buckets = [];
  vm.currentSnippet = JSON.parse(localStorage.getItem('currentSnippet'));
  vm.currentBucket = JSON.parse(localStorage.getItem('currentBucket'));
  vm.currentBucketName = vm.currentBucket.bucket_name;
  vm.currentBucketDescription = '';

  //called when first navigated to
  vm.setCurrentBucketToFeed = function() {
    vm.currentBucket = vm.feed;
    vm.currentBucketDescription = '';
  }; //end set current bucket to feed

  //get all snippets by username
  vm.getBucket = function(bucketObj) {
    if (bucketObj == undefined) {
      let feedId = vm.feed.id;
      bucketObj = {
        id: feedId,
        bucket_name: 'feed'
      };
      vm.setCurrentBucketToFeed();
    } else if (typeof(bucketObj) == "string") {
      bucketObj = JSON.parse(bucketObj);
    }
    let objId = bucketObj.id;
    let obj = {
      name: objId,
      user: vm.user
    };
    snippetService.getBucket(obj).then(function(response) {
      localStorage.setItem('currentBucket', JSON.stringify(bucketObj));
      vm.currentBucket = JSON.parse(localStorage.getItem('currentBucket'));
      vm.currentBucketName = vm.currentBucket.bucket_name;
      vm.currentBucketDescription = vm.currentBucket.bucket_description;
      vm.snippets = response.data;
    });

  }; //end getBucket

  //get all buckets
  vm.getBuckets = function(username) {
    snippetService.getAllBuckets(username).then(function(response) {
      vm.buckets = response.data;
      console.log(vm.buckets);
    }); //end get all buckets service
  }; //end get all buckets

  //delete snippet
  vm.deleteSnippet = function(obj) {
    snippetService.deleteSnippet(obj.id).then(function(response) {
      vm.getBucket(obj.bucket_id);
    });
  }; //end delete snippet

  vm.viewSnippet = function(obj) {
    localStorage.setItem('currentSnippet', JSON.stringify(obj));
    go.to('/snippet');
  }

  //make new bucket
  vm.createBucket = function() {
    let obj = {
      user: localStorage.getItem('user'),
      name: vm.bucketName,
      description: vm.bucketDescription,
    }
    if (obj.user && obj.name && obj.description) {
      $http.post('/bucket', obj).then(function(response) {
        go.to('/feed');
      }); //end http request
    } else {
      vm.bucketDescription = 'must fill out all fields';
    } //check if input fields are populated
  }; //end make new bucket

  //update bucket for snippet
  vm.updateBucket = function(bucket) {
    let newBucket = JSON.parse(bucket);
    let obj = {
      snippetId: vm.currentSnippet.id,
      bucketId: newBucket.id
    };
    $http.put('/snippet', obj).then(function(response) {
      console.log(response);
      go.to('/feed');
    }); //end http
  }; //end update bucket for snippet

});
