var _ = require('lodash');
module.exports = function (data, numOfRuns) {
    /*
     data.costumers_per_hour
     data.num_of_waiters
     data.table_num
     data.shift_length
     data.avg_service_time
     data.avg_service_time
    */
    var results = [];

    // Dummy simulator
    _.times(numOfRuns, function () {
        results.push({
            avg_line: Math.round(Math.random() * 10),
            avg_service: Math.round(Math.random() * 10),
            beer: Math.round(Math.random() * 10),
            soft_drinks: Math.round(Math.random() * 10),
            booz: Math.round(Math.random() * 10),
            profit: Math.round(Math.random() * 10),
            employee_efficiency: Math.round(Math.random() * 10)
        });
    });

    return results;
};