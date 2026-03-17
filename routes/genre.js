var express = require('express');
var router = express.Router();
const uc = require('../controller/genre')
const am = require('../middleware/auth')





router.get('/', am.authCheck,uc.pageviews);
router.post('/createdata',am.authCheck,uc.createdata)
router.delete('/:deleteid',am.authCheck,uc.deleteData)
router.patch('/:editdata',am.authCheck,uc.updatedata)

module.exports = router;
