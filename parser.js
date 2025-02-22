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

    const customerMatch = cleanedData.match(/Customer no\. - Account no\.\s+(\d+) - (\d+)/g); //customer and account number
    const billDateMatch = cleanedData.match(/Bill date:\s+([A-Za-z]+ \d{1,2}, \d{4})/g); 
    const billNumberMatch = cleanedData.match(/Bill number:\s+(\d+)/g);
    const billPeriodInfo = cleanedData.match(/Bill\s*period:\s*(.*?)\s*(\w{3,} \d{1,2}, \d{4})\s*to\s*(\w{3,} \d{1,2}, \d{4})/g); 
    const totalNewChargesMatch = cleanedData.match(/Total\s*new\s*charges\s*\$?\s*([\d,]+(?:\.\d{2})?)/g)

    //2nd pass of regex to retrieve key values 
    const customerNumber = customerMatch[0].match(/\d{7}/)[0]; //customer number is 7 digits 
    const accountNumber = customerMatch[0].match(/\d{8}/)[0]; //account number is 8 digits
    const billDate = billDateMatch[0].match(/[A-Za-z]+ \d{1,2}, \d{4}/)[0];
    const billNumber = billNumberMatch[0].match(/\d{8}/)[0];
    const billPeriodRange = billPeriodInfo[0].match(/(\w{3,} \d{1,2}, \d{4})\s*to\s*(\w{3,} \d{1,2}, \d{4})/g)[0]; // "(START_DATE) to (END_DATE)"
    const totalNewCharges = totalNewChargesMatch[0].match(/\$\d.\d{3}.\d*/)[0]; //total new charges


    const result = {
        'Customer Number': customerNumber,
        'Account Number': accountNumber,
        'Bill Date': billDate,
        'Bill Number': billNumber,
        'Bill Period': billPeriodRange,
        'Total New Charges': totalNewCharges
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