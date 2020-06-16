const mongoose = require('mongoose');
const express = require('express');
const objectId = require('mongodb').ObjectID;
const app = express();
const jsonParser = express.json();
const cors = require('cors');
const Product = require('./models/Product');

const PORT = process.env.PORT || 3001;
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

mongoose.connect("mongodb://localhost:27017/remmaster", {useNewUrlParser: true}, (err) => {
    if (err) return console.log(err);
    app.listen(PORT, () => {
        console.log(`Server is waiting connected on port: ${PORT}...`)
    })
})

app.get('/api/products', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) console.log(err);

        res.send(products);
    })
})

app.get('/api/products/search', async (req, res) => {

    let select = req.query.select;
    let value = req.query.value;
    const product = await Product.find({[select]: value})
   res.send(product)
})


app.get('/api/products/:id', async (req, res) => {
    const id = req.params.id;
    await Product.findOne({_id: id}, (err, product) => {
        if (err) return console.log(err);

        res.send(product);
    })
})

app.post('/api/products', jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let {article, name, description, category, price, image} = req.body;

    const product = new Product({
        article: article,
        name: name,
        description: description,
        category: category,
        price: price,
        image: image
    });

    await product.save((err) => {
        if (err) return console.log(err);
        res.send(product);
    })
})

app.put('/api/products', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let {id, article, name, description, category, price, image} = req.body;
    const newProduct = {article: article, name: name, description: description, category: category, price: price, image: image}

    Product.findOneAndUpdate(
        {_id: id},
        newProduct,
        {new: true},
        (err, product) => {
            if (err) return console.log(err)

            res.send(product)
        }
    )

})

app.delete('/api/products/:id', jsonParser, async (req, res) => {
    const id = req.params.id;
    await Product.findByIdAndDelete(id, (err, product) => {
        if (err) return console.log(err)
        res.send(product);
    });
});
