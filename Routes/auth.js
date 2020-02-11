const express = require('express')
const {body} = require('express-validator')
const userController =  require('../Controller/Usercontroller')
const isAuth = require('../middleware/isAuth');
const roleAuth = require('../middleware/roleAuth')

const routes = express.Router()

//auth/ 
routes.get('/user',userController.saveUsers )
routes.get('/updatepw/:id',userController.updatePassword)

routes.post('/login',userController.Userlogin)
routes.post('/logout',isAuth,userController.logout)
routes.get('/user/:id',isAuth,userController.Userdetail)
routes.get('/userpost/:id',isAuth,userController.Userpost)
routes.get('/users',isAuth,roleAuth, userController.Users)
routes.post('/uploadimage', isAuth, userController.uploadIMage)

module.exports = routes 