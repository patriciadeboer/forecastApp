import Axios from 'axios';

const initialState = {
  cities: [],
  weather: [],
};

export const GET_CITIES = 'GET_CITIES';

export const getCities = cities => ({
  type: GET_CITIES,
  cities,
});

export const GET_CURRENT_WEATHER = 'GET_CURRENT_WEATHER'

export const getCurrentWeather = (weather) => ({
  type: GET_CURRENT_WEATHER,
  weather
})

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
    const response = await Axios.get('/api/cities/weather')
    const weather = response.data;
    dispatch(getCurrentWeather(weather))
  } catch (err) {
    console.error(err)
  }
}

export const favCities = (state = initialState, action) => {
  switch (action.type) {
    case GET_CITIES:
      return { ...state, cities: action.cities };
    case GET_CURRENT_WEATHER:
      return { ...state, weather: action.weather };
    default:
      return state;
  }
};
