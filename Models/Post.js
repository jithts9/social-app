const moongoose = require('mongoose');
const Schema = moongoose.Schema
const UserPostSchema   = new Schema({
    id: {
        type: Number,
        required: true
    },
    title : { 
        type: String ,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    userId : {
        type: Number,
        required: true
    },
    comments: [{}]
});

module.exports = moongoose.model('Post', UserPostSchema);