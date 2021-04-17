import React from "react";
import { navigate } from "@reach/router";
import Login from "../components/Login";
import RegisterUser from "../components/RegisterUser";

const LogReg = () => {
    return (
        <div className="container-flex">
            <Login />
            <hr />
            <RegisterUser />
            <div>
                <button onClick={() => navigate('/karaoke')}>Back to All Songs</button>
            </div>
        </div>
    );
};

export default LogReg;