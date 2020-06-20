const express = require('express');
const {Router} = require('express');
const Product = require('../../models/Product');
const router = Router();
const jsonParser = express.json();

router.get('/api/products', (req, res) => {
    Product.find({}, (err, products) => {
        if (err) console.log(err);

        res.send(products);
    })
})

router.get('/api/products/search', async (req, res) => {

    let select = req.query.select;
    let value = req.query.value;
    const product = await Product.find({[select]: value})
    res.send(product)
})


router.get('/api/products/:id', async (req, res) => {
    const id = req.params.id;
    await Product.findOne({_id: id}, (err, product) => {
        if (err) return console.log(err);

        res.send(product);
    })
})

router.post('/api/products', jsonParser, async (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let {article, name, description, category, price, image} = req.body;

    const product = new Product({
        article: article,
        name: name,
        description: description,
        category: category,
        price: price,
        isBasket: false,
        image: image
    });

    await product.save((err) => {
        if (err) return console.log(err);
        res.send(product);
    })
})

router.put('/api/products', jsonParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);

    let {id, article, name, description, category, price, image} = req.body;
    const newProduct = {
        article: article,
        name: name,
        description: description,
        category: category,
        price: price,
        image: image}

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

router.delete('/api/products/:id', jsonParser, async (req, res) => {
    const id = req.params.id;
    await Product.findByIdAndDelete(id, (err, product) => {
        if (err) return console.log(err)
        res.send(product);
    });
});

module.exports = router;
