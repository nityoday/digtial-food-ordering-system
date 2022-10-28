// middleware to allow pages only to those users who are logged in.
function auth(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    return res.redirect('/login')
    // TODO Make the unauthroized page here
}

module.exports = auth