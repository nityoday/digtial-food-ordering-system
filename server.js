const express = require('express'); 
const app = express()
const PORT = process.env.PORT || 3000   
// if we don't have a port from env file then we use 3000, else env is used. 
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
// Database connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, }).catch((err) => {
        console.error(err.message);
        process.exit(1);
    });

    const connection = mongoose.connection;
    connection.on('error', () => {
        console.log('Cannot connect to the database');
    });
    connection.once('open', () => {
        console.log('Database Connected');
    });


//session
app.use(session({
    //  cookies should be encrpted, sessions work with cookies 
    secret: ''
}))

//assets to tell the server where assets are

app.use(express.static('public'));

//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');

require('./routes/web')(app)
// all routes, function is being exported from web.js


app.listen(PORT, () => {
    console.log(`Listening on port xyz ${PORT}`); 
})