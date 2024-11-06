import {
    Connection,
    Keypair,
    Transaction,
    SystemProgram,
    TransactionInstruction,
    PublicKey,
    SYSVAR_RENT_PUBKEY,
    SendTransactionError,
    VersionedTransaction,
    TransactionMessage
  } from '@solana/web3.js';
  import * as path from 'path';
import * as dotenv from 'dotenv';
  const anchor = require('@project-serum/anchor')
  const envFilePath = path.resolve(__dirname, '../.env');
  dotenv.config({ path: envFilePath });
  
  import { Program, AnchorProvider, web3, Wallet, setProvider, BN } from '@project-serum/anchor';
  import { TOKEN_PROGRAM_ID } from '@solana/spl-token';
  import * as borsh from "@coral-xyz/borsh";

  // Solana network (devnet in this case)
  const connection = new Connection('https://black-side-dawn.solana-devnet.quiknode.pro/34914fab50708164e45c152a3bb6135d85ae7611', {
    commitment: 'confirmed',
    wsEndpoint: 'wss://black-side-dawn.solana-devnet.quiknode.pro/34914fab50708164e45c152a3bb6135d85ae7611',
  });  

  // Load a keypair (you can use your own wallet or generate one)

  const wallet = new Wallet(Keypair.fromSecretKey(
    Uint8Array.from(JSON.parse(process.env.ANCHOR_WALLET as string))
  ));
  console.log(`Payer public key: ${wallet.publicKey.toBase58()}`);
  

  const owner = wallet; // Vault 的拥有者
const mint = new PublicKey("5Tzkr68aNmUB3VATYtkC2GVEXxV8KVgKSRfyVcoyQkCD"); // Token 的 mint 地址
const ownerTokenAccount = new PublicKey("dANuGKvtAefsmK34XkckhMXxwG9aZ4KLfdKL98MouTY"); // 拥有者的Token账户地址
const vault = new PublicKey("7UsKN66MhP8oJAGUNubnupMMjgkdv5jTEKFpMy3aBK14"); // 你的 Vault 地址
const vaultAuthority = new PublicKey("GEaaLKPqMu9yw483vPHRQiZv2fw8r2QWZYx6spUMx3gE"); // Vault 的 authority 地址
const vaultTokenAccount = new PublicKey("FDBrHMLHGLLa3YTxvhJ3TkiZQyD3ukvDiQXpfPZMcN9W"); // Vault 存放代币的账户地址




  /// ==================================================== init.  ================================================

// // The first 8 bytes
// const first8Bytes = Buffer.from([48, 191, 163, 44, 71, 129, 63, 164]);
// // The BigInt value (10) converted to a little-endian 8-byte buffer
// const second8Bytes = Buffer.alloc(8);
// second8Bytes.writeBigUInt64LE(BigInt(10), 0);
// const instructionData = Buffer.concat([first8Bytes, second8Bytes]);
// console.log(instructionData)

// const initializeVaultInstruction = new TransactionInstruction({
//     keys: [
//         { pubkey: owner.publicKey, isSigner: true, isWritable: true },
//         { pubkey: mint, isSigner: false, isWritable: false },
//         { pubkey: ownerTokenAccount, isSigner: false, isWritable: true },
//         { pubkey: vault, isSigner: false, isWritable: true }, // Vault 地址
//         { pubkey: vaultAuthority, isSigner: false, isWritable: false }, // Vault Authority 地址
//         { pubkey: vaultTokenAccount, isSigner: false, isWritable: true }, // Vault 存储代币的账户
//         { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // Token program ID
//         { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }, // System program ID
//         { pubkey: new PublicKey("SysvarRent111111111111111111111111111111111"), isSigner: false, isWritable: false } // Rent 系统程序
//     ],
//     programId: new PublicKey("JAd7tStmfYcnhhc1Sh2CX8n99Hssk4rDVTHwu7KmHQ9S"),  // 你合约的程序ID
//     data: instructionData, // 存储参数的Buffer
// });










  /// ==================================================== deposit.  ================================================

// //   The first 8 bytes
// const first8Bytes = Buffer.from([242,35,198,137,82,225,242,182]);
// // The BigInt value (10) converted to a little-endian 8-byte buffer
// const second8Bytes = Buffer.alloc(8);
// second8Bytes.writeBigUInt64LE(BigInt(500));
// const instructionData = Buffer.concat([first8Bytes, second8Bytes]);
// console.log(instructionData)

