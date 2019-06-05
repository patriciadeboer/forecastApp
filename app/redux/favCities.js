import Axios from 'axios';

const initialState = {
  cities: [],
  weather: [],
  forecast: []
};

export const GET_CITIES = 'GET_CITIES';

export const getCities = cities => ({
  type: GET_CITIES,
  cities,
});

export const GET_CURRENT_WEATHER = 'GET_CURRENT_WEATHER';

export const getCurrentWeather = weather => ({
  type: GET_CURRENT_WEATHER,
  weather,
});

export const GET_FORECAST = 'GET_FORECAST';

export const getForecast = forecast => ({
  type: GET_FORECAST,
  forecast,
});

export const GOT_NEW_CITY = 'GOT_NEW_CITY';

export const gotNewCity = city => ({
  type: GOT_NEW_CITY,
  city,
});

export const fetchCities = () => async dispatch => {
  try {
    const response = await Axios.get('/api/cities');
    const cities = response.data;
    dispatch(getCities(cities));
  } catch (err) {
    console.error(err);
  }
};

export const fetchCurrentWeather = () => async dispatch => {
  try {
    const response = await Axios.get('/api/cities/weather');
    const weather = response.data;
    dispatch(getCurrentWeather(weather));
  } catch (err) {
    console.error(err);
  }
};

export const fetchForecast = () => async dispatch => {
  try {
    const response = await Axios.get('/api/cities/forecast');
    const forecast = response.data;
    dispatch(getForecast(forecast));
  } catch (err) {
    console.error(err);
  }
};

export const newCity = cityInput => async dispatch => {
  try {
    console.log(cityInput);
    const response = await Axios.post('/api/cities', cityInput);
    const city = response.data;
    dispatch(gotNewCity(city));
    dispatch(fetchCurrentWeather());
  } catch (err) {
    console.error(err);
  }
};

export const favCities = (state = initialState, action) => {
  switch (action.type) {
    case GET_CITIES:
      return { ...state, cities: action.cities };
    case GET_CURRENT_WEATHER:
      return { ...state, weather: action.weather };
    case GET_FORECAST:
      return { ...state, forecast: action.forecast };
    case GOT_NEW_CITY:
      return { ...state, cities: state.cities.concat(action.city) };
    default:
      return state;
  }
};
