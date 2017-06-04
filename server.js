/**
 * Created by danatubul on 02/06/2017.
 */

var express = require('express');
var app = express();
var db = require('./queries.js');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var path = require('path')

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(favicon(path.join(__dirname, '/public', 'favicon.ico')));

app.get('/', function(req, res){
  res.redirect('/index.html');
});

app.post('/addPlayers', db.addPlayers);
app.post('/updateStats', db.updateStats);
app.get('/getStats', db.getStats);

app.listen(3002);