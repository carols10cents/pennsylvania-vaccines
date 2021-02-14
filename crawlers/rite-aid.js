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
    address: '375 PHILADELPHIA STREET			INDIANA	15701',
    name: 'RITE AID STORE #00264',
    phone: '',
    storeNumber: 264,
  },
  {
    address: '4606 ADMIRAL PEARY HIGHWAY			EBENSBURG	15931',
    name: 'RITE AID STORE #00756',
    phone: '',
    storeNumber: 756,
  },

  {
    address: '300 Market Street			Johnstown	15901',
    name: 'Rite Aid #1304',
    phone: '',
    storeNumber: 803,
  },
  {
    address: '725 LYSLE BOULEVARD			MCKEESPORT	15132',
    name: 'Rite Aid #1370',
    phone: '(717) 834-6303',
    storeNumber: 1370,
  },
  {
    address: '412 BROADWAY STREET			CORAOPOLIS	15108',
    name: 'Rite Aid #4288',
    phone: '(717) 896-9084',
    storeNumber: 1448,
  },
  {
    address: '1120 PHILADELPHIA AVENUE			NORTHERN CAMBRIA	15714',
    name: 'Rite Aid #1494',
    phone: '(717) 938-3655',
    storeNumber: 1494,
  },
  {
    address: '610 BROAD STREET			NEW BETHLEHEM	16242',
    name: 'Rite Aid #1548',
    phone: '(717) 432-0490',
    storeNumber: 1548,
  },
  {
    address: '700 SHARON NEW CASTLE RD.			FARRELL	16121',
    name: 'Rite Aid #1668',
    phone: '(717) 582-7781',
    storeNumber: 1668,
  },
  {
    address: '6531 ROUTE 22			DELMONT	15626',
    name: 'Rite Aid #1726',
    phone: '(717) 567-6670',
    storeNumber: 1726,
  },
  {
    address: '1516 JEFFERSON AVENUE			WINDBER	15963',
    name: 'Rite Aid #1780',
    phone: '(717) 258-4800',
    storeNumber: 1780,
  },
  {
    address: '210 9TH STREET			GLASSPORT	15045',
    name: 'Rite Aid #1925',
    phone: '(814) 542-8003',
    storeNumber: 1925,
  },
  {
    address: '1799 THIRD STREET			BEAVER	15009',
    name: 'Rite Aid #2277',
    phone: '(814) 948-6102',
    storeNumber: 2277,
  },
  {
    address: '813 THIRD AVENUE			NEW BRIGHTON	15066',
    name: 'Rite Aid #2433',
    phone: '(610) 323-4080',
    storeNumber: 2433,
  },
  {
    address: '847 MIDLAND AVENUE			MIDLAND	15059',
    name: 'Rite Aid #2480',
    phone: '(717) 854-6989',
    storeNumber: 2480,
  },
  {
    address: '1201 Blair St, Hollidaysburg, PA 16648',
    name: 'Rite Aid #6738',
    phone: '(814) 696-0289',
    storeNumber: 6738,
  },
  {
    address: '100 FRANKLIN STREET			MERCER	16137',
    name: 'Rite Aid #2769',
    phone: '(610) 873-3720',
    storeNumber: 2769,
  },
  {
    address: '126 W MAIN STREET			Grove City	16127',
    name: 'Rite Aid #3447',
    phone: '(570) 875-2475',
    storeNumber: 3447,
  },
  {
    address: '847 MIDLAND AVENUE			MIDLAND	15059',
    name: 'Rite Aid #2480',
    phone: '(814) 684-5000',
    storeNumber: 2480,
  },
  {
    address: '155 CHARTIERS AVENUE			MCKEES ROCKS	15136',
    name: 'Rite Aid #3527',
    phone: '(717) 684-0025',
    storeNumber: 3527,
  },
  {
    address: '811 EAST STATE STREET			SHARON	16146',
    name: 'Rite Aid #3972',
    phone: '(570) 323-0402',
    storeNumber: 3972,
  },
  {
    address: '100 WILLIAM MARKS DRIVE			MUNHALL	15120',
    name: 'Rite Aid #4682',
    phone: '(814) 237-1625',
    storeNumber: 4682,
  },
  {
    address: '20480 ROUTE 19			CRANBERRY TWP	16066',
    name: 'Rite Aid #7781',
    phone: '(717) 225-5227',
    storeNumber: 7781,
  },
  {
    address: '1505 7TH AVENUE			BEAVER FALLS	15010',
    name: 'Rite Aid #10890',
    phone: '(814) 652-2052',
    storeNumber: 10890,
  },
  {
    address: '2302 SHEFFIELD ROAD			ALIQUIPPA	15001',
    name: 'Rite Aid #10888',
    phone: '(610) 683-5520',
    storeNumber: 10888,
  },
  {
    address: '417 CHARTIERS STREET			BRIDGEVILLE	15017',
    name: 'Rite Aid #10892',
    phone: '(570) 724-4461',
    storeNumber: 10892,
  },
  {
    address: '1021 FIRST AVENUE			CONWAY	15027',
    name: 'Rite Aid #10894',
    phone: '(570) 387-1900',
    storeNumber: 10894,
  },
  {
    address: '3200 OREGON DRIVE			LOWER BURRELL	15068',
    name: 'Rite Aid #10899',
    phone: '(570) 648-1021',
    storeNumber: 10899,
  },
  {
    address: '700 STEVENSON BLVD.			NEW KENSINGTON	15068',
    name: 'Rite Aid #10900',
    phone: '(717) 764-9831',
    storeNumber: 10900,
  },
  {
    address: '351 BRIGHTON AVENUE			ROCHESTER	15074',
    name: 'Rite Aid #10901',
    phone: '(717) 530-9111',
    storeNumber: 10901,
  },
  {
    address: '500 PINE HOLLOW ROAD.			MCKEES ROCKS	15136',
    name: 'Rite Aid #10914',
    phone: '(717) 637-3744',
    storeNumber: 10914,
  },
  {
    address: '4111 WILLIAM PENN HWY.			MONROEVILLE	15146',
    name: 'Rite Aid #10917',
    phone: '(610) 286-0920',
    storeNumber: 10917,
  },
  {
    address: '2336 ARDMORE BOULEVARD			PITTSBURGH	15221',
    name: 'Rite Aid #10934',
    phone: '(610) 326-1255',
    storeNumber: 10934,
  },
  {
    address: '331 PENN AVENUE			WILKINSBURG	15221',
    name: 'Rite Aid #10935',
    phone: '(717) 854-4432',
    storeNumber: 10935,
  },
  {
    address: '1125 FREEPORT ROAD			PITTSBURGH	15238',
    name: 'Rite Aid #10954',
    phone: '(570) 752-5200',
    storeNumber: 10954,
  },
  {
    address: '6090 ROUTE 30			GREENSBURG	15601',
    name: 'Rite Aid #10967',
    phone: '(717) 266-6609',
    storeNumber: 10967,
  },
  {
    address: '10 CLAY PIKE			NORTH HUNTINGDON	15642',
    name: 'Rite Aid #10969',
    phone: '(717) 263-8040',
    storeNumber: 10969,
  },
  {
    address: '201 WEST MAHONING STREET			PUNXSUTAWNEY	15767',
    name: 'Rite Aid #10975',
    phone: '(610) 373-4511',
    storeNumber: 10975,
  },
  {
    address: '431 COMMONS DRIVE			DUBOIS	15801',
    name: 'Rite Aid #10976',
    phone: '(610) 589-4186',
    storeNumber: 10976,
  },
  {
    address: '1501 SCALP AVENUE			JOHNSTOWN	15904',
    name: 'Rite Aid #10979',
    phone: '(717) 228-2289',
    storeNumber: 10979,
  },
  {
    address: '200 GREATER BUTLER MART			BUTLER	16001',
    name: 'Rite Aid #10983',
    phone: '(610) 670-9986',
    storeNumber: 10983,
  },
  {
    address: '178 POINT PLAZA			BUTLER	16001',
    name: 'Rite Aid #10984',
    phone: '(717) 233-5344',
    storeNumber: 10984,
  },
  {
    address: '100 SEVEN FIELDS BLVD			SEVEN FIELDS	16046',
    name: 'Rite Aid #10987',
    phone: '(717) 352-3850',
    storeNumber: 10987,
  },
  {
    address: '129 GRAND AVE			MARS	16046',
    name: 'Rite Aid #10988',
    phone: '(610) 373-5241',
    storeNumber: 10988,
  },
  {
    address: '31 NORTH JEFFERSON STREET			NEW CASTLE	16101',
    name: 'Rite Aid #10990',
    phone: '(717) 624-8080',
    storeNumber: 10990,
  },
  {
    address: '1730 WILMINGTON ROAD			NEW CASTLE	16105',
    name: 'Rite Aid #10991',
    phone: '(717) 397-6179',
    storeNumber: 10991,
  },
  {
    address: '135 SOUTH MARKET STREET			NEW WILMINGTON	16142',
    name: 'Rite Aid #10994',
    phone: '(610) 562-9454',
    storeNumber: 10994,
  },
  {
    address: '165 BUTLER ROAD			KITTANNING	16201',
    name: 'Rite Aid #10998',
    phone: '(814) 355-1548',
    storeNumber: 10998,
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
