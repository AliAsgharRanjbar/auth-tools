import * as bcrypt from 'bcrypt';

// Hash a given password using Bcrypt module

export async function passwordHasher (password) {
    const hashed = await bcrypt.hash(password, 12)
    return hashed;
}



export async function passwordVerifier (password, hash) {
    const compare = await bcrypt.compare(password, hash)
    return compare === true ? "Password matched!" : "Password mismatched :("
}
