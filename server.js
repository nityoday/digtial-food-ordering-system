require('dotenv').config();
const passport = require('passport');
const session = require('express-session');
const express = require('express'); 
const app = express();
const PORT = 3000; 
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('express-flash');
const MongoDbStore = require('connect-mongo');
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
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({
        client: connection.getClient()
    }),
    cookie: {maxAge: 1000*60*60*24} // 24 hours milli seconds 
}))

app.use(flash())
const passportInit = require('./app/config/passport')
    passportInit(passport)  //passing what we required above
    app.use(passport.initialize())
    app.use(passport.session())
//assets to tell the server where assets are

app.use(express.static('public'));
app.use(express.urlencoded({extended: false})); // to get form data such as register
app.use(express.json());    // to get the json data

// Global middleware (to help show total qty ddefaullt in layout ejs near cart), to make session avaialble for that cart 

app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs');

require('./routes/web')(app)
// all routes, function is being exported from web.js


app.listen(PORT, () => {
    console.log(`Listening on port xyz ${PORT}`); 
})

