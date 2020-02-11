const jwt = require('jsonwebtoken');
const User = require('../Models/User')

const auth = async function ( req, res, next) {
    const reqHeader = req.get('Authorization')
    try {
        if (!reqHeader) {            
            throw new Error()
        }
        const token = req.header('Authorization').replace('Bearer ', '')
        const data = jwt.verify(token, process.env.JWT_TOKE_SCRT_PW)  
        const user = await User.findOne({ id: data.id,'tokens': token })
        const userId = req.params.id
        if (userId) {
            if (userId != data.id){
                throw new Error()
            }
        }       
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized to access this resource' })
    }
}
module.exports = auth