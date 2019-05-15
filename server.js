var express = require('express');
var app = express();
var exphbs  = require('express-handlebars');
var bodyParser = require('body-parser');
var path = require('path');
var compression = require('compression')
app.use(compression())
var helmet = require('helmet')

// view engine setup
app.engine('.hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
app.set('trust proxy', 1) // trust first proxy


function requireHTTPS(req, res, next) {
  if (!req.secure !== 'https' && process.env.NODE_ENV !== "development") {
    return res.redirect('https://' + req.get('host') + req.url);
  }
  next();
}
app.use(requireHTTPS);
app.use(helmet())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());




//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

require('./app/middleware/routes/index.js')(app);
//
// //routes vars
// //user routes vars
// var userApiRoutes = require('./routes/api/main');

app.listen(3000, () => console.log('Server booting up'));

//sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-ports 3000
//Map port 80 to 3000, redo every restart
