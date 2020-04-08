const express = require('express')
const app = express()
const port = 3000

app.set("view engine", "pug")
app.use(express.static('public'))

app.get('/', (req, res, next) => {
  res.render("home")
})

app.listen(port, () => {
  console.log(`App is running on port ${port}!`)
})