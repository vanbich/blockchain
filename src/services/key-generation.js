const EC = require('elliptic').ec;
const ec= new EC('secp256k1');
const fs = require('fs');

export const keyGeneration =()=>{
    const privateKey = ec.genKeyPair();
    fs.appendFile('key.txt', privateKey, function (err) {
        if(err) throw err;
        console.log('save');
    })
};
