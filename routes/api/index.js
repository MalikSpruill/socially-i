const router = require('express').Router();
const thoughtRoutes = require('./thought-rioutes');
const userRoutes = require('./user-routes');

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

module.exports = router;