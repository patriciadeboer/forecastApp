import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { newCity, fetchCurrentWeather } from '../redux/favCities';

export class NewCity extends Component {
  constructor() {
    super();
    this.state = {
      country: undefined,
      city: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const newCity = this.state.city;
    const newCountry = this.state.country==='' ? this.state.country : 'US';

    this.props.addCity(this.state);
    // this.props.updateWeather();

    this.setState({
      country: undefined,
      city: '',
    });
  }

  render() {
    return (
      <div>
        <h4>Start tracking a new city:</h4>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label>City:</Form.Label>
            <Form.Control
              name="city"
              value={this.state.city}
              onChange={this.handleChange}
              placeholder="Enter city"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control
              name="country"
              value={this.state.country}
              onChange={this.handleChange}
              placeholder="Enter Country"
            />
            <Form.Text className="text-muted">
              If left blank, will default to US
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit">
            Add City
          </Button>
        </Form>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    addCity: cityInput => dispatch(newCity(cityInput)),
    updateWeather: ()=> dispatch(fetchCurrentWeather())
  };
};

export default connect(
  null,
  mapDispatch
)(NewCity);
