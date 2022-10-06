const Menu = require('../../models/menu')
function homeController(){
    // factory functions: programming pattern where we use closures
    return {
        async index (req, res){
            const pizzas = await Menu.find()
            return res.render('home', {pizzas: pizzas})     // later pizzas is of array of objects , we are sending this key value pair to home.ejs where it is using pizzas and looping the object.

        }
    }
}

module.exports = homeController