const jwt = require('jsonwebtoken')

module.exports = function authMiddleware(req,res,next){
    try{
        const token = req.headers.authorization.split(' ')[1];
        const verifiedUser = jwt.verify(token,process.env.JWT_SECRET_KEY);
        req.body.userId = verifiedUser.userId;
        next();
    }catch(err){
        res.send({success:false,message:"Unauthorized User"});
    }
}