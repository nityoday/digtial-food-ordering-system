// database table model - singular, table name (collections) - plural

const mongoose = require('mongoose');
//  class or constructor function when capitilized names of variables
const Schema = mongoose.Schema

const menuSchema = new Schema({
    // columns / properties of that table 
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    size: {type: String, required: true},
})
     
module.exports = mongoose.model('Menu', menuSchema) // collection will be menus (plural)
