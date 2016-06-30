/**
 * Module dependencies
 */
var express = require('express'),
    bodyParser = require('body-parser'),
    http = require('http'),
    path = require('path'),
    sequelize = require('./models').sequelize,
    models = require('./models'),
    authenticated = require('./modules/authentication').authenticated,
    isAllowed = require('./modules/authentication').isAllowed,
    cookieParser = require('cookie-parser'),
    passport = require('passport'),
    session = require('express-session');
    math = require('mathjs');

var app = module.exports = express();


/**
 * Configuration
 */
app.set('port', proccess.env.PORT || 80);
app.use(bodyParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
    secret: '203D860CE0400AA4087F8CB2CF411F466EC2283A7F1F7E92AEFBD182AF9FC15C',
    cookie: {
        maxAge: 604800 * 1000 // One Week
    },
    resave: true,
    saveUninitialized: true
}));

/**
 * Configure passport
 */
require('./modules/authentication');
app.use(passport.initialize());
app.use(passport.session());

/**
 * API Endpoints
 */
app.get('/api/ref/:reset?', require('./routes/ref').ref);

app.post('/api/auth/login', require('./routes/auth').login);
app.get('/api/auth/logout', authenticated, isAllowed([1, 2]), require('./routes/auth').logout);

app.get('/api/user/me', authenticated, isAllowed([1, 2]), require('./routes/users').me);
app.get('/api/users', authenticated, isAllowed([1]), require('./routes/users').users);
app.put('/api/users', authenticated, isAllowed([1]), require('./routes/users').usersCreate);
app.get('/api/user/simulations', authenticated, isAllowed([1, 2]), require('./routes/users').mySimulations);
app.get('/api/user/:id', authenticated, isAllowed([1]), require('./routes/users').user);
app.post('/api/user/:id', authenticated, isAllowed([1]), require('./routes/users').userEdit);
app.delete('/api/user/:id', authenticated, isAllowed([1]), require('./routes/users').userDelete);
app.get('/api/user/:id/simulations', authenticated, isAllowed([1, 2]), require('./routes/users').userSimulations);

app.get('/api/simulations', authenticated, isAllowed([1]), require('./routes/simulations').simulations);
app.put('/api/simulations', authenticated, isAllowed([1, 2]), require('./routes/simulations').simulationsCreate);
app.get('/api/simulation/:id', authenticated, isAllowed([1, 2]), require('./routes/simulations').simulation);

/**
 * Start Server
 */
var reset_sql = process.argv.indexOf('--sql') !== -1;
models.sequelize.sync({force: reset_sql}).then(function () {
    http.createServer(app).listen(app.get('port'), function () {
        console.log('Express server listening on port ' + app.get('port'));
    });
});
