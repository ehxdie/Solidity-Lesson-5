const ethers = require("ethers");
const fs = require("fs");
require("dotenv").config();

async function main () {
    // Getting access to a wallet that would be used to sign transactions
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY);

    // To encrypt the privatekey
    const encryptedJsonKey = await wallet.encrypt(
        process.env.PRIVATE_KEY_PASSWORD,
        process.env.PRIVATE_KEY
    )
    
    // Writing the encryption details to a "./encryptedKey.json"
    fs.writeFileSync('./.encryptedKey.json', encryptedJsonKey);


}

main()
.then(() => {process.exit(0)})
.catch((err) => {
    console.log(err);
    process.exit(1);
})