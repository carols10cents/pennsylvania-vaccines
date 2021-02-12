const fetch = require('node-fetch');
const dotenv = require('dotenv');
const {IncomingWebhook} = require('@slack/webhook');
const renderStaticSlackMessage = require('../utils/renderStaticSlackMessage');

dotenv.config();

const dataURL = 'https://giantsched.rxtouch.com/rbssched/program/Covid19/Patient/CheckZipCode';
const scheduleURL = 'https://giantsched.rxtouch.com/rbssched/program/covid19';
const name = 'Giant'
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

async function sleep(millis) {
  return new Promise(resolve => setTimeout(resolve, millis));
}

const checkGiant = async () => {
  console.log(`Checking ${name} for vaccines...`);
  // ['17110', '17032', '17036', '17055', '17057'].forEach(zip => {
  ['17110'].forEach(zip => {
    console.log(`GIANT ${zip} at ${Date()}.`);
    const options = {
        "headers": {
          "accept": "application/json, text/javascript, */*; q=0.01",
          "accept-language": "en-US,en;q=0.9",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "sec-gpc": "1",
          "x-requested-with": "XMLHttpRequest",
          "cookie": "ASP.NET_SessionId=he0tme3cg3arfuwgvkui4rre; .ASPXAUTH=270A59853B8A9511B8EDEAF5D6A0FD089115B46DFE766C718036A4A93037AF59CF4AB842AB96EA5D0FAA5FBA76B67BF10DCE5031EA3320F90BBB22BB0DFE3FC86A65861AC85ED4C06E933C02D51C74DF2239A218A5707DCC8BC618697D22D81A85563402B33F735452A8F0E223CB345DDB0DA3ADAD96D6F025D630B03F42F075; QueueITAccepted-SDFrts345E-V3_giantcovid19=EventId%3Dgiantcovid19%26QueueId%3Da9c963bf-60d4-4713-b5da-3188530fdc99%26RedirectType%3Dsafetynet%26IssueTime%3D1613112744%26Hash%3Dc7a1c123b66da549046383a48c131cf6d258b9385a7ef44bdf6f62b8f9f39136"
        },
        "referrer": "https://giantsched.rxtouch.com/rbssched/program/Covid19/Patient/Advisory",
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": `zip=${zip}&appointmentType=5958&PatientInterfaceMode=0`,
        "method": "POST",
        "mode": "cors",
        "redirect": "follow",
        "follow": 20,
      }
      try {
        (async () => {
          try {
            const response = await fetch(dataURL, options);
            data = await response.text();
            if (!data.includes('There are no locations with available appointments')) {
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
    })
    await sleep(2000);
};

module.exports = checkGiant;
