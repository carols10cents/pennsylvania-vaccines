const express = require('express');
const cron = require('node-cron');
const fetch = require('node-fetch');
const checkWeis = require('./crawlers/weis');
const checkLancaster = require('./crawlers/lancaster');
const checkMacdonalds = require('./crawlers/macdonalds');
const checkPrimaryHealth = require('./crawlers/primary-health');
const checkSeeRight = require('./crawlers/see-right');
const checkAnderson = require('./crawlers/anderson');
const checkChambers = require('./crawlers/chambers');
const checkCNS = require('./crawlers/cns');
const checkGeisinger = require('./crawlers/geisinger');
const checkGiant = require('./crawlers/giant');
const checkBirdsboro = require('./crawlers/birdsboro');
const checkIndependent = require('./crawlers/independent');
const checkRiteAid = require('./crawlers/rite-aid');
const checkGiantEagle = require('./crawlers/giant-eagle');
const checkAdzema = require('./crawlers/adzema');
const checkButlerHealth = require('./crawlers/butlerHealth');

const cronJobInterval = `*/${process.env.MINUTES || 5} * * * *`;

app = express();


app.get('/', function(req, res) {
  res.send('Staying alive.');
});

cron.schedule(cronJobInterval, async () => {
  try {

    console.log(`Checking at ${Date()}.`);
    await checkAdzema();
    await checkButlerHealth();
    await checkPrimaryHealth();
    // await checkGiant();
    await checkRiteAid();
    //await checkWeis();
    //await checkLancaster();
    //await checkMacdonalds();
    //await checkPrimaryHealth();
    //await checkSeeRight();
    //await checkAnderson();
    //await checkChambers();
    //await checkCNS();
    //await checkGeisinger();
    //await checkBirdsboro();
    //await checkIndependent();
    //await checkGiantEagle();
    console.log('Done checking.');
  } catch (error) {
    console.error(error);
  }
});

app.listen(process.env.PORT);
