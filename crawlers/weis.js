const fetch = require('node-fetch');
const dotenv = require('dotenv');
const {IncomingWebhook} = require('@slack/webhook');
const renderStaticSlackMessage = require('../utils/renderStaticSlackMessage');

dotenv.config();

const dataURL = 'https://c.ateb.com/3f647956b456425d9c12360db8e4fdb4/';
const scheduleURL = dataURL;
const name = 'Weis'
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

const options = {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-US,en;q=0.9",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "sec-gpc": "1",
    "upgrade-insecure-requests": "1"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors"
};

const checkWeis = async () => {
  console.log(`Checking ${name} for vaccines...`);
  try {
    (async () => {
      try {
        const response = await fetch(dataURL, options);
        data = await response.text();
        if (!data.includes('Appointments Full')) {
            console.log(data)
            await webhook.send(renderStaticSlackMessage(scheduleURL, name));
        }
      } catch (e) {
        console.error(e);
      }
    })();
  } catch (e) {
    console.error(e);
  }
};

module.exports = checkWeis;
