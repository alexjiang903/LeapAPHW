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
            slowMo: 10, //set to 10 for testing purposes, 75 by default       
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
        
        //Search #123 in the invoice number search bar

        await page.waitForSelector('th:nth-of-type(9) input', { timeout: 10000});
        await page.type('th:nth-of-type(9) input', '123', { delay: 150 });
        await page.keyboard.press('Enter');

        console.log("Searching for invoice 123444...");

        await page.waitForSelector('table#grid', { timeout: 10000 }); //wait for table to load using table's id grid
        console.log("search results loaded");
        
        const invoiceRow = await page.waitForSelector('::-p-xpath(//tr[td[contains(text(), "123444")]])', { timeout: 10000 });
        console.log(invoiceRow);

        const test = await page.waitForSelector('a[title="View/Edit"]', { timeout: 3000 });
        if (test) {
            const html = await page.evaluate(el => el.outerHTML, test);
            console.log(html);
            
        }

        
        await page.click('a[title="View/Edit"]');
        
        console.log("Navigated to invoice 123444 details page");
        //await browser.close();
        //console.log("Scraping finished and PDF saved to local directory.");
    }
    catch (error) {
        console.error("Error running web scraper: ", error);
    }
}



runWebScraper();




