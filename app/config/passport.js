const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt');

function init(passport){
    passport.use(new LocalStrategy({usernameField: 'email'}, async (email, password, done) => { //our login method is email
        // first we check whether email exists
        const user = await User.findOne({email: email})
        if(!user){
            return done(null, false, {message: 'This account does not exist please login to continue'})
            // null is error 
        }

        bcrypt.compare(password, user.password).then(match => {
            if(match){
                return done(null, user, {message: 'Login Success'})
            }
            return done(null, false, {message: 'Incorrect Password Please try again'})
        }).catch(err => {
            return done(null, false, {message: 'Something went wrong Please contact administrators'})
        })
    }))

    // to store what after login, to verify if user is logged in or not, we use uesr id
    passport.serializeUser((user, done) => {
        done(null,user._id)
    })
    passport.deserializeUser((id, done) => {
        // to get req.user
        User.findById(id, (err, user) => {
            done(err, user)
        })
    })

}
module.exports = init