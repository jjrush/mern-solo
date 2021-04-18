import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';

const Account = (props) => {
    const {loggedIn} = props;
    const [ firstName, setFirstName ] = useState("");
    const [ lastName, setLastName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ address, setAddress ] = useState("");
    const [ city, setCity ] = useState("Rap");
    const [ state, setState ] = useState("");
    const [ errs, setErrs ] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();

        axios.put("http://localhost:8000/api/karaoke/" + props.id, {
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
                setErrs(res.data.errors);
            }
            else {
                console.log(res.data)
                navigate("/karaoke/" + props.id);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        if ( !loggedIn )
            navigate("/login")
    }, [  ]);

    return (
        <div>
        {
            loggedIn ? 
                <div>
                    <h2>Account Info</h2>
                    <form onSubmit={submitHandler}>
                        <div>
                            <label>First Name: </label>
                            <input type="text"
                                name="firstName"
                                value={firstName}
                                onChange={ (e) => setFirstName( e.target.value ) }
                            />
                            {
                                errs.name ?
                                <span className="error-text">{errs.name.message}</span>
                                : null
                            }
                        </div>
                        <div>
                            <button type="submit">Update Song</button>
                            <button onClick={ () => navigate("/karaoke")}>Cancel</button>
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
