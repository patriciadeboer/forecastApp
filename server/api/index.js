const router = require('express').Router();

router.use('/cities', require('./cities')); // matches all requests to /api/cities/

module.exports = router;
