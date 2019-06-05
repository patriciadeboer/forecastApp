// api/cities.js
const router = require('express').Router();
const Cities = require('../db/cities');
require('../../secrets');
const axios = require('axios');

router.get('/', async (req, res, next) => {
  try {
    //GET ALL CITIES
    let favCities = await Cities.findAll();
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

router.get('/:city&:country', async (req, res, next) => {
  try {
    const { data } = await axios.get(
      `http://api.openweathermap.org/data/2.5/forecast?q=${
        req.params.city
      },${req.params.country}&APPID=${
        process.env.WEATHERID
      }&units=imperial`
    );
    res.json(data)
  } catch (err) {
    next(err)
  }
})

router.get('/forecast', async (req, res, next) => {
  try {
    let favCities = await Cities.findAll();
    const getForecast = async () => {
      return Promise.all(
        favCities.map(async city => {
          const { data } = await axios.get(
            `http://api.openweathermap.org/data/2.5/forecast?q=${
              city.dataValues.city
            },${city.dataValues.country}&APPID=${
              process.env.WEATHERID
            }&units=imperial`
          );
          return data;
        })
      );
    };
    let forecast = await getForecast();
    console.log(forecast)
    res.json(forecast);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const city=await Cities.create(req.body)
    res.send(city)
  } catch (err) {
    next(err)
  }
})

// router.get('/:city&:country/photos', async (req, res, next) => {
//   try {
//     console.log(req.params)
//     // if()
//     const {data} = await axios.get(`https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=953cecca1a42f7925c6c23fcb41528b9&tags=${req.params.country}&text=${req.params.city}&privacy_filter=1&safe_search=1&per_page=5&page=1&format=json&nojsoncallback=1`)
//     console.log(data)
//     console.log(data.photos.photo)
//     res.json(data)
//   } catch (err) {
//     next(err)
//   }
// })

module.exports = router;
