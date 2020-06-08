const EC = require("elliptic").ec;
const ec = new EC("secp256k1");


export default class keyGeneration {
  constructor(){
    const key = ec.genKeyPair();
    this.privateKey = key.getPrivate('hex');
    this.publicKey = key.getPublic('hex');
  }
};
