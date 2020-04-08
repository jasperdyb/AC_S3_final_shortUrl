const express = require('express')
const router = express.Router()
const Urls = require('../models/url')

const hashLength = 5

const validURL = function (str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}


//產生 key
const generateRandomKey = function () {
  const characters = "0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ";
  let string = "";
  for (let i = 0; i < hashLength; i++) {
    string += characters[Math.floor(Math.random() * characters.length)];
  }
  return string;
}

//檢查 key 衝突
const checkKeyIdentical = async function () {
  let keyIdentical = false
  let key = null

  while (!keyIdentical) {
    try {
      key = generateRandomKey()
      // key = "IL2FR"
      const url = await Urls.findOne({ key: key }).exec()
      if (!url) {
        keyIdentical = true
      }
      else {
        console.log('The key is not identical')
      }
    }
    catch (e) {
      console.log('exception: ' + e);
    }
  }
  return key
}

//url generation
router.post('/', (req, res, next) => {
  const target = req.body.target
  let generatedUrl = null

  //Check if the input is an url
  if (validURL(target)) {
    Urls.findOne({ target: target })
      .then(url => {
        if (url) {
          // generatedUrl = req.body.domain + '/url/' + url.key
          generatedUrl = `${req.body.domain}:${req.body.port}/url/${url.key}`
          res.send(generatedUrl)

        } else {

          checkKeyIdentical()
            .then((key) => {
              const url = new Urls({
                target: target,
                key: key
              })

              // generatedUrl = req.body.domain + '/url/' + key
              generatedUrl = `${req.body.domain}:${req.body.port}/url/${url.key}` //for localhost

              console.log(`This is a Url(${target}). New url : ${generatedUrl}`)

              url.save(err => {
                if (err) return console.error(err)
                res.send(generatedUrl)
              })
            })
        }
      })
  }
  else {
    res.send(generatedUrl)
  }


})

router.get('/:key', (req, res, next) => {
  console.log(req.params.key)
  Urls.findOne({ key: req.params.key })
    .lean()
    .exec((err, url) => {
      if (err) return console.error(err)
      res.redirect(url.target)
    })
})

module.exports = router