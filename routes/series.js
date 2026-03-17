var express = require('express');
var router = express.Router();


const uc = require('../controller/series')
const am = require('../middleware/auth')

// const mw = require('../middleware/auth')

const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


const upload = multer({ storage: storage })

/* GET home page. */
router.get('/', am.authCheck,uc.pageviews);
router.post('/createdata',upload.single('thumbnail'),am.authCheck,uc.createdata)
router.delete('/:deleteid',am.authCheck,uc.deleteData)
router.patch('/:editdata',upload.single('thumbnail'),am.authCheck,uc.updatedata)


module.exports = router;