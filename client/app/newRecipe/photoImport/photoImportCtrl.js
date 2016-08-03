app.controller("PhotoImportController", ["$scope", "ImageStorage", "NewRecipe", function($scope, ImageStorage, NewRecipe) {


  console.log($scope.newRecipe, "$scope.newRecipe");
  $scope.photos = {
    textPhotos: [],
    foodPhotos: [],
  };

  $scope.imageUpload = function(el) {
    const photoSubject = $scope.subject;
    let photoFiles = $scope.photos[photoSubject]
    console.log(photoFiles, "photoFiles", photoSubject, "photoSubject");

    const maxType = {
      textPhotosMax: 6,
      foodPhotosMax: 3,
    };
    const maxMBSize = 2;
    const maxSize = maxMBSize * 1000000;

    let file = el.files[0];
    file.photoSubject = photoSubject;

    // If user cancels photo selection:
    if (!file) return;

    // check for maximum allowable photos for this type
    let maxPhotos = maxType[photoSubject + 'Max'];
    if (photoFiles.length >= maxPhotos) {
      alert (`You can use ${maxPhotos} photos maximum`);  // Todo: add a user-friendly alert
      return;
    }

    let fileType = ImageStorage.getFileType(file.name); //  Possibly overqualified
    if (!fileType.match(/(jpg|jpeg|png|gif)$/)) {
      alert('This file is not an image');                  // Todo: add a user-friendly alert
      return;
    }

    if (file.size > maxSize) {
      alert (`Your photos must be under ${maxMBSize}MB`);  // Todo: add a user-friendly alert
      return;
    }

    let reader = new FileReader();
    reader.onload = function(event){
      $scope.$apply(function() {
        file.imgData = event.target.result
        photoFiles.push(file);
        NewRecipe.setBucket(photoFiles, photoSubject);
      });
    }; 
    reader.readAsDataURL(file);
  };

  $scope.movePhoto = function(index, direction) {
    let arr = $scope.photos[$scope.subject];

    if (!arr[index + direction]) return;

    let temp =arr[index];
    arr[index] = arr[index + direction];
    arr[index + direction] = temp;

    NewRecipe.setBucket(arr, $scope.subject);
  };

}]);