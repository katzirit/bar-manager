
var passport = require('passport');

module.exports.login = function (req, res, next) {
    passport.authenticate('local', function (err, user) {
        if (err || !user) {
            return res.status(400).json({info: err && err.message || 'invalid login'});
        }

        return req.logIn(user, function (err) {
            if (err) {
                return res.status(400).json({info: err.message});
            }

            res.redirect('/api/user/me');
        });
    })(req, res, next);
};

module.exports.logout = function (req, res) {
    req.logout();
    res.json({message: 'You are now logged out'});
};