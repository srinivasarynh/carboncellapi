const express = require('express');
const authController = require('../controllers/authController');
const publicAPIController = require('../controllers/publicAPIController');
const router = express.Router();

// route to fetch data from publicapis and only for authenticated users(protected)
router.get('/', authController.protect, publicAPIController.getAllData);


module.exports = router;