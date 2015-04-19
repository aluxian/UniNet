/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var socketIO = require('socket.io');
var passportSocketIo = require('passport.socketio');
var cookieParser = require('cookie-parser');
var compress = require('compression');
var session = require('express-session');
var bodyParser = require('body-parser');
var logger = require('morgan');
var errorHandler = require('errorhandler');
var lusca = require('lusca');
var methodOverride = require('method-override');
var multer  = require('multer');

var _ = require('lodash');
var MongoStore = require('connect-mongo')(session);
var flash = require('express-flash');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var expressValidator = require('express-validator');
var connectAssets = require('connect-assets');

/**
 * Controllers (route handlers).
 */
var homeController = require('./controllers/home');
var feedController = require('./controllers/feed');
var userController = require('./controllers/user');
var contactController = require('./controllers/contact');
var conversationController = require('./controllers/conversation');
var eventsController = require('./controllers/events');
var roomieController = require('./controllers/roomie');
var helpController = require('./controllers/helpOffer');
var bookController = require('./controllers/books');

/**
 * API keys and Passport configuration.
 */
var secrets = require('./config/secrets');
var passportConf = require('./config/passport');

/**
 * Create Express server.
 */
var app = express();

/**
 * Connect to MongoDB.
 */
mongoose.connect(secrets.db);
mongoose.connection.on('error', function() {
  console.error('MongoDB Connection Error. Please make sure that MongoDB is running.');
});

/**
 * Express configuration.
 */
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(compress());
app.use(connectAssets({
  paths: [path.join(__dirname, 'public/css'), path.join(__dirname, 'public/js')]
}));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer({ dest: path.join(__dirname, 'uploads') }));
app.use(expressValidator());
app.use(methodOverride());
app.use(cookieParser());
app.use(session({
  resave: true,
  key: 'express.sid',
  name: 'express.sid',
  saveUninitialized: true,
  secret: secrets.sessionSecret,
  store: new MongoStore({ url: secrets.db, autoReconnect: true })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca({
  csrf: true,
  xframe: 'SAMEORIGIN',
  xssProtection: true
}));
app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});
app.use(function(req, res, next) {
  if (/api/i.test(req.path)) req.session.returnTo = req.path;
  next();
});
app.use(express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 }));

/**
 * Create WS Server.
 */
var server = http.Server(app);
var io = socketIO(server);

io.use(passportSocketIo.authorize({
  cookieParser: cookieParser,
  key: 'express.sid',
  secret: secrets.sessionSecret,
  store: new MongoStore({ url: secrets.db, autoReconnect: true }),
  success: function onAuthorizeSuccess(data, accept) {
    console.log('Successful connection to socket.io');
    accept();
  },
  fail: function onAuthorizeFail(data, message, error, accept) {
    if (error) throw new Error(message);
    console.log('Failed connection to socket.io:', message);
  }
}));

io.on('connection', function(socket) {
  [conversationController].forEach(function(ctrl) {
    if (ctrl.eventHandlers) {
      Object.keys(ctrl.eventHandlers).forEach(function(eventName) {
        socket.on(eventName, ctrl.eventHandlers[eventName].bind({
          socket: socket,
          filterSocketsByUser: passportSocketIo.filterSocketsByUser.bind(passportSocketIo, io),
          io: io
        }));
      });
    }
  });
});

/**
 * Primary app routes.
 */
app.get('/', homeController.index);
app.get('/feed', passportConf.isAuthenticated, feedController.index);
app.post('/feed', passportConf.isAuthenticated, feedController.createPost);
app.get('/conversations/:id', passportConf.isAuthenticated, conversationController.get);
app.get('/conversations', passportConf.isAuthenticated, conversationController.index);
app.get('/events',  passportConf.isAuthenticated, eventsController.index);
app.post('/events', passportConf.isAuthenticated, eventsController.createEvent);
app.get('/help',  passportConf.isAuthenticated, helpController.index);
app.post('/help', passportConf.isAuthenticated, helpController.create);
app.get('/roomie',  passportConf.isAuthenticated, roomieController.getRoomie);
app.get('/books',  passportConf.isAuthenticated, bookController.index);
app.post('/books', passportConf.isAuthenticated, bookController.create);

/**
 * Auth routes.
 */
app.get('/login', userController.getLogin);
app.post('/login', userController.postLogin);
app.get('/logout', userController.logout);
app.get('/forgot', userController.getForgot);
app.post('/forgot', userController.postForgot);
app.get('/reset/:token', userController.getReset);
app.post('/reset/:token', userController.postReset);
app.get('/signup', userController.getSignup);
app.post('/signup', userController.postSignup);
app.get('/contact', contactController.getContact);
app.post('/contact', contactController.postContact);
app.get('/account', passportConf.isAuthenticated, userController.getAccount);
app.post('/account/profile', passportConf.isAuthenticated, userController.postUpdateProfile);
app.post('/account/password', passportConf.isAuthenticated, userController.postUpdatePassword);
app.post('/account/delete', passportConf.isAuthenticated, userController.postDeleteAccount);
app.post('/account/preferences', passportConf.isAuthenticated, userController.postPreferences);

/**
 * Error Handler.
 */
app.use(errorHandler());

/**
 * Start Express server.
*/
server.listen(app.get('port'), function() {
  console.log('Express server listening on port %d in %s mode', app.get('port'), app.get('env'));
});

module.exports = app;
