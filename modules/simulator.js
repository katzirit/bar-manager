var _ = require('lodash');
var math = require('mathjs');
var results = [];
var events = [];

var tNow = 0.0
var tableIn = 0;
var table = 0;
var tMax = 0;
var tableMax = 0;
var maxEmployee = 0;
var costumers_per_hour =0       ;
var avg_service_time = 0        ;
var avg_service_div = 0     ;
var tSit = 0.0;

var server = 1;
var wait = 0;
var waitLast = 0;
var line = 0;
var lChange = 0;
var lIn = 0;
var serverLast = 0;
var waitLast = 0.0;
var minWage = 200;

var result_index = 0;
var waitAvg=0;
var serverAVG=0;
var sitAVG=0;

function costumerArrive() {
    costumerArriveCreation();
    if (table < tableMax){
        table++;
        tableIn++;
        if (server>0){
            server --;
            serviceOverCreation();
        }
        else {
            waitAvg=waitAvg + ( tNow - tLast ) * wait
            waitLast = tNow;
            wait++;
        }
    }
    else{
        var i = math.random
        if (i<0.5){
            line++;
            lIn++;
            lChange++;
        } 
      
}

function costumerArriveCreation() {
    var x = math.norm(costumers_per_hour);
    events[index].code_of_event=1;
    events[index].time_of_event=tNow+x;

}

function serviceOver() {
    wait--;
    var i = math.random;
    if (i<0.4){
       result[result_index].beer++;
    }
    else if (i<0.8){
        result[result_index].booz++
    }
    else {
        result[result_index].soft_drinks++;
    }
    i = math.random();
    if (i<0.7){
        if (wait=0){
            serverAVG=serverAVG+(tNow - tMax)*server;
            serverLast=tNow;
            server++;
        }
        else{
            serviceOverCreation();
        }
    }
    else{
        clearTableCreation();
    }
}

function serviceOverCreation() {
    var x = math.exp(avg_service_time);
    events[index].code_of_event=2;
    events[index].time_of_event=tNow+x;
}

function clearTable() {
    table--;
    sitAVG = sitAVG + (tNow - tSit);
    tSit=tNow;
    if (line>0){
        l--;
        lChange++;
    }
}

function clearTableCreation() {
    var x = 0.25;
    events[index].code_of_event=3;
    events[index].time_of_event=tNow+x;
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
  /*   tMax = data.shift_length;
    tableMax = data.table_num;
    maxEmployee = data.num_of_waiters;
    costumers_per_hour = data.costumers_per_hour;
    avg_service_time = data.avg_service_time;
    avg_service_div = data.avg_service_div;
    var result_index = 0;

    results[result_index].push({
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
        var index = 1;
        while (tNow < tMax && table == 0) {

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
           index=index+1;
        }
        results.push({
                avg_line: lIn/lChange,
                avg_service: (waitAvg+sitAVG)/tableIn,
                beer: beer,
                soft_drinks: soft_drinks,
                booz: booz,
                profit:(beer*30+booz*18+soft_drinks*9)-(server*minWage) ,
                employee_efficiency: serverAVG/(tMax*server)
        });
        result_index = result_index + 1;
    }

    return results;
*/

    // Dummy simulator
    _.times(numOfRuns, function() {
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

}
