var _ = require('lodash');
var math = require('mathjs');
var avg_line = 1;
var avg_service = 1;
var beer = 1;
var soft_drinks = 1;
var booz = 1;
var profit = 1;
var employee_efficiency = 1;
var events = [];
var tmax ;
var tnow ;
var table_num = 0;



module.exports = function (data, numOfRuns) {
    /*
     data.costumers_per_hour
     data.num_of_waiters
     data.table_num
     data.shift_length
     data.avg_service_time
     data.avg_service_time
    */
    tmax = 2;
    var results = [];
    var i =0;
     events.push({
            time: 2.0,
            code: 1
        });

     while (tmax>tnow && table_num==0){
            tnow = events[i].time;
            switch (events[i].code) {
                case 1:
                    costomerArrive();
                    break;
                case 2:
                    serviceEnd();
                    break;
                case 3:
                    clearTable();
                    break;
                
            }
            

     }

    // Dummy simulator
    _.times(numOfRuns, function () {
        results.push({
            avg_line: events[i].time,
            avg_service:events[i].code,
            beer: beer,
            soft_drinks: soft_drinks,
            booz: booz,
            profit: profit,
            employee_efficiency:employee_efficiency
        });
    });

    return results;
};

function costomerArrive() {
   events[0].time = 3;
   beer = 8;
};