import React from 'react';

export default class ToggleButtonOnOff extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = { isOff: false };
  }

  handleClick() {
    this.setState({ isOff: !this.state.isOff });
  }

  render() {
    const { isOff } = this.state;
    const title = this.state.isOff ? 'ON' : 'OFF';
    const className = this.state.isOff
      ? 'grapevineToggleButton grapevineToggleButtonOn'
      : 'grapevineToggleButton grapevineToggleButtonOff';
    return (
      <button type="button" onClick={this.handleClick} className={className}>
        <div style={{ fontSize: '20px' }}>🍇</div>
        <div style={{ fontSize: '10px' }}>{title}</div>
      </button>
    );
  }
}
