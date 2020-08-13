const express = require('express');
const router = express.Router();
const Post = require('../models/Post');




//routes 
router.get('/' ,async (req,res) =>{
    try{
            const posts = await Post.find();
            res.status(200).json(posts); 
    }
    catch(err){

    }
});
//specific post 
router.get('/:postId',async (req,res) =>{

    try{
            console.log(req.params.postId);

            const post_find = await Post.findById(req.params.postId);
            res.json(post_find);
    }
    catch(err){

    }
});
//delete specific post 
router.delete('/:postId' , async (req,res) =>{
    try{
const removed_post = await Post.remove({_id:req.params.postId});
res.json(removed_post);
}
catch(err){}
});

//update
router.patch('/:postId' , async (req,res) =>{
    try{
const updated_post = await Post.updateOne({_id:req.params.postId},{$set:{title:req.body.title}});
res.json(updated_post);
}
catch(err){}
});



router.post('/',(req,res) =>{
    //console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    console.log(post);

    const data = post.save()
    .then(data =>{res.json.data}).catch(err => {res.json({message: err})});
    res.json(data);
});

router.get('/posts',(req,res) =>{
res.send('<h1>Posts Section !</h1>');
});

module.exports = router ;
