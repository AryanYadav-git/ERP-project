require("dotenv").config();
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWTKEY;

const authenticateJwt = (req, res, next) => {
    // console.log(req.headers)
    const authHeader = req.headers.authorization;
    // console.log(authHeader);
    try{
       if(authHeader){
        const token = authHeader.split(' ')[1];
        jwt.verify(token, SECRET, (err, user) => {
            if (err) {
                res.send({message: "Authorization expired"});
                return;
            //   return res.sendStatus(401);
            }
            // console.log(user);
            req.user = user;
            next();
        });
    }else{
        res.sendStatus(401);
    } 
    }catch(e){
        res.send({message: "Authorization expired"})
    }
    
}

module.exports = {
    authenticateJwt,
    SECRET
}