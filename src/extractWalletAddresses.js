const fs = require('fs');
const readline = require('readline');

async function extractWalletAddresses(inputFile, outputFile) {
    const fileStream = fs.createReadStream(inputFile);
    const rlFile = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity
    });

    let walletAddresses = '';

    for await (const line of rlFile) {
        if (line.startsWith('Wallet Address:')) {
            const address = line.split('Wallet Address: ')[1];
            walletAddresses += address + '\n';
        }
    }

    fs.writeFileSync(outputFile, walletAddresses);
    console.log(`Wallet addresses successfully saved to ${outputFile}`);
}

module.exports = { extractWalletAddresses };