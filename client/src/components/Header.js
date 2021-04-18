import React from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import '../css/Header.css';

const Header = (props) => {
    const { loggedIn, setLoggedIn } = props;
    // console.log("LoggedIn: " + loggedIn);
    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/user/logout", { 
            // no body required for this request
        }, {
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
            navigate("/");
        })
        .catch(err => {
            console.log(err);
        });
    };

    const handleButton = (e) => {
        if ( loggedIn )
        {
            logout(e);
            setLoggedIn(false);
        } else {
            navigate("/login");
        }
    }

    return (
        <div id="header">
            <button className="header-btn" onClick={ () => navigate("/")}>Home</button>
            <button className="header-btn" onClick={ () => navigate("/order")}>Order</button>
            <button className="title-btn" onClick={ () => navigate("/")}><h1>Pizza Pete's</h1></button>
            <button className="header-btn" onClick={() => navigate("/account")}>Account</button>
            <button className="header-btn" onClick={(e) => handleButton(e)}>{loggedIn ? "Logout" : "Login"}</button>
        </div>
    )
};

export default Header;
