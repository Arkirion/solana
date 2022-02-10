const web3 = require('@solana/web3.js');

module.exports.getFaucets = async function (connection, publicKey) {
  const walletSolPubKey = new web3.PublicKey(publicKey);
  let airdropSignature = await connection.requestAirdrop(
    walletSolPubKey,
    web3.LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(airdropSignature);
};
