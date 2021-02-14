const fetch = require("node-fetch");
const dotenv = require("dotenv");
const { IncomingWebhook } = require("@slack/webhook");
const renderStaticSlackMessage = require("../utils/renderStaticSlackMessage");

dotenv.config();

const dataURL =
  "https://covid-19schedulinglink.as.me/schedule.php?action=showCalendar&fulldate=1&owner=21658026&template=weekly";
const scheduleURL = "https://covid-19schedulinglink.as.me/vaccine";
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

const facilities = [
  {
    type: 19787623,
    calendar: 4996268,
    calendarName: 'Adams Cumberland Pharmacy Vaccination Schedule',
    name: 'Adams Cumberland Pharmacy',// – 3463 Biglerville Rd, Biglerville, PA  17307',
  },
  {
    type: 19787697,
    calendar: 4996271,
    calendarName: 'Albert’s Pharmacy Vaccination Schedule',
    name: 'Albert\'s Pharmacy',// – 201 S Main St, Suite 2, Pittston, PA  18640',
  },
  {
    type: 19787822,
    calendar: 4996276,
    calendarName: 'Big Spring Pharmacy Vaccination Schedule',
    name: 'Big Spring Pharmacy',// – 91 S Hight St, Newville, PA 17241',
  },
  {
    type: 19797961,
    calendar: 4996283,
    calendarName: 'Holly  Pharmacy Vaccination Schedule',
    name: 'Holly  Pharmacy',// – 31 N Baltimore Ave, Mt Holly Springs, PA 17065',
  },
  {
    type: 19799365,
    calendar: 4996430,
    calendarName: 'Jim Thorpe Memorial Hall Vaccination Schedule',
    name: 'Jim Thorpe Memorial Hall',// – 101 East 10th St, Jim Thorpe, PA  18229',
  },
  {
    type: 19787959,
    calendar: 5024132,
    calendarName: 'Mauch Chunk Pharmacy Vaccination Schedule (Group B)',
    name: 'Mauch Chunk Pharmacy',// – 1204 North St, Jim Thorpe, PA, 18229',
  },
  {
    type: 19788260,
    calendar: 4996550,
    calendarName: 'Quality Care Pharmacy Vaccination Schedule',
    name: 'Quality Care Pharmacy',// - 1 Sprint Dr, Carlisle, PA  17015',
  },
  {
    type: 19855039,
    calendar: 5008108,
    calendarName: 'Quality Care Pharmacy Vaccination Schedule (Group B)',
    name: 'Quality Care Pharmacy',// - 1 Sprint Dr, Carlisle, PA  17015',
  },
  {
    type: 19788273,
    calendar: 4996289,
    calendarName: 'The Meeting House',
    name: 'The Meeting House',// – 1155 Walnut Bottom Rd, Carlisle, PA 17015',
  },
  {
    type: 19788268,
    calendar: 4996292,
    calendarName: 'West Perry Pharmacy Vaccination Schedule',
    name: 'West Perry Pharmacy',// – 1102 Montour Rd, Loysville, PA',
  },
]

const checkIndependent = async () => {
  facilities.forEach((facility) => {
    console.log(`Checking ${facility.name} for vaccinces...`);
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
        "cookie": "device_id=5ce7b3be-8db9-4272-b17c-14bfce52ce5b; PHPSESSID=seipncvddg6msgf7ecc4ijtnis; AWSALB=h3PjireTcdWa1WMi8RMGbgE8J2CQ1c1aNsZ5x14/08UmVvXKzsA0AfKY+8+xvAki9xFqsgK2bCjwsaStbsf53BqKTNnAKLCCOLXXHD3zHka9UW6u3lGQOC0Iey/l; AWSALBCORS=h3PjireTcdWa1WMi8RMGbgE8J2CQ1c1aNsZ5x14/08UmVvXKzsA0AfKY+8+xvAki9xFqsgK2bCjwsaStbsf53BqKTNnAKLCCOLXXHD3zHka9UW6u3lGQOC0Iey/l",
        "User-Agent": process.env.USER_AGENT
      },
      "referrer": "https://covid-19schedulinglink.as.me/vaccine",
      "referrerPolicy": "same-origin",
      "body": `type=${facility.type}&calendar=${facility.calendar}&skip=true&options%5Bqty%5D=1&options%5BnumDays%5D=5&ignoreAppointment=&appointmentType=category%3ACOVID-19+FIRST+DOSE&calendarID=`,
      "method": "POST",
      "mode": "cors"
    };
    try {
      (async () => {
        try {
          const response = await fetch(dataURL, options);
          data = await response.text();
          if (
            !data.includes('No times are available in the next month')
          ) {
            console.log(data);
            await webhook.send(renderStaticSlackMessage(scheduleURL, facility.name));
          }
        } catch (e) {
          console.error(e);
        }
      })();
    } catch (e) {
      console.error(e);
    }
  });
};

module.exports = checkIndependent;
