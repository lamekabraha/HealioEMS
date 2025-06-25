//next-auth step 5 type augmentations - custome role property for user object
import NextAuth from 'next-auth';
import { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

// step 1 - extend built-in User object types
declare module 'next-auth' {
    interface User {
        id: string,
        email: string,
        role: 'Patient' | 'Doctor' | 'Nurse' | 'Administrator';
    }

    // step 2 - extend built-in session types
    interface Session {
        user: {
            id: string; //add to session.user 
            email:string; //add to session.user
            role: 'Patient' | 'Doctor' | 'Nurse' | 'Administrator'; //add to session.user
        } & DefaultSession['user']; //merge with default session user properties
    }
}


// step 3 - extend built-in JWT types
declare module 'next-auth/jwt' {
    interface JWT {
        id: string; //add to JWT types
        email: string; //add to JWT types
        role: 'Patient' | 'Doctor' | 'Nurse' | 'Administrator'; //add to JWT types
    }
}