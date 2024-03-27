'use strict';
// read env vars from .env file
require('dotenv').config();
const express = require('express');

/*
ENVIRONMENT VARIABLES: ensure you have set your auth URL, client Id and Secret env variables.
To do that, copy the .env.example file to .env and set the values accordingly, then save it as .env

To get the variables, go to https://dashboard.railz.ai/developers/api-keys and create a set of keys with
the permissions set to `Visualizations SDK`. Copy the client ID and secret and set them as:
- RAILZ_CLIENT_ID
- RAILZ_CLIENT_SECRET
*/
const AUTH_URL = process.env.RAILZ_AUTH_URL || 'https://auth.railz.ai/getAccess';
const CLIENT_ID = process.env.RAILZ_CLIENT_ID;
const CLIENT_SECRET = process.env.RAILZ_CLIENT_SECRET;

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

// Main endpoint
app.get('/', (request, response) => {
  if (!AUTH_URL || !CLIENT_ID || !CLIENT_SECRET) {
    const err = 'Environment variables not properly set, see documentation';
    console.error(err);
    response.status(400).json({ success: false, error: err });
    return;
  }
  response.send('Welcome!!');
});

/*
POST endpoint to authenticate and provide access configuration
Get an access configuration which will be used to initialize the railz-visualizations tag on the client side
*/
app.get('/authenticate', (request, response) => {
  if (!AUTH_URL || !CLIENT_ID || !CLIENT_SECRET) {
    const err = 'Environment variables not properly set, see documentation';
    console.error(err);
    response.status(400).json({ success: false, error: err });
    return;
  }

  const encodedString = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64');
  fetch(AUTH_URL, { method: 'GET', headers: { Authorization: `Basic ${encodedString}` } })
    .then(async (res) => {
      console.log(`statusCode from Railz API: ${res.status}`);
      if (res.ok) {
        res.json().then((json) => {
          response.status(200).json({ success: true, access_token: json.access_token });
        });
      } else {
        if (res.status === 401) {
          res.json().then((json) => {
            const errorMsg = Array.isArray(json.error?.message)
              ? json.error?.message[0]
              : json.error?.message;
            response.status(401).json({ success: false, error: errorMsg || json?.message });
          });
        } else {
          response
            .status(500)
            .json({ success: false, error: 'Failure when comunicating to Railz API' });
        }
      }
    })
    .catch((error) => {
      response.status(500).json({ success: false, error });
    });
});

//start server and begin listening for request
app.listen(PORT, () => console.log(`server is listening at http://localhost:${PORT}`));
