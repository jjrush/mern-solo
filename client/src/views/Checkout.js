import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import '../css/Checkout.css';

const Checkout = (props) => {
    const { order } = props;
    const [ toppingsStr, setToppingsStr ] = useState("");
    const [ price, setPrice ] = useState(0);

    const handleSubmit = (e) => {

    }

    const calculatePrice = (e) => {
        let p = 0;
        for ( const key in order.toppings )
        {
            if ( order.toppings[key].value == true )
            {
                p = p + order.toppings[key].price;
            }
        }
        if( order.crust === "deepdish" )
            p = p + 5
        if( order.crust === "thin" )
            p = p + 2
        if( order.crust === "regular" )
            p = p + 3
        if( order.crust === "stuffed" )
            p = p + 4
        if( order.size === "xlarge" )
            p = p + 18
        if( order.size === "large" )
            p = p + 14
        if( order.size === "medium" )
            p = p + 12
        if( order.size === "personal" )
            p = p + 10
        p = p * order.quantity;
        setPrice(p);
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
        calculatePrice();
    }, []);

    return (
        <div>
            <h2>Your Order</h2>
            <p>Method: {order.method == "carryout" ? "Carry Out" : "Delivery"}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Size: {order.size}</p>
            <p>Crust: {order.crust}</p>
            <p>Toppings: {toppingsStr}</p>
            <h3>Price: ${price}</h3>
            {
                order.method == "delivery" ? 
                    <p>Delivery fee: $5</p>
                    :
                    null
            }
            <button className="start-over-btn" onClick={()=>navigate("/order")}>Start Over</button>
            <button className="submit-order-btn" onClick={handleSubmit}>Submit Order</button>
        </div>
    )
};

export default Checkout;
