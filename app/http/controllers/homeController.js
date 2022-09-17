function homeController(){
    // factory functions: programming pattern where we use closures
    return {
        index (req, res){
            res.render('home')
        }
    }
}

module.exports = homeController