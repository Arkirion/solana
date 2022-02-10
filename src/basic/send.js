const web3 = require("@solana/web3.js");
const {account_1} = require('../resources/testAccount');
const clusterConnection = require('../resources/clusterConnection');

async function main() {
    const connection = await clusterConnection.getConnection();
    const SENDER_PRV=  new Uint8Array[process.env.ACCOUNT_UINT_PRV];
    const RECIPIENT = 'DesU7XscZjng8yj5VX6AZsk3hWSW4sQ3rTG2LuyQ2P4H'; // change this
    const AMOUNT = 1000 // Lamports


    let account = web3.Keypair.fromSecretKey(SENDER_PRV);
    let balance = await getBalance(connection, account.publicKey);
    console.log(balance);

    const response = await sendTransaction(connection, RECIPIENT, AMOUNT, account);
    console.log(response);

}

//check the account balance
async function getBalance(connection, publicKey) {
    return connection.getBalance(publicKey);
}

async function sendTransaction(connection, recipientPublicKey, recipientAmount, payer) {
    const transaction = new web3.Transaction().add(
        web3.SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: recipientPublicKey,
            lamports: recipientAmount,
        }),
    );

    const signature = await web3.sendAndConfirmTransaction(connection, transaction, [payer]);

    return signature;
}

main();
