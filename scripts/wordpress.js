const puppeteer = require('puppeteer');

async function runInstall(siteName) {
  const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});
  const page = await browser.newPage();
  await page.goto(`https://${siteName}.azurewebsites.net/wp-login.php`);
  await Promise.all([
      page.waitForNavigation(),
      page.click('#language-continue')
  ]);
  await page.type('#weblog_title', 'AppService.L200.OSS.WordPress.1');
  await page.type('#user_login', 'azuser');
  await page.type('#admin_email', 'azuser@example.com');
  await Promise.all([
      page.waitForNavigation(),
      page.click('#submit')
  ]);

  await browser.close();
};

module.exports.runInstall = runInstall;