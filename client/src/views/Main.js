import React from "react";
import { navigate } from "@reach/router";
import QuickAction from '../components/QuickAction'

const Main = () => {
    return (
        <div>
            <h2>Quick Options</h2>
            <QuickAction text="New Order" path="/order"/>
            <QuickAction text="Re-order Favorite" path="/order"/>
            <QuickAction text="Random Pizza" path="/order"/>
                {/* <button onClick={() => navigate('/karaoke')}>Back to All Songs</button> */}
        </div>
    );
};

export default Main;