'use client'

import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Dashboard() {
    const {data:session, status} = useSession();
    const router = useRouter();

    //redirect unauthorised users
    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        }
    }, [status, router]);

    if (status === 'loading') {
        return <p>Loading Dashboard...</p>
    }

    // access account data
    const accountRole = session?.user?.role;
    const accountEmail = session?.user?.email;

    return(
        <div>
            {/*Dashboard */}
            
            
            {/* Conditional rendering based on role */}
            {accountRole === 'Administrator' && <p>Admin specified content here.</p>}
            {accountRole === 'Doctor' && <p>Doctor specified content here</p>}
            {accountRole === 'Nurse' && <p>Doctor specified content here</p>}
            {accountRole === 'Patient' && <p>Doctor specified content here</p>}
        </div>

    )
}