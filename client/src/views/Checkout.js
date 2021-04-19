import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import '../css/Checkout.css';

const Checkout = (props) => {
    const { order } = props;
    const [ toppingsStr, setToppingsStr ] = useState("");

    const handleSubmit = (e) => {

    }

    useEffect(() => {
        let s = "";
        console.log(order.toppings)
        console.log()
        let size = Object.keys(order.toppings).length;
        if ( size === 0 )
            s = "None"
        else 
        {
            for ( const key in order.toppings )
            {
                order.toppings[key].value == true ? 
                s = s + ` ${order.toppings[key].name}`
                :
                s = s
            }
        }
        setToppingsStr(s);
    }, []);

    return (
        <div>
            <h2>Your Order</h2>
            <p>Method: {order.method}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Size: {order.size}</p>
            <p>Crust: {order.crust}</p>
            <p>Toppings: {toppingsStr}</p>
            <button className="start-over-btn" onClick={()=>navigate("/order")}>Start Over</button>
            <button className="submit-order-btn" onClick={handleSubmit}>Submit Order</button>
        </div>
    )
};

export default Checkout;
