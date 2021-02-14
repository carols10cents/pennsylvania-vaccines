const fetch = require("node-fetch");
const dotenv = require("dotenv");
const { IncomingWebhook } = require("@slack/webhook");
const renderStaticSlackMessage = require("../utils/renderStaticSlackMessage");

dotenv.config();

const scheduleURL = "https://www.riteaid.com/pharmacy/apt-scheduler";
const url = process.env.SLACK_WEBHOOK_URL;
const webhook = new IncomingWebhook(url);

const facilities = [
  {
    address: '2103 N. Third Street, Harrisburg, PA 17110',
    name: 'Rite Aid #1887',
    phone: '(717) 236-4208',
    storeNumber: 1887,
  },
  {
    address: '3601 Walnut Street, Harrisburg, PA 17109',
    name: 'Rite Aid #4284',
    phone: '(717) 545-8183',
    storeNumber: 4284,
  },

  {
    address: '124 South Front Street, Steelton, PA 17113',
    name: 'Rite Aid #1304',
    phone: '(717) 939-7235',
    storeNumber: 1304,
  },
  {
    address: '5 Friendly Drive, Duncannon, PA 17020',
    name: 'Rite Aid #4293',
    phone: '(717) 834-6303',
    storeNumber: 4293,
  },
  {
    address: '3773 Peters Mountain Rd., Halifax, PA 17032',
    name: 'Rite Aid #4288',
    phone: '(717) 896-9084',
    storeNumber: 4288,
  },
  {
    address: '65 Newberry Parkway, Etters, PA 17319',
    name: 'Rite Aid #11025',
    phone: '(717) 938-3655',
    storeNumber: 11025,
  },
  {
    address: '818 Us Route 15 North, Dillsburg, PA 17019',
    name: 'Rite Aid #11019',
    phone: '(717) 432-0490',
    storeNumber: 11019,
  },
  {
    address: '5201 Spring Road Suite 6, Shermans Dale, PA 17090',
    name: 'Rite Aid #4286',
    phone: '(717) 582-7781',
    storeNumber: 4286,
  },
  {
    address: '10 Newport Plaza, Newport, PA 17074',
    name: 'Rite Aid #3804',
    phone: '(717) 567-6670',
    storeNumber: 3804,
  },
  {
    address: '429 South Hanover Street, Carlisle, PA 17013',
    name: 'Rite Aid #11018',
    phone: '(717) 258-4800',
    storeNumber: 11018,
  },
  {
    address: '101 East Shirley Street, Mt Union, PA 1706',
    name: 'Rite Aid #1495',
    phone: '(814) 542-8003',
    storeNumber: 1495,
  },
  {
    address: '1120 Philadelphia Avenue, Northern Cambria, PA 15714',
    name: 'Rite Aid #1494',
    phone: '(814) 948-6102',
    storeNumber: 1494,
  },
  {
    address: '1140 Town Square Rd, Pottstown, PA 19465',
    name: 'Rite Aid #11166',
    phone: '(610) 323-4080',
    storeNumber: 11166,
  },
  {
    address: '1200 West Market Street, York, PA 1740',
    name: 'Rite Aid #451',
    phone: '(717) 854-6989',
    storeNumber: 451,
  },
  {
    address: '1201 Blair St, Hollidaysburg, PA 16648',
    name: 'Rite Aid #6738',
    phone: '(814) 696-0289',
    storeNumber: 6738,
  },
  {
    address: '1249 Horseshoe Pike, Downingtown, PA 19335',
    name: 'Rite Aid #3768',
    phone: '(610) 873-3720',
    storeNumber: 3768,
  },
  {
    address: '129 East Centre Street, Ashland, PA 17921',
    name: 'Rite Aid #2478',
    phone: '(570) 875-2475',
    storeNumber: 2478,
  },
  {
    address: '1365 Logan Avenue, Tyrone, PA 1668',
    name: 'Rite Aid #6739',
    phone: '(814) 684-5000',
    storeNumber: 6739,
  },
  // {
  //   address: '14 Fifth Street, Williamsport, PA 1770',
  //   name: 'Rite Aid #4415',
  //   phone: '(570) 321-9350',
  //   storeNumber: 4415,
  // },
  // {
  //   address: '148 Ennis Lane, Towanda, PA 18848',
  //   name: 'Rite Aid #11084',
  //   phone: '(570) 265-4769',
  //   storeNumber: 11084,
  // },
  {
    address: '1786-I Columbia Avenue, Columbia, PA 17512',
    name: 'Rite Aid #3610',
    phone: '(717) 684-0025',
    storeNumber: 3610,
  },
  {
    address: '1913 East 3rd Street, Williamsport, PA 17701',
    name: 'Rite Aid #11036',
    phone: '(570) 323-0402',
    storeNumber: 11036,
  },
  {
    address: '1927 Atherton Street, State College, PA 16801',
    name: 'Rite Aid #793',
    phone: '(814) 237-1625',
    storeNumber: 793,
  },
  {
    address: '2067 Route 116, Spring Grove, PA 17362',
    name: 'Rite Aid #1902',
    phone: '(717) 225-5227',
    storeNumber: 1902,
  },
  {
    address: '211 East Main Street, Everett, PA 1553',
    name: 'Rite Aid #1429',
    phone: '(814) 652-2052',
    storeNumber: 1429,
  },
  {
    address: '23 North Elm Street, Kutztown, PA 1953',
    name: 'Rite Aid #11169',
    phone: '(610) 683-5520',
    storeNumber: 11169,
  },
  {
    address: '24 East Avenue, Wellsboro, PA 1690',
    name: 'Rite Aid #11016',
    phone: '(570) 724-4461',
    storeNumber: 11016,
  },
  {
    address: '2411 Columbia Blvd, Bloomsburg, PA 17815',
    name: 'Rite Aid #11038',
    phone: '(570) 387-1900',
    storeNumber: 11038,
  },
  {
    address: '26 West Independence Street, Shamokin, PA 1787',
    name: 'Rite Aid #205',
    phone: '(570) 648-1021',
    storeNumber: 205,
  },
  {
    address: '2901 Carlisle Road, Dover, PA 1731',
    name: 'Rite Aid #1894',
    phone: '(717) 764-9831',
    storeNumber: 1894,
  },
  {
    address: '300 S. Fayette Street, Shippensburg, PA 17257',
    name: 'Rite Aid #11023',
    phone: '(717) 530-9111',
    storeNumber: 11023,
  },
  {
    address: '301 Eisenhower Drive, Hanover, PA 1733',
    name: 'Rite Aid #12999',
    phone: '(717) 637-3744',
    storeNumber: 12999,
  },
  {
    address: '3145 Main Street, Morgantown, PA 19543',
    name: 'Rite Aid #7861',
    phone: '(610) 286-0920',
    storeNumber: 7861,
  },
  {
    address: '340 East High Street, Pottstown, PA 19464',
    name: 'Rite Aid #819',
    phone: '(610) 326-1255',
    storeNumber: 819,
  },
  {
    address: '40-42 West Market Street, York, PA 17401',
    name: 'Rite Aid #517',
    phone: '(717) 854-4432',
    storeNumber: 517,
  },
  {
    address: '400 West Second Street, Berwick, PA 18603',
    name: 'Rite Aid #11073',
    phone: '(570) 752-5200',
    storeNumber: 11073,
  },
  {
    address: '4135 North George Street, Ext., Manchester, PA 17345',
    name: 'Rite Aid #2271',
    phone: '(717) 266-6609',
    storeNumber: 2271,
  },
  {
    address: '415 East Queen Street, Chambersburg, PA 17201',
    name: 'Rite Aid #3609',
    phone: '(717) 263-8040',
    storeNumber: 3609,
  },
  {
    address: '418 Penn Street, Reading, PA 19602',
    name: 'Rite Aid #11170',
    phone: '(610) 373-4511',
    storeNumber: 11170,
  },
  {
    address: '420 North 3rd Street, Womelsdorf, PA 19567',
    name: 'Rite Aid #3400',
    phone: '(610) 589-4186',
    storeNumber: 3400,
  },
  {
    address: '469 West Penn Avenue, Cleona, PA 17042',
    name: 'Rite Aid #11021',
    phone: '(717) 228-2289',
    storeNumber: 11021,
  },
  {
    address: '4810 Penn Avenue, Sinking Spring, PA 19608',
    name: 'Rite Aid #1975',
    phone: '(610) 670-9986',
    storeNumber: 1975,
  },
  {
    address: '501 South 29th St Ste A, Harrisburg, PA 17104',
    name: 'Rite Aid #866',
    phone: '(717) 233-5344',
    storeNumber: 866,
  },
  {
    address: '5035 Lincoln Way East, Fayetteville, PA 17222',
    name: 'Rite Aid #232',
    phone: '(717) 352-3850',
    storeNumber: 232,
  },
  {
    address: '525 Penn Avenue, West Reading, PA 1961',
    name: 'Rite Aid #467',
    phone: '(610) 373-5241',
    storeNumber: 467,
  },
  {
    address: '5675 York Road, New Oxford, PA 17350',
    name: 'Rite Aid #3602',
    phone: '(717) 624-8080',
    storeNumber: 3602,
  },
  {
    address: '59 North Queen Street, Lancaster, PA 17603',
    name: 'Rite Aid #729',
    phone: '(717) 397-6179',
    storeNumber: 729,
  },
  // {
  //   address: '77 Reuters Boulevard, Towanda, PA 1884',
  //   name: 'Rite Aid #1830',
  //   phone: '(570) 265-7882',
  //   storeNumber: 1830,
  // },
  {
    address: '807 South 4th Street, Hamburg, PA 1952',
    name: 'Rite Aid #3425',
    phone: '(610) 562-9454',
    storeNumber: 3425,
  },
  {
    address: '821 East Bishop Street, Bellefonte, PA 16823',
    name: 'Rite Aid #11015',
    phone: '(814) 355-1548',
    storeNumber: 11015,
  },
  {
    address: '825A East Chestnut Street, Lancaster, PA 17602',
    name: 'Rite Aid #4684',
    phone: '(717) 293-8001',
    storeNumber: 4684,
  },
  {
    address: '8878 Clearfield Curwensville, Clearfield, PA 16830',
    name: 'Rite Aid #740',
    phone: '(814) 765-2753',
    storeNumber: 740,
  },
  {
    address: '910 West Broadway, Red Lion, PA 17356',
    name: 'Rite Aid #1640',
    phone: '(717) 244-2919',
    storeNumber: 1640,
  },
  {
    address: '9635 William Penn Highway, Huntingdon, PA 1665',
    name: 'Rite Aid #233',
    phone: '(814) 643-3661',
    storeNumber: 233,
  },
  {
    address: '980 East Main Street, Palmyra, PA 1707',
    name: 'Rite Aid #1662',
    phone: '(717) 838-8878',
    storeNumber: 1662,
  },
]

