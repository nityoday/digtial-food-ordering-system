const order = require("../../../models/order")

function orderController() {
    return {
        index(req, res) { //showing not completed orders, and populate just gets the customer id and gets all details of that customer/user
           order.find({ status: { $ne: 'completed' } }, null, { sort: { 'createdAt': -1 }}).populate('customerId', '-password').exec((err, orders) => {
               if(req.xhr) {
                   return res.json(orders)
               } else {
                return res.render('admin/orders')
               }
           })
        }
    }
}

module.exports = orderController