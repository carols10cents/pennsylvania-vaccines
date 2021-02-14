const fetch = require('node-fetch');
const dotenv = require('dotenv');
const {IncomingWebhook} = require('@slack/webhook');
const renderStaticSlackMessage = require('../utils/renderStaticSlackMessage');

dotenv.config();

// Change dataUrl to the request URL that returns the text that changes when appointments are available
const dataURL = 'https://example.com';
// Change scheduleUrl to the URL where you will go to schedule the appointment
const scheduleURL = 'https://example.com'
// Change the name of the pharmacy so the notification can tell you what's available
const name = 'Example Pharmacy'

const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

// Change the options to match the output of browser dev tools `Copy as Node.js fetch` for the corresponding request
const options = {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "sec-gpc": "1",
      "x-requested-with": "XMLHttpRequest",
      "cookie": "",
      "User-Agent": process.env.USER_AGENT
    },
    "referrer": "https://example",
    "referrerPolicy": "same-origin",
    "body": "",
    "method": "POST",
    "mode": "cors"
  };

  const checkExample = async () => {
    console.log(`Checking ${name} for vaccines...`);
  try {
    (async () => {
      try {
        const response = await fetch(dataURL, options);
        data = await response.text();
        // Change the following text to match the "unavailable" message from the website
        if (!data.includes('No times are available in the next month')) {
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

module.exports = checkExample;
