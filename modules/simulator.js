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
var wait=0;
var wait_last=0;
var l;
var l_in;
var l_change;
var server_avg;
var server_last;
var sit_avg;
var tSit;
var costomer_arrive;
var avg_service_time;
var service_div;

function costomerArriveCreate(){
     var u;
     var x;
     u = Math.random();
     x = (-1 / costomer_arrive)*Math.log(1-u);
     var timediv1 = x + tnow;
     events.push({
            time: timediv1,
            code: 1
        });

}

function serviceEndCreate(){
    var u1 = Math.random();
    var u2 = Math.random();
    var x = Math.sqrt(-2 * Math.log(u1)) * Math.Cos((2 * Math.PI()) * u2);
    var myNorm = avg_service_time + Math.sqrt(service_div) * x;
    var timediv = tnow + myNorm;
     events.push({
            time: timediv,
            code: 2
        });
}

function clearTableCreate(){
     var timediv2 = tnow + 0.1;
     events.push({
            time:timediv2,
            code: 3
        });
}


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


function ezer(){
            server_avg = server_avg + (tnow - server_last) * server;
            server_last = tnow;
            server++;
}

function serviceEnd(){
     wait--;
     var disc = Math.random();
     var isStay = Math.random();
     if (disc() < 0.4){
        beer++;
     } else if (disc < 0.8){
        booz++;
     } else {
        soft_drinks++;
     }
     if (isStay <0.7){
        if (wait==0){
            ezer();
        } else{
            serviceEndCreate();
        }
     } else {
        clearTableCreate();
     }

}


function clearTable(){
     table_num--;
     sit_avg = server_avg + (tnow - tSit);
     tSit = tnow;
     if (l>0){
        l--;
        l_change++;
     }

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
    avg_service_time = data.avg_service_time;
    service_div = data.avg_service_div;
    server = data.num_of_waiters;
    tmax = 8;
    tnow=0.0;
    l = 0;
    l_in = 0.0;
    l_change = 0;
    server_avg = 0;
    server_last = 0;
    sit_avg = 0;
    tSit = 0;
    table_max = data.table_num;
    costomer_arrive = data.costumers_per_hour;
    var results = [];
    var i =0;
     events.push({
            time: 0.0,
            code: 1
        });



    while ((tmax>tnow)){
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
            i++;       

     }

    // Dummy simulator
    _.times(numOfRuns, function () {
        results.push({
            avg_line: server,
            avg_service: avg_service,
            beer: beer,
            soft_drinks: soft_drinks,
            booz: booz,
            profit: profit,
            employee_efficiency: employee_efficiency
        });
    });

    return results;
};

