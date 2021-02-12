const express = require('express');
const cron = require('node-cron');
const fetch = require('node-fetch');

const cronJobInterval = '*/1 * * * *';

app = express();


app.get('/', function(req, res) {
  res.send('Staying alive.');
});

cron.schedule(cronJobInterval, async () => {
  try {

  } catch (error) {
    console.error(error);
  }
});

app.listen(process.env.PORT);
