// Smart contract deployment script
// To use the ethers.js package
const ethers = require("ethers");

// To read the smart contract abi and binary from other javascript files
const fs = require("fs");


// Deploy function
async function main() {
    // http://0.0.0.0:7545
    // This will allow the main() function to communicate with the garnache server
    const provider = new ethers.providers.JsonRpcProvider("http://0.0.0.0:7545");
    
    // Using the provider to get a wallet
    const wallet = new ethers.Wallet("wallet private key",provider);

    // To interact with the smart contract
    // Getting the abi
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf-8");

    // Getting the binary
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf-8");

    // Deployment area
    // The contractFactory is what acts like a meduim of connection to the smart contract
    const contractFactory = new ethers.contractFactory(abi,binary,wallet);

    // The actual deploying of the contract 
    const contract = await contractFactory.deploy();
}

// This checks if the async function has executed properly, if not it returns the error message
main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })