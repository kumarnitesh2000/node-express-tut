const express = require('express');
//const mongoose  = require('mongoose');
//const bodyParser = require('body-parser');
const app = express();
//const cors = require('cors');

// Import Routes 
const authRoutes  = require('./Routes/auth');

//route middlewares
app.use('/api/user',authRoutes);







//listen on 3000 port 
app.listen(3000);