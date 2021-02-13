<img height="100" alt="vaccine bottle" src="https://github.com/jherrm/pennsylvania-vaccines/blob/main/vaccine.jpg">

# Pennsylvania Vaccine Updates

Forked from James Kip's [Texas Vaccine Updates](https://github.com/jameskip/texas-vaccines) (thank you James!! ♥️)


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

Here is a `.env` file that will get you up and running. Just save it as `.env` in this project.
```
NODE_ENV=development
PORT=1919
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/BLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAHBLAH
```
You'll need to create an app in Slack to get working webhook URLs.

# Crawler How To
### Step 1: Collect Facility Links

<img alt="Pennsylvania Vaccine Provider Information map" src="https://github.com/jherrm/pennsylvania-vaccines/blob/main/pa-map.png">

Visit the [Pennsylvania Vaccine Provider Information map](https://padoh.maps.arcgis.com/apps/webappviewer/index.html?id=e6f78224c6fe4313a1f70b56f553c357), pan and zoom the view to select the area you're interested in.

Open the Attribute Table by clicking the black bar at the bottom of the map. Click `Options` and select `Export all to CSV`.

### Step 2: Find Compatible Websites
Go through each link in the spreadsheet and take a look to see if the facility's website offers online scheduling. This can take some work, but generally I just search for "vaccine" on the page and follow the links.

Try to find the page that the facility will update once appointments are available. *Our goal is to visit that page many times until we detect it changes, which signals that appointments may be available.*

### Step 3: Duplicate existing crawler

Make a copy of the [example.js](https://github.com/jherrm/pennsylvania-vaccines/blob/main/crawlers/example.js) crawler. Name it something like `pharmacy-name.js` and save it in the `crawlers` folder.

### Step 4: Extract the request

Open up the dev tools (I use Chrome) and navigate to the `Network` tab. Refresh the website to capture the network requests. We need to find the request that corresponds with the text on screen that will change once the appointments are available. In the example below, Birdsboro Pharmacy prints `No Availability` when there are no appointments, so we're going to find the request that returns that text. Try selecting the top request first, then go to the `Response` tab in the section on the right side of the dev tools. Hit `ctrl`/`cmd` + `F` to search the response for the text (`No Availability`). If you don't find it, keep searching the other requests' responses until you find it.

<img alt="Birdsboro webpage with devtools" src="https://github.com/jherrm/pennsylvania-vaccines/blob/main/example1.png">

Once you've found the request, it's time to copy the request code so that we can insert it into our crawler. Right click on the request, select `Copy` -> `Copy as Node.js fetch`

<img alt="Copy as Node.js fetch" src="https://github.com/jherrm/pennsylvania-vaccines/blob/main/example2.png">

<img alt="Copy as Node.js fetch" src="https://github.com/jherrm/pennsylvania-vaccines/blob/main/example3.png">

Paste that Node.js fetch into your text editor, and use the fetch URL as the `dataUrl`. You can use the websites main URL as the `scheduleURL`, and change the response handler's conditional to test if the `No Availability` text exists when we retrieve the response. Don't forget to change the `checkExample` function definition and export to match whatever the name of the facility is (e.g. `checkBirdsboro`), and finally update `index.js` to include your new crawler by adding `await checkBirdsboro()` to the main function.
