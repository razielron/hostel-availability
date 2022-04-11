const CronJob = require('cron').CronJob;
const { spawn } = require("child_process");

let defaultMin = process.env.CRON_MIN_START || '0';
defaultMin = 56
let cronTime = `0 ${defaultMin} */1 * * *`;
console.log({ cronTime });
printCurrentTime();

let job = new CronJob(cronTime, function() {
    console.log("@@@@@ RUN STARTED @@@@@");
    console.log(process.platform);

    let isWin = process.platform.includes('win');
    let cmd = isWin ? 'npm.cmd' : 'npm';
    let runAutomation = 'wdio';
    
    const automation = spawn(cmd, ['run', runAutomation]);

    automation.stdout.on('data', (data) => {
      console.log(`${data}`);
    });

});

function printCurrentTime() {
  let currentdate = new Date(); 
  let datetime = "Current Mechine Time: " + currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/" 
    + currentdate.getFullYear() + " @ "  
    + currentdate.getHours() + ":"  
    + currentdate.getMinutes() + ":" 
    + currentdate.getSeconds();

  console.log({ datetime });
}

console.log("CRON STARTED");
job.start();