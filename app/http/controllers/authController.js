const User = require('../../models/user')
function authController(){
    // factory functions: programming pattern where we use closures
    return {
        login (req, res){
            res.render('auth/login')
        },
        register (req, res){
            res.render('auth/register')
        },
        postRegister(req, res){
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

            //else create user
            const user = new User({
                user: name,
                email: email,
                password: password
            })



            console.log(req.body)
        }
    }
}

module.exports = authController