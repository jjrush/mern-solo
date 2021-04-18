import React from "react";
import Account from "../components/Account";

const AccountView = (props) => {
    const { loggedIn } = props;
    return (
        <div className="container-flex">
            <Account loggedIn={loggedIn}/>    
            {/* list all orders component */}
        </div>
    );
};

export default AccountView;