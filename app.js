const mongoose = require('mongoose');
const express = require('express');
const objectId = require('mongodb').ObjectID;
const app = express();
const productsRouter = require('./routes/products/products');
const repairsRouter = require('./routes/repairs/repairs');

const cors = require('cors');

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

app.use(productsRouter);
app.use(repairsRouter);

mongoose.connect("mongodb://localhost:27017/remmaster", {useNewUrlParser: true}, (err) => {
    if (err) return console.log(err);
    app.listen(PORT, () => {
        console.log(`Server is waiting connected on port: ${PORT}...`)
    })
})


