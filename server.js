var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');

var app = express();
app.use(bodyParser.json());

//you will this object values from heroku
massive({
  host: 'ec2-54-83-23-91.compute-1.amazonaws.com',
  port: 5432,
  database: 'd2ro7vhbngrvt2',
  user: 'ggvwfqgbbdzhny',
  password: 'b5f8e9581fbc2258dcc4a6e0ee53d9e86f277adaf1a77740841d1a89d2f03a7c',
  ssl: true
}).then((db) => { //need a promise to get the db 
    // db.getAllInjuries().then((injuries) => { //massive expects folder named db and called it injuries because of the represents what i believe it
    //   console.log(injuries)
    // });    
    app.set('db', db); //set adds a key called 'db' into app
});

// massive() there is some shortcut

var port = 3000;

let getInjuries = (db, res) => {
  db.getAllInjuries().then((injuries) => {
    res.send(injuries);
  })
}

//whenever you changes into the sql files refresh nodemon
// app.get('/injuries', (req, res) => { //app calls .get 2 times
//   app.get('db').getAllInjuries().then((injuries) => { //massive expects folder named db and called it injuries because of the represents what i believe it
//     res.status(200).send(injuries);
//   });  
// });
//Incapsulated the fn--------------------------- 
app.get('/injuries', (req, res) => { 
    getInjuries(app.get('db'), res);
});

app.post('/injuries', (req, res) => {
  var db = app.get('db');
  var injury = [req.body.name, req.body.description, req.body.tth];
  // var injury = ['Crucked finger', 'Moved 2 angle to left', 30];  //start with specific first and after generic !!! teacher says

  db.createInjury(injury).then((response) => {
    // res.send(response) //refresh nodemon because you changed the sql file
    res.send(response)
  });
});


































app.get('/incidents', function(req, res) {
  console.log('GET sighting');
});

app.post('/incidents', function(req, res) {
  console.log('POST sighting');
});

app.listen(port, function() {
  console.log("Started server on port", port);
});
