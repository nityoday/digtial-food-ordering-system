console.log('Hello from App JS');
// client side. the console logs here are dispplayed in the browser. 
let addToCart = document.querySelectorAll('.add-to-cart')

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        let pizza = JSON.parse(btn.dataset.pizza)
        // this comes from data-pizza from button in home.ejs 
        console.log(e)
        console.log(pizza)
    })
})
//  this automatically compiles and goes into the public folder due to laravel mix. 
