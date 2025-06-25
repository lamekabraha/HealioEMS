import mysql, { Pool } from "mysql2/promise";
import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "../../../lib/auth";

const pool: Pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

export async function POST(request: NextRequest){
    try{
        const { email, password, type} = await request.json();

        if (!email || !password || type) {
            return NextResponse.json({message: 'All fields must be provided'}, {status:400});
        }

        // hash password
        const hashedPassword = await hashPassword(password);

        //insert new account into the database
        const [result]: any = await pool.query(
            'insert into accounts(Email, HashedPassword, Type) values (?, ?, ?)',
            [email, hashedPassword, type]
        );

        return NextResponse.json({message: 'User registered successfully', accountID: result.insertId}, {status:201});
    }catch (err: any){
        //handle duplicate error
        if (err.code === 'ER_DUP_ENTRY') {
            return NextResponse.json({message: 'Email already exists'}, {status: 409});
        }
        console.error('Registration API Error:', err);
        return NextResponse.json({message: 'Internal server error during registration', error: err.message});
    }
}