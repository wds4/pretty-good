import React from 'react';

export default class Masthead extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    return (
      <>
        <div className="mastheadMainAreaContainer">
          <div className="mastheadAppNameContainer">
            electron-react-boilerplate-sqlite3-multiWindows
          </div>
          <div style={{ textAlign: 'left', display: 'inline-block' }}>
            <li>sqlite3 database is accessible via renderer process</li>
            <li>multiple windows (3 demonstrated) - turn each one on/off in main.ts</li>
            <li>app is production ready</li>
          </div>
        </div>
      </>
    );
  }
}
