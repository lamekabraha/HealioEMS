'use client';
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null); // clear previous errors

        // call signIn function
        const result = await signIn('credentials', {
            redirect: false, // prevent NextAuth from redirecting automatically
            email,
            password,
        });

        if (result?.error) {
            setError(result.error);
            console.error('login error:', result.error);
        }else {
            // login success, redirect to dashboard
            console.log('Login successful!');
            window.location.href = '/dashboard';
        }
    };

    return (
        <div className="BACKGROUND inset-0 bg-cover bg-repeat bg-blend-multiply h-screen"
        style={{
          backgroundImage: "url(/hospitalTeam.jpg)",
          backgroundColor: '#add8e6'
        }}>
            <div className="HEADER bg-darkBlue flex items-center opacity-80 justify-between pl-5 pr-5">
                <Link href="/">
                    <div className="LOGO flex items-center gap-x-2">
                    <Image
                        src='/logo.png'
                        alt="Healio EMS Logo"
                        width={64}
                        height={64}
                    />
                    <p className="text-pureWhite text-3xl">Healio EMS</p>
                    </div>        
                </Link>
                <div className="BUTTONS flex gap-x-4">
                    <Link href="/login">
                        <button 
                            className="
                                border-2
                                border-softBlue 
                                px-2 py-1 rounded-2xl 
                                hover:bg-activeBlue 
                                text-pureWhite"
                        >
                            Login
                        </button>
                    </Link>
                    <Link href="/register">
                        <button 
                            className="
                            border-2 
                            border-softBlue 
                            px-2 py-1 
                            rounded-2xl 
                            hover:bg-activeBlue 
                            text-pureWhite"
                        >
                            Register
                        </button>
                    </Link>
                </div>
            </div>

            <div className="
                LOGIN
                border-1
                border-softBlue
                bg-softBlue
                flex
                justify-center
                items-center
            ">
                <h1>Login</h1>
                {error && <p style={{color: 'red'}}>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="hover:bg-activeBlue border-1 border-activeBlue ">Sign In</button>
                </form>
            </div>
        </div>
    )
}