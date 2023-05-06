// const jwt = require('jsonwebtoken')
// const bcrypt = require('bcryptjs')
// const User = require('../models/userModel')
import  { Request, Response, NextFunction,} from "express";


//base url '/api/v1/auth'

// @desc    Register new user
// @route   POST /
// @access  Public
const registerUser = async (req:Request, res:Response) => {
  const { name, email, password } = req.body
  res.send("registerUser")

//   if (!name || !email || !password) {
//     res.status(400)
//     throw new Error('Please add all fields')
//   }

//   // Check if user exists
//   const userExists = await User.findOne({ email })

//   if (userExists) {
//     res.status(400)
//     throw new Error('User already exists')
//   }

//   // Hash password
//   const salt = await bcrypt.genSalt(10)
//   const hashedPassword = await bcrypt.hash(password, salt)

//   // Create user
//   const user = await User.create({
//     name,
//     email,
//     password: hashedPassword,
//   })

//   if (user) {
//     res.status(201).json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     })
//   } else {
//     res.status(400)
//     throw new Error('Invalid user data')
//   }
}

// @desc    Authenticate a user
// @route   POST /login
// @access  Public
const loginUser = async (req:Request, res:Response) => {
    res.send("login")
//   const { email, password } = req.body

//   // Check for user email
//   const user = await User.findOne({ email })

//   if (user && (await bcrypt.compare(password, user.password))) {
//     res.json({
//       _id: user.id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     })
//   } else {
//     res.status(400)
//     throw new Error('Invalid credentials')
//   }
}

// @desc    Get user data
// @route   GET /me
// @access  Private
const getMe = async (req:Request, res:Response) => {
//   res.status(200).json(req.user)
res.send("info about user")
}

// Generate JWT
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: '30d',
//   })
// }

export default {
  registerUser,
  loginUser,
  getMe,
}


