import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FetchData } from './RestAPI/database'

export default class App extends React.Component {

  constructor(props) {
    super(props);


  }

  async componentDidMount() {
    //GET Command
    let getData = await FetchData("/api/obsAdmin", "GET");
    console.log("getData",getData);

    //Post Command
    var body = {
      fullName: "Test Data",
      email: "bar90@gmail.com",
      mobile: "9892389239",
      password: "jshjhsjdhsd"
    }
    let postData = await FetchData("/api/obsAdmin", "POST",body);
    console.log("postData",postData);

    //PUT Command
    let putBody = {
      fullName:"123 Test Updated"
    }
    let putData = await FetchData("/api/obsAdmin/62d263d5b2d5e2781db21226", "PUT",putBody);
    console.log("postData",postData);


    //Delete Command
    let deleteData = await FetchData("/api/obsAdmin/62d263d5b2d5e2781db21226", "DELETE");
    console.log("deleteData",deleteData);


    //Get Data By ID
    let getDataByID = await FetchData("/api/obsAdmin/62d238890a40eb45e0d62c37", "GET");
    console.log("getDataByID",getDataByID);


    //Filter Data
    let filterBody = {
      filter:{$or:[{fullName: "Prince Patel"},{email:"bar1@gmail.com"}]}
    };
    let filterData = await FetchData("/api/obsAdmin/filter", "POST",filterBody);
    console.log("filterData",filterData);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
