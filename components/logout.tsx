"use client"
import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { useRouter } from "next/navigation"
import { LogOutIcon } from 'lucide-react'
import { useTransition } from 'react'
import useWishlistStore from '@/lib/store/useWishlistStore'
import { start } from 'repl'

export function Logout() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const resetWishlist = useWishlistStore((state) => state.hydrate);
    


    const handleLogout = async () => {
        startTransition(async () => {
            try {
                await authClient.signOut()
   
       
                useWishlistStore.setState({ savedEventIds: new Set(), isHydrated: false });

                toast.success("Logged out successfully",
                    {
                        description: "You have been logged out.",
                        duration: 4000,
                    });
            
                router.push('/');
                router.refresh();
            } catch (error) {
                console.error('Logout error:', error);
                toast.error("Logout failed",
                    {
                        description: "An error occurred during logout. Please try again.",
                        duration: 4000,
                    }
                );
            }
        })

    }
    return (
        <div>
  <Button
        variant="outline"
        onClick={handleLogout}
        disabled={isPending}
        className="gap-2"
      >
        {isPending ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            Logging out...
          </>
        ) : (
          <>
            Logout <LogOutIcon className="size-4" />
          </>
        )}
      </Button>
        </div>
    )
}


