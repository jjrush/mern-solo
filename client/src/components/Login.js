import React, { useState } from "react";
import axios from "axios";
import { navigate } from '@reach/router';

const Login = () => {
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
            console.log(res.data);
            navigate("/karaoke");
        })
        .catch(err => {
            console.log(err);
            setErrorMessage(err.response.data.msg);
        });
    };

    return (
        <div>
        <h2>Login</h2>
        <p className="error-text">{errorMessage ? errorMessage : ""}</p>
        <form onSubmit={login}>
            <div>
            <label>Email</label>
            <input
                type="text"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div>
            <label>Password</label>
            <input 
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <div className="center">
            <button 
                type="submit"
            >Sign In</button>
            </div>
        </form>
        </div>
    );
};

export default Login;
