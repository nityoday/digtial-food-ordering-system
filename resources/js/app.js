import axios from 'axios'
import Noty from 'noty'
import { initAdmin } from './admin'


let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')
function updateCart(pizza){
    axios.post('/update-cart', pizza).then(res => {
        console.log(res)
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success', 
            timeout:  590, 
            text: 'Item added to cart',
            layout: 'bottomCenter'
            // progressBar: false;
        }).show();
    }).catch(err => {
        new Noty({
            type: 'error', 
            timeout:  590,
            text: 'Sorry, something went wrong, please try again later',
            layout: 'bottomCenter'
            // progressBar: false;
        }).show();
    })
    // so if the post request is succesfull, the then method is called, and we can check the response.
    // we catch the error if server gives error and does not display then. 
}

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        // this comes from data-pizza from button in home.ejs 
        // after clicking we need to update the cart and send the pizza o the cart
        updateCart(pizza)
        // console.log(pizza)
    })
})
//  this automatically compiles and goes into the public folder due to laravel mix. 


// not working:

// const alertMsg = docuemnt.querySelector('#success-alert')
// if(alertMsg){
//     setTimeout(() => {
//         alertMsg.remove()
//     }, 2000)
// }


initAdmin()