const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const MONGODB = process.env.MONGODB;

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

mongoose.connect(MONGODB)
    .then(() => console.log('Connected!'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

app.get('/', function (req, res) {
    res.send('Hello World');
});
