// const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/fruitDB", {
  useNewUrlParser: true
}, {
  useUnifiedTopology: true
});

//create mongoose schema
const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified"]
  },
  // rating: Number,
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

//create mongoose model
const Fruit = mongoose.model("Fruit", fruitSchema);

//create new document (record)
const fruit = new Fruit({
  name: "Apple",
  rating: 100,
  review: "They're pretty solid"
});

//fruit.save();

// const kiwi = new Fruit({
//   name: "Kiwi",
//   rating: 4,
//   review: "Never had one"
// });
//
// const banana = new Fruit({
//   name: "Banana",
//   rating: 10,
//   review: "Good fruit"
// });

// Fruit.insertMany([apple, kiwi, banana], function(err){
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully saved all the fruit in fruitDB");
//   }
// });


//Read from the Database

Fruit.find(function(err, fruits) {
  if (err) {
    console.log(err);
  } else {

    mongoose.connection.close();

    fruits.forEach(function(fruit) {
      console.log(fruit.name);
    });
  };
});

//update
// Fruit.updateOne({
//   _id: "6033bcb6efda1748845cdc49"
// }, {
//   name: "Peach"
// },
// function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully updated the document");
//   }
// }
// );

//delete
// Fruit.deleteOne({
//   _id: "6033bcb6efda1748845cdc49"
// }, {
//   name: "Peach"
// },
// function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted the document");
//   }
// }
// );


const peopleSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFruit: fruitSchema
});

//create mongoose model
const People = mongoose.model("People", peopleSchema);

const pineapple = new Fruit({
  name: "Pineapple",
  score: 9,
  review: "Great fruit."
});

pineapple.save();

//create new document (record)
const people = new People({
  name: "Amy",
  age: 12,
  favoriteFruit: pineapple
});

//people.save();

//delete
// People.deleteOne({
//   _id: "6033e829155cf94d8c22b6a3"
// },
// function(err) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("Successfully deleted the document");
//   }
// }
// );


// // Connection URL
// const url = 'mongodb://localhost:27017';
//
// // Database Name
// const dbName = 'fruitsDB';
//
// // Create a new MongoClient
// const client = new MongoClient(url, {
//   useUnifiedTopology: true
// });
//
// // Use connect method to connect to the Server
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("Connected successfully to server");
//
//   const db = client.db(dbName);
//
//   findDocuments(db, function() {
//       client.close();
//     });
// });

// const insertDocuments = function(db, callback) {
//   // Get the documents collection
//   const collection = db.collection('fruits');
//   // Insert some documents
//   collection.insertMany([{
//     name: "Apple",
//     score: 8,
//     review: "Great Fruit!"
//   }, {
//     name: "Orange",
//     score: 6,
//     review: "Kinda Sour"
//   }, {
//     name: "Banana",
//     score: 9,
//     review: "Great stuff!"
//   }], function(err, result) {
//     assert.equal(err, null);
//     assert.equal(3, result.result.n);
//     assert.equal(3, result.ops.length);
//     console.log("Inserted 3 documents into the collection");
//     callback(result);
//   });
// }

const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('fruits');
  // Find some documents
  collection.find({}).toArray(function(err, fruits) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits)
    callback(fruits);
  });
}
