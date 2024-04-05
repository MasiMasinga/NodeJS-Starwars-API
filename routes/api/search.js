const express = require('express');
const router = express.Router();
const searchController = require('../../controllers/search');
const { authenticate } = require('../../middleware/auth');

router.get('/', authenticate, searchController.search);

module.exports = router;