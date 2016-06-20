var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;  //Turn on if you need the property explicitly


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
    db.collection("recipes").insertOne(doc, function(err, result) {
      if (err) {
        closeDB(db);
        throw `Error inserting in ${col}: ${err}`;
      }
      let lastEnteredId = doc._id; 
      args.unshift(lastEnteredId, col); // could be useful.
      console.log(`Inserted doc ID: ${lastEnteredId}`);
      console.log("INR args", args);
      cb(db, ...args);
    });
  });
};


var insertNewRecordAndVerify = function(db, doc, col, cb = closeDB, ...args) {
  insertNewRecord(db, doc, col, findRecord);
};


var searchDB = function(db, searchTerms, col, cb = closeDB, ...args) {
  db.collection(col).find(searchTerms).toArray(function(err, result) {
    if (err) {
      closeDB(db);
      throw `Error searching in ${col}: ${err}`;
    } else if (result.length) {
      console.log('Found:', result);
    } else {
      console.log('No document(s) found with defined search criteria!');
    }  
    cb(db, ...args);
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

var updateRecord = function(db, searchTerms, revisedDoc, col, cb = closeDB, ...args) {
  connectDB(function(db) {
    db.collection(col).update(searchTerms, revisedDoc, function (err, success) {
      if (err) {
        closeDB(db);
        throw `Error updating in ${col}: ${err}`;
      } else if (success) {
        console.log('Updated Successfully');
      } else {
        console.log('No document found with defined search criteria!');
      }
      cb(db, ...args);
    });
  });
};



// Different test cases:

var testRecipe = {
  // _id: 1,
  ingredients: ["flour", "water", "yeast", "salt"],
  recipeText: "mix, then bake"
};
var testRecipe2 = {
  // _id: 3,
  ingredients: ["flour", "water", "yeast", "salt"],
  recipeText: "mix, then bake at 350"
};

var testSearchObj = { "_id": ObjectId("576333075f49b7f01d70a122") };
// insertNewRecordAndVerify(null,testRecipe, "recipes");
// findRecord(null, testSearchObj, "recipes");
// updateRecord(null, testSearchObj, testRecipe2, "recipes", findRecord, testSearchObj, "recipes");


// *******************************************************************************
// Todo: Destructure function parameters --function({ stuff, otherStuff})--?
// Todo: Making indices, smarter searching, returning multiple docs
// Todo: Comment better

