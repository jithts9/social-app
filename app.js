const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const multer  = require('multer');
const path = require('path');

const postRoutes = require('./Routes/posts')
const userRoutes = require('./Routes/auth')
const app = express()

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename : (req, file, cb) => {
        cb(null,  Date.now() + '-' + file.originalname )
    }
})

const fileFilter  = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg') {
            cb(null, true)
        } else {
            cb(null, false)
        }
}

app.use(bodyparser.json()); // application/json
app.use(multer({storage: fileStorage , fileFilter: fileFilter}).single('image'));
app.use('/images', express.static(path.join(__dirname,'images')) );

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Authorization');
    next();
})

app.use('/auth', userRoutes)
app.use('/feed', postRoutes)

app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode|| 500
    const message = error.message
    res.status(status).json({message: message})
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER_NM}:${process.env.MONGO_DB_PW}@cluster0-mqkft.mongodb.net/master?retryWrites=true&w=majority`)
.then(result => {
    app.listen(process.env.PORT);
})
.catch( err => {
    console.log('could not connect the mongodbdatabase')
    console.log(err);
})



