import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import '../css/QuickAction.css'

const QuickAction = (props) => {
    const { path, text, setRandom, setFavorite } = props;

    const handleOnClick = () => {
        // check the text to determine which button they clicked
        if ( text === "New Order" )
        {
            navigate("/order")
        } else if ( text === "Re-order Favorite" ) 
        {
            // fetch their favorite then display it on the ordering page
            navigate("/favorite")
        } else if ( text === "Random Pizza" ) 
        {
            // randomly choose toppings on order page
            navigate("/random")
        } 
    }


    return (
        <div className="quick-action">
            <button className="quick-action-btn" onClick={ () => handleOnClick()}><h3>{text}</h3></button>
        </div>
    )
};

export default QuickAction;
