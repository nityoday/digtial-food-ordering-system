const express = require('express'); 
const app = express()
const PORT = process.env.PORT || 3000   
// if we don't have a port from env file then we use 3000, else env is used. 
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');



//assets to tell the server where assets are

app.use(express.static('public'));

//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');

app.get('/', (req,res) => {
    res.render('home')
})

app.get('/cart', (req,res) => {
    res.render('customers/cart')
})


app.listen(PORT, () => {
    console.log(`Listening on port xyz ${PORT}`); 
})