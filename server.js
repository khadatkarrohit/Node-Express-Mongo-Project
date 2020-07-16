const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const CONNECTION_URL = '';
const DATABASE_NAME = "project";
var mongoose = require('mongoose')

var mongodb_url = 'mongodb://127.0.0.1:27017/';
// mongoose.connect(mongodb);

// mongoose.Promise = global.Promise;

// var db = mongoose.connection;

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

// server connection and database connection
app.listen(3000, function () {
  console.log('Server is running on port 3000 !!!');  
});


// db.on('connected', function(){
//     console.log("Database connected successfully !!! ")
// })

// db.on('error', function(err){
//   console.log("Database connection error: " + err)
//  }) 

MongoClient.connect(mongodb_url, (err, client) => {

    if (err) return console.error(err)
    console.log('Connected to Database')
    const db = client.db('project')

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


  })



