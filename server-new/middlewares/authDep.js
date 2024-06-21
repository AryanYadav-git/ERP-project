require('dotenv').config();
const { Admin } = require('../DB/user');


const authDep = (req, res, next) => {
    // console.log({1:req.body});
    // console.log({2:req.user});
    const { department } = req.user;
    if(department==req.body.department){
        // req.user = user;
        next();
    }else{
        res.status(401).send({message: 'Unauthorized'});
    }
    
}

module.exports = {
    authDep,
}