const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const { protect } = require('../middleware/auth')

// generate JWT token
const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

// register new user
router.post('/register', async(req,res) => {
    try {
        const { username, email, password} = req.body
        const userExists = await User.findOne({ $or: [{email}, {username}]})

        if (userExists) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            })
        }

        const user = await User.create({
            username,
            email,
            password
        })

        if (user) {
            res.status(201).json({
                success: true,
                data: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    token: generateToken(user._id)
                }
            })
        }
        }
        catch(error) {
            console.error('Registration error: ', error)
            res.status(500).json({
                success: false,
                message: error.message
        })
    }
})

// user login
router.post('/login', async(req,res) => {
    try {
        const { email, password } = req.body

        // find user
        const user = await User.findOne({ email })

        if (user && (await user.matchPassword(password))) {
            res.json({
                success: true,
                data: {
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    token: generateToken(user._id)
                }
            })
        } else {
            res.status(401).json({
                success: false,
                message: 'Invalid email or password'
            })
        }
    } catch (error){
        console.error('Login error: ', error)
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

// find user
router.get('/me', protect, (req,res) => {
    res.json({ 
        success: true,
        data: req.user
    })
})

module.exports = router