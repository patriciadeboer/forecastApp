import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
require('../../secrets');
import React, { Component } from 'react';
import Axios from 'axios';
import './CityCurrent.css'

export class CityCurrent extends Component {
  constructor() {
    super();
    this.state = {
      cityImg: undefined,
      weatherIcon: undefined,
    };
  }
  async componentDidMount() {
    const { data } = await Axios.get(
      `https://api.unsplash.com/search/photos?page=1&query=${
        this.props.city.name
      }&orientation=landscape&client_id=${process.env.PICSID}`
    );
    console.log(data);
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
    console.log(this.state.cityImg);
    return (
      <div>
        <Card bg="info" text="white" style={{ width: '18rem' }}>
          <Card.Img variant="top" src={this.state.cityImg} style={{height:'11rem'}}/>
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
            <Button variant="light">See Forecast</Button>
          </Card.Body>
          {/* </Card.ImgOverlay> */}
        </Card>
      </div>
    );
  }
}

export default CityCurrent;