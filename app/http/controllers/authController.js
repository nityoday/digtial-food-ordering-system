const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
function authController(){


    const _getRedirectUrl = (req) =>  {
        return req.user.role === 'admin' ? '/admin/orders' : '/customers/orders'
    }

    // factory functions: programming pattern where we use closures
    return {
        login (req, res){
            res.render('auth/login')
        },
        postLogin(req, res, next){
            // params: local (strategy as to whether it's google ath/ facebook auth/ local (ours))
            // info is the messages that we sent from passport. 
            // these 3 are passport's done function only..
            const { email, password }   = req.body
            // Validate request 
            if(!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local',(err, user, info) => {
                // when we call authenticate it returns a function which we have to call whic is (req,res,next at end of this bracket)
                if(err){
                    req.flash('error', info.message)
                    return next(err)
                }
                if (!user){ // this is called when we have the second param as false in passport.js file (user not logged in basically )
                    req.flash('error', info.message )
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if(err){
                        req.flash('error', info.message)
                        return next(err)
                    }



                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next)
        },
        register (req, res){
            res.render('auth/register')
        },
        async postRegister(req, res){
            const { name, email, password } = req.body
            // Validation
            if (!name || !email || !password){
                req.flash('error', 'All fields are required'); // to send messages, flash is one req. whatever message we send from flash is available on frontend 
                req.flash('name', name)
                req.flash('email', email)   //to refill data after error has come, and its sent through the messages object, first email beeing the key, and the second email being the value. 
                return res.redirect('/register') 
            }

            // if email already exists in the db
            // checking if the email (db column),  is having email (value) as our first param
            User.exists({email: email}, (err, result) => {
                if(result) { //user already exists
                    req.flash('error', 'User already exists with this email');
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/register')
                }
            })

            //hasing passwords first 

            const hashedPassword = await bcrypt.hash(password, 10)

            //else create user
            const user = new User({
                // user: name,     
                // or you can directly write name, instead of user: name,

                name,
                email,
                password: hashedPassword
            })

            user.save().then((user) => {
                // later redirect to orders page for the customer,and login for them. 
                return res.redirect('/')
            }).catch(err => {
                req.flash('error', 'Whoops! Something went wrong. Please contact administrators. '+ err );
                return res.redirect('/register')
            })

            // console.log(req.body)
        },
        logout(req, res){
            req.logout(function(err){
                if (err) throw err;
            })
            return res.redirect('/login')
        }
    }
}

module.exports = authController