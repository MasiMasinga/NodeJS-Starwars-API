const router = require('express').Router();
const authRoutes = require('./auth');
const searchRoutes = require('./search');

router.use('/auth', authRoutes);
router.use('/search', searchRoutes);

module.exports = router;