var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;  


var dbUrl = `mongodb://${process.env.mLabUser}:${process.env.mLabPW}@ds025973.mlab.com:25973/rtdb`;


var connectDB = function(cb = closeDB) {
  MongoClient.connect(dbUrl, function(err, db) {
    if (err) {
      throw `Error connecting to DB: ${err}`;
    }
    console.log("Connected correctly to Mongo server.");
    cb(db);
  });
};


var closeDB = function(db) {
  db.close;
  console.log("Database closed");
};

// Helper to view objects displayed in console logs to terminal.
// Obviously brute forced and not optimized, but still useful
var printObj = function(obj, iterator = 1) {
  console.log("iterator = " + iterator)
  if (iterator > 3) return;
  if (typeof(obj) === "object" && obj !== null){
    for (let item in obj){
      console.log(`item = ${item}, obj[item] = ${obj[item]} (type ${typeof(obj[item])}), iterator = ${iterator}`)
      iterator++;
      if (typeof(obj[item]) === "object" && obj[item] !== null) printObj(obj[item], iterator);
      iterator--;
    }
  } else console.log (`Not object, i = ${i}, ${obj}`);
};



var insertNewRecord = function(db, doc, col, cb = closeDB, ...args) {
  connectDB(function(db) {
    console.log(`doc, ${doc}, col, ${col}`);
    db.collection(col).insertOne(doc, function(err, result) {
      if (err) {
        closeDB(db);
        throw `Error inserting in ${col}: ${err}`;
      }
      console.log(doc)
      if (!doc) throw `Error inserting in ${col}`;
      let lastEnteredId = doc._id; 
      args.unshift(lastEnteredId, col); // could be useful.
      console.log(`Inserted new ${col} ID: ${lastEnteredId}`);
      console.log("INR args", args);
      cb(db, ...args);
    });
  });
};


var addRecipe = function(doc, cb = closeDB) {
  insertNewRecord(null, doc, "recipes", function(db, docId) {
    if (docId) {
      let userId = doc.uploadedBy;
      console.log(`In addRecipe, userId is ${userId}`);
      addRecipeIdToUser(db, userId, docId, cb);
    } else {
      console.log(`Error adding recipe`);
      closeDB(db);
    }
  });
}

var addRecipeIdToUser = function(db, userId, docId, cb = closeDB) {
  let userIdObj = { _id: userId };
  let revision = {
    $currentDate: { lastModified: true },
    $addToSet: { recipes: docId },
    $inc: { totalActions: 1 },
    $setOnInsert: { dateAdded: Date.now() }
  };
  let options = { 
    update: true,
    new: true,
    upsert: true
  };
  let sort = [];
  findAndModDB(db, userIdObj, sort, revision, options, "users", cb);
}



var searchDB = function(db, searchTerms, col, cb = closeDB, ...args) {
  db.collection(col).find(searchTerms).toArray(function(err, result) {
    if (err) {
      closeDB(db);
      throw `Error searching in ${col}: ${err}`;
    } else if (result.length) {
      console.log('searchDB found:', result);
    } else {
      console.log('No document(s) found with defined search criteria!');
    }  
    cb(db, result, ...args);
  });
};


var findRecord = function(db, searchTerms, col, cb = closeDB, ...args) {
  if (typeof(searchTerms) === "string") {  //should only trigger if looking for document id
    searchTerms = {"_id":ObjectId(searchTerms)};
  }
  console.log("findRecord searchTerms: ", searchTerms);
  if (db) {
    searchDB(db, searchTerms, col, cb, ...args);
  } else {
    connectDB(function(db) {
      searchDB(db, searchTerms, col, cb, ...args);
    });
  }
};

var updateDB = function(db, searchTerms, revision, col, cb = closeDB, ...args) {
  db.collection(col).update(searchTerms, revision, function (err, success) {
    if (err) {
      closeDB(db);
      throw `Error updating in ${col}: ${err}`;
    } else if (success) {
      console.log(`Updated ${searchTerms} in ${col} successfully`);
    } else {
      console.log(`Error: ${searchTerms} in ${col} not found`);
    }
    cb(db, ...args);
  });
};

