import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Collapse, Jumbotron, ListGroup } from 'react-bootstrap';
require('../../secrets');
import React, { Component } from 'react';
import Axios from 'axios';
import './CityCurrent.css';
import ReactRain from 'react-rain-animation';
import classNames from '../index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ReactCardFlip from 'react-card-flip';
import { fetchCityForecast } from '../redux/singleCity';
import { connect } from 'react-redux';

export class CityCurrent extends Component {
  constructor() {
    super();
    this.state = {
      cityImg: undefined,
      weatherIcon: undefined,
      isFlipped: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

  async componentDidMount() {
    const { data } = await Axios.get(
      `https://api.unsplash.com/search/photos?page=1&query=${
        this.props.city.name
      }&orientation=landscape&client_id=${process.env.PICSID}`
    );
    //console.log(data);
    // console.log(data.results[0].urls.small)
    // this.state.cityImg = data.results[0].urls.small
    this.setState({
      cityImg: data.results[0].urls.small,
      weatherIcon: `http://openweathermap.org/img/w/${
        this.props.city.weather[0].icon
      }.png`,
    });
  }
  render() {
    AOS.init();
    return (
      <ReactCardFlip
        isFlipped={this.state.isFlipped}
        flipDirection="horizontal"
      >
        <div data-aos="flip-down" key="front">
          <Card
            className={classNames.cardTile}
            bg="primary"
            text="white"
            style={{ width: '18rem' }}
          >
            <Card.Img
              variant="top"
              src={this.state.cityImg}
              style={{ height: '11rem' }}
            />
            {/* <Card.ImgOverlay> */}
            <Card.Body>
              <Card.Title>{this.props.city.name}</Card.Title>
              <Card.Subtitle>
                <img src={this.state.weatherIcon} alt="icon" />
                {this.props.city.weather[0].description}
              </Card.Subtitle>
              <Card.Text>
                Current Temp: {this.props.city.main.temp}&deg;F
                <br />
                Humidity: {this.props.city.main.humidity}%
              </Card.Text>
              <Button variant="light" onClick={this.handleClick}>
                See Forecast
              </Button>
            </Card.Body>
            {/* </Card.ImgOverlay> */}
          </Card>
        </div>
        <div data-aos="flip-down" key="back">
          <Card
            className={classNames.cardTile}
            bg="light"
            border="info"
            style={{ width: '18rem' }}
          >
            <Card.Body>
              <Card.Title>{this.props.city.name}</Card.Title>
              <Card.Text>Forecast for next 5 days:</Card.Text>
            </Card.Body>
            <ListGroup>
              <ListGroup.Item>Day 1 Weather</ListGroup.Item>
              <ListGroup.Item>Day 2 Weather</ListGroup.Item>
              <ListGroup.Item>Day 3 Weather</ListGroup.Item>
              <ListGroup.Item>Day 4 Weather</ListGroup.Item>
              <ListGroup.Item>Day 5 Weather</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              <Button variant="primary" onClick={this.handleClick}>
                See Current Weather
              </Button>
            </Card.Body>
          </Card>
        </div>
      </ReactCardFlip>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    fetchCurrentForecast: (city, country) =>
      dispatch(fetchCityForecast(city, country)),
  };
};

export default connect(
  null,
  mapDispatch
)(CityCurrent);
