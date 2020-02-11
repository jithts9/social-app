const express = require('express')
const postController = require('../Controller/Postontroller')
const isAuth = require('../middleware/isAuth');
const roleAuth = require('../middleware/roleAuth')


const router = express.Router()


//get/feed/savepost
router.get('/savepost', postController.savePost);
router.get('/updatepost', postController.updateCommentsInPost)
router.get('/updatePostInUser', postController.updatePostInUser)
router.get('/posts',isAuth,roleAuth, postController.getPosts)

module.exports = router