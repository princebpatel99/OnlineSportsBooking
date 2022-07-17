import React from 'react';

export default class Login extends React.Component {

  constructor(props) {
    super(props);
    console.log("Constructor")

  }

  
  render() {
    return (
      <div className="App">
        <h1>Login Page</h1>
      </div>
    );
  }
}
