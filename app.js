const express = require('express')
const app = express()
const port = 3000
const mongoose = require('mongoose')

//Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortUrl', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})

// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

//app middleware
app.set("view engine", "pug")
app.use(express.static('public'))

//routes
app.get('/', (req, res, next) => {
  res.render("home")
})
app.use('/url', require('./routers/url.js'))



//server start
app.listen(port, () => {
  console.log(`App is running on port ${port}!`)
})