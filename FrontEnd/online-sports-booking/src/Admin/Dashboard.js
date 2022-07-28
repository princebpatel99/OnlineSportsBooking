import React from 'react';
import LeftNavigation from './LeftNavigation';

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    console.log("Constructor")

  }

  
  render() {
    return (
      <div className="App">
        <LeftNavigation/>
      </div>
    );
  }
}
