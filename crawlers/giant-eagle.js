const fetch = require('node-fetch');
const dotenv = require('dotenv');
const {IncomingWebhook} = require('@slack/webhook');
const renderStaticSlackMessage = require('../utils/renderStaticSlackMessage');

dotenv.config();

const dataURL = 'https://sr.reportsonline.com/sr/gianteagle/immunizations';
const scheduleURL = 'https://sr.reportsonline.com/sr/gianteagle/immunizations';
const name = 'Giant Eagle Pharmacy'

const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

const options = {
    "headers": {
      "accept": "*/*",
      "accept-language": "en-US,en;q=0.9",
      "User-Agent": process.env.USER_AGENT
    },
    "referrer": "https://www.gianteagle.com/",
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  };

  const checkGiantEagle = async () => {
    console.log(`Checking ${name} for vaccines...`);
  try {
    (async () => {
      try {
        const response = await fetch(dataURL, options);
        data = await response.text();
        if (!data.includes('There are currently no COVID-19 vaccine appointments available.')) {
            console.log(`${name} content: \n${data}`);
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

module.exports = checkGiantEagle;
