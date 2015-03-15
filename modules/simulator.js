var _ = require('lodash');
var results = [];
var events = [];
var tMax = data.shift_length;
var tNow = 0.0
var tableIn = 0;
var table = 0;
var tableMax = data.table_num;
var tSit = 0.0;
var maxEmployee = data.num_of_waiters;
var server = 1;
var wait = 0;
var line = 0;
var lChange = 0;
var lIn = 0;
var serverLast = 0;
var waitLast = 0.0;
var minWage = 200;
var costumers_per_hour = data.costumers_per_hour;
var avg_service_time = data.avg_service_time;
var avg_service_div = data.avg_service_div;
var result_index = 0;

function costumerArrive() {
    costumerArriveCreation();
    if (table < tableMax){
        
    }
}

function costumerArriveCreation() {

}

function serviceOver() {

}

function serviceOverCreation() {

}

function clearTable() {

}

function clearTableCreation() {

}


module.exports = function(data) {
    /*
     data.costumers_per_hour
     data.num_of_waiters
     data.table_num
     data.shift_length
     data.avg_service_time
     data.avg_service_time
    */

    results.push({
        avg_line: 0,
        avg_service: 0,
        beer: 0,
        soft_drinks: 0,
        booz: 0,
        profit: 0,
        employee_efficiency: 0.0
    });
    events.push({
        time_of_event: 0.0,
        code_of_event: 1,
    });

    for (server = 0; server == maxEmployee; server++) {
        var index = 0;
        while (tNow < tMax && table = 0) {
            switch (events[index].code_of_event) {
                case 1:
                    costumerArrive();
                    break;
                case 2:
                    serviceOver();
                    break;
                case 3:
                    clearTable();
                    break;
            }
            index++;
            result_index = 0++;


        }
    }

    return results;


    // Dummy simulator
/*    _.times(numOfRuns, function() {
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

    return results;*/
};
