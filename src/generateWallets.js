const { MnemonicKey } = require('@initia/initia.js');
const fs = require('fs');

async function generateWallets(numWallets, filePath) {
    let walletData = '';

    for (let i = 0; i < numWallets; i++) {
        const key = new MnemonicKey({
            account: 0, // (optional) BIP44 account number. default = 0
            index: i,  // (optional) BIP44 index number. default = 0
            coinType: 118, // (optional) BIP44 coinType. default = 118
        });

        walletData += `Wallet ${i + 1}:\n`;
        walletData += `Mnemonic: ${key.mnemonic}\n`;
        walletData += `Private Key (Hex): ${key.privateKey.toString('hex')}\n`;
        walletData += `Public Key: ${key.publicKey.key}\n`;
        walletData += `Wallet Address: ${key.accAddress}\n`;
        walletData += '-------------------------\n';
    }

    fs.writeFileSync(filePath, walletData);
    console.log(`Wallet data successfully saved to ${filePath}`);
}

module.exports = { generateWallets };