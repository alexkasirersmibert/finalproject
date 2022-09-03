"use strict";



// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4 } = require("uuid");

const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;


const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const client = new MongoClient(MONGO_URI, options);

// returns an array of all shows as "pompey"
const getShows = async (req, res) => {

    await client.connect();

    const db = client.db();

    try {
        const shows = await db.collection('pompeyshows').find().toArray();
        console.log(shows);

        res.status(200).json({status: 200, data: {shows}, message: "retrieved show data" });

    }
    catch (err){
        console.log(err);
        res.status(400).json({status: 400, error: err});
        client.close();
    }

}

// returns an array of all shows as sideman
const getOtherShows = async (req, res) => {

    await client.connect();

    const db = client.db();

    try {
        const shows = await db.collection('othershows').find().toArray();
        console.log(shows);

        res.status(200).json({status: 200, data: {shows}, message: "retrieved othershow data" });

    }
    catch (err){
        console.log(err);
        res.status(400).json({status: 400, error: err});
        client.close();
    }

}


// returns an array of all songs
const getSongs = async (req, res) => {

    await client.connect();

    const db = client.db();

    try {
        const songs = await db.collection('songs').find().toArray();
        console.log(songs);

        res.status(200).json({status: 200, data: {songs}, message: "retrieved song data" });

    }
    catch (err){
        console.log(err);
        res.status(400).json({status: 400, error: err});
        client.close();
    }

}

// returns an array of all songs
const getBandcamp = async (req, res) => {

    await client.connect();

    const db = client.db();

    try {
        const bandcamp = await db.collection('bandcamp').find().toArray();


        res.status(200).json({status: 200, data: bandcamp, message: "retrieved bandcamp data" });

    }
    catch (err){
        console.log(err);
        res.status(400).json({status: 400, error: err});
        client.close();
    }

}

const getComments = async (req, res) => {

    await client.connect();

    const db = client.db();

    try {
        const comments = await db.collection('songrequests').find().toArray();


        res.status(200).json({status: 200, data: comments, message: "retrieved bandcamp data" });

    }
    catch (err){
        console.log(err);
        res.status(400).json({status: 400, error: err});
        client.close();
    }

}


// adds a new song
const addSong = async (req, res) => {
    const body = req.body;
    // const id = uuidv4();
    console.log("body added id : ", body);
    try {
        await client.connect();
        const db = client.db();
        const update = await db.collection("pompeyshows").updateOne(body);
        console.log("update = ", update);

        if (update) {
        const insert = await db.collection("song").insertOne(body);
        console.log("insert = ", insert);
        if (insert) {
            res
            .status(200)
            .json({ status: 200, data: body });
        }
        } else {
        res.status(404).json({ status: 404, message: "Not found" });
        }
    } catch (err) {
        console.log("addSong err: ", err);
        res.status(500).json({ status: 500, message: err });
    }
    client.close();


};

const addRequest = async (req, res) => {
    const body = req.body;
    // const id = uuidv4();

    try {
        await client.connect();

        const db = client.db();

        const insert = await db.collection("songrequests").insertOne(body);
        console.log("insert = ", insert);
        if (insert) {
            res
            .status(200)
            .json({ status: 200, data: body, message: "song request successful" });
        
        } else {
        res.status(400).json({ status: 400, message: "failed to send request" });
        }
    } catch (err) {
        console.log("addRequest err: ", err);
        res.status(500).json({ status: 500, message: err });
    }
    client.close();


};

// const incrementRequest = async (req, res) => {
    
//     try {
//         await client.connect();

//         const db = client.db()

//         const 
//     }
// }


// deletes a specified reservation
const deleteReservation = async (req, res) => {
    const client = await new MongoClient(MONGO_URI, options);
    const id = req.params.reservation;
    try {
      await client.connect();
      const db = client.db();
      // Get the reservation infos in order to make the flight seat available
      // by modifying the flights collections
      const reservation = await db.collection("reservations").findOne({ id });
  
      if (reservation) {
        // Updates the flight
        const queryFlights = {
          flight: reservation.flight,
          "seats.id": reservation.seat,
        };
        const updateSeat = { $set: { "seats.$.isAvailable": true } };
        const updateFlights = await db
          .collection("flights")
          .updateOne(queryFlights, updateSeat);
  
        if (updateFlights) {
          const deleteReservation = await db
            .collection("reservations")
            .deleteOne({ id });
          if (deleteReservation) {
            res.status(200).json({ status: 200, reservation: id });
          } else {
            res.status(404).json({
              status: 404,
              reservation: id,
              message: "delete reservations has failed",
            });
          }
        } else {
          res.status(404).json({
            status: 404,
            reservation: id,
            message: "update flights has failed",
          });
        }
      }
    } catch (err) {
      console.log("deleteReservation err: ", err);
      res.status(500).json({ status: 500, reservation: id, message: err });
    }
    client.close();
};

module.exports = {
    getShows,
    getOtherShows,
    getSongs,
    getBandcamp,
    getComments,
    addSong,
    addRequest
};