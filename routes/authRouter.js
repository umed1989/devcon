const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');
const User = require('../models/User');
const jwt = require('jsonwebtoken')

router.get('/', auth, async(req, res, next) => {
    try {
        
        const user = await User.findById(req.user._id)
        
        res.status(200).json(user)
    } catch(error) {
        res.status(500).json({msg: 'Server Error!', error})
        console.log(error.message)
    }
})

router.post('/', async (req, res, next) => {
    try {
        const {email, password} = req.body;

        if(!email || !password) {
           return res.status(401).json({msg: 'Please provide email or password!'})
        }

        const user = await User.findOne({email}).select('+password');

        if(!user) {
            return res.status(400).json({msg: 'Invalid credentials!'})
        }
        const isMatch = await user.correctPassword(password, user.password);

        if (!isMatch) {
            return res
            .status(400)
            .json({ msg: 'Invalid Credentials' });
        }

        const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

        res.status(200).json({
            status: 'success',
            user,
            token
        })
        
    } catch(error) {
        res.status(500).send('Server error');
        console.error(error)
    }
})

module.exports = router
