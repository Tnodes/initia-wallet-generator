const readline = require('readline');
const figlet = require("figlet")
const { extractWalletAddresses } = require('./src/extractWalletAddresses');
const { generateWallets } = require('./src/generateWallets');

// Read user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function askQuestion(query) {
    return new Promise(resolve => rl.question(query, resolve));
}

(async () => {
    const banner = await figlet.text("Initia Gen");
    console.log(banner, "\nGithub: https://github.com/Tnodes\n");
    console.log('Menu:');
    console.log('1. Generate New Wallets');
    console.log('2. Extract & Merge Wallet Addresses from File');
    const choice = await askQuestion('Choose an option (1 or 2): ');

    if (choice === '1') {
        const numWallets = parseInt(await askQuestion('How many wallets do you want to generate? '));
        if (isNaN(numWallets) || numWallets <= 0) {
            console.log('Please enter a valid number of wallets.');
        } else {
            const filePath = await askQuestion('Enter the path to save the file (e.g., wallets.txt): ');
            await generateWallets(numWallets, filePath);
        }
    } else if (choice === '2') {
        const inputFile = await askQuestion('Enter input file name (e.g., wallets.txt): ');
        const outputFile = await askQuestion('Enter output file name (e.g., list_wallet.txt): ');

        await extractWalletAddresses(inputFile, outputFile);
    } else {
        console.log('Invalid choice.');
    }

    rl.close();
})();