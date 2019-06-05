import Axios from 'axios';

const initialState = {
  cities: [],
  weather: [],
  forecast: [],
  allWeather: [],
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

export const GET_ALL_WEATHER = 'GET_ALL_WEATHER';

export const getAllWeather = allWeather => ({
  type: GET_ALL_WEATHER,
  allWeather,
});
export const GOT_NEW_CITY = 'GOT_NEW_CITY';

export const gotNewCity = city => ({
  type: GOT_NEW_CITY,
  city,
});

export const REMOVE_CITY_CARD = 'REMOVE_CITY_CARD';

export const removeCityCard = (city, country) => ({
  type: REMOVE_CITY_CARD,
  city,
  country,
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

export const fetchAllWeather = () => async dispatch => {
  try {
    const response = await Axios.get('/api/cities/allWeather');
    const allWeather = response.data;
    dispatch(getAllWeather(allWeather));
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
    // dispatch(fetchCurrentWeather());
    dispatch(fetchAllWeather());
  } catch (err) {
    console.error(err);
  }
};

export const removeCity = (city, country) => async dispatch => {
  try {
    console.log(city, country);
    const response = await Axios.delete(`/api/cities/${city}&${country}`);
    // dispatch(removeCityCard(city, country));
    dispatch(fetchAllWeather());
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
    case GET_ALL_WEATHER:
      return { ...state, allWeather: action.allWeather };
    // case GOT_NEW_CITY:
    //   return { ...state, cities: [action.city,...state.cities] };
    case GOT_NEW_CITY:
      return { ...state, cities: state.cities.concat(action.city) };
    case REMOVE_CITY_CARD:
      return {
        ...state,
        allWeather: state.allWeather.filter(card => {
          console.log('card[2]',card[2],'vs', action.city)
          console.log('card[3]',card[3],'vs', action.country)
          const check = (card[2] !== action.city || card[3] !== action.country)
          console.log(check)
          return check
        }),
      };
    default:
      return state;
  }
};
