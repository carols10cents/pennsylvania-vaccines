<img height="100" alt="portfolio_view" src="https://github.com/jameskip/texas-vaccines/blob/main/IMG_0339.JPG">

# Texas Vaccine Updates


If you would like to contribute a crawler just follow the folder structure and add your file to `crawlers/`

### Install
```bash
npm install
```

### Run
```bash
npm start
```

### Test
```bash
npm test
```

You will need a `.env` file that looks something like this:
```
NODE_ENV=development
PORT=666
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/blahblahblahblahblahblah
HEB_WEBHOOK_URL=https://hooks.slack.com/services/blahblahblahblahblahblah
ALBERTSONS_WEBHOOK_URL=https://hooks.slack.com/services/blahblahblahblahblahblah
ALAMO_WEBHOOK_URL=https://hooks.slack.com/services/blahblahblahblahblahblah
FHS_WEBHOOK_URL=https://hooks.slack.com/services/blahblahblahblahblahblah
```
You can use our testing webhook in channel `#__test_channel__` or create your own to test with.
