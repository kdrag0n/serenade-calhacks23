import { useAuth0 } from "@auth0/auth0-react";

export default function Auth() {
    const { loginWithRedirect } = useAuth0();

        return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col md:flex-row pt-2 md:space-x-2">
                <button onClick={loginWithRedirect} className="btn btn-success">
                    Connect to Spotify
                </button>
            </div>
        </div>
    )
}