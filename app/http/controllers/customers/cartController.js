function cartController(){
    // factory functions: programming pattern where we use closures
    return {
        index (req, res){
            res.render('customers/cart')
        },
        update(req,res){
            // first we will check if our session already has a cart? if not then we will create an empty cart
            if(!req.session.cart){
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }
            let cart = req.session.cart

            // check if item already does not exist in cart, else we add in items. 
            if(!cart.items[req.body._id]){
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1 //as we add for the first time the quantity is 1. 
                }
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrice = cart.totalPrice + req.body.price
            }
            else{
                // indicates that the item that has been added has already been added to the cart once
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price 
            }
            return res.json({ totalQty: req.session.cart.totalQty})
            // return res.json({ totalQty: req.session.cart})
        }
    }
}

module.exports = cartController