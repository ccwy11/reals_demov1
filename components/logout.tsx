"use client"
import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { LogOutIcon } from 'lucide-react'

export function Logout() {

    const handleLogout = async () => {

        await authClient.signOut()
        toast.success("Logged out successfully")

    }
    return (
        <div>
            <Button variant="outline" onClick={handleLogout} >
                Logout <LogOutIcon className='size-4' />
            </Button>
        </div>
    )
}


