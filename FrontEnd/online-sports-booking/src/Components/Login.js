import React, { useState } from "react";
import ReactDOM from "react-dom";
import LeftNavigation from "./LeftNavigation";
import { FetchData, getAuth ,setCookie} from '../RestAPI/database';
import ConfirmBox from './ConfirmBox';
var CryptoJS = require("crypto-js");


function Login() {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isError, setError] = useState();
    const [errorObject, setErrorObj] = useState({});

    const validateLogin = async () => {
        let Token = getAuth();
        let filterBody = {
            filter: { $and: [{ email: email }] }
        };
        let filterData = await FetchData("/api/OSBRegister/filter", "POST", filterBody);
        if (filterData.length >= 1) {
            let plainText = CryptoJS.AES.decrypt(filterData[0].password, Token).toString((CryptoJS.enc.Utf8));
            if (plainText == password) {
                if(filterData[0].isVarified){
                    if(filterData[0].status == "Active"){
                        setCookie("LoginUser",filterData[0]._id,365);
                        window.location.href = "/dashboard";
                    }
                    else{
                        setError(true);
                        setErrorObj({ title: "Error", description: "Your Account is Blocked! Kindly please contact Admin" })
                    }
                }
                else{
                    setError(true);
                    setErrorObj({ title: "Error", description: "Your Email is not Verified! please Open your Email and Verify the account" })
                    await FetchData("/api/sendEmail/verify/"+filterData[0]._id,"POST");
                }
            }
            else {
                setError(true);
                setErrorObj({ title: "Error", description: "Email or Password did not match" })
            }
        }
        else {
            setError(true);
            setErrorObj({ title: "Error", description: "This user is not registered" })
        }

    }

    return (

        <>

            
            {isError ? <ConfirmBox title={errorObject.title} description={errorObject.description} okCallback={() => { setError(false); }} cancelCallback={() => { setError(false); }} /> : <></>}

            {/* <div id="page-wrapper"> */}
                <div className="main-page login-page ">
                    <h3 className="title1">SignIn Page</h3>
                    <div className="widget-shadow">
                        <div className="login-top">
                            <h4>Welcome back to Novus AdminPanel ! <br /> Not a Member? <a href="/register">  Sign Up »</a> </h4>
                        </div>
                        <div className="login-body">

                            <input type="text" className="user" name="email" placeholder="Enter your email" onChange={(e) => { setEmail(e.target.value) }} />
                            <input type="password" name="password" className="lock" placeholder="password" onChange={(e) => { setPassword(e.target.value) }} />
                            <input type="submit" name="Sign In" value="Sign In" onClick={validateLogin} />
                            <div className="forgot-grid">
                                <label className="checkbox"><input type="checkbox" name="checkbox" /><i></i>Remember me</label>
                                <div className="forgot">
                                    <a href="#">forgot password?</a>
                                </div>
                                <div className="clearfix"> </div>
                            </div>

                        </div>
                    </div>

                    <div className="login-page-bottom">
                        <h5> - OR -</h5>
                        <div className="social-btn"><a href="#"><i className="fa fa-facebook"></i><i>Sign In with Facebook</i></a></div>
                        <div className="social-btn sb-two"><a href="#"><i className="fa fa-twitter"></i><i>Sign In with Twitter</i></a></div>
                    </div>
                </div>
            {/* </div> */}

           
        </>

    );
}

export default Login;