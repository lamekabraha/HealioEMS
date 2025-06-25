import NextAuth from "next-auth";
import mysql, {Pool} from 'mysql2/promise'
import CredentialsProvider from 'next-auth/providers/credentials';
import { verifyPassword } from '@/lib/auth';

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

const Auth = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt', // recommended for stateless sessions
    },
    providers: [
        CredentialsProvider({
            name: "Credentials", //name of provider - email and passwords, etc
            //define fields for credential object
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password"}
            },
            
            //verify against database here
            async authorize(credentials) {
                try {
                    if (typeof credentials.email !== 'string' || typeof credentials.password !=='string'){
                        console.error('Invalid credentials type provided in authorize callback.')
                        return null;
                    }

                    //step 1 find email in database
                    const [rows]: any = await pool.query(
                        'select * from accounts where Email = ?',
                        [credentials.email]
                    );

                    //step 2 check if user exists
                    // if user does not exist
                    if (rows.length===0){
                        console.log('No user found with this email:', credentials.email);
                        return null;
                    }
                    
                    //if user exists
                    const user = rows[0]

                    //step 3 verify password using bcryptjs
                    const isValid = await verifyPassword(
                        credentials.password,
                        user.HashedPassword
                    );

                    if (!isValid){
                        console.log('Invalid Password for user:', credentials.email)
                        return null;
                    }

                    //step 44 return user object for session
                    //'user' object is passed tio the 'jwt' callback
                    //must include 'ID' and can include other properties
                    return {
                        id: user.AccountID.toString(),
                        email: user.Email,
                        type: user.Type,
                    };
                }catch (err){
                    console.error('NextAuth authorize error:', err);
                    return null
                }
            },
        }),
    ],
    //step 5 these are essential for customising session and JWT
    callbacks: {
        // JWT callback is called when a JWT is created, updated, or read
        // add custom data to the JWT token here
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.email = user.email;
                token.role = user.role;
            }
            return token;
        },
        //session callback called whenever a session is called
        async session({session, token}) {
            if (token) {
                session.user.id = token.id,
                session.user.email = token.email,
                session.user.role = token.role
            }
            return session;
        },
    },
}

export const {handlers} = NextAuth(Auth);
export const GET = handlers.GET;
export const POST = handlers.POST;
export const {auth, signIn, signOut} = NextAuth(Auth);
