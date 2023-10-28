import { useRouter } from 'next/router';
import { RedirectToSignIn } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

export default function Auth() {
    const { isLoading, isAuthenticated } = useConvexAuth();
    const router = useRouter();

        return (
        <div className="flex min-h-screen bg-gradient-to-b from-[#11998e] to-[#237A57] flex-col items-center justify-between p-24">
            {isAuthenticated ? router.push('/') : <RedirectToSignIn/>}
        </div>
    )
}
