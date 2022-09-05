// "use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");


const {
    getShows,
    getOtherShows,
    getSongs,
    getBandcamp,
    getComments,
    addRequest,
    addSong,
    addPompeyShow,
    addOtherShow
} = require("./handlers");

express()
    // Below are methods that are included in express(). We chain them for convenience.
    // --------------------------------------------------------------------------------

    // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
    .use(morgan("tiny"))
    .use(express.json())

    // Any requests for static files will go into the public folder
    // .use(express.static("public"))

    // Nothing to modify above this line
    // ---------------------------------
    
    .get("/api/get-shows", getShows)
    .get("/api/get-other-shows", getOtherShows)
    .get("/api/get-songs", getSongs)
    .get("/api/get-bandcamp", getBandcamp)
    .get("/api/get-comments", getComments)

    .post("/api/add-song", addSong)
    .post("/api/add-pompey-show", addPompeyShow)
    .post("/api/add-other-show", addOtherShow)
    .post("/api/add-request/:showid", addRequest)
    
    // .post("/api/add-showBass", addShowBass)
    // .post("/api/add-song", addSong)

    // .delete("/api/delete-song/:songid", deleteSong)
    // .delete("/api/delete-show/:showid", deleteShow)
    // .delete("/api/delete-othershow/:othershowid", deleteOtherShow)

    // ---------------------------------
    // Nothing to modify below this line

    // this is our catch all endpoint.
    .get("*", (req, res) => {
        res.status(404).json({
        status: 404,
        message: "This is obviously not what you are looking for.",
        });
    })

    // Node spins up our server and sets it to listen on port 8000.
    .listen(8000, () => console.log(`Listening on port 8000`));

