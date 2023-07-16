import React from 'react';

export default class GrapevineVisualization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    setInterval(() => {
      // run iteration of calculation
    }, 500);
  }

  render() {
    return <></>;
  }
}
