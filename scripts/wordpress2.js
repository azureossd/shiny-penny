const puppeteer = require('puppeteer');

async function runInstall(siteName) {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto(`https://${siteName}.azurewebsites.net/`);
  await Promise.all([
      page.waitForNavigation(),
      page.click('#language-continue')
  ]);
  await page.type('#weblog_title', 'AppService.L200.OSS.WordPress.1');
  await page.focus("#user_login");
  await page.type('#user_login', 'azuser');
  await page.keyboard.press('Tab');
  await page.keyboard.press('Backspace');
  await page.keyboard.type('Micr0s0ft');

  await page.waitForSelector("input.pw-checkbox");
  await page.click("input.pw-checkbox");

  await page.type('#admin_email', 'azuser@example.com');
  await Promise.all([
      page.waitForNavigation(),
      page.click('#submit')
  ]);

  await browser.close();
};

module.exports.runInstall = runInstall;