import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export class NewCity extends Component {
  render() {
    return (
      <div>
        <h4>Start tracking a new city:</h4>
        <Form>
          <Form.Group>
            <Form.Label>City:</Form.Label>
            <Form.Control placeholder="Enter city" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Country</Form.Label>
            <Form.Control placeholder="Enter Country" />
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

export default NewCity;
