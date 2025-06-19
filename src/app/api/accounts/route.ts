import mysql from 'mysql2/promise';
import { NextResponse, NextRequest } from 'next/server';

let conn = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
}

export async function GET(request: NextRequest) {
    try{
        const connection = await mysql.createConnection(conn)
        let query = ''
        query = 'select * from accounts';

        let values:any[] = []

        const [results] = await connection.execute(query, values)

        connection.end()
        return NextResponse.json(results)

    }catch (err) {
        console.log("ERROR:API - ", (err as Error).message)

        const response = {
            error: (err as Error).message,
            returnedStatus:200,
        }

        return NextResponse.json(response, {status:200})
    }
}