import NextAuth from "next-auth";

//extend the built-in User type to include custome 'role' property from [nextauth]/route.ts
declare module 'next-auth'{
    interface User {
        role?: string;
        id?: string;
    }

    interface Session {
        user: {
            role?: string;
            id?: string;
        } & DefaultSession['user'];
    }
}