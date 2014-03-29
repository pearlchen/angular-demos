function MailCtrl($scope, $timeout, $http) {

  $scope.timesSubmitted = 0;
  $scope.maxTries = 3;

  $scope.isRetrying = false;
  $scope.isFailed = false;
  $scope.isSending = false;

  $scope.submitHandler = function() {
    $scope.isSending = true;
    $scope.timesSubmitted = 0;
    $scope.submitData();
  };

  $scope.submitData = function() {
    $scope.timesSubmitted++;
    $http.post("fakeapi").success($scope.postOnSuccess).error($scope.postOnFail);
  };

  $scope.postOnSuccess = function(data) {
  };

  $scope.postOnFail = function(data) {
    if ( $scope.timesSubmitted < $scope.maxTries ) {
      $scope.retrySubmit();
    }
    else {
      $scope.isRetrying = false;
      $scope.isFailed = true;
      $scope.isSending = false;
    }
  };

  $scope.dismissAlert = function() {
    $scope.isFailed = false;
  };

  $scope.retrySubmit = function() {
    $scope.isRetrying = true;
    $timeout( $scope.submitData, 1000 );
  };

}