import NodeRSA from 'node-rsa';
import * as fs from 'fs';

// generate public and private key pairs for jwt signing and verification using rsa algorithm

export default function RSAKeyGenerator() {

    const key = new NodeRSA().generateKeyPair();
    const pubKey = key.exportKey('pkcs8-public-pem')
    const pvtKey = key.exportKey('pkcs8-p')
    try {        
        fs.openSync("./publicKey.txt", "w")
        fs.writeFileSync("./publicKey.txt", pubKey)
        fs.openSync("./privateKey.txt", "w")
        fs.writeFileSync("./privateKey.txt", pvtKey)
        return  { pubKey, pvtKey };
    }
    catch (e) {
        return `Failed to create RSA key pair. \n Error: ${e}`;
    }
}