utilityApp.factory('ImageStorage', ['$window', 'Auth', 'Utility', function ($window, Auth, Utility) {

  // Get a reference to the storage service, which is used to create references in your storage bucket
  let storage = firebase.storage();

  // Create a storage reference from our storage service
  let storageRef = storage.ref();


  let addPhotoMetadata = function (photo, isPublic, isThumb, index, photoSubject, recipeId) {

    photo.metadata = photo.metadata || {};
    photo.metadata.uploadedBy = Auth.$getAuth().uid;   // sync method
    photo.metadata.recipeId = recipeId;
    photo.metadata.restriction = isPublic ? "public" : "private";
    photo.metadata.photoSubject = photoSubject;
    photo.metadata.size = isThumb ? "thumb" : "full";
    photo.metadata.name = photoSubject + index + "." + Utility.getFileType(photo.name);  // Seems dangerous for collisions on updates.  Todo: fix this.  Add date.now?
    return photo;
  }


  let storePhotos = function(photoBucket, recipeId, isPublic) {
    let isThumb = false;  // Todo: change this when implementing thumbnails
    let allPhotos = [];

    // Give each photo a custom name and its recipeId.  Then push it into an array.
    for (let key in photoBucket) {
      for (let i = 0; i < photoBucket[key].length; i++) {
        let finishedFile = addPhotoMetadata(photoBucket[key][i], isPublic, isThumb, i, key, recipeId)
        allPhotos.push(finishedFile);
      }
    }

    return Promise.all(allPhotos.map(uploadPhoto)).then(function(urlArray) {

      console.log("URLs are", urlArray);
      return urlArray;            
    }).catch(error => {
      console.error('Error while uploading new pic', error);
    });
  }


  let uploadPhoto = function(file) {

    let md = file.metadata;
    let fbmd = {
      customMetadata: md
    };

    // let userPath = 'users/' + Auth.$getAuth().uid + '/' + md.size + '-images/' + md.photoSubject + '/' + md.name;  
    let recipePath = 'recipes/' + md.restriction + '/' + md.recipeId + '/' + md.size + '-images/' + md.photoSubject + '/' + md.name;

    // Upload file and metadata to the path;
    let uploadTask = storageRef.child(recipePath).put(file, fbmd);

    console.log("uploadTask", uploadTask);


    return new Promise(function(resolve, reject) {
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused');
              break;
            case firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running');
              break;
          }
        }, function(error) {
        switch (error.code) {
          case 'storage/unauthorized':
            // User doesn't have permission to access the object
            break;

          case 'storage/canceled':
            // User canceled the upload
            break;

          case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
            break;
          default:
            // Other
            break;
        }
        reject(error);
      }, function() {
        // Upload completed successfully, now we can get the download URL
        let downloadURL = uploadTask.snapshot.downloadURL;
        let resolvedMetadata = uploadTask.snapshot.metadata.customMetadata;
        console.log("downloadURL", downloadURL)

        resolve({
          downloadURL, 
          metadata: resolvedMetadata
        });
      });
    });


  }
  
  // gs://recipes-tonight.appspot.com/recipes/public/57a154509a85f35b02c2975c/full-images/textPhotos/
  // let retrievePhotos = function(recipe) {
  //   let size = full;  // Todo: change for thumb cases?
  //   let restriction = recipe.public ? "public" : "private";
  //   let textPhotoPath = 'gs://recipes-tonight.appspot.com/recipes/' + restriction + '/' + recipe.id + '/' + size + '-images/textPhotos/text';
  //   let foodPhotoPath = 'gs://recipes-tonight.appspot.com/recipes/' + restriction + '/' + recipe.id + '/' + size + '-images/foodPhotos/food';
  //   if (recipe.numPhotos.text){
  //     for (let i = 0; i < recipe.numPhotos.text; i++) {
  //       var gsReference = storage.refFromURL(textPhotoPath + i + ".jpg")
  //     }
  //   }
  // }

  let retrievePhotos = function(recipe) {
    let photos = {
      text: [],
      food: []
    }
    if (!recipe.numPhotos) return {err:"file storage error"};  // Todo: delete after resetting db?

    let size = "full";  // Todo: change for thumb cases?
    let restriction = recipe.public ? "public" : "private";
    let textPhotoPath = 'gs://recipes-tonight.appspot.com/recipes/' + restriction + '/' + recipe.id + '/' + size + '-images/textPhotos/text';
    let foodPhotoPath = 'gs://recipes-tonight.appspot.com/recipes/' + restriction + '/' + recipe.id + '/' + size + '-images/foodPhotos/food';
    
    if (recipe.numPhotos.text){
      for (let i = 0; i < recipe.numPhotos.text; i++) {
        photos.text.push(storage.refFromURL(textPhotoPath + i + ".jpg"));
      }
    }
    if (recipe.numPhotos.food){
      for (let i = 0; i < recipe.numPhotos.food; i++) {
        photos.food.push(storage.refFromURL(foodPhotoPath + i + ".jpg"));
      }
    }
    return photos;
  }

  let getTestPicture = function(cb) {
    let url = "gs://recipes-tonight.appspot.com/recipes/public/57a154509a85f35b02c2975c/full-images/textPhotos/textPhotos0.jpg"
    var gsReference = storage.refFromURL(url);
    console.log(gsReference);
    return gsReference;
  }

  return {
    addPhotoMetadata,
    storePhotos,
    retrievePhotos,
    getTestPicture,
  }

}]);

  // From https://github.com/firebase/friendlypix/blob/master/web/scripts/firebase.js#L449
  /**
   * Uploads a new Picture to Firebase Storage and adds a new post referencing it.
   * This returns a Promise which completes with the new Post ID.
   */
  // uploadNewPic(pic, thumb, fileName, text) {
  //   // Start the pic file upload to Firebase Storage.
  //   const picRef = this.storage.ref(`${this.auth.currentUser.uid}/full/${Date.now()}/${fileName}`);
  //   const metadata = {
  //     contentType: pic.type
  //   };
  //   var picUploadTask = picRef.put(pic, metadata).then(snapshot => {
  //     console.log('New pic uploaded. Size:', snapshot.totalBytes, 'bytes.');
  //     var url = snapshot.metadata.downloadURLs[0];
  //     console.log('File available at', url);
  //     return url;
  //   }).catch(error => {
  //     console.error('Error while uploading new pic', error);
  //   });

  //   // Start the thumb file upload to Firebase Storage.
  //   const thumbRef = this.storage.ref(`${this.auth.currentUser.uid}/thumb/${Date.now()}/${fileName}`);
  //   var tumbUploadTask = thumbRef.put(thumb, metadata).then(snapshot => {
  //     console.log('New thumb uploaded. Size:', snapshot.totalBytes, 'bytes.');
  //     var url = snapshot.metadata.downloadURLs[0];
  //     console.log('File available at', url);
  //     return url;
  //   }).catch(error => {
  //     console.error('Error while uploading new thumb', error);
  //   });

  //   return Promise.all([picUploadTask, tumbUploadTask]).then(urls => {
  //     // Once both pics and thumbanils has been uploaded add a new post in the Firebase Database and
  //     // to its fanned out posts lists (user's posts and home post).
  //     const newPostKey = this.database.ref('/posts').push().key;
  //     const update = {};
  //     update[`/posts/${newPostKey}`] = {
  //       full_url: urls[0],
  //       thumb_url: urls[1],
  //       text: text,
  //       timestamp: firebase.database.ServerValue.TIMESTAMP,
  //       full_storage_uri: picRef.toString(),
  //       thumb_storage_uri: thumbRef.toString(),
  //       author: {
  //         uid: this.auth.currentUser.uid,
  //         full_name: this.auth.currentUser.displayName,
  //         profile_picture: this.auth.currentUser.photoURL
  //       }
  //     };
  //     update[`/people/${this.auth.currentUser.uid}/posts/${newPostKey}`] = true;
  //     update[`/feed/${this.auth.currentUser.uid}/${newPostKey}`] = true;
  //     return this.database.ref().update(update).then(() => newPostKey);
  //   });
  // }