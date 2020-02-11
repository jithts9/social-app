const axios = require('axios')
const Post = require('../Models/Post')
const User = require('../Models/User')


// script to fecth the posts from http://jsonplaceholder.typicode.com/posts
exports.fetchedPost = async function( req,res,next) {
    const posts = await axios.get('http://jsonplaceholder.typicode.com/posts')
    if (posts) {
        console.log(posts.data)
        res.json(posts.data);
    }
    
}

//-- script to fecth comments from http://jsonplaceholder.typicode.com/comments
exports.fetchedComents= async function( req,res,next) {
    const posts = await axios.get('http://jsonplaceholder.typicode.com/comments')
    if (posts) {
        console.log(posts.data)
        res.json(posts.data);
    }
    
}

//-- script to fetch posts from http://jsonplaceholder.typicode.com/posts and save to db

exports.savePost = async function(req, res, next) {
    const posts = await axios.get('http://jsonplaceholder.typicode.com/posts')
    var _posts
    if (posts) {

        for( i=0; i < posts.data.length; i++){
            const _userPosts = new Post({
                id: posts.data[i].id,
                title: posts.data[i].title,
                body: posts.data[i].body,
                userId: posts.data[i].userId
            })
           const savedPosts = await _userPosts.save()
            _posts = savedPosts
        }
       res.json(_posts)
    }
   
}

//-- script to update the comments in post table

exports.updateCommentsInPost = async function(req, res, next) {
    const comments = await axios.get('http://jsonplaceholder.typicode.com/comments')
    const allPosts = await Post.find()
    if (allPosts) {
        for ( i= 1 ; i <= allPosts.length; i++){
            var post = await Post.findOne({id: i})
            const comm = comments.data.filter( elements => elements.postId===i)
            if (post){
                post.comments= comm       
                const updatedUserPost = await post.save()
                console.log(updatedUserPost)
            }  
        }   
    }
                               
}

//-- script to update posts in respective user collections

exports.updatePostInUser = async function( req, res, next) {
    const posts = await Post.find()
    const users = await User.find()
    const noOfUsers = users.length
    if (users) {
        for ( i=1; i<= noOfUsers; i++){
            const user  = await User.findOne({id:i})
            const test =  posts.filter( elements => elements.userId===i)
            if (test) {
                user.posts = test
               const updatedUser = await user.save()
               console.log(updatedUser)
            }            
        }
    }
}

//--- fetch all user posts

exports.getPosts  = async function( req, res, next) {

    //-- validation for user role

    //---- 
    const _posts = await Post.find()
    if (_posts) {       
            res.status(200)
            .json({message: " Posts fetched succsessfully.", posts: _posts[0]})
    }
}