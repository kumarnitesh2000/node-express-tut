
const express = require('express');
const router = express.Router();


router.post('/signup' ,(req,res) =>{
    res.send('Register');
});

router.get('/',(req,res) =>{
    res.json(req.params.name);
});

module.exports = router;