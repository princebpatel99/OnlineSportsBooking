import React from 'react';

export default class Test extends React.Component {

  constructor(props) {
    super(props);
    console.log("Constructor")

  }

  
  render() {
    return (
      <div className="App">
        <h1>Test Page</h1>
      </div>
    );
  }
}
