app.directive('carousel', [function() {
  return {
    restrict: 'E',
    replace: true,
    controller: 'CarouselController',
    controllerAs: 'carousel',
    templateUrl: '/app/landing/carousel/carouselTemplate.html'
  };
}]);