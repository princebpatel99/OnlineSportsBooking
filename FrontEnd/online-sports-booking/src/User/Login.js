import React from 'react';
import Test from './Test';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    console.log("Constructor")

  }

  
  render() {
    return (
      <div className="App">
        <Test/>
        <h1>Login Page</h1>
      </div>
    );
  }
}
