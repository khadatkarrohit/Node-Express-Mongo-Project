const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
const MongoClient = require("mongodb").MongoClient;
const CONNECTION_URL = '';
const DATABASE_NAME = "project";
var mongoose = require('mongoose')

var mongodb = 'mongodb://127.0.0.1:27017/project';
mongoose.connect(mongodb);

mongoose.Promise = global.Promise;

var db = mongoose.connection;

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

app.listen(3000, function () {

  console.log('Server is running on port 3000 !!!');
  
  db.on('connected', function(){
      console.log("Database connected successfully !!! ")
  })

  db.on('error', function(err){
    console.log("Database connection error: " + err)
   })

 });

