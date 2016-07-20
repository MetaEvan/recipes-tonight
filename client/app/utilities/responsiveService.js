utilityApp.factory('ResponsiveDetection', ['$window', function ($window) {

  let getBreakpoint = function () {
    var w = $window.innerWidth;
    if (w < 768) {
      return 'xs';
    } else if (w < 992) {
      return 'sm';
    } else if (w < 1200) {
      return 'md';
    } else {
      return 'lg';
    }
  };

  return {
    getBreakpoint
  }
}]);

// inspired by http://stackoverflow.com/questions/18575582/how-to-detect-responsive-breakpoints-of-twitter-bootstrap-3-using-javascript