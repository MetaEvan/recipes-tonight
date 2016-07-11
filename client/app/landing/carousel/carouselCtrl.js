app.controller('CarouselController', function ($scope) {

  let mainImage = 2;

  $scope.carouselInterval = 1000;
  $scope.active = mainImage;
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
    let slide = {
      image: "./assets/images/scaled_1280/"+imageFiles[i],
      id: i
    }
    if (i === mainImage) { 
      slide.title = "Recipes Tonight!"
      slide.subtitle = "Browse recipes, store your own, and find them when you want to make something tonight!"
    }
    $scope.slides.push(slide)
  }

});