import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Main from './main/Main.jsx';

class App extends Component {
  render() {
    return (
      // <div className="App">
      //   <ul>
      //     <li> 异步state
      //       <AsyncSetState />
      //     </li>
      //   </ul>
      // </div>
      <Router>
        <Route path="/" component={Main} />
      </Router>

    );
  }
}

export default App;
