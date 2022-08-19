import React from 'react';
import LeftNavigation from '../Components/LeftNavigation';

export default class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    console.log("Constructor")

  }

  
  render() {
    return (
      
        <LeftNavigation/>
      
    );
  }
}
