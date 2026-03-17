var express = require('express');
var router = express.Router();

const mw = require('../middleware/auth')
const mc = require('../controller/maincontroller')


router.get('/', mw.authCheck,mc.getalldata);
module.exports = router;