import { Link } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import {  SignedOut, UserButton } from "@clerk/clerk-react";
import SignInOauthButton from "./SignInOauthButton";
import { useAuthStore } from "@/stores/useAuthStore";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
const Topbar = () => {
  
    const {isAdmin} = useAuthStore();
    console.log({isAdmin})
  
  // Replace with actual logic to determine if the user is an admin
    return (
    <div className="flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75
     backdrop-blur-md z-10">
        <div className="flex gap-2 items-center">
            <img src="/spotify.png" className="size-8" alt="seekide-logo" />
            Seekide 
        </div>
        <div className="flex items-center gap-4">
                {isAdmin && (
                    <Link to={"/admin"}
                    className={
                        cn(
                            buttonVariants({variant:"outline"})
                        )
                    }>
                    <LuLayoutDashboard className="size-4 mr-2" />
                    <span>Admin Dashboard</span>
                    </Link>
                )}
            {/* <SignedIn>
                <SignOutButton />
            </SignedIn> */}
            <SignedOut>
                <SignInOauthButton />
            </SignedOut>
            <UserButton />
        </div>
        </div>
  )
}

export default Topbar