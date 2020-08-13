const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const User =  require('./models/User');


//for process.env usage
require('dotenv/config');

app.use(cors());






app.use(bodyParser.urlencoded({
    extended: true
  }));

//import routes 
const allRoutes = require('./routes/route');
const { post } = require('./routes/route');

//middlewares
app.use('/first',allRoutes);
//console.log(process.env.URI);



app.post('/signup' ,async (req,res) =>{

  //perform 
  console.log(req.body);
  const { username,email } = req.body;  
  
  const user_data = new User({
    username: username ,
    email: email
  });

    try{
            const saved_User = await user_data.save();
            res.json(saved_User);
    }
    catch(err){
          res.json({message: err});
    }


/*
  user_data.save()
  .then(data =>{res.json.data}).catch(err => {res.json({message: err})});
*/  
  
  });


//connect to db

try {
  mongoose.connect(process.env.URI, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
  console.log("connected"));    
  }catch (error) { 
  console.log("could not connect");    
  }

//listen on 3000 port 
app.listen(3000);