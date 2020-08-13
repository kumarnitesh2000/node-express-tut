const express = require('express');
const fetch = require('node-fetch');
const redis = require('redis');
const PORT  = process.env.PORT || 5000;
const REDIS_PORT =  6379;

//redis client 

const client  = redis.createClient(REDIS_PORT);

//not connecting to redis  
client.on("error", function(error) {
    console.error(error);
});


//app express
const app  = express();

//
function setRes(userName,repos){
    return `<h2>${userName} has ${repos} repos .</h2>`

}

async function getRepos(req,res,next){

    try{
            console.log("Fetching ...");
            const { name }  = req.params;
            const response = await fetch(`https://api.github.com/users/${name}`);
            const data = await response.json();
            const repos = data.public_repos;
            
            client.setex(name,3600,repos);
            res.send(setRes(name,repos));

    }
    catch(err){
        console.log(err);
        res.status(500);
    }

}


//cache middlewares 
function cache(req,res,next){
    const { name } = req.params;

    client.get(name ,(err,data) =>{
        if(err){
            throw err;
        }
        else if(data!=null){
                res.send(setRes(name,data));

        }
        else{
            next();
        }
    });

}



app.get('/repos/:name',cache,getRepos);

//on 5000 port 
app.listen(5000 , () =>{
    console.log(`App listening on ${PORT}`);

});



