const authController = require('../app/http/controllers/authController')
const homeController = require('../app/http/controllers/homeController')
const cartController = require('../app/http/controllers/customers/cartController')


 function initRoutes(app){
    //post events should be sent to controller as this can be large 
    app.get('/',homeController().index)
    app.get('/register', authController().register)
    app.post('/register', authController().postRegister)
    app.get('/login', authController().login)
    app.post('/login', authController().postLogin)
    
    
    
    app.get('/cart', cartController().index)
    app.post('/update-cart', cartController().update)
   }

module.exports = initRoutes