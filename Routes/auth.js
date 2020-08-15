
const express = require('express');
const router = express.Router();
const User = require('../models/Users');
const Joi_hapi = require('@hapi/joi');
const loginValidate = require('./validation'); 
const bcrypt = require('bcryptjs');
require('dotenv/config');
const jwt = require('jsonwebtoken');

//validation Schema
const schema_check = Joi_hapi.object({
    name:Joi_hapi.string().min(6).required(),
    email:Joi_hapi.string().min(6).required().email()
   

});




router.post('/test',(req,res) =>{

    const ValidateObject = schema_check.validate(req.body);

    
    res.send(ValidateObject);


});

//User.findOne({email: 'anmol@mail.com'}).then(function (doc) {console.log(doc)});
//User.findOne({email: 'anmol@gmail.com'}).then(function (doc) {console.log(doc)});



router.post('/login' , async (req,res) =>{
    const validation_instance = loginValidate({email:req.body.email ,password:req.body.password});
    if(validation_instance.error){
        //console.log(validation_instance.error.details[0].message);
        res.status(400).send(validation_instance.error.details[0].message);
    }
    //console.log(validation_instance);
    else{

        User.findOne({email: req.body.email}).then(function (doc) {

            if(doc==null){
                res.status(400).send('Email not Exists !');
            }
            else{
                //email exists 
                //console.log(doc);
                const validPass = bcrypt.compare(req.body.password,doc.password);
                if(!validPass) return res.status(400).send('Invalid Password');
                else{       
                    //create a token that can be assigned as identitty of that user
                    const token = jwt.sign({_id:doc.id},process.env.TOKEN_SECRET);
                    console.log(token);
                    //res.send('Logged in ');
                    res.header('auth-token',token).send('Logged in !');
                    
                }
                
            }

        });     
    }
});


//sample Request
//curl -d "name=nitesh&email=example@gmail.com&password=123456" http://127.0.0.1:3000/api/user/signup

router.post('/signup' ,async (req,res) =>{
   console.log(req.body);
   let user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
});
   //Hash Passwords
   const password = req.body.password; 
    //console.log(bcrypt.hash(password,10));
    const hashPwd = await bcrypt.hash(password,10);
    user.password = hashPwd;
    const savedUser = await user.save();
    res.status(200).send(savedUser);
  
});

router.get('/',(req,res) =>{
    res.json(req.params.name);
});

module.exports = router;