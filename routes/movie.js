const express = require('express');
const router = express.Router();
const uc = require('../controller/movie');
const am = require('../middleware/auth');  // ✅ spelling fixed
const multer = require('multer');
const path = require('path');

// ✅ Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ Routes
router.get('/', am.authCheck, uc.pageviews);

router.post(
  '/createdata',
  am.authCheck, // auth first
  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'videoUrl', maxCount: 1 },
  ]),
  uc.createdata
);

router.delete('/:deleteid', am.authCheck, uc.deleteData);
router.patch('/:editdata', am.authCheck, uc.updatedata);

module.exports = router;
