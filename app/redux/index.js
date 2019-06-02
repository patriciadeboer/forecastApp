import { combineReducers } from 'redux';
import {favCities} from './favCities';
import {singleCity} from './singleCity.js';


//export * from './first'

const appReducer = combineReducers({
  favCities: favCities,
  singleCity: singleCity
})

export default appReducer;
