var express = require('express');
var router = express.Router();


const uc = require('../controller/user')

// const mw = require('../middleware/auth')

/* GET home page. */
router.get('/', uc.pageview);
router.post('/createdata',uc.createdata)
router.delete('/:deleteid',uc.deleteData)
router.patch('/:editdata',uc.updatedata)
router.post('/login',uc.login)

module.exports = router;
