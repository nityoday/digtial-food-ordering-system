const authController = require('../app/http/controllers/authController')
const homeController = require('../app/http/controllers/homeController')
const cartController = require('../app/http/controllers/customers/cartController')


 function initRoutes(app){
    app.get('/',homeController().index)
    app.get('/register', authController().register)
    app.get('/login', authController().login)
    //post events should be sent to controller as this can be large 
    
    
    
    
    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)
   }

module.exports = initRoutes