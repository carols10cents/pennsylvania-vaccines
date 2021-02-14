const fetch = require('node-fetch');
const dotenv = require('dotenv');
const {IncomingWebhook} = require('@slack/webhook');
const renderStaticSlackMessage = require('../utils/renderStaticSlackMessage');

dotenv.config();

const dataURL = 'https://birdsboropharmacy.youcanbook.me/service/jsps/cal.jsp?cal=7d7b469d-297e-4220-b6d4-44c64f22871d&ini=1613105473250&service=jsid259030';
const scheduleURL = 'https://birdsboropharmacy.youcanbook.me/service/jsps/cal.jsp?cal=7d7b469d-297e-4220-b6d4-44c64f22871d&ini=1613105473250&service=jsid259030'
const name = 'Birdsboro Pharmacy'

const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

const options = {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "en-US,en;q=0.9",
    "cache-control": "max-age=0",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "same-origin",
    "sec-fetch-user": "?1",
    "sec-gpc": "1",
    "upgrade-insecure-requests": "1",
    "cookie": "sesh=ZPU3xvPN; JSESSIONID=13524718EC0B96BDEE24BC4C1E98B8F3",
    "User-Agent": process.env.USER_AGENT
  },
  "referrer": "https://birdsboropharmacy.youcanbook.me/",
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors"
};

  const checkBirdsboro = async () => {
    console.log(`Checking ${name} for vaccines...`);
  try {
    (async () => {
      try {
        const response = await fetch(dataURL, options);
        data = await response.text();

        if (!data.includes('No Availability') && !data.includes('Hi! While we would love to be able to let you book right now, this calendar is set to stop taking bookings after a certain date, which has now sadly passed...')) {
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

module.exports = checkBirdsboro;
