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
    try{
        const product = await Product.find({})
        res.status(200).json (product)
    }catch(error){
        res.status(500).json({
            message: error.message
        })

    }
});

app.get('/api/products/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById(id)
        res.status(200).json (product)
    }catch(error){
        res.status(500).json({
            message: error.message
        })

    }
});


app.put('/api/products/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body)
        if (!product){
            return res.status(404).json({
                message: "product not found"
            })
        }
        const updatedProd = await Product.findById(id)
        res.status(200).json (updatedProd)
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
});

app.delete('/api/products/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body)
        if (!product){
            return res.status(404).json({
                message: "product not found"
            })
        }
        res.status(200).json ({
            message: "Product deleted"
        })
    }catch(error){
        res.status(500).json({
            message: error.message
        })
    }
});