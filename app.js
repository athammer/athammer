var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var helmet = require('helmet');


app.set('view engine', 'ejs');


app.use(helmet());
app.use(favicon('./public/img/favicon.png'));
app.use(express.static(__dirname + '/public'));


require('./app/controllers/routes/routes.js')(app);


app.listen(process.env.PORT || 8080, process.env.IP);