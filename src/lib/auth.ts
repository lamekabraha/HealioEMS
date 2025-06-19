import bcrypt from 'bcryptjs';
import { AsyncCallbackSet } from 'next/dist/server/lib/async-callback-set';
import { Sacramento } from 'next/font/google';

const SALT_ROUNDS = 12;


//hash password
export async function hashPassword(password: string): Promise<string>{
    return await bcrypt.hash(password, SALT_ROUNDS);
}

// compare password with hashedPassword
export async function verifyPassword(
    password: string,
    hashedPassword:string
):Promise<boolean>{
    return await bcrypt.compare(password, hashedPassword)
}