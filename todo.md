Todo: 

1-5 scale of Priority (5 highest):

4:  Check performance on different devices

4:  Add all the src="*.js" files to the minified/uglified gulp

2:  Scale stock pictures for multiple screen sizes so that users only download the size their devices can use.
      In a Bash terminal:
      sips -Z 800 *.jpg
      for f in *.jpg; do mv "$f" "${f/.jpg/_800.jpg}"; done

1:  Have the gulp add whatever stock images you have automatically so you don't have to name them individually client-side