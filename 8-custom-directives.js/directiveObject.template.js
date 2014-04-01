directiveObject = {
  restrict: string,
  priority: number,
  template: string,
  templateUrl: string,
  replace: bool,
  transclude: bool,
  scope: bool or object,
  controller: function controllerConstructor($scope, $element, $attrs, $transclude){ ... },
  require: string,
  link: function postLink(scope, iElement, iAttrs) { ... }, 
  compile: function compile(tElement, tAttrs, transclude) {
    return {
      pre: function preLink(scope, iElement, iAttrs, controller) { ... }, 
      post: function postLink(scope, iElement, iAttrs, controller) { ... }
    }
  }
}
