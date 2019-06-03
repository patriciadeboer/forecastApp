import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FavCities from './FavCities';
import { fetchCurrentWeather, fetchCities } from '../redux/favCities';
import { connect } from 'react-redux';
import { rubberBand } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const RubberBand = styled.div`
  animation: 2s ${keyframes`${rubberBand}`};
  text-align:center
  font-family: 'Gloria Hallelujah', cursive;
  margin:1rem;`;

const Center = styled.div`
  margin: 0 3rem
`;

export class Root extends Component {
  componentDidMount() {
    this.props.fetchAllCities();
    this.props.fetchAllCurrentWeather();
  }
  render() {
    return (
      <Router>
        <div>
          <RubberBand>
            <h1>🌈 Patricia's City Weather App ⛅</h1>
          </RubberBand>
        </div>
        <Center><FavCities /></Center>
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
