const fetch = require('node-fetch');
const dotenv = require('dotenv');
const {IncomingWebhook} = require('@slack/webhook');
const renderStaticSlackMessage = require('../utils/renderStaticSlackMessage');

dotenv.config();

const dataURL = 'https://api.appointlet.com/bookables/151171/available_times?service=447758';
const scheduleURL = 'https://seerightrx.appointlet.com/'
const name = 'See-Right Pharmacy'
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

const options = {
    "headers": {
      "accept": "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "sec-gpc": "1"
    },
    "referrer": "https://seerightrx.appointlet.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  };

  const checkSeeRight = async () => {
  console.log(`Checking ${name} for vaccines...`);
  try {
    (async () => {
      try {
        const response = await fetch(dataURL, options);
        data = await response.text();
        if (data.toString().trim() !== '[]') {
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

module.exports = checkSeeRight;
