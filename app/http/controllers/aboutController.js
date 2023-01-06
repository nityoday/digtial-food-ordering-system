function aboutController(){
    return {
         index (req, res){
            return res.render('about')     

        }
    }
}

module.exports = aboutController