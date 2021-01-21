const User = require('./../models/User')
const jwt = require('jsonwebtoken')

const auth = async (req, res, next) => {

 try {
    const token = req.header('x-auth-header')

    if(!token) {
        return res.status(401).json({msg: 'No token! Auth denied!'})
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id)

    req.user = currentUser;
    
    next();

 } catch(err) {
     res.status(401).json({message: "Token is not valid!"})
     console.error(err.message)
 }
}

module.exports = auth;