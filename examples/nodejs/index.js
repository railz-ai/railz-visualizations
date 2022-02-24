'use strict';
// read env vars from .env file
require('dotenv').config();
const express = require("express");
const axios = require("axios");

//initialize express
const app = express();

//use env port or assign 4000
const PORT = process.env.PORT || 4000;
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');

    // methods to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // headers to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    next();
});


/*
ensure you have set your auth URL, client Id and Secret as environment variables
AUTH_URL
CLIENT_ID
CLIENT_SECRET
*/
const AUTH_URL = process.env.AUTH_URL || 'https://auth.railz.ai/getAccess';
const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;


// Main endpoint
app.get("/", (request, response) => {
    if(!AUTH_URL || !CLIENT_ID || !CLIENT_SECRET) {
        const err = 'Environment variables not properly set, see documentation';
        console.error(err)
        response.status(400).json({success: false, error: err});
        return
    }
    response.send("Welcome!!");
});

/*
POST endpoint to authenticate and provide access token
Get an access token which will be used to initialize the railz-visualizations tag on the client side
*/
app.get("/authenticate", (request, response) => {
    if(!AUTH_URL || !CLIENT_ID || !CLIENT_SECRET) {
        const err = 'Environment variables not properly set, see documentation';
        console.error(err)
        response.status(400).json({success: false, error: err});
        return
    }


    const encodedString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
    axios
        .get(AUTH_URL,  {"headers": {'Authorization': `Basic ${encodedString}`}})
        .then((res) => {
            console.log(`statusCode from Railz API: ${res.status}`)
            response.status(200).json({success: true, access_token: res.data.access_token});
        })
        .catch((error) => {
            console.error(error)
            response.status(401).json({success: false, error: 'Authentication with Railz API Failed'});
        })
});

//start server and begin listening for request
app.listen(PORT, () =>
    console.log(`server is listening at http://localhost:${PORT}`)
);
