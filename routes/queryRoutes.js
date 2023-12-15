const express = require('express');
const router = express.Router();
const { filterQueries } = require('../controllers/queryControllers');
const { update } = require('../models/userModel');

router.get('/users', filterQueries);

module.exports = router;
