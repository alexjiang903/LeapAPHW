//Web scraper for Q2

const LOGIN_URL = "https://app-dev.condoworks.co"
const USERNAME = "coop.test@condoworks.co"
const PASSWORD = "TheTest139"
const puppeteer = require('puppeteer');
const fs = require('fs'); //write the saved file to local Compiled_Reports folder


async function runWebScraper() {
    try {
        const browser = await puppeteer.launch({
            headless: false,  
            slowMo: 15, //set to 15 for testing purposes, 75 by default       
            defaultViewport: null 
        });
        const page = await browser.newPage();

        console.log("Attempting to login to LeapAP...");

        await page.goto(LOGIN_URL, { waitUntil: 'networkidle2' });
        await page.type('input[name="Email"]', USERNAME, { delay: 100 });
        await page.type('input[name="Password"]', PASSWORD, { delay: 100 });
        await page.click('input[value="Sign In"]');
        await page.waitForSelector('title',{timeout: 30000}); //wait for the "Welcome Co op" title to be visible
        
        console.log("Successful login to LeapAP. Fetching PDF...");
        
        //PDF parsing code here...
        await page.waitForSelector('.nav-link.dropdown-toggle', { timeout: 10000 });
        await page.click('.nav-link.dropdown-toggle');

        await page.waitForSelector('a[href="/invoices/all"]') //navigate to Invoices -> All
        await page.click('a[href="/invoices/all"]');

        console.log("succesful navtivation to Invoices -> All"); 

        //await browser.close();
        //console.log("Scraping finished and PDF saved to local directory.");
    }
    catch (error) {
        console.error("Error running web scraper: ", error);
    }
}



runWebScraper();




