const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const dotenv = require('dotenv').config();

router.get('/', async(req, res) => {
  // e.g. GET = REST Query (e.g. to 'http://localhost:5000/colours')
  //
  try {
    const url = process.env.SVR_APP_GET_COLOURS_URI;

    const options = {
      method: 'GET',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
    };

    await fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))

    const response = await fetch(url, options);
       
    if (!response.ok) {
      throw new Error("Failed to retrieve colours");
    }

    const json = await response.json();

    console.log('Response json:');
    console.log(json);
    console.log('');
        
      res.status(200).json(json);
  } catch (err) {
    console.log('Error: ', err);
    res.status(500).send('Error reading colour records');
  }
});

module.exports = router;