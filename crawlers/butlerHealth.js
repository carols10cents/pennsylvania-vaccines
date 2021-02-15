const fetch = require('node-fetch');
const dotenv = require('dotenv');
const {IncomingWebhook} = require('@slack/webhook');
const renderStaticSlackMessage = require('../utils/renderStaticSlackMessage');

dotenv.config();

// Change dataUrl to the request URL that returns the text that changes when appointments are available
const dataURL = 'https://butlerhealth.rsvpify.com/';
// Change scheduleUrl to the URL where you will go to schedule the appointment
const scheduleURL = 'https://butlerhealth.rsvpify.com/'
// Change the name of the pharmacy so the notification can tell you what's available
const name = 'Butler Memorial Hospital (Butler, Clarion, Forest Co)'
// Include the zip code so viewers can decide whether it's too far away
const zip = '16001'

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
  "referrer": "https://butlerhealth.rsvpify.com/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors"
};

const checkButlerHealth = async () => {
  console.log(`Checking ${name} for vaccines...`);
  try {
    (async () => {
      try {
        const response = await fetch(dataURL, options);
        data = await response.text();
        if (data.includes('Select a Time Slot')) {
            console.log(`${name} content: \n${data}`);
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

module.exports = checkButlerHealth;
