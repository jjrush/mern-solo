import React from "react";
import { navigate } from "@reach/router";
import LoginUser from "../components/LoginUser";

const LogReg = (props) => {
    const { loggedIn, setLoggedIn, setUserId } = props;
    return (
        <div>
            <LoginUser loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUserId={setUserId}/>         
        </div>
    );
};

export default LogReg;