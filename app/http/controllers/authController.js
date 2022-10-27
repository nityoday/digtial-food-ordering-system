const User = require('../../models/user')
const bcrypt = require('bcrypt')
function authController(){
    // factory functions: programming pattern where we use closures
    return {
        login (req, res){
            res.render('auth/login')
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

            console.log(req.body)
        }
    }
}

module.exports = authController