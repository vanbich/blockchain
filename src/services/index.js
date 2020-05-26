import SHA256 from "crypto.js";

const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

class Block {
  constructor(timestamp, data, prevHash = "") {
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.getHash;
    this.nonce = 0;
  }

  getHash = () => {
    return SHA256(
      this.timestamp.toString() +
        this.prevHash +
        JSON.stringify(this.data) +
        this.nonce
    ).toString();
  };

  proofOfWork = difficulty => {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.getHash();
    }
  };

  hasValidTransactions = () => {
    for (const tx of this.data) {
      if (!tx.isValid()) {
        return false;
      }
    }
    return true;
  };
}

class BlockChain {
  constructor() {
    this.blockchain = [this.genesisBlock()];
    this.difficulty = 1;
    this.spendingTransactions = [];
    this.reward = 100;
  }

  genesisBlock = () => {
    return new Block(0, new Date.now(), "Genesis block", "0");
  };

  getLastedBlock = () => {
    return this.blockchain[this.blockchain.length - 1];
  };

  miningTransactions = transactions => {
    const rewardTx = new Transaction(null, transactions, this.reward);
    this.spendingTransactions.push(rewardTx);

    const block = new Block(
      new Date.now(),
      this.spendingTransactions,
      this.getLastedBlock().hash
    );
    block.proofOfWork(this.difficulty);

    console.log("Block is mined!");

    this.blockchain.push(block);
    this.spendingTransactions = [];
  };

  createNewBlock = newBlock => {
    newBlock.prevHash = this.getLastedBlock().hash;
    newBlock.proofOfWork(this.difficulty);
    this.blockchain.push(newBlock);
  };

  validateChain = () => {
    for (let i = 1; i < this.blockchain.length; i++) {
      const currentBlock = this.blockchain[i];
      const prevBlock = this.blockchain[i - 1];

      if (!currentBlock.hasValidTransactions()) {
        return false;
      }

      if (currentBlock.hash !== currentBlock.getHash()) {
        return false;
      }

      if (currentBlock.prevHash !== prevBlock.hash) {
        return false;
      }
    }
    return true;
  };

  getBalance = address => {
    let balance = 0;
    for (const block of this.blockchain) {
      for (const trans of block.data) {
        if (trans.fromAdd === address) {
          balance -= trans.amount;
        }

        if (trans.toAdd === address) {
          balance += trans.amount;
        }
      }
    }
    return balance;
  };

  createTransaction=(transaction)=>{

      if(!transaction.fromAdd || !transaction.toAdd){
          throw new Error('Transaction must include from address and to address');
      }

      if(!transaction.isValid()){
          throw new Error('Cannot add transaction');
      }
      this.spendingTransactions.push(transaction);
  }
}

class Transaction {
  constructor(fromAdd, toAdd, amount) {
    this.fromAdd = fromAdd;
    this.toAdd = toAdd;
    this.amount = amount;
  }

  getHash = () => {
    return SHA256(this.fromAdd + this.toAdd + this.amount).toString();
  };

  signTransaction = key => {
    if (key.getPublic("hex") !== this.fromAdd) {
      throw new Error("You cannot sign transactions for other wallet!");
    }
    const hashTx = this.getHash();
    const sig = key.sign(hashTx, "base64");
    this.signature = sig.toDER("hex");
  };

  isValid = () => {
    if (this.fromAdd === null) return true;
    if (!this.signature || this.signature.length === 0)
      throw new Error("No signature in this transaction");
    const publicKey = ec.keyFromPublic(this.fromAdd, "hex");
    return publicKey.verify(this.getHash(), this.signature);
  };
}
