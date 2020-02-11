
const roleAuth = async function ( req, res, next) {
    try {       
        if (!req.user) {
            throw new Error()
        }
        console.log(req.user.role)
        if(req.user.role != 'Admin') {
            throw new Error()
        }
        next()
    } catch (error) {
        res.status(401).send({ error: 'Not authorized becuase user is not an admin' })
    }
}

module.exports = roleAuth