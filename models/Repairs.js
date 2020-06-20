const {Schema, model} = require('mongoose');

const repairsSchema = new Schema({
    repairs: String,
    name: String,
    model: String,
    price: Number,
})

module.exports = model('Repairs', repairsSchema);
