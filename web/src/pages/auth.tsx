import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";

export default function Auth() {
    const { isLoading, isAuthenticated } = useConvexAuth();
        return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col md:flex-row pt-2 md:space-x-2">
                <button className="btn btn-success">
                    <SignInButton/>
                </button>
            </div>
            <div>
                {isAuthenticated ? "Logged in" : "Logged out or still loading"}
            </div>
        </div>
    )
}
