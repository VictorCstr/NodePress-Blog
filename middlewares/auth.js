const auth = (req,res,next) =>{
    if(req.session.user == undefined){
        res.redirect('/admin')
    }else{
        next()
    }
}

module.exports = auth