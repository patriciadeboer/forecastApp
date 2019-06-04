import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Collapse } from 'react-bootstrap';
require('../../secrets');
import React, { Component } from 'react';
import Axios from 'axios';
import './CityCurrent.css';
import ReactRain from 'react-rain-animation';
import classNames from '../index.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

export class CityCurrent extends Component {
  constructor() {
    super();
    this.state = {
      cityImg: undefined,
      weatherIcon: undefined,
      open: false,
    };
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
      <div data-aos="flip-down">
        <Card
          className={classNames.cardTile}
          bg="info"
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
            <Button
              variant="light"
              onClick={() => this.setState({ open: !this.state.open })}
              aria-controls="example-text"
              aria-expanded={open}
            >
              See Forecast
            </Button>
          </Card.Body>
          {/* </Card.ImgOverlay> */}
        </Card>
        <Collapse in={this.state.open}>
          <div id="example-text">Test</div>
        </Collapse>
      </div>
    );
  }
}

export default CityCurrent;
