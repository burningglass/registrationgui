const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const lib = require("../lib");

router.post('/', async(req, res) => {
  // e.g. POST(with full fields) = REST Insert (e.g. to 'http://localhost:5000/registrations')
  // e.g. POST(with only username) = REST Retrieve (e.g. 'http://localhost:5000/registrations')
  // (GET not used, so query params not sent in the URL)
  //  
  try {
    const url = lib.getConfigValue("SVR_APP_GET_REGISTRATIONS_URI", "", false);

    if ("userName" in req.body && "firstName" in req.body && "lastName" in req.body &&
      "phoneNumber" in req.body && "modelId" in req.body && "colourId" in req.body &&
      "isAutomatic" in req.body) {
      const options = {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "userName": req.body.userName,
          "firstName": req.body.firstName,
          "lastName": req.body.lastName,
          "phoneNumber": req.body.phoneNumber,
          "modelId": req.body.modelId,
          "colourId": req.body.colourId,
          "isAutomatic": req.body.isAutomatic,
        })
      };

      await fetch(url, options)
        .then(res => res.json())
        .then(json => console.log(json))

      res.status(201).send('Successfully wrote new registration record');
    } else if ("userName" in req.body) {
      const options = {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          "userName": req.body.userName,
        })
      };

      const response = await fetch(url, options);
       
      if (!response.ok) {
        throw new Error("Failed to retrieve registrations");
      }

      const json = await response.json();

      console.log('Response json:');
      console.log(json);
      console.log('');
        
      res.status(200).json(json);
    } else {
      res.status(401).send("Invalid operation");
    }
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).send('Error writing new registration record');
  }
});

module.exports = router;