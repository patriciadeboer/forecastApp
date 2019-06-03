import React from 'react';
import { connect } from 'react-redux';
import CityCurrent from './CityCurrent';
import CardGroup from 'react-bootstrap/CardGroup';
import CardDeck from 'react-bootstrap/CardDeck';
import classNames from '../index.css'

export const FavCities = props => {
  return (
    <div>
      <CardDeck className={classNames.centeredCardDeck}>
        {props.favCities.map(city => (
          <CityCurrent key={city.id} city={city} />
        ))}
      </CardDeck>
    </div>
  );
};
const mapState = state => {
  return { favCities: state.favCities.weather };
};

export default connect(mapState)(FavCities);
