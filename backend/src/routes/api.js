const express = require('express');
const router = express.Router();
const ApiController = require('../controllers/api/ApiController');

router.get('/sample', ApiController.sample);

module.exports = router;