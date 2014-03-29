/* This demo was created to demonstrate async call stack debugging in Chrome DevTools. */
/* This demo is best viewed in Chrome Canary. */

function MailCtrl($scope, $timeout, $http) {

  $scope.timesSubmitted = 0;
  $scope.maxTries = 3;

  $scope.isRetrying = false;
  $scope.isFailed = false;
  $scope.isSending = false;

  $scope.submitHandler = function() {
    
    // disable submit button to avoid double-clicks
    $scope.isSending = true;

    // try submitting the form data
    $scope.timesSubmitted = 0;
    $scope.submitData();

  };

  $scope.submitData = function() {

    // increate the counter for submission tries and then make a post request
    $scope.timesSubmitted++;
    $http.post("fakeapi").success($scope.postOnSuccess).error($scope.postOnFail);
  }

  $scope.postOnSuccess = function(data) {

    // the post was successful!
    console.log("post success");

  } 

  $scope.postOnFail = function(data) {

    // the post failed
    console.log("post fail");
    
    if ( $scope.timesSubmitted < $scope.maxTries ) {

      // maybe it's me, not you
      $scope.retrySubmit();

    }
    else {
      
      console.log("failed");

      // no more retries, show error :(
      $scope.isRetrying = false;
      $scope.isFailed = true;
      
      // re-enable submit button
      $scope.isSending = false;

    }

  } 

  $scope.dismissAlert = function() {
    $scope.isFailed = false;
  }

  $scope.retrySubmit = function() {

    // show retry message
    $scope.isRetrying = true;

    // wait to call submitData() again
    $timeout( $scope.submitData, 1000 );

  }

}