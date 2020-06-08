const crypto = require("crypto");

const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

export class Block {
  constructor(index, timestamp, data, prevHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.prevHash = prevHash;
    this.hash = this.getHash();
    this.nonce = 0;
  }

  getHash = () => {
    return crypto
      .createHash("sha256")
      .update(
        this.timestamp.toString() +
          this.prevHash +
          JSON.stringify(this.data) +
          this.nonce
      )
      .digest("hex");
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

export default class BlockChain {
  constructor(from, to) {
    this.blockchain = [this.genesisBlock(from, to)];
    this.difficulty = 4;
    this.spendingTransactions = [];
    this.reward = 100;
  }

  createTo({ blockchain, difficulty, spendingTransactions, reward }) {
    this.blockchain = blockchain;
    this.difficulty = difficulty;
    this.spendingTransactions = spendingTransactions;
    this.reward = reward;
  }
  genesisBlock (from, to) {
    return new Block(0, new Date().toString(), [{ fromAdd: from, toAdd: to, amount: 100}], "0");
  };

  getLastedBlock = () => {
    return this.blockchain[this.blockchain.length - 1];
  };

  miningTransactions = miningAddress => {
    const rewardTx = new Transaction(null, miningAddress, this.reward);
    this.spendingTransactions.push(rewardTx);

    const block = new Block(
      this.getLastedBlock().index + 1,
      new Date(),
      [...this.spendingTransactions],
      this.getLastedBlock().hash
    );
    block.proofOfWork(this.difficulty);

    for (let i = this.spendingTransactions.length; i > 0; i--) {
      this.spendingTransactions.pop();
    }

    this.blockchain.push(block);
  };

  createNewBlock = newBlock => {
    newBlock.index = this.getLastedBlock().index + 1;
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

  getBalance(address) {
    let balance = 0;
    console.log("this.blockchain", this.blockchain);
    for (const block of this.blockchain) {
      console.log(block);
      for (const trans of block.data) {
        if (trans.fromAdd === address) {
          console.log("trans -");
          balance -= trans.amount;
        }

        if (trans.toAdd === address) {
          console.log("trans +");
          balance += trans.amount;
        }
      }
    }
    return balance;
  }

  getAllTransactions(){
    let transactions = [];

    for (const block of this.blockchain) {
      for (const trans of block.data) {
        transactions.push(trans);
      }
    }

    return transactions;
  }
  getTransOfAddress(address) {
    let transactions = [];

    for (const block of this.blockchain) {
      for (const trans of block.data) {
        if (trans.fromAdd === address) {
          transactions.push(trans);
        }

        if (trans.toAdd === address) {
          transactions.push(trans);
        }
      }
    }

    for (const trans of this.spendingTransactions) {
      if (trans.fromAdd === address) {
        transactions.push(trans);
      }

      if (trans.toAdd === address) {
        transactions.push(trans);
      }
    }

    return transactions;
  }

  createTransaction = transaction => {
    if (!transaction.fromAdd || !transaction.toAdd) {
      throw new Error("Transaction must include from and to address");
    }

    // Verify the transactiion
    if (!transaction.isValid()) {
      throw new Error("Cannot add invalid transaction to chain");
    }

    if (transaction.amount <= 0) {
      throw new Error("Transaction amount should be higher than 0");
    }

    // Making sure that the amount sent is not greater than existing balance
    if (this.getBalance(transaction.fromAdd) < transaction.amount) {
      throw new Error("Not enough balance");
    }
    this.spendingTransactions.push(transaction);
  };
}

export class Transaction {
  constructor(fromAdd, toAdd, amount) {
    this.fromAdd = fromAdd;
    this.toAdd = toAdd;
    this.amount = amount;
  }

  getHash = () => {
    return crypto
      .createHash("sha256")
      .update(this.fromAdd + this.toAdd + this.amount)
      .digest("hex");
  };

  signTransaction = key => {
    console.log("key", key);
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
