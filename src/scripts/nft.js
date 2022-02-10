const web3 = require("@solana/web3.js");
const splToken = require("@solana/spl-token");
const clusterConnection = require("../basic/clusterConnection");
require("dotenv").config({
  path: `../../.env`,
});

async function main() {
  console.log("Creating connection with cluster...");
  const connection = await clusterConnection.getConnection();
  const SENDER_PRV = new Uint8Array(
    process.env.ACCOUNT_UINT_PRV.split(",").map((char) => parseInt(char))
  );
  console.log(
    process.env.ACCOUNT_UINT_PRV.split(",").map((char) => parseInt(char))
  );
  const wallet = web3.Keypair.fromSecretKey(SENDER_PRV);
  console.log(wallet);

  let mint = await splToken.Token.createMint(
    connection,
    wallet,
    wallet.publicKey,
    null,
    9,
    splToken.TOKEN_PROGRAM_ID
  );

  let fromTokenAccount = await mint.getOrCreateAssociatedAccountInfo(
    wallet.publicKey
  );
  console.log(fromTokenAccount);

  // Minteando 1 nuevo token hacia "fromTokenAccount"
  await mint.mintTo(
    fromTokenAccount.address, //donde va a ir
    wallet.publicKey, // quien tiene la autoridad de crear el token
    [], // multisig
    1000000000 // Cuanto
  );

  await mint.setAuthority(
    mint.publicKey,
    null,
    "MintTokens",
    wallet.publicKey,
    []
  );

  // Crear la transacción
  let transaction = new web3.Transaction().add(
    splToken.Token.createTransferInstruction(
      splToken.TOKEN_PROGRAM_ID,
      fromTokenAccount.address,
      fromTokenAccount.address,
      wallet.publicKey,
      [],
      1
    )
  );

  // Firmar la transacción, emitirla y confirmar que se ha realizado con éxito

  let signature = await web3.sendAndConfirmTransaction(
    connection,
    transaction,
    [wallet],
    { commitment: "confirmed" }
  );
  console.log("SIGNATURE", signature);
}

main();
