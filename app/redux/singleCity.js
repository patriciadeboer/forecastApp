import Axios from 'axios'

export const GET_CITY_FORECAST = 'GET_CITY_FORECAST'

export const getCityForecast = (cityForecast) => ({
  type: GET_CITY_FORECAST,
  cityForecast
})

export const fetchCityForecast = (cityId) => async dispatch => {
  try {
    //const country =
    const response = await Axios.get(`api/cities/${cityId}`)
    const forecast = response.data;
    dispatch(getCityForecast(forecast))
  } catch (err) {
    console.error(err)
  }
}

export const singleCity = (state = {}, action) => {
  switch (action.type) {
    case GET_CITY_FORECAST:
      return action.cityForecast
    default:
      return state
  }
}