// const initializeVaultInstruction = new TransactionInstruction({
//     keys: [
//         { pubkey: owner.publicKey, isSigner: true, isWritable: true },
//         { pubkey: ownerTokenAccount, isSigner: false, isWritable: true },
//         { pubkey: mint, isSigner: false, isWritable: false },
//         { pubkey: vault, isSigner: false, isWritable: true }, // Vault 地址
//         { pubkey: vaultAuthority, isSigner: false, isWritable: false }, // Vault Authority 地址
//         { pubkey: vaultTokenAccount, isSigner: false, isWritable: true }, // Vault 存储代币的账户
//         { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // Token program ID
//     ],
//     programId: new PublicKey("JAd7tStmfYcnhhc1Sh2CX8n99Hssk4rDVTHwu7KmHQ9S"),  // 你合约的程序ID
//     data: instructionData, // 存储参数的Buffer
// });



  /// ==================================================== withdraw.  ================================================
 
// The first 8 bytes
const first8Bytes = Buffer.from([183,18,70,156,148,109,161,34]);
// The BigInt value (10) converted to a little-endian 8-byte buffer
const second8Bytes = Buffer.alloc(8);
second8Bytes.writeBigUInt64LE(BigInt(500));

// const stringToAdd = "ca3cfb832b9ab97093cda8c0b530796e619444a9ec297affcda06b136a1bbfddc2da0d8b90f8effb01d3d04ad3bb4efa7afeed294c3f2a1a653484cbf29e8b0b";
// const stringBuffer = Buffer.from(stringToAdd, 'hex'); // Convert hex string to buffer
// const instructionData = Buffer.concat([first8Bytes, second8Bytes, stringBuffer]);

const schema = borsh.struct([
    borsh.u64("deposit"),
    borsh.str("sig"),
  ]);
  const buffer = Buffer.alloc(1000);
  schema.encode(
    { deposit: new anchor.BN(500), sig: "ca3cfb832b9ab97093cda8c0b530796e619444a9ec297affcda06b136a1bbfddc2da0d8b90f8effb01d3d04ad3bb4efa7afeed294c3f2a1a653484cbf29e8b0b" },
    buffer,
  );
  const instructionBuffer = buffer.subarray(0, schema.getSpan(buffer));
const instructionData = Buffer.concat([first8Bytes, instructionBuffer]);

console.log(instructionData)

const initializeVaultInstruction = new TransactionInstruction({
    keys: [
        { pubkey: owner.publicKey, isSigner: true, isWritable: true },
        { pubkey: ownerTokenAccount, isSigner: false, isWritable: true },
        { pubkey: mint, isSigner: false, isWritable: false },
        { pubkey: vault, isSigner: false, isWritable: true }, // Vault 地址
        { pubkey: vaultAuthority, isSigner: false, isWritable: false }, // Vault Authority 地址
        { pubkey: vaultTokenAccount, isSigner: false, isWritable: true }, // Vault 存储代币的账户
        { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: false }, // Token program ID
    ],
    programId: new PublicKey("JAd7tStmfYcnhhc1Sh2CX8n99Hssk4rDVTHwu7KmHQ9S"),  // 你合约的程序ID
    data: instructionData, // 存储参数的Buffer
});













//
    // const owner = wallet; // The owner account initiating the withdrawal
    // const ownerTokenAccount = new PublicKey('dANuGKvtAefsmK34XkckhMXxwG9aZ4KLfdKL98MouTY');
    // const mint = new PublicKey('5Tzkr68aNmUB3VATYtkC2GVEXxV8KVgKSRfyVcoyQkCD');
    // const vault = new PublicKey('C2vSzJtbANMee4khDXJPGU4ZjLjrVrJ1pHHqaEj3Ps1K');
    // const vaultAuthority = new PublicKey('EPcCkkcCqq5Mvzxw7kDvA6ycy6gSt4F5J87fSKPAs2Pn');
    // const vaultTokenAccount = new PublicKey('266ja4RHCu2SERAxExoV9X9yBRitgruWyaVnXQhTdbjB');

//     const withdrawAmount = 500; // in the smallest unit (e.g., lamports or tokens)
//     const sig = 'ca3cfb832b9ab97093cda8c0b530796e619444a9ec297affcda06b136a1bbfddc2da0d8b90f8effb01d3d04ad3bb4efa7afeed294c3f2a1a653484cbf29e8b0b'; // Replace with actual signature

