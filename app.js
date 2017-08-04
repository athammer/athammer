var express = require('express');
var app = express();
var subdomain = require('express-subdomain');
var router = express.Router();
var favicon = require('serve-favicon');
var helmet = require('helmet');
var server = require('http').createServer();
var io = require('socket.io')(server);


io.on('connection', function(client){
  client.on('event', function(data){});
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
  client.on('disconnect', function(){});
});




var middlewares = require("./app/middleware/middleware.js");

//app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');





app.use(helmet());
app.use(favicon('./public/img/favicon.png'));
app.use("/static", express.static(__dirname + '/public'));




require('./app/controllers/routes/routes.js')(app);


app.listen(process.env.PORT || 8080, process.env.IP);
