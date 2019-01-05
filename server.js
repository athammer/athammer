var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var compression = require('compression')
app.use(compression())
var exphbs = require('express-handlebars');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
var cookieParser = require('cookie-parser')
var helmet = require('helmet')
var crypto = require('crypto');
var uuid = require('uuid');

let db = require('./db/db');


// view engine setup
app.engine('.hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');
//app.set('trust proxy', 1) // trust first proxy

app.use(helmet())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
//app.use(cookieParser())
//

var myStore = new SequelizeStore({
    db: db
})

app.use(session({
	name: 'sessionId',
    secret: 'keyboard cat',
    store: myStore,
    resave: true,
    saveUninitialized: true,
    genid: function(req) {
      return uuid()
    },
    proxy: false,
    cookie: {
        secure: false,
		httpOnly: false,
		domain: 'buypixels.net',
		path: '/',
		expires: new Date((Date.now() + ((60 * 60/*one hour*/) * 24/*one day*/) * 1000) * 5 ) //
    }
}))

myStore.sync();


//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));


require('./app/middleware/routes/index.js')(app);


//routes vars
//user routes vars
var userApiRoutes = require('./routes/api/users');
var userAuthApiRoutes = require('./routes/api/users/auth');

var botsApiRoutes = require('./routes/api/bots');

//routes
//user routes
app.use('/webAPI/users', userApiRoutes);
app.use('/webAPI/usersAuth', userAuthApiRoutes);
//bot routes
app.use('/webAPI/bots', botsApiRoutes);

app.listen(3000);
