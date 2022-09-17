function cartController(){
    // factory functions: programming pattern where we use closures
    return {
        index (req, res){
            res.render('customers/cart')
        }
    }
}

module.exports = cartController