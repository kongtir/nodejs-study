var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
 // parseIntc("ss");
  res.render('index', { title: 'Express开始' });
});

module.exports = router;
