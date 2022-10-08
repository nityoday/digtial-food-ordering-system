console.log('Hello from App JS');
let addToCart = document.querySelectorAll('.add-to-cart')

addToCart.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        console.log(e)
    })
})
//  this automatically compiles and goes into the public folder due to laravel mix. 