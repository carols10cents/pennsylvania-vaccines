const fetch = require('node-fetch');
const dotenv = require('dotenv');
const {IncomingWebhook} = require('@slack/webhook');
const renderStaticSlackMessage = require('../utils/renderStaticSlackMessage');

dotenv.config();

const dataURL = 'https://www.geisinger.org/coronavirus/patients-and-visitors/covid-19-vaccine-faqs';
const scheduleURL = dataURL;
const name = 'Geisinger'
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

const options = {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "sec-gpc": "1",
      "upgrade-insecure-requests": "1",
      "cookie": "ASP.NET_SessionId=yjujtkwlgphs5qswvivesoxf; SC_ANALYTICS_GLOBAL_COOKIE=9584c586092c4778a00441ff0d6fb4af|False; __RequestVerificationToken=jmfVrc2DbEYHoFzuX_AanmnLEPbx4aNT6RJL8O4CMaXJPnIxk_Eg0aT6CsXaqzQHlCeTqwcaGktf6x2Ik_2a1hvFU52AdZt-ZRh3lfpUyaM1",
      "User-Agent": process.env.USER_AGENT
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  };

const checkGeisinger = async () => {
  console.log(`Checking ${name} for vaccines...`);
  try {
    (async () => {
      try {
        const response = await fetch(dataURL, options);
        data = await response.text();
        if (!data.includes('appointments are currently unavailable')) {
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

module.exports = checkGeisinger;
