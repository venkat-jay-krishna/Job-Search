const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const User = require('./db_connect');

puppeteer.use(StealthPlugin());

async function scrapper(job, location, experience) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setUserAgent(
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36'
  );

  const url = `https://www.naukri.com/${job}-jobs-in-${location}?experience=${experience}`;
  await page.goto(url, { waitUntil: 'networkidle2' });

  await page.waitForSelector('.cust-job-tuple', { timeout: 10000 });

  // Extract job data from page context
  const jobsData = await page.evaluate(() => {
    const jobdata = [];
    const containers = document.querySelectorAll('.cust-job-tuple');

    containers.forEach((container) => {
      const titleElement = container.querySelector('a.title');
      const companyElement = container.querySelector('a.comp-name');
      const salaryElement = Array.from(container.querySelectorAll('span[title]'))
          .find(span => span.title.includes('Lacs'));
      const locElement = container.querySelector(".locWdth");
      const skillElements = container.querySelectorAll('li.dot-gt');
      const experienceElement = container.querySelector('.expwdth');
      const title = titleElement ? titleElement.innerText.trim() : 'N/A';
      const url=titleElement ? titleElement.href.trim() :"";
      const location=locElement ? locElement.innerText.trim().split(", "):'N/A';
      console.log(location);
      const company = companyElement ? companyElement.innerText.trim() : 'N/A';
      const salary = salaryElement ? salaryElement.innerText.trim() : 'Not disclosed';
      const experience = experienceElement ? experienceElement.innerText:'0 yrs';
      const skillset = [];
      if(skillElements.length!=0) 
       { skillElements.forEach((skill) => {
        skillset.push(skill.innerText.trim());
      });
    } else skillset.push('none mentioned')

      jobdata.push({ title, company,location, experience, salary, skillset,url });
    });

    return jobdata;
  });

  // Save extracted data into database from Node.js context
  for (const job of jobsData) {
    try {
      await User.create(job);
    } catch (err) {
      console.error('Error saving job:', err);
    }
  }

  await browser.close();
  return 'Database updated';
}

module.exports = { scrapper };
