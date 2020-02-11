const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserDetail = new Schema({
    id : {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required: true
    },
    imageUrl: {
        type : String,
        required: true
    },
    address: { },
    phone: {
        type: String,
        required: true
    },
    website: {
        type: String,
        required: true
    },
    company: {},
    posts: [{}],
    tokens:[{}]
   

})

// UserDetail.methods.generateAuthToken = async function() {
//     // Generate an auth token for the user
//     const user = this
//     const token = jwt.sign({id: user.id}, process.env.JWT_KEY)
//     user.tokens = user.tokens.concat({token})
//     await user.save()
//     return token
// }

module.exports = mongoose.model('User',UserDetail)