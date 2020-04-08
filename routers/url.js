const express = require('express')
const router = express.Router()
const Urls = require('../models/url')

router.put('/', (req, res, next) => {
  res.send('get url')
})

module.exports = router