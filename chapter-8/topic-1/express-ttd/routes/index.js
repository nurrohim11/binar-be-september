var express = require('express');
const baseControllers = require('../controllers/baseControllers');
var router = express.Router();

/* GET home page. */
router.get('/', baseControllers.hello);
router.get('/sum', baseControllers.sum);

module.exports = router;
