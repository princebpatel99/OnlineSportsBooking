import React from 'react';
import logo from './logo.svg';
import './App.css';
import { FetchData, setCookie } from './RestAPI/database'

export default class App extends React.Component {

  constructor(props) {
    super(props);
    console.log("Constructor")
    console.log(this.myFunction());

  }

  async componentDidMount() {
    console.log("Did Mount")
    setCookie("LoginUser","62d27a5cd6140bb74cdeb34a",365)
    //GET Command
    // let getData = await FetchData("/api/OSBRegister", "GET");
    // console.log("getData",getData);

    // //Post Command
    // var body = {
    //   fullName: "Prince Patel",
    //   email: "patelprince271241@gmail.com",
    //   mobile: "9892389239",
    //   password: "jshjhsjdhsd"
    // }
    // let postData = await FetchData("/api/OSBRegister", "POST",body);
    // console.log("postData",postData);

    // //PUT Command
    // let putBody = {
    //   fullName:"123 Test Updated"
    // }
    // let putData = await FetchData("/api/OSBRegister/62d263d5b2d5e2781db21226", "PUT",putBody);
    // console.log("putData",putData);


    // //Delete Command
    // let deleteData = await FetchData("/api/OSBRegister/62d263d5b2d5e2781db21226", "DELETE");
    // console.log("deleteData",deleteData);


    // //Get Data By ID
    // let getDataByID = await FetchData("/api/OSBRegister/62d238890a40eb45e0d62c37", "GET");
    // console.log("getDataByID",getDataByID);


    // //Filter Data
    // let filterBody = {
    //   filter:{$or:[{fullName: "Prince Patel"},{email:"bar1@gmail.com"}]}
    // };
    // let filterData = await FetchData("/api/OSBRegister/filter", "POST",filterBody);
    // console.log("filterData",filterData);

    // //Send Email
    // let sendEmail = await FetchData("/api/sendEmail/verify/62d2830a4250cf7af2971b95","POST");
    // console.log("sendEmail",sendEmail);


    // Inventory
    // var body = {
    //   name: "Prince Patel",
    //   qty: 10,
    //   Invoice: "9892389239",
    //   DateOfPurchase: new Date()
    // }
    // let postData = await FetchData("/api/OSBInventory", "POST", body);
    // console.log("postData", postData);
  }

  myFunction(){
    return "Hello World";
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
