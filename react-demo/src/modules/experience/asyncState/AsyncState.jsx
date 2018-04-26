import React, { Component } from 'react';

class AsyncState extends Component {
  constructor() {
    super();
    this.state = {
      num: 0,
    };
  }
  componentDidMount = () => {
    for (let i = 0; i < 100; i++) {
      this.setState({ num: this.state.num + 1 });
      console.log(this.state.num);
    }
    for (let i = 0; i < 100; i++) {
      this.setState((prevState) => {
        console.log('prevState', prevState);
        console.log(prevState.num);
        return {
          num: prevState.num + 1,
        };
      });
    }
  }
  render() {
    return (
      <div>
        num:{this.state.num}
      </div>
    );
  }
}
export default AsyncState;
