app.controller("SearchController", ["$http", "$scope", "Search", "Auth", "$uibModal", "$timeout", "ImageStorage", function($http, $scope, Search, Auth, $uibModal, $timeout, ImageStorage) {
  
  // Sets up some bound default variables
  $scope.find = {};
  $scope.find.onlyOwn = false;
  $scope.searchResults = [];
  $scope.searchingModalInstance = {};
  //**********************************************************


  // Controls logged-in status
  let anonUser = {uid: null, email: "Guest"};
  $scope.currentUser = $scope.currentUser || anonUser;
  $scope.loggedIn = !!$scope.currentUser.uid;

  $scope.$on("userChange", function(event, data) {
    $scope.currentUser = data;
    $scope.loggedIn = !!$scope.currentUser && !!$scope.currentUser.uid;
    console.log("SearchController data,", data.email, `loggedIn ${$scope.loggedIn}`)
  })
  //**********************************************************
  // Modals

  let searchingModal = function() {
    let modalInstance = $uibModal.open({
      // templateUrl: 'myModalContent.html',
      template: "<h2 class='well'>Searching for recipes...</h2>",
      resolve: {
        fullRecipe: function () {
          return $scope.newRecipe;
        }
      },
      backdrop: "static"
    });

    modalInstance.result.then(function (result) {
      console.log('Modal dismissed at: ' + new Date(), result);
    });

    return modalInstance;
  }

  $scope.openRecipeModal = function(recipe) {

  }

  //**********************************************************


  $scope.findRecipes = function(){
    let searchTerms = {
      recipeText: $scope.find.searchText,
      onlyOwn: $scope.find.onlyOwn
    };
    if ($scope.currentUser.uid) {
      searchTerms.uid = $scope.currentUser.uid;
    } else {
      searchTerms.uid = null;
    }

    Search.getRecipes(searchTerms, "/findRecipes", displayRecipes);

    $scope.searchingModalInstance = searchingModal();
  }

  $scope.allRecipes = function(){
    let searchTerms = {
      recipeText: $scope.find.searchText,
      onlyOwn: $scope.find.onlyOwn
    };
    if ($scope.currentUser.uid) {
      searchTerms.uid = $scope.currentUser.uid;
    } else {
      searchTerms.uid = null;
    }

    Search.getRecipes(searchTerms, "/allRecipes", displayRecipes);

    $scope.searchingModalInstance = searchingModal();
  }

  let displayRecipes = function(searchResults) {
    $scope.searchResults = searchResults;
    $scope.searchingModalInstance.close();
  }

  $scope.getTestPicture = function() {
    ImageStorage.getTestPicture();
  }

}]);