const {Schema, model} = require('mongoose')

const productSchema = new Schema({
    article: String,
    name: String,
    description: String,
    price: Number,
    category: String,
    image: String
})

module.exports = model('Product', productSchema);
