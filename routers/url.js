const express = require('express')
const router = express.Router()
const Urls = require('../models/url')

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}

router.post('/', (req, res, next) => {

  console.log(validURL(req.body.url))

  if (validURL(req.body.url)) {
    console.log("This is a Url")
  }
  else {
    console.log("This is not a Url")
  }

  res.send(`get url: ${req.body.url}`)
})

module.exports = router