
var Group = require('../models').Group;

var ref;

function updateRefData(callback) {
    ref = {};

    Group.findAll().then(function (groups) {
        ref.groups = groups;

        if (callback) {
            callback();
        }
    });
}

updateRefData();

/**
 *
 * @param req
 * @param res
 */
module.exports.ref = function (req, res) {
    if (req.params.reset) {
        updateRefData(function () {
            res.json(ref);
        });
    } else {
        res.json(ref);
    }
};