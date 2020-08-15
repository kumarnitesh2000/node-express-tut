const jwt = require('jsonwebtoken');


module.exports =  function(req,res,next){

    const token = req.header('auth-token');
    if(!token){
        console.log('Access Denied !');
        return res.status(401).send('Access Denied .');

    }
    try{
            const verified = jwt.verify(token,process.env.TOKEN_SECRET);
            //payload send to whom requested this auth function

            req.user = verified;
            //next so after completing a middleware it can go back to the call ones
            next();
    }
    catch(err)
    {
            res.status(400).send('Invalid Token');
    }
}

