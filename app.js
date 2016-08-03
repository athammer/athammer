var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var helmet = require('helmet');

var middlewares = require("./app/middlewares/middleware.js");


app.set('view engine', 'ejs');


app.use(helmet());
app.use(favicon('./public/img/favicon.png'));
app.use(express.static(__dirname + '/public'));
app.use(middlewares.prettifyDomain)


require('./app/controllers/routes/routes.js')(app);


app.listen(process.env.PORT || 8080, process.env.IP);