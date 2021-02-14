const fetch = require('node-fetch');
const dotenv = require('dotenv');
const {IncomingWebhook} = require('@slack/webhook');
const renderStaticSlackMessage = require('../utils/renderStaticSlackMessage');

dotenv.config();

const scheduleURL = 'https://vaccinatelancaster.org/';
const name = 'Vaccinate Lancaster'
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

const options = {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      "if-none-match": "\" \"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "sec-gpc": "1",
      "upgrade-insecure-requests": "1",
      "cookie": "CP_IsMobile=false; ASP.NET_SessionId=mei4dyvzvnph5iqskmijxiky; __RequestVerificationToken=awvRd4Jp4emYsirXVzpmHm91RFM-A6-EdFNLe8dl-U5HcmkIMmxkpBA9-WsiIdu11gRegJqXVN3RNUVO5R3CXoM67PtIsm-SuVEahN9cpxU1; dpi=2; viewportWidth=960; viewportHeight=798; screenWidth=1440; screenHeight=900; CP_TrackBrowser={\"doNotShowLegacyMsg\":false,\"supportNewUI\":true,\"legacy\":false,\"isMobile\":false}; responsiveGhost=0",
      "User-Agent": process.env.USER_AGENT
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  };

const checkLancaster = async () => {
  console.log(`Checking ${name} for vaccines...`);
  try {
    (async () => {
      try {
        const response = await fetch(scheduleURL, options);
        data = await response.text();
        if (!data.includes('registration is not yet available')) {
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

module.exports = checkLancaster;
