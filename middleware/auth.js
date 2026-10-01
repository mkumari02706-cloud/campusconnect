function isLoggedIn(req,res,next){
    if(!req.session.userId){
        return res.redirect("/auth/login");
    }
    next();
}

module.exports = {isLoggedIn};//dusri files mein use kar sakein
