app.factory("Search", ["$http", "$state", function($http, $state) {



  let getRecipes = function(searchTerms, url = "/findRecipes", cb) {
    $http({
      url: url,
      method: "POST",
      data: searchTerms
    }).then(function(res) {
      console.log(`findRecipes response:`, res.data);
      cb(res.data);
    }, function(err) {
      console.log(`Error finding recipes:`, err.data)
    })
    console.log(searchTerms, "Submitted");
  }

  return {
    getRecipes
  }
}]);