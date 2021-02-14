const fetch = require('node-fetch');
const dotenv = require('dotenv');
const {IncomingWebhook} = require('@slack/webhook');
const renderStaticSlackMessage = require('../utils/renderStaticSlackMessage');

dotenv.config();

// Change dataUrl to the request URL that returns the text that changes when appointments are available
const dataURL = 'https://primary-health.net/covid-vaccine-clinic.aspx';
// Change scheduleUrl to the URL where you will go to schedule the appointment
const scheduleURL = 'https://primary-health.net/covid-vaccine-clinic.aspx'
// Change the name of the pharmacy so the notification can tell you what's available
const name = 'Primary Health Network'
// Include the zip code so viewers can decide whether it's too far away
const zip = '(multiple sites)'

const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

const options = {
  "headers": {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "sec-gpc": "1",
    "User-Agent": process.env.USER_AGENT
  },
  "referrer": "https://primary-health.net/covid-vaccine-clinic.aspx",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors"
};

const checkPrimaryHealth = async () => {
  console.log(`Checking ${name} for vaccines...`);
  try {
    (async () => {
      try {
        const response = await fetch(dataURL, options);
        data = await response.text();
        if (!data.includes('Please continue to check this webpage for vaccine and appointment availability.')) {
            console.log(data)
            await webhook.send(renderStaticSlackMessage(scheduleURL, `${name}-${zip}`));
        }
      } catch (e) {
        console.error(e);
      }
    })();
  } catch (e) {
    console.error(e);
  }
};

module.exports = checkPrimaryHealth;
