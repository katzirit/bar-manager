var passport = require('passport'),
    _ = require('lodash'),
    LocalStrategy = require('passport-local').Strategy,
    bcrypt = require('bcrypt-nodejs'),
    User = require('../models').User,
    Group = require('../models').Group;

/**
 * Passport auth
 */
passport.use(new LocalStrategy(function (username, password, done) {
    User.findOne({where: {username: username}}).then(function (user) {
        if (!user) {
            return done(null, false, {message: 'Invalid username or password'});
        }

        if (!bcrypt.compareSync(password, user.password)) {
            return done(null, false, {message: 'Invalid username or password'});
        }

        done(null, user);
    });
}));

passport.serializeUser(function (user, done) {
    done(null, user.username);
});

passport.deserializeUser(function (username, done) {
    User.findOne({
        attributes: ['id', 'GroupId'],
        where: {username: username}
    }).then(function (user) {
        done(null, user);
    });
});

module.exports.authenticated = function (req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({message: 'unauthorized request'});
    }
    next();
};

module.exports.isAllowed = function (groups) {
    return function(req, res, next) {
        if(!_.contains(groups, req.user.GroupId)) {
            return res.status(403).json({message: 'unauthorized'});
        }
        next();
    }
};