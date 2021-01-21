const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const Post = require('../models/Post');
const User = require('../models/User');

router.post('/', auth, async(req, res) => {
    try {
        const reqObj = {
            user: req.user._id,
            ...req.body
        }
       
        const post = await Post.create(reqObj);

        console.log(post)

        res.status(200).json({
            status: 'success',
            post
        })
    } catch(error) {
        console.error(error)
    }
})

router.get('/', auth, async( req, res) => {
    try {
        const posts = await Post.find()
        res.status(200).json(posts)
    } catch(error) {
        console.error(error.message)
    }
})

router.get('/:id', auth, async( req, res) => {
    try {
        const post = await Post.findById(req.params.id)

        console.log(post)

        if(!post) {
            return res.status(404).json({msg: 'Not Found!'})
        }

        res.status(200).json(post)
    } catch(error) {
        console.error(error.message)
    }
})

router.delete('/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if(post.user.toString() !== req.user.id){
            return res.status(404).json({
                status: 'failed',
                message: 'You are not authorized to perform this action!'
            })
        }

        await post.remove();

        res.status(200).json({
            status: 'success'
        });

    } catch(error) {
        console.error(error.message)
    }
})

router.put('/like/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        const likedPostByUser = post.likes.some(like => {
            return like.user.toString() === req.user.id
        })

        if(likedPostByUser){
            return res.status(400).json({msg:'You have already liked this post!'})
        }
        post.likes.unshift({user: req.user.id})

        await post.save();
        res.status(201).json(post.likes)
    } catch(error){
        console.error(error.message)
    }
})

router.put('/unlike/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        const isNotLikedByUser = post.likes.some(like => {
            return like.user.toString() !== req.user.id
        })

        if(isNotLikedByUser){
            return res.status(400).json({msg:'You have did not like this post!'})
        }
        post.likes.filter(like => like.user.toString() !== req.user.id)

        await post.save();
        res.status(201).json(post.likes)
    } catch(error){
        console.error(error.message)
    }
})

router.post('/comment/:id', auth, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const user = await User.findById(req.user.id)

        if(!post) {
            return res.status(404).json({msg: 'No post found!'})
        }

        const newComment = {
            text: req.body.text,
            name: user.name,
            avatar: user.avatar,
            user: user.id
        };

        post.comments.unshift(newComment)
        const updatedPost = await post.save();
        res.status(201).json({
            status: 'success',
            post: updatedPost
     })

    } catch(error) {
        console.error(error.message)
    }
})

router.delete('/comment/:post_id/:comment_id', auth, async(req, res) => {
    try {
        //find the post from Database
        const post = await Post.findById(req.params.post_id);
        //find the comment belonging to the loged-in user
        const comment = post.comments.find(comment =>  comment.id === req.params.comment_id)

        //make sure comment's author is incoming user
        if(comment.user.toString() !== req.user.id) {
            return res.status(401).json({
                status: 'failed',
                message: 'You are not authorized to perform this action!'
            })
        }
        //remove that comment from comments list
        post.comments.splice(comment, 1)
        const updatedPost = await post.save()

        res.status(201).json({
            status: 'success',
            updatedPost
        })
    } catch(error){
        console.error(error)
    }
})



module.exports = router
