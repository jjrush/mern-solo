import React, { useState } from "react";
import axios from "axios";
import '../css/Account.css'

const Register = props => {
    const [confirmReg, setConfirmReg] = useState("");
    const [errs, setErrs] = useState({});

    //    using a single state object to hold all data!
    const [ user, setUser ] = useState({
        firstName: "",
        lastName: "", 
        email: "", 
        password: "", 
        confirmPassword: "",
    })

    // using a single function to update the state object
    //    we can use the input's name attribute as the key in to the object
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const register = e => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/user/register", 
        user,             // the user state is already an object with the correct keys and values!
        {
            // this will force the sending of the credentials / cookies so they can be updated
            //    XMLHttpRequest from a different domain cannot set cookie values for their own domain 
            //    unless withCredentials is set to true before making the request
            withCredentials: true,
        })
        .then(res => {
            console.log(res.data);

            // when we successfully created the account, reset state for registration form
            //    We do this if we are NOT navigating automatically away from the page
            setUser({
                firstName: "",
                lastName: "", 
                email: "", 
                password: "", 
                confirmPassword: "",
            })

            setConfirmReg("Thank you for Registering, you can now log in!");
            setErrs({});  // remember to reset errors state if it was successful
        })
        .catch((err) => {
            console.log(err);
            setErrs(err.response.data.errors);
        });
    };

    return (
        <div>
        <h2>Register</h2>
        {
            confirmReg ? 
            <h4 style={{color: "green"}}>{confirmReg}</h4>
            : null
        }
        <form onSubmit={register}>
            <div>
            <label className="register-label">First Name:</label>
            {
                errs.firstName ? 
                <span className="error-text">{ errs.firstName.message }</span>
                : null
            }
            <input
                className="fname-field"
                type="text"
                name="firstName"
                value={user.firstName}
                onChange={(e) => handleChange(e)}
            />
            </div>
            <div>
            <label className="register-label">Last Name:</label>
            {
                errs.lastName ? 
                <span className="error-text">{ errs.lastName.message }</span>
                : null
            }
            {/* React will automatically pass in the event to a callback function */}
            {/* The following will do EXACTLY the same things */}
                {/* onChange={ handleChange } */}
                {/* onChange={(e) => handleChange(e)} */}
            <input
                className="lname-field"
                type="text"
                name="lastName"
                value={user.lastName}
                onChange={ handleChange }
            />
            </div>
            <div>
            <label className="register-label">Email:</label>
            {
                errs.email? 
                <span className="error-text">{ errs.email.message }</span>
                : null
            }
            <input
                className="email-field"
                type="email"
                name="email"
                value={user.email}
                onChange={ handleChange }
            />
            </div>
            <div>
            <label className="register-label">Password:</label>
            {
                errs.password ? 
                <span className="error-text">{ errs.password.message }</span>
                : null
            }
            <input
                className="password-field"
                type="password"
                name="password"
                value={user.password}
                onChange={ handleChange }
            />
            </div>
            <div>
            <label className="register-label">Confirm:</label>
            {
                errs.confirmPassword? 
                <span className="error-text">{ errs.confirmPassword.message }</span>
                : null
            }
            <input
                className="password-confirm-field"
                type="password"
                name="confirmPassword"
                value={user.confirmPassword}
                onChange={ handleChange }
            />
            </div>
            <div className="center">
            <button className="register-btn" type="submit">Register</button>
            </div>
        </form>
        </div>
    );
};

export default Register;
