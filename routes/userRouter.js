const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken')
const User = require('./../models/User')

router.get('/', async (req, res) => {
    try {
        const users = await User.find()

        res.status(200).json({
            status: 'success',
            users
        })
    } catch (error) {
        console.error('Error: ', error)
    }
})

router.post('/', async (req, res) => {
    try {
        const user = await User.create(req.body);
        const token = await jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})

        res.status(201).json({
            status: 'success',
            user,
            token
        })
    } catch(error) {
        res.status(500).json({
            status: 'failed',
            error
        })
        console.error(error)
    }
})

module.exports = router
