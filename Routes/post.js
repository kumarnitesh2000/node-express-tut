const { route } = require("./auth");

const express = require('express');
const User = require('../models/Users');
const router = express.Router();
const verify = require('./verifyToken');




router.get('/',verify,(req,res) =>{
    //req.user
    
    const id =JSON.stringify(req.user._id);
    const user = User.findById(id);
    res.send(user);
});



module.exports = router;