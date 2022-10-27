function guest (req, res, next){
    if (!req.isAuthenticated()) {
        return next()
    }
    return res.redirect('/')
}
// this is used so that logged in users should not be able to access /login and /register. so if someone tries to access these pages while aleady being logged in, they will be redirected to the home page. 

module.exports = guest