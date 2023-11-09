// Smart contract deployment script
// To use the ethers.js package
const ethers = require("ethers");

// To read the smart contract abi and binary from other javascript files
const fs = require("fs");

require("dotenv").config();


// Deploy function
async function main() {
    // http://0.0.0.0:7545
    // This will allow the main() function to communicate with the garnache server
    const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
    
    // Using the provider to get a wallet
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY,provider);

    /* 
        using the encrypted private key
    const encryptedJson = fs.readFileSync(".encrypted.json",utf8);
    let wallet = new ethers.Wallet.fromEncryptedJsonSync(encryptedjson,process.env.PRIVATE_KEY);
    wallet = await wallet.connect(provider);
    */

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

    // Transaction receipt
    await contract.deploymentTransaction.wait(1);

    /*
    Carrying out the deployment of a contract by defining the transaction 
    const tx = {
        nonce: 5 Refers to the number of transaction that have happened before this,
        gasPrice: 2000000000,
        gasLimit: 100000,
        to: null  since this transaction is all about deploying the contract,
        value: 0,
        data: "0x608060405234801561000f575f80fd5b506109208061001d5f395ff3fe608060405234801561000f575f80fd5b5060043610610060575f3560e01c80632e64cec11461006457806339d515e214610082578063471f7cdf146100b35780636057361d146100d15780638bab8dd5146100ed5780638f7d59b81461011d575b5f80fd5b61006c610139565b60405161007991906102cd565b60405180910390f35b61009c60048036038101906100979190610321565b610141565b6040516100aa9291906103d6565b60405180910390f35b6100bb6101f6565b6040516100c891906102cd565b60405180910390f35b6100eb60048036038101906100e69190610321565b6101fb565b005b61010760048036038101906101029190610530565b610204565b60405161011491906102cd565b60405180910390f35b61013760048036038101906101329190610577565b610231565b005b5f8054905090565b60028181548110610150575f80fd5b905f5260205f2090600202015f91509050805f015490806001018054610175906105fe565b80601f01602080910402602001604051908101604052809291908181526020018280546101a1906105fe565b80156101ec5780601f106101c3576101008083540402835291602001916101ec565b820191905f5260205f20905b8154815290600101906020018083116101cf57829003601f168201915b5050505050905082565b5f5481565b805f8190555050565b6001818051602081018201805184825260208301602085012081835280955050505050505f915090505481565b6002604051806040016040528084815260200183815250908060018154018082558091505060019003905f5260205f2090600202015f909190919091505f820151815f0155602082015181600101908161028b91906107cb565b5050508160018260405161029f91906108d4565b9081526020016040518091039020819055505050565b5f819050919050565b6102c7816102b5565b82525050565b5f6020820190506102e05f8301846102be565b92915050565b5f604051905090565b5f80fd5b5f80fd5b610300816102b5565b811461030a575f80fd5b50565b5f8135905061031b816102f7565b92915050565b5f60208284031215610336576103356102ef565b5b5f6103438482850161030d565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f5b83811015610383578082015181840152602081019050610368565b5f8484015250505050565b5f601f19601f8301169050919050565b5f6103a88261034c565b6103b28185610356565b93506103c2818560208601610366565b6103cb8161038e565b840191505092915050565b5f6040820190506103e95f8301856102be565b81810360208301526103fb818461039e565b90509392505050565b5f80fd5b5f80fd5b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6104428261038e565b810181811067ffffffffffffffff821117156104615761046061040c565b5b80604052505050565b5f6104736102e6565b905061047f8282610439565b919050565b5f67ffffffffffffffff82111561049e5761049d61040c565b5b6104a78261038e565b9050602081019050919050565b828183375f83830152505050565b5f6104d46104cf84610484565b61046a565b9050828152602081018484840111156104f0576104ef610408565b5b6104fb8482856104b4565b509392505050565b5f82601f83011261051757610516610404565b5b81356105278482602086016104c2565b91505092915050565b5f60208284031215610545576105446102ef565b5b5f82013567ffffffffffffffff811115610562576105616102f3565b5b61056e84828501610503565b91505092915050565b5f806040838503121561058d5761058c6102ef565b5b5f61059a8582860161030d565b925050602083013567ffffffffffffffff8111156105bb576105ba6102f3565b5b6105c785828601610503565b9150509250929050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061061557607f821691505b602082108103610628576106276105d1565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f6008830261068a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8261064f565b610694868361064f565b95508019841693508086168417925050509392505050565b5f819050919050565b5f6106cf6106ca6106c5846102b5565b6106ac565b6102b5565b9050919050565b5f819050919050565b6106e8836106b5565b6106fc6106f4826106d6565b84845461065b565b825550505050565b5f90565b610710610704565b61071b8184846106df565b505050565b5b8181101561073e576107335f82610708565b600181019050610721565b5050565b601f821115610783576107548161062e565b61075d84610640565b8101602085101561076c578190505b61078061077885610640565b830182610720565b50505b505050565b5f82821c905092915050565b5f6107a35f1984600802610788565b1980831691505092915050565b5f6107bb8383610794565b9150826002028217905092915050565b6107d48261034c565b67ffffffffffffffff8111156107ed576107ec61040c565b5b6107f782546105fe565b610802828285610742565b5f60209050601f831160018114610833575f8415610821578287015190505b61082b85826107b0565b865550610892565b601f1984166108418661062e565b5f5b8281101561086857848901518255600182019150602085019450602081019050610843565b868310156108855784890151610881601f891682610794565b8355505b6001600288020188555050505b505050505050565b5f81905092915050565b5f6108ae8261034c565b6108b8818561089a565b93506108c8818560208601610366565b80840191505092915050565b5f6108df82846108a4565b91508190509291505056fea264697066735822122032c6b1eb4cc7fc825506a960a77436d976743680e239c07cda6f10c422b5fcc064736f6c63430008160033",
        chainID: "",
    }

    // To sign a transaction
    const signedTxResponse = await wallet.signTransaction(tx);

    // To send a transaction 
    const sentTxResponse = await wallet.sendTransaction(tx);

    console.log(signedTxResponse)*/

    // Interacting with the blockchain
    // Calling the retrieve function to get the current favorite number
    const currentFavoriteNumber = await contract.retrieve();

    // Calling the store function to set a new favorite number
    const transactionResponse = await contract.store("5");

    // Getting the transaction receipt and waiting for block confirmation
    const transactionReceipt = await contract.wait(1);

    // Getting updatedfavorite number
    const updatedFavoriteNumber = await contract.retrieve();
     

}



// This checks if the async function has executed properly, if not it returns the error message
main()
    .then(() => process.exit(0))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    })