import React from 'react';

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    console.log("Constructor")

  }

  
  render() {
    return (
      <div className="App">
        <h1>Dashboard Page</h1>
      </div>
    );
  }
}
