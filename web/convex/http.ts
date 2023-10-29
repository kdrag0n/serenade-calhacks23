import { httpRouter } from "convex/server";
import { spotifyAuth } from "./spotifyAuth";
import { storeYoutubeFile } from "./storeYoutubeFile";

const http = httpRouter();

http.route({
  path: "/getAuth",
  method: "POST",
  handler: spotifyAuth,
});

http.route({
  path: "/storeYoutubeFile",
  method: "POST",
  handler: storeYoutubeFile,
});

// Convex expects the router to be the default export of `convex/http.js`.
export default http;
