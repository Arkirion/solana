const web3 = require("@solana/web3.js");

module.exports.getConnection = async function() {
    try {
        const connection = new web3.Connection(
            web3.clusterApiUrl('devnet'),
            'confirmed',
        );
        return connection;

    } catch (e) {
        console.log(e);
    }
}

