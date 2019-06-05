import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FavCities from './FavCities';
import { fetchCurrentWeather, fetchCities,fetchAllWeather } from '../redux/favCities';
import { connect } from 'react-redux';
import { rubberBand } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { Jumbotron } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import classNames from '../index.css'
import NewCity from './NewCity'

const RubberBand = styled.div`
  animation: 2s ${keyframes`${rubberBand}`}`;

export class Root extends Component {
  componentDidMount() {
    this.props.fetchAllCities();
    // this.props.fetchAllCurrentWeather();
    this.props.fetchAllWeather();
  }
  render() {
    AOS.init();
    return (
      <Router>
        <div className="main">
          <Jumbotron className={classNames.jumbotron}>
            <RubberBand>
              <h1> Weather Info</h1>
              <p>Current weather in your favorite cities</p>
              <h1>☀️ ⛅ 🌧️ ⛈️ 🌈</h1>
            </RubberBand>
            <NewCity />
          </Jumbotron>
          <FavCities />
        </div>
      </Router>
    );
  }
}

const mapState = state => {
  return { ...state };
};

const mapDispatch = dispatch => {
  return {
    fetchAllCities: () => dispatch(fetchCities()),
    fetchAllCurrentWeather: () => dispatch(fetchCurrentWeather()),
    fetchAllWeather:()=>dispatch(fetchAllWeather())
  };
};
export default connect(
  mapState,
  mapDispatch
)(Root);
