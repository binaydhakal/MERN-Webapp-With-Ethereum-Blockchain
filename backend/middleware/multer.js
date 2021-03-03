const multer = require('multer');



var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}.jpg`)
    }
  })

  console.log('yeta sam ma haii ')
   
  var upload = multer({ storage });

  module.exports = upload;