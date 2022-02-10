const web3 = require('@solana/web3.js');
const clusterConnection = require("./clusterConnection");
const {getFaucets} = require('./faucet');

async function main() {

    console.log("Creating connection with cluster...");
    const connection = await clusterConnection.getConnection();
    const wallet = web3.Keypair.generate();

    getFaucets(connection, wallet.publicKey )
    console.log("publicKey: ", wallet.publicKey.toString());
    console.log("secretKey 1 : ", wallet.secretKey.toString());
    console.log("secretKey: ", Buffer.from(wallet.secretKey).toString('hex'));
    console.log('--------------')
    console.log(wallet);
}

main();