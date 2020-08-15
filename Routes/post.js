const { route } = require("./auth");

const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const verify = require('./verifyToken');




router.get('/',verify,async (req,res) =>{
    //req.user
    
    const id =req.user._id;
    const str_id = id.toString();
    
    const user = await User.findOne({_id:str_id}).then(function (doc) {
        console.log(doc);
        res.send(`<h1>UserName - ${doc.name}</h1><br><h2>Email - ${doc.email}</h2>`);
    });
    
    
    
    //res.send(user);
});



module.exports = router;