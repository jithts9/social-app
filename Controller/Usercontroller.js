const axios = require('axios');
const jwt = require('jsonwebtoken');
const bcrypt =require('bcrypt');
const user = require('../Models/User');


//--script to fecth user from http://jsonplaceholder.typicode.com/users and save to users db
exports.saveUsers = async function( req,res, next) {
    var temp 
       const userDatas = await axios.get('http://jsonplaceholder.typicode.com/users/');
       if (userDatas.data) {
           const totalElement = userDatas.data.length

           for (i = 0 ; i < totalElement; i++){
               const userDtl = new user({
               id : userDatas.data[i].id,
               name: userDatas.data[i].name,
               username: userDatas.data[i].username,
               password: userDatas.data[i].username + userDatas.data[i].id,
               role : 'Admin',
               email: userDatas.data[i].email,
               address: userDatas.data[i].address,
               phone: userDatas.data[i].phone,
               website: userDatas.data[i].website,
               company: userDatas.data[i].company ,
               imageUrl: ''
               
           })
           const savedUser = await userDtl.save()
           temp =savedUser
           }        
           console.log('savedUser',temp)
           res.json(temp)
       }

   }

   //--- update password to encrypted password

   exports.updatePassword = async function(req, res, next) {
       const _id = req.params.id

       const _user = await user.findOne({id:_id})
       if (_user) {
           const _password = _user.password
            const _encryptedpw = await bcrypt.hash(_password,12)
            if(_encryptedpw) {
                _user.password=_encryptedpw
                const _updatedUser = await _user.save()

                if (_updatedUser){
                    res.status(200).json({
                        message: "updated encrypted password",
                        password : _updatedUser.password
                    })
                }
            }
       }
   }


   //---

   //----User Login

   exports.Userlogin = async function( req, res, next) {
    try {
    const username = req.body.username
    const password = req.body.password    
    const _user = await user.findOne({username: username})
    if (_user) {   
            const isEqul = await bcrypt.compare(password,_user.password)
            console.log(isEqul)
            if (isEqul) {
                const toke = jwt.sign({userrole: _user.role, id:_user.id},'thisissecrethash',{expiresIn: '2h'})
                _user.tokens= toke
                const savetokeninuser = await _user.save()                            
                  res.status(200)
                 .json({message: " login succsessfully.", token: toke, user: _user.name})
            }   
            else {
                res.status(400)
                .json({message: " login failed."})
            }     
    } else {
       res.status(401).send({error:'user name does not found'})
    }
    } catch{
        res.status(400).send(error)
    }
    
}

//---user logout 

// exports.Userlogout = async function( req, res, next) {
//     const username = req.body.username
//     const password = req.body.password
//     const user1 = await user.findOne({username: username})
//     if (user1) {
//         if( user1.password === password) {
//             res.status(200)
//             .json({message: " login succsessfully.", user: user1.name})
//         }
//     }
// }

//-- fetch user details

exports.Userdetail = async function( req, res, next) {
    const id = req.params.id
    const _user = await user.findOne({id: id})
    if (_user) {       
            res.status(200)
            .json({message: " User Details fetched succsessfully.", user: {
                id: _user.id,
                name: _user.name,
                email: _user.email         
            }})
    }
}

//-- fetch user posts

exports.Userpost= async function( req, res, next) {
    const id = req.params.id
    const _user = await user.findOne({id: id})
    if (_user) {       
            res.status(200)
            .json({message: " User post fetched succsessfully.", user: _user.posts })
    }
}

//-- fetch all users -by admin

exports.Users = async function( req, res, next) {

    //-- validation for user role

    //---- 
    const _users = await user.find()
    if (_users) {       
            res.status(200)
            .json({message: " User Details fetched succsessfully.", user: _users.name})
    }
}

///---

exports.logout= async function ( req, res, next) {
        try {
            req.user.tokens = []
            await req.user.save()
            res.send()
        } catch (error) {
            res.status(500).send()
        }
    
}

exports.uploadIMage = async function ( req, res, next) {
    const id = req.user.id
    const imageurl = req.file.path.replace(/\\/g,"/")
    const _user  = await user.findOne({id:id})
    if (_user) {
        _user.imageUrl = imageurl      
        const _updatedUser = await _user.save()
        if (_updatedUser) {
            res.status(200)
            .json({message: "uploaded imgage successfully", image:_updatedUser.imageUrl})
        }
    }
}