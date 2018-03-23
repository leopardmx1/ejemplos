const express = require('express');
const app = express();

const MongoClient = require('mongodb').MongoClient, assert = require('assert');
const bodyParser = require('body-parser');

var url = 'mongodb://localhost:27017/';

var db;

MongoClient.connect(url, (err, database) => {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    if (err) return console.log(err)
        db = database.db('notas') // nombre de la bd
        app.listen(3000, function() {
            console.log('listening on 3000')
        })
})


// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Pass to next layer of middleware
  next();
});

  app.get('/', (req, res) => {
    res.send('Para acceder a los datos utilice /api/notas')
    //return cursor;
  })

  app.get('/api/notas',(req,res) => {
      var notas = db.collection('notas').find()
      db.collection('notas').find().toArray((err, result) => {
        console.log(result)
        if (err) return console.log(err)
        // renders index.ejs
        res.send(result)
      })
  })

  app.get('/api/nota/:id',(req,res) => {
    var notas = db.collection('notas').find();
    db.collection('notas').find().toArray((err, result) => {
      if (err) return console.log(err)
      // renders index.ejs
      res.send(result);
    })
})