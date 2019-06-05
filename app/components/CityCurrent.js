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
import { removeCity } from '../redux/favCities';
import { connect } from 'react-redux';
import ReactLoading from 'react-loading';
// import {Spinner} from 'belle'
// let belle = require('belle');
// let Spinner = belle.Spinner;

export class CityCurrent extends Component {
  constructor() {
    super();
    this.state = {
      cityImg: undefined,
      weatherIcon: undefined,
      isFlipped: false,
      loading: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.dayOfWeekAsString = this.dayOfWeekAsString.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    this.setState(prevState => ({ isFlipped: !prevState.isFlipped }));
  }

  dayOfWeekAsString(dayIndex) {
    return ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'][dayIndex];
  }

  async handleDelete() {
    this.setState({ loading: true });
    const city = this.props.city[0].name;
    const country = this.props.country;
    await setTimeout(() => {
      // this.setState({ loading: false });
      this.props.deleteCity(city, country);
    }, 600);
    // this.props.deleteCity(city, country);
  }

  async componentDidMount() {
    const { data } = await Axios.get(
      `https://api.unsplash.com/search/photos?page=1&query=${
        this.props.city[0].name
      }&orientation=landscape&client_id=${process.env.PICSID}`
    );
    //console.log(data);
    // console.log(data.results[0].urls.small)
    // this.state.cityImg = data.results[0].urls.small
    // this.props.fetchCurrentForecast(this.props.city[0].id);

    this.setState({
      cityImg: data.results[0].urls.small,
      weatherIcon: `http://openweathermap.org/img/w/${
        this.props.city[0].weather[0].icon
      }.png`,
    });
  }
  render() {
    // console.log(this.props.city[1].list[0].weather[0].description)
    AOS.init();

    const listElements = [];
    for (let i = 0; i < 40; i += 8) {
      let timestamp = this.props.city[1].list[i].dt;
      var xx = new Date();
      xx.setTime(timestamp * 1000);
      let day = xx.getDay();
      let dayStr = this.dayOfWeekAsString(day);
      if (i === 0) {
        dayStr = 'Tomorrow';
      }
      const temp = Math.floor(this.props.city[1].list[i].main.temp);

      listElements.push(
        <ListGroup.Item
          key={this.props.city[1].list[i].dt}
          className={classNames.ListGroupText}
        >
          {`${dayStr}:`}
          <img
            src={`http://openweathermap.org/img/w/${
              this.props.city[1].list[i].weather[0].icon
            }.png`}
            alt="icon"
          />
          {`${this.props.city[1].list[i].weather[0].description} `}~{temp}&deg;F
        </ListGroup.Item>
      );
    }
    return (
      <ReactCardFlip
        isFlipped={this.state.isFlipped}
        flipDirection="horizontal"
      >
        <div data-aos="flip-up" key="front">
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
            {/* <Card.ImgOverlay className={classNames.delete}> */}

            {/* </Card.ImgOverlay> */}
            <Card.Body className={classNames.weatherCard}>
              <Card.Body>
                <Card.Title>{this.props.city[0].name}</Card.Title>
                <Card.Subtitle>
                  <img src={this.state.weatherIcon} alt="icon" />
                  {this.props.city[0].weather[0].description}
                </Card.Subtitle>
                <Card.Text>
                  Current Temp: {Math.floor(this.props.city[0].main.temp)}&deg;F
                  <br />
                  Humidity: {this.props.city[0].main.humidity}%
                </Card.Text>
              </Card.Body>
              <Button
                variant="warning"
                className={classNames.deleteButton}
                onClick={this.handleDelete}
                disabled={this.state.loading}
              >
                {!this.state.loading && 'X'}
                {this.state.loading && (
                  <ReactLoading width={30} type="bubbles" color="#fff" />
                )}
              </Button>
            </Card.Body>
            <Card.Body>
              <Button variant="light" block onClick={this.handleClick}>
                See Forecast
              </Button>
            </Card.Body>
            {/* </Card.ImgOverlay> */}
          </Card>
        </div>
        <div data-aos="flip-up" key="back">
          <Card
            className={classNames.cardTile}
            bg="light"
            border="info"
            style={{ width: '18rem' }}
          >
            <Card.Body>
              <Card.Text>
                <strong>{this.props.city[0].name} 5-day forecast:</strong>
              </Card.Text>
            </Card.Body>
            <ListGroup>{listElements}</ListGroup>
            <Card.Body>
              <Button variant="primary" block onClick={this.handleClick}>
                See Current Weather
              </Button>
            </Card.Body>
          </Card>
        </div>
      </ReactCardFlip>
    );
  }
}

const mapState = state => {
  return { singleCity: state.singleCity };
};

const mapDispatch = dispatch => {
  return {
    deleteCity: (city, country) => dispatch(removeCity(city, country)),
  };
};

export default connect(
  mapState,
  mapDispatch
)(CityCurrent);
