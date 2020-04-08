const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  target: { //目標網址
    type: String,
    required: true
  },
  key: { //短網址的五碼亂數
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Urls', urlSchema)