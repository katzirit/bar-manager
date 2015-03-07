
var bcrypt = require('bcrypt-nodejs'),
    _ = require('lodash'),
    User = require('../models').User,
    Group = require('../models').Group,
    Simulation = require('../models').Simulation;

/**
 *
 * @param req
 * @param res
 */
module.exports.users = function (req, res) {
    User.findAll().then(function (results) {
        res.json(results);
    });
};

/**
 * Create a new user in the database
 * If we failed in any step skip the operation and send error
 * @param req
 * @param res
 */
module.exports.usersCreate = function (req, res) {
    // make sure we have all the necessary values in the request body
    if (!req.body.username || !req.body.password || !req.body.group) {
        return res.status(400).json({info: 'missing required values'});
    }

    // Hash password
    req.body.password = bcrypt.hashSync(req.body.password);

    // look for a user with the same username to prevent duplicates
    User.find({where: {username: req.body.username}}).then(function (user) {
        if (user) {
            return res.status(400).json({info: 'username already in use'});
        }

        // Get the group selected from the dropdown
        Group.find({where: {id: req.body.group}}).then(function (group) {
            if (!group) {
                return res.status(400).json({info: 'cannot get group'});
            }

            // Create a new user in the database
            User.create(req.body).then(function (user) {

                // Associate the newly created user with the group
                user.setGroup(group).then(function () {
                    res.json({success: true});
                }, function () {
                    res.status(400).json({info: 'cannot associate user with group'});
                });
            });
        }, function () {
            res.status(400).json({info: 'cannot create user'});
        });
    });
};

/**
 *
 * @param req
 * @param res
 */
module.exports.user = function (req, res) {
    // Get user by :id
    User.find({where: {id: req.params.id}}).then(function (user) {
        if (!user) {
            return res.status(400).json({info: 'cannot find user'});
        }

        res.json(user);
    });
};

/**
 *
 * @param req
 * @param res
 */
module.exports.userEdit = function (req, res) {
    User.find({where: {id: req.params.id}}).then(function (user) {
        if (!user) {
            return res.status(400).json({info: 'cannot find user'});
        }

        user.update(req.body).then(function () {
            res.json({success: true});
        }, function () {
            res.status(400).json({info: 'cannot update user'});
        });
    });
};

/**
 *
 * @param req
 * @param res
 */
module.exports.userDelete = function (req, res) {
    User.find({where: {id: req.params.id}}).then(function (user) {
        if (!user) {
            return res.status(400).json({info: 'cannot find user'});
        }

        user.destroy().then(function () {
            res.json({success: true});
        }, function () {
            res.status(400).json({info: 'cannot delete user'});
        });
    });
};


/**
 *
 * @param req
 * @param res
 */
module.exports.me = function (req, res) {
    User.find({where: {id: req.user.id}}).then(function (user) {
        if (!user) {
            return res.status(400).json({info: 'cannot find user'});
        }

        res.json(user);
    });
};

/**
 *
 * @param req
 * @param res
 */
module.exports.mySimulations = function (req, res) {
    req.user.getSimulations().then(function (results) {
        // Convert Simulation data back to object from JSON
        _.each(results, function (simulation) {
            simulation.data = JSON.parse(simulation.data);
        });

        res.json(results);
    });
};

/**
 *
 * @param req
 * @param res
 */
module.exports.userSimulations = function (req, res) {
    User.find({where: {id: req.params.id}}).then(function (user) {
        user.getSimulations().then(function (results) {
            // Convert Simulation data back to object from JSON
            _.each(results, function (simulation) {
                simulation.data = JSON.parse(simulation.data);
            });

            res.json(results);
        });
    });
};