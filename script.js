const jose = require('jose');
const rsa = require('node-rsa');
const fs = require('fs');


async function jwtCreator() {


const alg = 'RS256'
const pkcs8 = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC8w2spV6QKXfLz
isv4KVomutLnFq8d9sxkcUi+IrCIwxj84u2zyt9GcMn/ReVW90X0Mza4FD4EVe2Z
+4tSGb29DY9ZDecvk0i/rm606WnvirBXFDlwwPFbip+dr7baoO/tKgwTthxIwjIv
vpfkPQNCTSVSBbksBxG7iAYoy3jwbm6F99Ow9I+VKTVeQFxkawxp8sB/iKfATwVz
8jeECaHfkGCwcnAwYaTTVpQFOYfHgexDUxFHLpnly3MeSRsVoVJ98NNE7btq1gbM
plMxTBvwJ2kvfjU5XwG9xI7pM9GQu6Kop3cmXVviwgkUlFFmBWY62lR5FiZPChPj
t4jZpLqxAgMBAAECggEAcMMUixftyLui3NX3TwH09tn4D1A/wFikdQQvflXeu3RA
wyEU+qighMXwBWzNugvxYBYQBBsjiReD3s6jxaHW9M7a6Uoi5wrHFKqxO6WMQSrK
eNp+DdtU02iWPW6wfx5Q9Y5+tG+/qb9Il7j1p8TC46KOPtdobOK0NyDk/Q2/63Ak
1aU6u+nVYvI4+Rya0fVvPKcOb/d2kX4hp44TwaPvfPrqUaYAqM4DfZuSLutCcGUT
GqbOZrE7RfDlgjvL0QWSrJ+yoCvM0my4uzFYR0uqYPF47CPl9p6YdOZ0QNFtfTLi
q2lfho6niNhZ/XRoPjV72ILuwL7C7s1tu78BP7dy+QKBgQDzhld9Zx92lIqLG/DS
S4A3XvlQcbNLNlcUR4IGEcbChyu/mQKih2DXlnDCfx2PBbgtwl7Ofq53XmqcvNau
UdcGrgZVnOtkQWq26ct5X/cOHjNmejT9ukl57olErgUhQpcmtpK+OWPw6EM6EaAD
QnN232k8v+64AzxdJB5Tixg5fwKBgQDGbus7U86g8TC+7S0hxW0h9BYLh9Ml10R3
a5s1/Hh1VG2G3d2d1DihHZG3P0UXxFdoRRItHcwKDWmhHrphEVv5ESVpZkODpr9r
7P1hRkMc/IyDTkQW7dZUvlrq+fpgBBEag2cAnoTNNb0vTjBcZyU3zw71+/+Vpn8Z
XHnoAv5DzwKBgHP6izhiII3s+H5/9BVzd8DnLn2taOJtItO5qqcRWEPU9HTvfl3B
c9G5CELZH066PpksdNKLarPW95dmKCglOe8oekPT1BePQC+U8R8BITxMDdbEZPBi
BBRaEm3vIupQOIRrdz+5PWvCciH5uudSgoMeq5QPJLXmdJ03UmofWI4pAoGBAIsJ
bQlEz6M1XFJrHRRsoOsJe+jYYrpA+1gxra9GF6EeZx/4lS/hY0yAy3j6fA8LI7OL
shCqsCza+QhL34vj/e2mdfBEF0pHrBiTFXbzJFNLIalfTZZDT8pRFqNORIDCWLmb
GLD2YVboMIbU4k3cd9eC3Zi92XeiEaxTf5dxgXdBAoGBAJ1Cr6QtrUrXSt4hk68V
Y7+38R+cgRBiCJeO9T0SPXwdQq20z4R0kjwQqBuVMgiTKbFaqQURFKZG6XAN88SW
zLcNlughT23+koh02azV7V0Yq4ozduOr3I9tB6wq6LV4vNW46MZQXkZCcGmSZklI
X/Yp80UOYM74B5evnMctGiU/
-----END PRIVATE KEY-----`

const privateKey = await jose.importPKCS8(pkcs8, alg)

const jwt = await new jose.SignJWT({})
  .setProtectedHeader({ alg })
  .setIssuedAt()
  .setIssuer('AliBot')
  .setAudience('GitHub')
  .setExpirationTime('15m')
  .sign(privateKey)


fs.openSync("./jwt.txt", "w")
fs.writeFileSync("./jwt.txt", jwt)
return jwt
}



jwtVerify()

async function jwtVerify() {


const alg = 'RS256'
const spki = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvMNrKVekCl3y84rL+Cla
JrrS5xavHfbMZHFIviKwiMMY/OLts8rfRnDJ/0XlVvdF9DM2uBQ+BFXtmfuLUhm9
vQ2PWQ3nL5NIv65utOlp74qwVxQ5cMDxW4qfna+22qDv7SoME7YcSMIyL76X5D0D
Qk0lUgW5LAcRu4gGKMt48G5uhffTsPSPlSk1XkBcZGsMafLAf4inwE8Fc/I3hAmh
35BgsHJwMGGk01aUBTmHx4HsQ1MRRy6Z5ctzHkkbFaFSffDTRO27atYGzKZTMUwb
8CdpL341OV8BvcSO6TPRkLuiqKd3Jl1b4sIJFJRRZgVmOtpUeRYmTwoT47eI2aS6
sQIDAQAB
-----END PUBLIC KEY-----`
const publicKey = await jose.importSPKI(spki, alg)
const jwt = await jwtCreator()
console.log(jwt)

try {
const hasJWT = await jose.jwtVerify(jwt, publicKey, {
  issuer: 'AliBot',
  audience: 'GitHub',
})
console.log(hasJWT)
}
catch(e) {
    if (e.code === 'ERR_JWT_EXPIRED') {
    console.log(e)

}
    else {
        console.log("another err: ", e)
    }

}}





// code to generate public and private key pairs for jwt signing and verification using rsa algorithm

/* 
generatePair()

function generatePair() {

    const key = new rsa().generateKeyPair();
    const publicKey = key.exportKey('pkcs8-public-pem')
    const privateKey = key.exportKey('pkcs8-p')
    // console.log(publicKey)
    // console.log(privateKey)
    fs.openSync("./public.txt", "w")
    fs.writeFileSync("./public.txt", publicKey)
    fs.openSync("./private.txt", "w")
    fs.writeFileSync("./private.txt", privateKey)
    return {publicKey, privateKey}


 } 

 console.log(generatePair().publicKey)
*/

