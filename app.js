var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var helmet = require('helmet');

var middlewares = require("./app/middleware/middleware.js");


app.set('view engine', 'ejs');


app.use(helmet());
app.use(favicon('./public/img/favicon.png'));
app.use(express.static(__dirname + '/public'));

app.get('/ping', function (req, res) {
  res.send('successfully pinged');
});

app.use(middlewares.prettifyDomain);


require('./app/controllers/routes/routes.js')(app);


app.listen(process.env.PORT || 8080, process.env.IP);