//   // Contract address (replace with your contract's public key)
//   const programId = new PublicKey('G1KSZYwRskC6W5TtcyCuS19aGTRKrseMezECh8H7gp1z');
  
//   // Create an instruction to interact with the program
//   // Replace 'YourInstructionData' with actual data for your contract's method

//   const withdrawAmountBuffer = Buffer.alloc(8); // u64占8字节
//   withdrawAmountBuffer.writeBigUInt64LE(BigInt(withdrawAmount));
  
//   const sigBuffer = Buffer.from(sig, 'hex'); // 将签名转为Buffer
  


    // const owner = wallet; // The owner account initiating the withdrawal
    // const ownerTokenAccount = new PublicKey('dANuGKvtAefsmK34XkckhMXxwG9aZ4KLfdKL98MouTY');
    // const mint = new PublicKey('5Tzkr68aNmUB3VATYtkC2GVEXxV8KVgKSRfyVcoyQkCD');
    // const vault = new PublicKey('C2vSzJtbANMee4khDXJPGU4ZjLjrVrJ1pHHqaEj3Ps1K');
    // const vaultAuthority = new PublicKey('EPcCkkcCqq5Mvzxw7kDvA6ycy6gSt4F5J87fSKPAs2Pn');
    // const vaultTokenAccount = new PublicKey('266ja4RHCu2SERAxExoV9X9yBRitgruWyaVnXQhTdbjB');

//     const withdrawAmount = 500; // in the smallest unit (e.g., lamports or tokens)
//     const sig = 'ca3cfb832b9ab97093cda8c0b530796e619444a9ec297affcda06b136a1bbfddc2da0d8b90f8effb01d3d04ad3bb4efa7afeed294c3f2a1a653484cbf29e8b0b'; // Replace with actual signature

//   // Contract address (replace with your contract's public key)
//   const programId = new PublicKey('G1KSZYwRskC6W5TtcyCuS19aGTRKrseMezECh8H7gp1z');
  
//   // Create an instruction to interact with the program
//   // Replace 'YourInstructionData' with actual data for your contract's method

//   const withdrawAmountBuffer = Buffer.alloc(8); // u64占8字节
//   withdrawAmountBuffer.writeBigUInt64LE(BigInt(withdrawAmount));
  
//   const sigBuffer = Buffer.from(sig, 'hex'); // 将签名转为Buffer
  








//   const instruction = new TransactionInstruction({
//     keys: [
//       { pubkey: owner.publicKey, isSigner: true, isWritable: false }, // Owner account
//       { pubkey: ownerTokenAccount, isSigner: false, isWritable: true }, // Owner token account
//       { pubkey: mint, isSigner: false, isWritable: false }, // Token mint
//       { pubkey: vault, isSigner: false, isWritable: true }, // Vault account
//       { pubkey: vaultAuthority, isSigner: false, isWritable: false }, // Vault authority
//       { pubkey: vaultTokenAccount, isSigner: false, isWritable: true }, // Vault token account
//     ],
//     programId: programId, // The program's public key
//     data: instructionData, // Data to send to the contract (message + signature)
//   });
  

  // Create a transaction and add the instruction
  const transaction = new Transaction().add(initializeVaultInstruction);
  
  // Send the transaction
  async function sendTransaction() {
    // const signature = await connection.sendTransaction(transaction, [wallet.payer]);
    // console.log('Transaction signature:', signature);
  
    // // Confirm the transaction
    // const confirmation = await connection.confirmTransaction(signature, 'confirmed');
    // console.log('Transaction confirmed:', confirmation);
   

    try {
        // 发送交易
        const signature = await connection.sendTransaction(transaction, [wallet.payer]);
      
        console.log('Transaction sent:', signature);
      
        // 等待交易确认
        const transactionResult = await connection.getTransaction(signature);
      
        if (transactionResult) {
          // 获取交易的日志信息
          console.log('Transaction logs:', transactionResult.meta?.logMessages);
        } else {
          console.log('Transaction not found.');
        }
      
      } catch (error) {
        console.log('Error sending transaction:', error);
      }
  }
  
  // Execute the function to send the transaction
  sendTransaction().catch((err) => console.error(err));
  