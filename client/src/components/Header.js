import React from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';

const Header = (props) => {
    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/user/logout", { 
            // no body required for this request
        }, {
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
            navigate("/karaoke");
        })
        .catch(err => {
            console.log(err);
        });
    };

    return (
        <div>
        <h1>Welcome to my Karaoke Collection</h1>
        <div>
            <button onClick={ () => navigate("/karaoke")}>List All</button>
            <button onClick={ () => navigate("/karaoke/new")}>Create New</button>
            <button onClick={() => navigate("/logreg")}>Login to edit and add songs</button>
            <button onClick={(e) => logout(e) }>Logout</button>
            {/* <button onClick={ () => navigate("/karaoke/:id")}>List All</button> */}
            {/* <button onClick={ () => navigate("/karaoke")}>List All</button> */}
        </div>
        </div>
    )
};

export default Header;
