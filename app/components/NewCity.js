import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';
import { newCity, fetchCurrentWeather } from '../redux/favCities';
import ReactLoading from 'react-loading';
import { bounce } from 'react-animations';
import styled, { keyframes } from 'styled-components';

const Bounce = styled.div`
  animation: 2s ${keyframes`${bounce}`} infinite`;

export class NewCity extends Component {
  constructor() {
    super();
    this.state = {
      country: '',
      city: '',
      loading: false,
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
    this.setState({ loading: true });
    this.props.addCity(this.state);
    this.setState({
      country: '',
      city: '',
      loading: false
    });
  }

  render() {
    return (
      <div>
        <Bounce><h4>Start tracking a new city:</h4></Bounce>
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
              Enter ISO or full Name of country
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" disabled={this.state.loading}>
            {!this.state.loading && 'Add City'}
            {this.state.loading && (
              <ReactLoading
                width={50}
                height={10}
                type="bubbles"
                color="#fff"
              />
            )}
          </Button>
        </Form>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    addCity: cityInput => dispatch(newCity(cityInput))
  };
};

export default connect(
  null,
  mapDispatch
)(NewCity);
