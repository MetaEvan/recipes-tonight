app.factory("NewRecipe", [function() {

  let photoBucket = {
    textPhotos: [],
    foodPhotos: [],
  }

  let getBucket = function() {
    return photoBucket;
  }

  let setBucket = function(files, type) {
    photoBucket[type] = files;
  }

  return {
    getBucket,
    setBucket
  }
}]);