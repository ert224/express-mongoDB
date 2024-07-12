const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config(); // Load environment variables from .env file

const Product = require('./models/product.model.js')
const MONGODB = process.env.MONGODB;

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

mongoose.connect(MONGODB)
    .then(() => console.log('Connected!'))
    .catch(err => console.log('Failed to connect to MongoDB', err));

app.use(express.json())

app.post('/api/products', async (req, res) => {
    console.log(req.body);
    try{
        const product = await Product.create(req.body)
        res.status(200).json (product)
    }catch(error){
        res.status(500).json({
            message: error.message
        })

    }
});

app.get('/api/products', async (req, res) => {
    console.log(req.body);
    try{
        const product = await Product.find({})
        res.status(200).json (product)
    }catch(error){
        res.status(500).json({
            message: error.message
        })

    }
});