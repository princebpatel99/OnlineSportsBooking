import React, { useState } from 'react';
import { FetchData, getAuth } from '../RestAPI/database';
import ConfirmBox from './ConfirmBox';
var CryptoJS = require("crypto-js");


export default function Register() {
    const [fName, setFname] = useState();
    const [email, setEmail] = useState();
    const [mobile, setMobile] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmPassword] = useState();
    const [gender, setGender] = useState();
    const [isError, setError] = useState();
    const [errorObject, setErrorObj] = useState({});


    const registerUser = async () => {
        let Token = getAuth();
        var ciphertext = CryptoJS.AES.encrypt(password, Token).toString();
        // var ciphertext = cipher(Token,password)
        if (fName && email && mobile && password && confirmpassword && gender) {
            if (password == confirmpassword) {
                let body = {
                    fullName: fName,
                    email: email,
                    mobile: mobile,
                    password: ciphertext,
                    gender: gender,
                    status: "Active",
                    role: "User"
                }
                let result = await FetchData("/api/OSBRegister", "POST", body);
                if (result._id) {
                    await FetchData("/api/sendEmail/verify/"+result._id,"POST");
                    setError(true);
                    setErrorObj({ title: "Alert", description: "Your Account is successfully Registered, please verify your Email" })
                }
                else {
                    if (result.message.indexOf("duplicate") > 0) {
                        setError(true);
                        setErrorObj({ title: "Alert", description: "This is Email is Alreday Registered." })
                    }
                }
            }
            else {
                setError(true);
                setErrorObj({ title: "Error", description: "Password and Confirm password is not matching!" })
            }
        }
        else {
            setError(true);
            setErrorObj({ title: "Error", description: "Please fill all the required fields" })
        }
    }


    return (
        <>
            {isError ? <ConfirmBox title={errorObject.title} description={errorObject.description} okCallback={() => { setError(false); }} cancelCallback={() => { setError(false); }} /> : <></>}

            <div className="main-page signup-page">
                <h3 className="title1">SignUp Here</h3>
                <p className="creating">Having hands on experience in creating innovative designs,I do offer design
                    solutions which harness.</p>
                <div className="sign-up-row widget-shadow">
                    <h5>Personal Information :</h5>
                    <div className="sign-u">
                        <div className="sign-up1">
                            <h4>Full Name* :</h4>
                        </div>
                        <div className="sign-up2">
                            <form>
                                <input type="text" required onChange={(e) => {
                                    setFname(e.target.value)
                                }} />
                            </form>
                        </div>
                        <div className="clearfix"> </div>
                    </div>

                    <div className="sign-u">
                        <div className="sign-up1">
                            <h4>Email Address* :</h4>
                        </div>
                        <div className="sign-up2">
                            <form>
                                <input type="text" required onChange={(e) => { setEmail(e.target.value) }} />
                            </form>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                    <div className="sign-u">
                        <div className="sign-up1">
                            <h4>Gender* :</h4>
                        </div>
                        <div className="sign-up2">
                            <label>
                                <input type="radio" name="Gender" required onClick={(e) => { setGender("Male") }} />
                                Male
                            </label>
                            <label>
                                <input type="radio" name="Gender" required onClick={(e) => { setGender("Female") }} />
                                Female
                            </label>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                    <div className="sign-u">
                        <div className="sign-up1">
                            <h4>Contact No* :</h4>
                        </div>
                        <div className="sign-up2">
                            <form>
                                <input type="text" required onChange={(e) => { setMobile(e.target.value) }} />
                            </form>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                    <h6>Login Information :</h6>
                    <div className="sign-u">
                        <div className="sign-up1">
                            <h4>Password* :</h4>
                        </div>
                        <div className="sign-up2">
                            <form>
                                <input type="password" required onChange={(e) => { setPassword(e.target.value) }} />
                            </form>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                    <div className="sign-u">
                        <div className="sign-up1">
                            <h4>Confirm Password* :</h4>
                        </div>
                        <div className="sign-up2">
                            <form>
                                <input type="password" required onChange={(e) => { setConfirmPassword(e.target.value) }} />
                            </form>
                        </div>
                        <div className="clearfix"> </div>
                    </div>
                    <div className="sub_home">
                        {/* <form> */}
                        <input type="submit" value="Submit" onClick={() => { registerUser() }} />
                        {/* </form> */}
                        <div className="clearfix"> </div>
                    </div>
                </div>
            </div>
        </>
    )
}