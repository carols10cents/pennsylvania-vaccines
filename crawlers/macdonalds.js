const fetch = require('node-fetch');
const dotenv = require('dotenv');
const {IncomingWebhook} = require('@slack/webhook');
const renderStaticSlackMessage = require('../utils/renderStaticSlackMessage');

dotenv.config();

const dataURL = 'https://macdonaldspharmacycovid19vaccine.as.me/schedule.php?action=showCalendar&fulldate=1&owner=21943688&template=weekly';
const scheduleURL = 'https://macdonaldspharmacycovid19vaccine.as.me/schedule.php'
const name = 'MacDonalds Pharmacy'

const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

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
      "cookie": "device_id=418b2fb8-305b-4f56-8f5e-ac45cbc4455b; AWSALB=XUqvUZChL16X+msunbhUNMX2wWacmYPtab840EKv+uo/1W9gqwM5WE184Iy8OmyMAG0MYhxTwAW6v1+Ouc71KIO7MILJTuorjJrLiHOImVYtx89RRHkT8wy0JaK1; AWSALBCORS=XUqvUZChL16X+msunbhUNMX2wWacmYPtab840EKv+uo/1W9gqwM5WE184Iy8OmyMAG0MYhxTwAW6v1+Ouc71KIO7MILJTuorjJrLiHOImVYtx89RRHkT8wy0JaK1; PHPSESSID=2kc4203ekbmg50og1fmb0breuh",
      "User-Agent": process.env.USER_AGENT
    },
    "referrer": "https://macdonaldspharmacycovid19vaccine.as.me/schedule.php",
    "referrerPolicy": "same-origin",
    "body": "type=20192685&calendar=5069296&skip=true&options%5Bqty%5D=1&options%5BnumDays%5D=5&ignoreAppointment=&appointmentType=&calendarID=",
    "method": "POST",
    "mode": "cors"
  };

  const checkMacdonalds = async () => {
    console.log(`Checking ${name} for vaccines...`);
  try {
    (async () => {
      try {
        const response = await fetch(dataURL, options);
        data = await response.text();
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

module.exports = checkMacdonalds;
