var express = require('express');
var app = express();
var subdomain = require('express-subdomain');
var router = express.Router();
var favicon = require('serve-favicon');
var helmet = require('helmet');
var helmet = require('helmet');
var SocketCluster = require('socketcluster').SocketCluster;



var middlewares = require("./app/middleware/middleware.js");

//app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// var socketCluster = new SocketCluster({
//   workers: 3,
//   brokers: 3,
//   port: 8000,
//   appName: 'tradeApp',
//   workerController: 'worker.js',
//   protocol: 'https',
//   protocolOptions: {
//     key: fs.readFileSync(process.env.KEY_COINIGY, 'utf8'),
//     cert: fs.readFileSync(process.env.SECRET_COINIGY, 'utf8'),
//     passphrase: process.env.SECRET_COINIGY
//   }
// });


app.use(helmet());
app.use(favicon('./public/img/favicon.png'));
app.use("/static", express.static(__dirname + '/public'));




require('./app/controllers/routes/routes.js')(app);


app.listen(process.env.PORT || 8080, process.env.IP);
