const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const dotenv = require('dotenv').config();

router.post('/', async(req, res) => {
  // e.g. POST = REST Query (e.g. to 'http://localhost:5000/validationErrors')
  //  
  try {
    const url = process.env.SVR_APP_GET_VALIDATIONERRORS_URI;

    if ("userName" in req.body && "firstName" in req.body && "lastName" in req.body &&
      "phoneNumber" in req.body && "modelId" in req.body && "colourId" in req.body) {

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
        })
      };

      const response = await fetch(url, options);
       
      if (!response.ok) {
        throw new Error("Failed to retrieve validation errors");
      }

      const json = await response.json();

      console.log('Response json:');
      console.log(json);
      console.log('');
        
      res.status(200).json(json);
    }
    else {
      res.status(401).send("Invalid operation");
    }
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).send('Error performing validation');
  }
});

module.exports = router;