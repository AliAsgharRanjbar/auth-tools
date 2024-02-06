import * as jose from 'jose';
import * as fs from 'fs';

// Generate a JSON Web Token using a private key

export async function JWTCreator(alg, pvtkey) {

  const privateKey = await jose.importPKCS8(pvtkey, alg)

  const JWT = await new jose.SignJWT({})
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setIssuer('AliBot')
    .setAudience('GitHub')
    .setExpirationTime('15m')
    .sign(privateKey)

  fs.openSync("./JWT.txt", "w")
  fs.writeFileSync("./JWT.txt", JWT)
  return JWT

}



// Verify a JSON Web Token using the corresponding public key

export async function JWTVerifier(token, alg, pubkey) {

    const publicKey = await jose.importSPKI(pubkey, alg)

    try {
        const hasJWT = await jose.jwtVerify(token, publicKey, {
        issuer: 'AliBot',
        audience: 'GitHub',
        })
        return hasJWT;
    }
    catch (e) {
        if (e.code === 'ERR_JWT_EXPIRED') {
        return e;
    }
        else {
            return "err: ", e;
        }
}}