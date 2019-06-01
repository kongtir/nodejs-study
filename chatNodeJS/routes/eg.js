var mongo = require('./../common/mongoKit');
var express = require('express');
var router = express.Router();
var logger = require('./../common/logger')();
/* GET home page. */
router.get('/', function(req, res, next) {
  logger.info("==已进入/ for index==");
  mongo.add("news",{a:1,g:3}).then(function (e) {
    console.log(e.result)
  });
  mongo.find("news", {}).then(function (e) {
    console.log(e)
  });

  res.render('index', { title: 'Express' });
});

module.exports = router;
