'use client';
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const result = await signIn("credentials", {
            email,
            password, 
            redirect: false,
        });

        if (result?.error) {
            setError("Invalid email or password");
        }else{
            router.push('/dashboard');
        }
    };

    return(
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold md-6">Login</h1>
            {error && <p className="text-red-500 md-4">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block md-1">Email</label>
                    <input type="email" className="w-full p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                </div>
                <div>
                    <label className="block md-1">Password</label>
                    <input type="password" name="password" id="password" className="w-full p-2 border rounded" value={password} onChange={(e)=>setPassword(e.target.value)} required />
                </div>
                <button
                    type="submit"
                    className="
                        w-full
                        bg-blue-600
                        text-white
                        p-2
                        rounded
                        hover:bg-blue-700
                        "
                >Sign In</button>
            </form>
        </div>
    )
}