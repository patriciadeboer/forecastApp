// api/cities.js
const router = require('express').Router();
const Cities = require('../db/cities');
require('../../secrets');
const axios = require('axios');

router.get('/', async (req, res, next) => {
  try {
    //GET ALL CITIES
    let favCities = await Cities.findAll();
    console.log(favCities[1].dataValues.city);
    console.log(favCities[1].dataValues.country);
    res.json(favCities);
  } catch (err) {
    next(err);
  }
});

router.get('/weather', async (req, res, next) => {
  try {
    let favCities = await Cities.findAll();
    const getWeather = async () => {
      return Promise.all(
        favCities.map(async city => {
          const { data } = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?q=${
              city.dataValues.city
            },${city.dataValues.country}&APPID=${
              process.env.WEATHERID
            }&units=imperial`
          );
          return data;
        })
      );
    };
    let weather = await getWeather();
    //console.log(weather)
    res.json(weather);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
