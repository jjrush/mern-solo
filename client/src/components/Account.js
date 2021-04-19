import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import '../css/Account.css';

const Account = (props) => {
    const {loggedIn, userId} = props;
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ city, setCity ] = useState("");
    const [ state, setState ] = useState("");
    // const [ errs, setErrs ] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();

        axios.put("http://localhost:8000/api/user/" + userId, {
            firstName: firstName,
            lastName: lastName,
            email: email,
            address: address,
            // if the key and the value use the same name, you can skip the "key: "
            city: city,
            state: state,
        })
        .then((res) => {
            if(res.data.errors) {
                console.log(res.data.errors);
                // setErrs(res.data.errors);
            }
            else {
                // console.log(res.data)
                navigate("/");
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        if ( !loggedIn )
            navigate("/login")
        else
        {
            axios.get("http://localhost:8000/api/user/" + userId)
            .then((res) => {
                // console.log('here')
                if(res.data.errors) {
                    console.log(res.data.errors);
                }
                else {
                    setFirstName(res.data.firstName);
                    setLastName(res.data.lastName);
                    setEmail(res.data.email);
                    setCity(res.data.city);
                    setState(res.data.state);
                    setAddress(res.data.address);
                }
            })
            .catch((err) => {
                console.log("Error:" + err);
            })
        }
    }, [  ]);

    return (
        <div className="account">
        {
            loggedIn ? 
                <div className="account-info">
                    
                    <form onSubmit={submitHandler}>
                        <h2 className="account-h2">Account Info</h2>
                        <div>
                            <label>First Name: </label>
                            <input className="fname-field" type="text"
                                name="firstName"
                                value={firstName}
                                onChange={ (e) => setFirstName( e.target.value ) }
                            />
                        </div>
                        <div>
                            <label>Last Name: </label>
                            <input className="lname-field" type="text"
                                name="lastName"
                                value={lastName}
                                onChange={ (e) => setLastName( e.target.value ) }
                            />
                        </div>
                        <div>
                            <label>Email: </label>
                            <input className="email-field" type="text"
                                name="email"
                                value={email}
                                onChange={ (e) => setEmail( e.target.value ) }
                            />
                        </div>
                        <div>
                            <label>Address: </label>
                            <input className="address-field" type="text"
                                name="address"
                                value={address}
                                onChange={ (e) => setAddress( e.target.value ) }
                            />
                        </div>
                        <div>
                            <label>City: </label>
                            <input className="city-field" type="text"
                                name="city"
                                value={city}
                                onChange={ (e) => setCity( e.target.value ) }
                            />
                        </div>
                        <div>
                            <label>State: </label>
                            <input className="state-field" type="text"
                                name="state"
                                value={state}
                                onChange={ (e) => setState( e.target.value ) }
                            />
                        </div>
                        <div>
                            <button className="update-btn" type="submit">Update Info</button>
                            
                        </div>
                    </form>
                </div>
            :
            null
        }
        </div>
        
    )
};

export default Account;
