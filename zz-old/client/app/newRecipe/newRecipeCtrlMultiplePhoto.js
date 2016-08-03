app.controller("NewRecipeController", ["$scope", "$http", "ImageStorage", function($scope, $http, ImageStorage) {

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

  $scope.newRecipe = {
    title: "",
    ingredients: [],
    recipeText: "",
    totalTime: 0,
    activeTime: 0,
    public: true,
    source: "",
    sourceDomain: "",
    uploadedBy: "",
    dateAdded: 0,
    locationAdded: "",
    inputType: "",
    notes: "",
  };

  $scope.photos = [];
  $scope.photoNames = "";
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

  $scope.titleForm = ""





  console.log("NewRecipeController running.");


  // let checkInputType = function() {
  //   switch ($scope.recipeInputType) {
  //     case 0:
  //       $scope.newRecipe.inputType = "annotated";
  //       break;
  //     case 1:
  //       $scope.newRecipe.inputType = "pictures"
  //       break;
  //     case 2:
  //       $scope.newRecipe.inputType = "website"
  //       break;
  //     case 3:
  //       $scope.newRecipe.inputType = "textblock"
  //       break;
  //     default:
  //       console.log ("Input type tab error");
  //   }
  // }


  // Based on http://luxiyalu.com/angular-all-about-inputfile/
  $scope.imageUpload = function(el, isRecipeText) {
    let photos = $scope.photos;
    let dupeFlag = false;
    let maxPhotos = 6;
    let numPhotos = el.files.length + photos.length;

    if (numPhotos > maxPhotos) {
      alert (`You can use ${maxPhotos} photos maximum`);  // Todo: add a user-friendly alert
      return;
    }


    for (let i = 0; i < el.files.length; i++) {

      ImageStorage.getFileType(el.files[i].name); // Todo: turn this into a image type check

      // Disallow duplicates
      for (let j = 0; j < photos.length; j++) {
        if (el.files[i] === photos[j]) {
          dupeFlag = true;
          numPhotos--;
        }
      }
      if (dupeFlag) {
        dupeFlag = false;
        continue;
      }

      let reader = new FileReader();
      reader.onload = function(event){
        $scope.$apply(function() {
          photos.push(event.target.result);
          console.log(photos)
          if (photos.length === numPhotos) {
            $scope.photos = photos;
          }
        });
      }; 
      reader.readAsDataURL(el.files[i]);

    }
  }

  let sortPhotos = function(arr) {
    arr.sort(function(a,b){
      return a.name.localeCompare(b.name);
    })
  }


  let uploadPhotos = function(index) {
    ImageStorage.uploadPhotos($scope.photos);
  }

  $scope.addRecipe = function() {

    // checkInputType();

    $scope.newRecipe.dateAdded = Date.now();

    if ($scope.currentUser && $scope.currentUser.uid) {
      $scope.newRecipe.uploadedBy = $scope.currentUser.uid;
    } else {
      $scope.newRecipe.uploadedBy = "Anon00000000000000000001";
    }

    alert("Recipe Submitted!");  // Todo: switch this out for an appropriate reset()
    console.log($scope.newRecipe, `submitted`);

    $http({
      url: "/addRecipe",
      method: "POST",
      data: $scope.newRecipe
    }).then(function successCallback(res) {
      console.log(`addRecipe response added recipe with docId: ${res.data}`);
    }, function errorCallback(err) {
      console.log(`Error adding recipe: ${err.data}`)
    })
  }


}]);