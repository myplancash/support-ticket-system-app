const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add an Name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an Email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add an Password'],
  },
  isAdmin: {
    type: String,
    required: true,
    default: false,
  }
}, {
  timestamps: true,
})

module.exports = mongoose.model('User', userSchema)