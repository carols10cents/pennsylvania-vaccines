const fetch = require('node-fetch');
const dotenv = require('dotenv');
const {IncomingWebhook} = require('@slack/webhook');
const renderStaticSlackMessage = require('../utils/renderStaticSlackMessage');

dotenv.config();

const dataURL = 'https://chambersclinical.as.me/schedule.php?action=showCalendar&fulldate=1&owner=21315079&template=weekly';
const scheduleURL = 'https://chambersclinical.as.me/moderna1'
const name = 'Chambers Pharmacy'
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
    "cookie": "device_id=493a59e6-cfdb-4985-9cb5-1e1692169226; PHPSESSID=43t4c9r7l4iomaui6g13lliiet; AWSALB=/9Yj465q0mS8myp13NTfsM6+YXCbzVULMv/HOPWwK/klWkngJtq/t0rbCeX4idFtro4VwjUbNh45xkw1gbkDlmgGApipRqHA2UHbzUVpfvjg+kT7+ACCfhCxHyU4; AWSALBCORS=/9Yj465q0mS8myp13NTfsM6+YXCbzVULMv/HOPWwK/klWkngJtq/t0rbCeX4idFtro4VwjUbNh45xkw1gbkDlmgGApipRqHA2UHbzUVpfvjg+kT7+ACCfhCxHyU4",
    "User-Agent": process.env.USER_AGENT
  },
  "referrer": "https://chambersclinical.as.me/moderna1",
  "referrerPolicy": "same-origin",
  "body": "type=19626386&calendar=4960897&skip=true&options%5Bqty%5D=1&options%5BnumDays%5D=5&ignoreAppointment=&appointmentType=19626386&calendarID=",
  "method": "POST",
  "mode": "cors"
};

  const checkChambers = async () => {
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

module.exports = checkChambers;
