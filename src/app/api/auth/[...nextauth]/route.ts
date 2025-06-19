import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import mysql, {  Pool  } from 'mysql2/promise';
import {  verifyPassword  } from '@/lib/auth';
import { routeModule } from 'next/dist/build/templates/pages';
import bcrypt from 'bcryptjs';

const pool: Pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export const { handlers, auth, signIn, signOut } = NextAuth({
    providers: [
        CredentialsProvider({
            credentials:{
                email: {label: 'Email', type: 'email'},
                password: {label: 'Password', type: 'password'},
            },
            async authorize(credentials) {
                try{
                    //type guard for cred
                    if(!credentials?.email || credentials?.password){
                        throw new Error('Missing credentials');
                    }

                    // fimd account by email
                    const [rows]: [any[], any] = await pool.query(
                        'select * from accounts where Email = ?',
                        [credentials.email]
                    );

                    // check if user exists
                    if (rows.length === 0) return null;

                    const user = rows[0];

                    // verify password
                    const isValid = await verifyPassword(
                        credentials.password.toString(),
                        user.HashedPassword
                    );

                    if (!isValid) return null;

                    //return user object for session
                    return{
                        id: user.AccountID.toString().padStart(4, '0'), // format as '0001'
                        email: user.Email,
                        role: user.Type,
                    };
                }catch (err) {
                    console.error('Authentication Error:', err);
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        // add role to JWT token
        async jwt({token, user}) {
            if (user) {
                token.role = user.role;
                token.id = user.id;
            }
            return token;
        },
        // expose role in client-side session
        async session({session, token}) {
            session.user.role = token.role;
            session.user.id = token.id;
            return session;
        },
    },
    session: {strategy: 'jwt'},
    pages: {
        signIn: '/login',
        error: '/auth/error',
    },
});