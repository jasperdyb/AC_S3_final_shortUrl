const express = require('express')
const router = express.Router()
const Urls = require('../models/url')

const hashLength = 5

function validURL(str) {
  var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
    '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
  return !!pattern.test(str);
}

function generateRandomKey() {
  const characters = "0123456789ABCDEFGHIJKLMNPQRSTUVWXYZ";
  let string = "";
  for (let i = 0; i < hashLength; i++) {
    string += characters[Math.floor(Math.random() * characters.length)];
  }
  return string;
}

router.post('/', (req, res, next) => {
  const target = req.body.target
  let generatedUrl = null

  if (validURL(target)) {
    Urls.findOne({ target: target })
      .then(url => {
        if (url) {
          generatedUrl = req.body.domain + '/' + url.key
          res.send(generatedUrl)

        } else {

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

          checkKeyIdentical()
            .then((key) => {
              const url = new Urls({
                target: target,
                key: key
              })

              generatedUrl = req.body.domain + '/' + key

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
    console.log("This is not a Url")
    res.send(generatedUrl)
  }


})

module.exports = router