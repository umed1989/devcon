const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const gravatar = require('gravatar')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        min: [6, 'Password suppose to be 6 characters'],
        unique: [true, 'This email already exists!']
    },
    password: {
        type: String,
        required: [true, 'Please provide the password!'],
        select: false
    },
    date: {
        type: Date,
        default: Date.now
    },
    avatar: {
        type: String
    }
})

userSchema.methods.correctPassword = async function(
    candidatePassword,
    userPassword
  ) {
    return await bcrypt.compare(candidatePassword, userPassword);
  };

userSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    this.avatar = gravatar.url(this.email, {
      s: '200',
      r: 'pg',
      d: 'mm'
    })
    
    next()
})

module.exports = mongoose.model('User', userSchema)