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
var table_max;
var table_in = 0;
var server;
var wait_avg=0;
var wait=0
var wait_last=0;
var l;
var l_in;
var l_change;

function costomerArrive(){
    costomerArriveCreate();
    if (table_num<table_max){
        table_num++;
        table_in++;
        if (server>0){
            server--;
            serviceEndCreate();
        } else {
            wait_avg = wait_avg+(tnow - wait_last)*wait;
            wait_last = tnow;
            wait++;
        }

    } else{
        if (Math.random()>0.5) {
            l++;
            l_in++;
            l_change++;
        }

    }

}

function costomerArriveCreate(){
     events[0].time=3.0;
}


function serviceEnd(){
     events[0].time=3.0;
}

function serviceEndCreate(){
     events[0].time=3.0;
}

function clearTable(){
     events[0].time=3.0;
}

function clearTableCreate(){
     events[0].time=3.0;
}

module.exports = function (data, numOfRuns) {
    /*
     data.costumers_per_hour
     data.num_of_waiters
     data.table_num
     data.shift_length
     data.avg_service_time
     data.avg_service_time
    */
    server = 1;
    tmax = 2;
    tnow=0.0;
    l = 0;
    l_in = 0.0;
    l_change = 0;
    table_max = data.table_num;
    var results = [];
    var i =0;
     events.push({
            time: 1.0,
            code: 1
        });



    while ((tmax>tnow) && (table_num==0)){
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
            i++;
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

