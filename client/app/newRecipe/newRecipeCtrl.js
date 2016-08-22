app.controller("NewRecipeController", ["$scope", "$http", "ImageStorage", "NewRecipe", "$uibModal", "$timeout", function($scope, $http, ImageStorage, NewRecipe, $uibModal, $timeout) {

  // Sets up some bound default variables
  $scope.placeholder = {
    title: "Healthy Peanut Butter Cookies, Grandad's Cajun Gumbo, etc.",
  // Multiline placeholders are not supported everywhere.  Also, IE has a particular bug with this.  Low priority Todo: make a workaround?
    textblockRecipe:  
      "Ingredients:\n" +
      "\t1 cup peanut butter\n" +
      "\t1 egg\n" +
      "Directions:\n" +
      "\tHeat oven to 325F and grease or line a baking tray. Combine all ingredients and stir until smooth. Refrigerate for at least 30 minutes.\n" +
      "\tScoop 1-2 tablespoons of the dough at a time and roll into balls. Place the balls on the baking tray and flatten the tops with a fork.\n" +
      "\tBake for 10-15 minutes, until set and slightly golden brown. Allow to cool for a few minutes before removing to a wire rack.\n" +
      "Makes 12 cookies\n" +
      "Active Time: 20 minutes\n" +
      "Total Time: 50 minutes\n",
    source: "Grandma, http://bembu.com/healthy-peanut-butter-cookie-recipe, myself, etc."
  }

  let initialNewRecipe = {
    title: "",
    ingredients: [],
    recipeText: "",
    totalTime: {
      value: 1,
      unit: "minutes"
    },
    activeTime:  {
      value: 1,
      unit: "minutes"
    },
    public: true,
    photos: {},
    numPhotos: {},
    source: "",
    sourceDomain: "",
    uploadedBy: "",
    dateAdded: 0,
    locationAdded: "",
    inputType: "",
    notes: "",
  };



  $scope.newRecipe = initialNewRecipe;


  //**********************************************************
  // Modals

  let submittingModal = function() {
    let modalInstance = $uibModal.open({
      // templateUrl: 'myModalContent.html',
      template: "<h2 class='well'>Recipe Submitted!</h2>",
      resolve: {
        fullRecipe: function () {
          return $scope.newRecipe;
        }
      },
      backdrop:"static"
    });

    modalInstance.result.then(function (result) {
      console.log('Modal dismissed at: ' + new Date(), result);
    });

    return modalInstance;
  }

  let successModal = function() {
    let modalInstance = $uibModal.open({
      // templateUrl: 'myModalContent.html',
      template: "<h2 class='well'>Recipe Stored Successfully!</h2>",
    });

    $timeout(function() {
      modalInstance.close();
    }, 800)

    return modalInstance;
  }


  //**********************************************************


  // Controls logged-in status
  let anonUser = {uid: null, email: "Guest"};
  $scope.currentUser = $scope.currentUser || anonUser;
  $scope.loggedIn = !!$scope.currentUser.uid;

  $scope.$on("userChange", function(event, data) {
    $scope.currentUser = data;
    $scope.loggedIn = !!$scope.currentUser && !!$scope.currentUser.uid;
    console.log("NewRecipeController data,", data.email, `loggedIn ${$scope.loggedIn}`)
  })
  //**********************************************************

  let displaySuccess = function(urls, submitModalInstance) {
    $scope.newRecipe = initialNewRecipe;
    submitModalInstance.close("displaySuccess success");
    successModal();
    console.log("sucess urls", urls);
  }

  $scope.addRecipe = function() {
    let isPublic = $scope.newRecipe.public;  // Saving value to use after http req
    

    let photoFiles = NewRecipe.getBucket();
    $scope.newRecipe.numPhotos = {
      text: photoFiles.textPhotos.length,
      food: photoFiles.foodPhotos.length,
    };

    $scope.newRecipe.dateAdded = Date.now();

    if ($scope.currentUser && $scope.currentUser.uid) {
      $scope.newRecipe.uploadedBy = $scope.currentUser.uid;
    } else {
      $scope.newRecipe.uploadedBy = "Guest";
    }

    let submitModalInstance = submittingModal();

    console.log($scope.newRecipe, `submitted`);

    $http({
      url: "/addRecipe",
      method: "POST",
      data: $scope.newRecipe
    }).then(function successCallback(res) {
      console.log(`addRecipe response added recipe with docId: ${res.data}`);
      if ($scope.newRecipe.numPhotos.text || $scope.newRecipe.numPhotos.text) {
        return ImageStorage.storePhotos(photoFiles, res.data, isPublic).then(function() {
          displaySuccess(urls, submitModalInstance);
        })
      } else {
        return displaySuccess("no photos", submitModalInstance);
      }
    }, function errorCallback(err) {
      console.log(`Error adding recipe: ${err.data}`)
    })
  }


}]);