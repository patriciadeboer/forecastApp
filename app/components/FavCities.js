import React from 'react';
import { connect } from 'react-redux';
import CityCurrent from './CityCurrent';
import CardGroup from 'react-bootstrap/CardGroup';
import CardDeck from 'react-bootstrap/CardDeck';
import classNames from '../index.css';

export const FavCities = props => {
  console.log(props)
  return (
    <div>
      <CardDeck className={classNames.centeredCardDeck}>
        {props.allCities.reverse().map(city => (
          <CityCurrent key={city[0].id} city={city} country={city[3]}/>
        ))}
      </CardDeck>
    </div>
  );
};
const mapState = state => {
  return {
    allCities: state.favCities.allWeather,
    // cities:state.favCities.cities
  };
};

export default connect(mapState,null)(FavCities);
