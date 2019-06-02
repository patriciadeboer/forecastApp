import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FavCities from './FavCities';
import { fetchCurrentWeather, fetchCities } from '../redux/favCities';
import {connect} from 'react-redux'

export class Root extends Component {
  componentDidMount(){
    this.props.fetchAllCities();
    this.props.fetchAllCurrentWeather();
  }
  render() {
    return (
      <Router>
        <div>Hello from the Root file 😈</div>
        <FavCities />
      </Router>
    );
  }
}

const mapState=state=>{
  return {...state}
}

const mapDispatch=dispatch=>{
  return {
    fetchAllCities: ()=>dispatch(fetchCities()),
    fetchAllCurrentWeather: ()=>dispatch(fetchCurrentWeather())
  }
}
export default connect(mapState,mapDispatch)(Root);
