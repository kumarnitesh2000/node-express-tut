const express = require('express');
const mongoose  = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcryptjs');
//const cors = require('cors');

app.use(bodyParser.json())
app.use(express.urlencoded({extended: true}))

//dot env
require('dotenv/config');
// Import Routes 
const authRoutes  = require('./Routes/auth');
const postRoutes = require('./Routes/post');
//route middlewares
app.use('/api/user',authRoutes);
app.use('/api/post',postRoutes);

//connect to mongoose 
mongoose.connect(process.env.URI,{ useNewUrlParser: true , useUnifiedTopology: true },() =>{
  console.log('connected');
});


//listen on 3000 port 
app.listen(3000);