Todo: 

1-5 scale of Priority (5 highest):

5:  Track down $scope.currentUser and make sure it works everywhere

4:  Landing page has bad-looking bottom on big windows

4:  Simplify CDNs, take from fewer sources, use ES6 modulars to try to take less stuff overall

4:  Check performance on different devices

4:  Add all the src="*.js" files to the minified/uglified gulp

3:  Factor out the $rootScope usages (UID and Current Results)

3:  Change many of the callbacks to promises

3:  Make a plan for CDN failure

2:  Fix the errant scrollbar in the navbar, per https://github.com/angular-ui/bootstrap/issues/5474

2:  Scale stock pictures for multiple screen sizes so that users only download the size their devices can use.
      In a Bash terminal:
      sips -Z 800 *.jpg
      for f in *.jpg; do mv "$f" "${f/.jpg/_800.jpg}"; done

1:  Have the gulp add whatever stock images you have automatically so you don't have to name them individually client-side