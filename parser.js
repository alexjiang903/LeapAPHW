//Parser for Q1 (txt file)

const fs = require('fs');

if (process.argv.length < 3) {
    // check if the supplied file exists
    console.error('Please provide a file to parse!');
    process.exit(1);
}

const filePath = process.argv[2];

fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
        console.error("Error reading file: ", err);
        process.exit(1);
    }

    const cleanedData = data.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
    console.log("text file after cleanup: ", cleanedData);
    
    const customerNumberMatch = cleanedData.match(/Customer no\. - Account NO./gi);
    const accountNumberMatch = cleanedData.match(/Account Number:\s*(\d+)/g);
    const billPeriodMatch = cleanedData.match(/Bill Period:\s*([\d\-]+)/g);
    const billNumberMatch = cleanedData.match(/Bill Number:\s*(\d+)/g);
    const billDateMatch = cleanedData.match(/Bill Date:\s*([\d\/]+)/g);
    const totalNewChargesMatch = cleanedData.match(/Total New Charges:\s*\$([\d,]+\.\d{2})/g);
    const testRegex = cleanedData.match(/king gg/g);
    const test2 = cleanedData.match(/Hello World/gi);


    //console.log(customerNumberMatch);
    //console.log(customerNumberMatch);
    //console.log(testRegex);
    //console.log(test2);

    const result = {
        'Customer Number': customerNumberMatch ? customerNumberMatch[1] : 'undefined',
        'Account Number': accountNumberMatch ? accountNumberMatch[1] : 'undefined',
        'Bill Period': billPeriodMatch ? billPeriodMatch[1] : 'undefined',
        'Bill Number': billNumberMatch ? billNumberMatch[1] : 'undefined',
        'Bill Date': billDateMatch ? billDateMatch[1] : 'undefined',
        'Total New Charges': totalNewChargesMatch ? `$${totalNewChargesMatch[1]}` : 'undefined',
        'Test Regex': testRegex ? testRegex[0] : 'undefined'
    };


    //write and format the parsed data to console
    console.log("\n\x1b[1mParsed Bill Details:\x1b[0m");
    console.log("=====================================");
    for (const [key, value] of Object.entries(result)) {
        const color = value === 'undefined' ? '\x1b[31m' : '\x1b[32m';
        console.log(`\x1b[1m${key}:\x1b[0m ${color}${value}\x1b[0m`); //green for parsed value, red for undefined
    }
    console.log("=====================================");


    

});