var express = require('express');
var router = express.Router();

const mw = require('../middleware/auth')
const tc = require('../controller/transaction')

router.post('/createdata', mw.authcheck,tc.createdata);
router.get('/', mw.authcheck,tc.pageview);
  


module.exports = router;
