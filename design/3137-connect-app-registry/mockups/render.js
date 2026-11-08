const { chromium } = require('playwright');
const path = require('path');

const [directory, outputDirectory, ...names] = process.argv.slice(2);

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1180, height: 800 }, deviceScaleFactor: 2 });
  for (const name of names) {
    await page.goto('file://' + path.join(directory, name + '.html'));
    await page.evaluate(() => document.fonts.ready);
    await page.screenshot({ path: path.join(outputDirectory, name + '.png'), fullPage: true });
    console.log('rendered', name);
  }
  await browser.close();
})();
