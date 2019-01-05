var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

module.exports = function (app) { //need to export for app.js to find it

    app.get('/', function (req, res) {
        res.render('pages/home');
    });

    app.get('*', function(req, res){
        res.send('404', 404);
    });
};
