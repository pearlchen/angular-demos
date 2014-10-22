## Steps to convert the demo "app" from jQuery to AngularJS

1. Add AngularJS script
	- In **index.html**:
		- Add `<script src="../../angular-1.3.0/angular.min.js"></script>` 
	- (Note: You can’t get rid of the jquery.js script just yet because '$ not found' errors will stop Angular from working.)

2. Bootstrap app using ng-app:
	- In **index.html**:
		- Update `<body>...</body>` to be `<body ng-app="demoApp">...</body>`

3. Turn scripts.js into an Angular controller file:
	- In **index.html**:
		-	Update `<div class="demo">` to be `<div class="demo" ng-controller="MailCtrl">`
	- In **scripts.js**:
		-	Turn current `(function(){ ... }());` closure into `function MailCtrl($scope){  ... }`
		- Add Angular app namespace and controller definitions as first line: angular.module('demoApp', []).controller('MailCtrl', ['$scope', MailCtrl]);

4. Make alert message boxes model-driven:
	- In **styles.css**:
		-	Delete `display:none;` within `.alert { ... }`
	- In **index.html**:
		-	Update `<div id="retry" class="alert alert-warning">` to be `<div class="alert alert-warning" ng-show="isRetrying">` 
		-	Update `<div id="failed" class="alert alert-danger">` to be `<div class="alert alert-danger" ng-show="isFailed">` 
	-	In **scripts.js**: 
		- Add: `$scope.isRetrying = false;` and `$scope.isFailed = false;`
		-	Search for instances of `retryMessage` and update:
			-	`retryMessage.hide();` —> `$scope.isRetrying = false;`
			-	`retryMessage.show();` —> `$scope.isRetrying = true;`
		-	Search for instances of `errorMessage` and update:
			-	`errorMessage.show();` —> `$scope.isFailed = true;`
			-	`errorMessage.hide();` —> `$scope.isFailed = false;`

5. Update click handler for alert message close button:
	- In **index.html**:
		-	Update `<button type="button" class="close">` to be `<button type="button" class="close" ng-click="dismissAlert()">`
	-	In **scripts.js**: 
		-	Add: `$scope.dismissAlert = function() { $scope.isFailed = false;  }`
		-	Delete: `dismissButton.click(function(){ ... });`

6. Search for dismissButton, then errorMessage — there should be no other references so get rid of them! e.g.
	-	In **scripts.js**: 
		- Delete: `errorMessage = $("#failed")`
		- Delete: `dismissButton = errorMessage.find('button.close')`

7. Use data binding for DOM text updates:
	- In **index.html**:
		- Replace `<span class="timesSubmitted"></span>` with `{{timesSubmitted}}`
	-	In **scripts.js**: 
		- Delete `retryMessage.find('.timesSubmitted').text(timesSubmitted);`
		- Find all instances of `timesSubmitted` and replace with `$scope.timesSubmitted`
		- Delete `retryMessage = $("#retry")`

8. Update click handler for submit button **and** make disable/enabled state of submit button model-driven:
	- In **index.html**:		
		- Update `<button type="submit" class="btn btn-default btn-success">` to be `<button type="submit" class="btn btn-default btn-success" ng-disabled="isSending" ng-click="submitHandler()">` 
	-	In **scripts.js**: 
		- Add `$scope.isSending = false;`
		- Turn `function submitHandler() { ... }` into `$scope.submitHandler = function() { ... };`
		- In `submitHandler()`, delete `submitButton.attr("disabled", "disabled");  waitAnimation.show();` and replace with `$scope.isSending = true;`
		- In `postOnFail()` else block, delete `submitButton.removeAttr("disabled");  waitAnimation.hide();` and replace with `$scope.isSending = false;`
		- Delete `submitButton = $('.letter button')`

9. Make waitAnimation animation model-driven:
	- In **styles.css**:
		- Delete `display: none;` in `button .glyphicon { .. }`
	- In **index.html**:
		- Update `<span class="glyphicon glyphicon-repeat rotating">` to be `<span class="glyphicon glyphicon-repeat rotating" ng-show="isSending">`
	-	In **scripts.js**: 
		- Delete `waitAnimation = submitButton.find('.glyphicon');`

10. Update setTimeout to use Angular $timeout (otherwise will cause scope issues)
	-	In **scripts.js**: 
		- Replace all instance of `submitData` to be `$scope.submitData`
		- Update `MailCtrl($scope)` to be `MailCtrl($scope, $timeout)`
		- Update `.controller('MailCtrl', ['$scope', MailCtrl]);` to be `.controller('MailCtrl', ['$scope', '$timeout', MailCtrl]);`
		- Replace `setTimeout( submitData, 1000 );` with `$timeout( $scope.submitData, 1000 );`

11. Update jQuery $.post() to use Angular $http.post() (otherwise will cause scope issues)
	-	In **scripts.js**: 
		- Replace all instance of `postOnSuccess` to be `$scope.postOnSuccess`
		- Replace all instance of `postOnFail` to be `$scope.postOnFail`
		- Update `MailCtrl($scope, $timeout)` to be `MailCtrl($scope, $timeout, $http)`
		- Update `.controller('MailCtrl', ['$scope', '$timeout', MailCtrl]);` to be `angular.module('demoApp', []).controller('MailCtrl', ['$scope', '$timeout', '$http', MailCtrl]);`
		- Replace `` with `$http.post("fakeapi").success($scope.postOnSuccess).error($scope.postOnFail);`

12.	(Optional) Turn maxTries into a $scope variable
	-	In **scripts.js**: 
		⁃	Find all instances of `maxTries` and replace with `$scope.maxTries`

13. Remove jQuery dependency!
	- In **index.html**:
		- Delete `<script src="../../jquery-2.1.0/jquery.min.js"></script>` 
