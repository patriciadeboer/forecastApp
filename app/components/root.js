import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FavCities from './FavCities';
import { fetchCurrentWeather, fetchCities } from '../redux/favCities';
import { connect } from 'react-redux';
import { rubberBand } from 'react-animations';
import styled, { keyframes } from 'styled-components';
import { Jumbotron } from 'react-bootstrap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import classNames from '../index.css'

const RubberBand = styled.div`
  animation: 2s ${keyframes`${rubberBand}`}`;

export class Root extends Component {
  componentDidMount() {
    this.props.fetchAllCities();
    this.props.fetchAllCurrentWeather();
  }
  render() {
    AOS.init();
    return (
      <Router>
        <div className="main">
          <Jumbotron className={classNames.jumbotronText}>
            <RubberBand>
              <h1>🌈 Weather App ⛅</h1>
            </RubberBand>
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
  };
};
export default connect(
  mapState,
  mapDispatch
)(Root);