const options = {
  "headers": {
    "accept": "*/*",
    "accept-language": "en-US,en;q=0.9",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-origin",
    "sec-gpc": "1",
    "x-requested-with": "XMLHttpRequest",
    "cookie": "check=true; AMCVS_3B2A35975CF1D9620A495FA9%40AdobeOrg=1; AMCV_3B2A35975CF1D9620A495FA9%40AdobeOrg=77933605%7CMCIDTS%7C18670%7CMCMID%7C18647157766809783586223901735054475175%7CMCOPTOUT-1613095921s%7CNONE%7CvVersion%7C4.5.1",
    "User-Agent": process.env.USER_AGENT
  },
  "referrer": "https://www.riteaid.com/pharmacy/apt-scheduler",
  "referrerPolicy": "origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors"
};

  const checkRiteAid = async () => {
  facilities.forEach((facility) => {
    console.log(`Checking ${facility.name} for vaccinces...`);
    try {
      (async () => {
        try {
          const response = await fetch(`https://www.riteaid.com/services/ext/v2/vaccine/checkSlots?storeNumber=${facility.storeNumber}`, options);
          data = await response.text();
          if (
            !data.includes('{"slots":{"1":false,"2":false}}')
          ) {
            console.log(data);
            await webhook.send(renderStaticSlackMessage(scheduleURL, `${facility.name} ${facility.address}`));
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

module.exports = checkRiteAid;
