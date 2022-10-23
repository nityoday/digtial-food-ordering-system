require('dotenv').config();
const express = require('express'); 
const app = express();
const PORT = process.env.PORT || 3000;
// if we don't have a port from env file then we use 3000, else env is used. 
const ejs = require('ejs');
const expressLayout = require('express-ejs-layouts');
const path = require('path');
const mongoose = require('mongoose');
const flash = require('express-flash');
const session = require('express-session');
const MongoDbStore = require('connect-mongo');
// MongoDbStore(session)
// Database connection
const url = 'mongodb://localhost/pizza';        // change bottom in mongo session if changed here
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


// session store

    // let mongoStore = new MongoDbStore({
    //     mongooseConnection: connection,
    //     collection: 'sessions'
    // })

//session
app.use(session({
    //  cookies should be encrpted, sessions work with cookies 
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoDbStore.create({
        client: connection.getClient()
        // mongoUrl: url               // TODO change later if changed above
    }),
    cookie: {maxAge: 1000*60*60*24}
    // 24 hours milli seconds 
}))

app.use(flash())

//assets to tell the server where assets are

app.use(express.static('public'));
app.use(express.json());

// Global middleware (to help show total qty ddefaullt in layout ejs near cart), to make session avaialble for that cart 

app.use((req, res, next) => {
    res.locals.session = req.session
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