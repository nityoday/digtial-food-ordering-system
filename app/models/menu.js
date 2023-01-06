const mongoose = require('mongoose');
const Schema = mongoose.Schema

const menuSchema = new Schema({
    // columns / properties of that table 
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    Description: {type: String, required: true},
})
     
module.exports = mongoose.model('Menu', menuSchema)



