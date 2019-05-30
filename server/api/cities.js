// api/cities.js
const router = require('express').Router();

router.get('/', async (req, res, next) => {
  try {
    //GET ALL CITIES
    res.json()
  } catch (err) {
    next(err)
  }
})

module.exports =router;