var findAndModDB = function(db, query, sort, revision, options, col, cb = closeDB, ...args) {
  db.collection(col).findAndModify(query, sort, revision, options, function (err, results) {
    console.log(`results in F&findAndModDB, ${results.value}`);
    if (err) {
      closeDB(db);
      throw `Error updating in ${col}: ${err}`;
    } else if (results) {
      console.log(`Updated ${results.value._id} in ${col} successfully`);
    } else {
      console.log(`Error: ${query} in ${col} not found`);
    }
    args.unshift(results.value);
    cb(db, ...args);
  });
};



var updateRecord = function(db, searchTerms, revision, col, cb = closeDB, ...args) {
  if (typeof(searchTerms) === "string") {  //should only trigger if looking for document id
    searchTerms = {"_id":ObjectId(searchTerms)};
  }
  if(db) {
    updateDB(db, searchTerms, revision, col, cb, ...args);
  } else {                                  // Todo: Probably can delete this branch later.  
    connectDB(function(db) {
      updateDB(db, searchTerms, revision, col, cb, ...args);
    });
  }
};

// For use to create users client-side, instead of when their first recipe is posted, as happens now.

// var addUser = function(db, userDoc, cb) {
//   if (!userDoc._id) {
//     userDoc._id = ObjectId(userDoc.uid)
//   }
//   insertNewRecord(db, userDoc, "users", cb);
// }

// var reviseUser = function(db, userId, revisedUserDoc, cb) {
//   if (!userDoc._id) {
//     userDoc._id = ObjectId(userDoc.uid)
//   }
//   updateRecord(db, userId, revisedUserDoc, "users", cb);
// }



// app.post("/addRecipe", function(req, res) {
//   console.log(`Post addRecipe data: ${req.data}, body: ${req.body}`);
//   mongodb.insertNewRecord(null, req.body, "recipes", function(db = null, recipeId) {
//     res.status(201).send(recipeId);
//     console.log(recipeId);
//   })
// });

// Different test cases:

var testRecipe = {
  // _id: 1,
  ingredients: ["flour", "water", "yeast", "salt"],
  recipeText: "mix, then bake"
};
var testRecipe2 = {
  // _id: 3,
  ingredients: ["flour", "water", "yeast", "salt"],
  recipeText: "mix, wait, then bake at 350",
  dateAdded: Date.now(),
  uploadedBy: "416e6f6e3030303030303034"
};

var testRecipe3 = {
  // _id: 3,
  ingredients: ["peanut butter", "bread"],
  recipeText: "spread pb on bread",
  dateAdded: Date.now(),
  uploadedBy: "416e6f6e3030303030303034"
};

var testSearchObj = { "_id": ObjectId("576333075f49b7f01d70a122") };

var userSchema = {
    email: "",
    _id: "",
    name: "",
    dateModified: 0,
    totalActions: 0,
    recipes: [],
    dateAdded: 0,
    locationAdded: "",
  }
// insertNewRecord(null,testRecipe, "recipes", findRecord);
// findRecord(null, testSearchObj, "recipes");
// updateRecord(null, testSearchObj, testRecipe2, "recipes", findRecord, testSearchObj, "recipes");
// addRecipeIdToUser(null, "416e6f6e3030303030303034", "57717577fe2c61b854773f9e");
// addRecipe(testRecipe2);
// addRecipe(testRecipe2, function(){ addRecipe(testRecipe3) });

// *******************************************************************************
// Todo: Destructure function parameters --function({ stuff, otherStuff})--?
// Todo: Making indices, smarter searching, returning multiple docs
// Todo: Who can edit whose docs? --Add security.
// Todo: Comment better


module.exports = {
  insertNewRecord,
  findRecord,
  updateRecord,
  addRecipe,
  closeDB
};