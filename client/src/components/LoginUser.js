import React, { useState } from "react";
import axios from "axios";
import { navigate } from '@reach/router';
import '../css/LoginUser.css'

const LoginUser = (props) => {
    const { loggedIn, setLoggedIn, setUserId } = props;
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const login = event => {
        event.preventDefault();
        axios.post("http://localhost:8000/api/user/login", { 
            email: email, 
            password: password,
        },
        {
            // this will force the sending of the credentials / cookies so they can be updated
            //    XMLHttpRequest from a different domain cannot set cookie values for their own domain 
            //    unless withCredentials is set to true before making the request
            withCredentials: true
        })
        .then((res) => {
            console.log(res);
            setLoggedIn(true);
            console.log(res.data.id);
            setUserId(res.data.id);
            navigate("/");
        })
        .catch(err => {
            console.log("Error: " + err);
            // setErrorMessage(err.response.data.msg);
        });
    };

    return (
        <div className="login-div">
            <h2>Login</h2>
            <p className="error-text">{errorMessage ? errorMessage : ""}</p>
            <form className="login-form" onSubmit={login}>
                <div>
                <label className="email-label">Email:</label>
                <input
                    className="email-input"
                    type="text"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                </div>
                <div>
                <label className="login-label">Password:</label>
                <input 
                    className="password-input"
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                </div>
                <div className="center">
                <button className="sign-in-btn" type="submit">Sign In</button>
                <button className="register-btn" onClick={() => navigate("/register")}>Create Account</button>
                </div>
            </form>
        </div>
    );
};

export default LoginUser;
