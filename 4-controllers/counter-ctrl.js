angular.module('demoApp', [])
        .controller('CounterCtrl', ['$scope', CounterCtrl]);
        
function CounterCtrl($scope) {

  $scope.counter = 0;
  $scope.happyColor = '92,184,92'; // a bright green
  $scope.jumbotronStyle = {'background-color': 'rgba('+$scope.happyColor+',0)'};

  $scope.incrementCounter = function() {
    $scope.counter++; 
    $scope.jumbotronStyle = {'background-color': 'rgba('+$scope.happyColor+','+$scope.counter/20+')'}
  };
  
  $scope.resetCounter = function(){
    $scope.counter = 0;
    $scope.jumbotronStyle = {'background-color': 'rgba('+$scope.happyColor+',0)'};
  };

}