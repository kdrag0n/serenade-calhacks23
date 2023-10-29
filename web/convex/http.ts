import { httpRouter } from "convex/server";
import { spotifyAuth } from "./spotifyAuth";

const http = httpRouter();

http.route({
  path: "/getAuth",
  method: "POST",
  handler: spotifyAuth,
});

// Convex expects the router to be the default export of `convex/http.js`.
export default http;
