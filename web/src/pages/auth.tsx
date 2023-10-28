import { config } from 'dotenv'
config()

export default function Auth() {
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const CLIENT_ID = process.env.CLIENT_ID;
    const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
    const SCOPES = "user-library-read"

    const handleConnectToSpotify = () => {
        window.location.href = `${SPOTIFY_AUTH_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES}&response_type=code`
    }

        return (
        <div className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="flex flex-col md:flex-row pt-2 md:space-x-2">
                <button onClick={handleConnectToSpotify} className="btn btn-success">
                    Connect to Spotify
                </button>
            </div>
        </div>
    )
}