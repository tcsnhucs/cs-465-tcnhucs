var express = require('express');
var router = express.Router();
const ctrlNews= require('../controllers/news');

/* GET news view. */
router.get('/', ctrlNews.news);

module.exports = router;