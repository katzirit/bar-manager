
var _ = require('lodash'),
    async = require('async'),
    Simulation = require('../models').Simulation,
    User = require('../models').User,
    SimulationResult = require('../models').SimulationResult,
    simulator = require('../modules/simulator');

/**
 *
 * @param req
 * @param res
 */
module.exports.simulations = function (req, res) {
    Simulation.findAll({
        include: User
    }).then(function (simulations) {
        _.each(simulations, function (simulation) {
            simulation.data = JSON.parse(simulation.data);
        });

        res.json(simulations);
    });
};

/**
 *
 * @param req
 * @param res
 */
module.exports.simulationsCreate = function (req, res) {
    // make sure we have all the necessary values in the request body
    if (!req.body.data || !req.body.numOfRuns) {
        return res.status(400).json({info: 'missing required values'});
    }

    // Run the simulation
    var simulationResults = simulator(req.body.data, req.body.numOfRuns);
    if (simulationResults.length === 0) {
        return res.status(400).json({info: 'simulation failed'});
    }

    // convert simulation data to JSON for storage
    req.body.data = JSON.stringify(req.body.data);

    // Create a new user in the database
    Simulation.create(req.body).then(function (simulation) {
        // Associate the newly created user with the group
        simulation.setUser(req.user).then(function () {
            // Add all the simulation results
            async.map(simulationResults, function (result, callback) {
                SimulationResult.create({
                    resultData: JSON.stringify(result)
                }).then(function (simulationResult) {
                    simulationResult.setSimulation(simulation).then(function (simulationResult) {
                        callback(null, simulationResult);
                    }, function (e) {
                        callback(e);
                    });
                }, function (e) {
                    callback(e);
                });
            }, function (err, results) {
                if (err) {
                    return res.status(400).json({info: 'cannot create simulation results'});
                }
                simulation.SimulationResults = results;
                res.json(simulation);
            });
        }, function () {
            res.status(400).json({info: 'cannot associate simulation with user'});
        });
    }, function () {
        res.status(400).json({info: 'cannot create simulation'});
    });
};

/**
 *
 * @param req
 * @param res
 */
module.exports.simulation = function (req, res) {
    req.user.getSimulations({
        where: {id: req.params.id},
        include: [SimulationResult, User]
    }).then(function (results) {
        var simulation = results[0];
        if (!simulation) {
            return res.status(400).json({info: 'cannot find simulation'});
        }

        // Convert Simulation data back to object from JSON
        simulation.data = JSON.parse(simulation.data);

        //
        _.each(simulation.SimulationResults, function (result) {
            result.resultData = JSON.parse(result.resultData);
        });

        res.json(simulation);
    });
};