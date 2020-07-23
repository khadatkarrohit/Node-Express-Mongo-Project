const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;

var mongodb_url = 'mongodb://127.0.0.1:27017/';

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// app.get('/', function (req, res) {
//   res.send('Hello World!');
// });

// server connection
app.listen(3000, function () {
  console.log('Server is running on port 3000 !!!');  
});



MongoClient.connect(mongodb_url, (err, client) => {

    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('project')

    // Get all product endpoints
    app.get("/getAllProduct", (req, res) => {          
      db.collection('category_master').find({},{product: 1, childproduct: 1, _id: 0}).toArray(function (err, result) {
        if (err) {
            res.send(err);
        } else {
          console.log(result);

          res.send(JSON.stringify(result));
        }
      })
    });

  // Get selected product endpoints
  app.get("/getOneProduct", (req, res) => {    
    var searchProduct = req.body.searchString    
    db.collection('category_master').find({product : searchProduct},{product: 1, childproduct: 1, _id: 0}).toArray(function (err, result) {
      if (err) {
          res.send(err);
      } else {
        console.log(result);
        res.send(JSON.stringify(result));
      }
    })
  });


    // Add category endpoints
    app.post("/add_category", (req, res) => {
        console.log("In Category Method : ", req.body);       
        db.collection('category_master').insertMany(req.body, (error, result) => {
            if(error) {
                console.log(error);
                return res.status(500).send(error);
            }
            res.send(result.result);
            console.log("Category Added");
        });
    });

    // Add product endpoints
    app.post("/update_category", (req, res) => {
      console.log("In update_category : ", req.body);       
      db.collection('category_master').findOneAndUpdate({product: req.body.product}, {$set: {product: req.body.updatedProduct}},
       {new: true}, function(err,doc) {
        if (err) { throw err; }
        else {          
          res.send("data updated !!!");
       }
      });
  });  

})



