app.controller('CarouselController', function ($scope) {

  $scope.carouselInterval = 0;
  $scope.active = 2;
  $scope.noWrap = false;
  let imageFiles = [
    "pizza_toppings_1280.jpg",
    "rayburn_stove_1280.jpg",
    "tinned_spaghetti_1280.jpg",
    "prep_flour_eggs_1280.jpg",
    "steak_meal_1280.jpg"
  ];

  $scope.slides = [];

  for (let i = 0; i < imageFiles.length; i++) {
    $scope.slides.push({
      image: "./assets/images/scaled_1280/"+imageFiles[i],
      id: i
    })
  }

});