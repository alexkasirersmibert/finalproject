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

const getLogin = async (req, res) => {

    await client.connect();

    const db = client.db();

    try {
        const loggedIn = await db.collection('login').find().toArray();


        res.status(200).json({status: 200, data: loggedIn, message: "retrieved logged in" });

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

    try {
        await client.connect();

        const db = client.db();

        const insert = await db.collection("songs").insertOne(body);
        console.log("insert = ", insert);
        if (insert) {
            res
            .status(200)
            .json({ status: 200, data: body, message: "song add successful" });
        
        } else {
        res.status(400).json({ status: 400, message: "failed to add song" });
        }
    } catch (err) {
        console.log("addSong err: ", err);
        res.status(500).json({ status: 500, message: err });
    }
    client.close();


};

const addPompeyShow = async (req, res) => {
    const body = req.body;
    // const id = uuidv4();

    try {
        await client.connect();

        const db = client.db();

        const insert = await db.collection("pompeyshows").insertOne(body);
        console.log("insert = ", insert);
        if (insert) {
            res
            .status(200)
            .json({ status: 200, data: body, message: "show add successful" });
        
        } else {
        res.status(400).json({ status: 400, message: "failed to add show" });
        }
    } catch (err) {
        console.log("addSong err: ", err);
        res.status(500).json({ status: 500, message: err });
    }
    client.close();


};

const addOtherShow = async (req, res) => {
    const body = req.body;
    // const id = uuidv4();

    try {
        await client.connect();

        const db = client.db();

        const insert = await db.collection("othershows").insertOne(body);
        console.log("insert = ", insert);
        if (insert) {
            res
            .status(200)
            .json({ status: 200, data: body, message: "show add successful" });
        
        } else {
        res.status(400).json({ status: 400, message: "failed to add show" });
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
const login = async (req, res) => {
        const isLoggedIn = req.body.loggedIn;
      

        
      
        try {
          await client.connect();
          const db = client.db();

          const result = await db
            .collection("login")
            .updateOne({_id: "aksbass@gmail.com"}, { $set: { loggedIn: isLoggedIn } });
          res.status(200).json({ status: 200, data: result });
        } catch (err) {
          res.status(404).json({ status: 404, data: err.message });
        }
      };




module.exports = {
    getShows,
    getOtherShows,
    getSongs,
    getBandcamp,
    getComments,
    addSong,
    addPompeyShow,
    addRequest,
    addOtherShow,
    login,
    getLogin
};