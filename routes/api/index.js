const router = require('express').Router();

const userRoute = require('./user-routes');
const thoughtRoute = require('./thought-routes');

router.use('./user', userRoute);
router.use('./thought', thoughtRoute);

module.exports = router;