function CounterCtrl($scope) {

  $scope.counter = 0;
  $scope.jumbotronStyle = {'background-color': 'rgba(223,240,216,0)'};

  $scope.incrementCounter = function() {
    $scope.counter++; 
    $scope.jumbotronStyle = {'background-color': 'rgba(223,240,216,'+$scope.counter/20+')'}
  };
  $scope.resetCounter = function(){
    $scope.counter = 0;
    $scope.jumbotronStyle = {'background-color': 'rgba(223,240,216,0)'};
  };

}