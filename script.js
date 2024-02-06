import RSAKeyGenerator from "./components/RSAKeyGenerator.js";
import { JWTCreator, JWTVerifier } from './components/JWTToken.js';
import { passwordHasher, passwordVerifier } from './components/passwordHash.js';
import { pvtKey, pubKey } from "./components/keys.js";

const hashedPassword = '$2b$12$/X3eUXvFfZZxlZMnl3UvyeIrV2hpjOf6Gi624yRudZzMEY/60KHHm'

async function script () {
 
  // Shows hashed given password using bcrypt with an auto-gen salt and rounds of 12 
  const hashedPass = await passwordHasher("myStr0ngPA$$word")
  console.log(hashedPass, '\n')

  // Compares a plain given password and a given hash and check if they match
  const verifyPassword = await passwordVerifier("myStr0ngPA$$word", hashedPassword)
  console.log(verifyPassword, '\n')

  // Creates a JWT token with given algorithm and private key as parameter
  const jwtCreate = await JWTCreator('RS256', pvtKey)
  console.log(jwtCreate, '\n')

  // Verifies a JWT token with given algorithm and public key as parameter
  const jwtVerify = await JWTVerifier(jwtCreate, 'RS256', pubKey)
  console.log(jwtVerify, '\n')

  // Creates a RSA key pair (public and private keys)
  const RSAPair = RSAKeyGenerator()
  console.log(RSAPair, '\n')
}


script()