import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Main from './main/Main.jsx';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" component={Main} />
      </Router>

    );
  }
}

export default App;
