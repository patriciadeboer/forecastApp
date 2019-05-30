import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

export class Root extends Component {
  render() {
    return (
      <Router>
        <div>Hello from the Root file 😈</div>
      </Router>
    );
  }
}

export default Root;
