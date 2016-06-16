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
  if (iterator > 2) return;
  if (typeof(obj) === "object" && obj !== null){
    for (let item in obj){
      console.log(`item = ${item}, obj[item] = ${obj[item]} (type ${typeof(obj[item])}), iterator = ${iterator}`)
      iterator++;
      if (typeof(obj[item]) === "object" && obj[item] !== null) printObj(obj[item], iterator);
      iterator--;
    }
  } else console.log (`Not object, i = ${i}, ${obj}`);
};


var testRecipe = {
  // _id: 1,
  ingredients: ["flour", "water", "yeast", "salt"],
  recipeText: "mix, then bake"
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


var searchDB = function(db, searchObj, col, cb = closeDB, ...args) {
  db.collection(col).find(searchObj).toArray(function(err, result) {
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
  if (typeof(searchTerms) === "string") {
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


var testSearchObj = { "_id": ObjectId("5762df858b5383681afd8f2f") };

// insertNewRecord(null,testRecipe, "recipes", findRecord, testSearchObj, "recipes");
insertNewRecordAndVerify(null,testRecipe, "recipes");

// findRecord(null, {"_id": ObjectId("5762df858b5383681afd8f2f")}, "recipes");
// findRecord(null, testSearchObj, "recipes");
// findRecord(null, {"recipeText": 'mix, then bake'}, "recipes");



