import React from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import '../css/Header.css';

const Checkout = (props) => {
    const { loggedIn, setLoggedIn } = props;
    
    const logout = (e) => {
        e.preventDefault();
        // axios.post("http://localhost:8000/api/user/logout", { 
        //     // no body required for this request
        // }, {
        //     withCredentials: true,
        // })
        // .then((res) => {
        //     console.log(res.data);
        //     navigate("/");
        // })
        // .catch(err => {
        //     console.log(err);
        // });
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

        </div>
    )
};

export default Checkout;
