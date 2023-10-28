import { config } from 'dotenv'
config()

export default function Auth() {
    const SPOTIFY_AUTH_URL = "https://accounts.spotify.com/authorize"
    const CLIENT_ID = "1526c36afb8b45ac8e684bb8729215b6"
    const REDIRECT_URI = "http://localhost:3000/mood"
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