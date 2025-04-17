const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('http://localhost:4200/claims/map'); // Replace with your AGM app URL

  // Wait for the Street View to load
  await page.waitForSelector('#streetview-pano');

  // Take a screenshot of the Street View container
  await page.screenshot({
    path: 'streetview.png',
    clip: { x: 0, y: 0, width: 600, height: 500 }, // Adjust dimensions as needed
  });

  await browser.close();
})();