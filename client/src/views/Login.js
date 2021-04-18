import React from "react";
import { navigate } from "@reach/router";
import LoginUser from "../components/LoginUser";

const LogReg = (props) => {
    const { loggedIn, setLoggedIn } = props;
    return (
        <div>
            <LoginUser loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>         
        </div>
    );
};

export default LogReg;