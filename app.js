var express = require('express');
var app = express();
var subdomain = require('express-subdomain');
var router = express.Router();
var favicon = require('serve-favicon');
var helmet = require('helmet');
var helmet = require('helmet');
var socketCluster = require('socketcluster');



var middlewares = require("./app/middleware/middleware.js");

//app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


var api_credentials =
  "apiKey"    : process.env.KEY_COINIGY,
  "apiSecret" : process.env.SECRET_COINIGY
}

var options = {
  hostname  : "sc-02.coinigy.com",
  port      : "443",
  secure    : "true"
};

var SCsocket = socketCluster.connect(options);


SCsocket.on('connect', function (status) {

  console.log(status);

  SCsocket.on('error', function (err) {
        console.log(err);
  });


  SCsocket.emit("auth", api_credentials, function (err, token) {

      if (!err && token) {


      } else {
          console.log(err)
      }
  });
});



app.use(helmet());
app.use(favicon('./public/img/favicon.png'));
app.use("/static", express.static(__dirname + '/public'));




require('./app/controllers/routes/routes.js')(app);


app.listen(process.env.PORT || 8080, process.env.IP);
