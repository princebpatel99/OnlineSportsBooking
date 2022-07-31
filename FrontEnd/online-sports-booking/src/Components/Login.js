import React, { useState } from "react";
import ReactDOM from "react-dom";
import LeftNavigation from "./LeftNavigation";


function Login() {
    return (

        <div className="main-content">

            {/* <LeftNavigation/> */}

            <div id="page-wrapper">
                <div className="main-page login-page ">
                    <h3 className="title1">SignIn Page</h3>
                    <div className="widget-shadow">
                        <div className="login-top">
                            <h4>Welcome back to Novus AdminPanel ! <br /> Not a Member? <a href="signup.html">  Sign Up »</a> </h4>
                        </div>
                        <div className="login-body">
                            <form>
                                <input type="text" className="user" name="email" placeholder="Enter your email" required="" />
                                <input type="password" name="password" className="lock" placeholder="password" />
                                <input type="submit" name="Sign In" value="Sign In" />
                                <div className="forgot-grid">
                                    <label className="checkbox"><input type="checkbox" name="checkbox"  /><i></i>Remember me</label>
                                    <div className="forgot">
                                        <a href="#">forgot password?</a>
                                    </div>
                                    <div className="clearfix"> </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="login-page-bottom">
                        <h5> - OR -</h5>
                        <div className="social-btn"><a href="#"><i className="fa fa-facebook"></i><i>Sign In with Facebook</i></a></div>
                        <div className="social-btn sb-two"><a href="#"><i className="fa fa-twitter"></i><i>Sign In with Twitter</i></a></div>
                    </div>
                </div>
            </div>

            {/* <div className="footer">
                <p>&copy; 2016 Novus Admin Panel. All Rights Reserved | Design by <a href="https://w3layouts.com/" target="_blank">w3layouts</a></p>
            </div> */}

        </div>

    );
}

export default Login;