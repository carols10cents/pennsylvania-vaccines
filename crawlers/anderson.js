const fetch = require('node-fetch');
const dotenv = require('dotenv');
const {IncomingWebhook} = require('@slack/webhook');
const renderStaticSlackMessage = require('../utils/renderStaticSlackMessage');

dotenv.config();

const scheduleURL = 'https://www.andersononmain.com/';
const name = 'Anderson Pharmacy'
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

const options = {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "max-age=0",
      "if-none-match": "W/\"d970777409514c51bd3222989317cfb0\"",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "sec-gpc": "1",
      "upgrade-insecure-requests": "1",
      "cookie": "XSRF-TOKEN=1613108794|8SJDMcc4S8Zl; TS01e85bed=01b84e286a7764298f430a166d57b7cf21ae60039f435718c2dbff2b6166d11091ae9a3f63d4c64b2797aaa792527b9d00037fe82fa3e1c70ba2ddb4e3cc6230c2916e5b9f; hs=1689409968; svSession=d8b8493d9ece43342289ef3208244bf8b9cb392500d6a133f9d15d8583b8dcd44c28fa91aa407808a73a185bcfe98aa61e60994d53964e647acf431e4f798bcde5e283244be2898bcc996f3ca4773575eeb490717beb28f51244cba35e68f62e; TS01789631=01b84e286ab9d9f7ee230ff5d3f4ac78c9ecd2e1ce435718c2dbff2b6166d11091ae9a3f635f4149f0b36105caf7def78116be358056b33545102f6b2eb01d7d8ee79db237d129904ad0f8e3d5917fdd03b719323cd2ad52a06abad6f3657d3839b5b02cea; bSession=75425a6b-728d-4fe7-8bf8-e85df086b11f|1"
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  };

  const checkAnderson = async () => {
    console.log(`Checking ${name} for vaccines...`);
  try {
    (async () => {
      try {
        const response = await fetch(scheduleURL, options);
        data = await response.text();
        if (!data.includes('Due Due to limited COVID-19 vaccine supply we are not')) {
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

module.exports = checkAnderson;
