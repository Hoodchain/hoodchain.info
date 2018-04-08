// Define schema
const mongoose = require('mongoose')

const Schema = mongoose.Schema

var UserSchema = new Schema({
  name: String,
  password: Date
})

// Compile model from schema
module.exports = mongoose.model('User', UserSchema)
