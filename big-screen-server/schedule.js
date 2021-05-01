const schedule = require("node-schedule");

var rule1 = new schedule.RecurrenceRule();
var times1 = [1, 6, 11, 16, 21, 26, 31, 36, 41, 46, 51, 56];
rule1.second = times1;
schedule.scheduleJob(rule1, function () {
    console.log("定时执行");
});