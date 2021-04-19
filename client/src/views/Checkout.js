import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import '../css/Checkout.css';

const Checkout = (props) => {
    const { order, userId, setOrder } = props;
    const [ toppingsStr, setToppingsStr ] = useState("");
    const [ price, setPrice ] = useState(0);
    const [ success, setSuccess ] = useState(false);
    const [ orders, setOrders ] = useState([]);
    let ordersArr = [];
    const getRandId = () => {
        let s = "";
        for (let index = 0; index < 15; index++) {
            s = s + getRand(9);
        }
        return s;
    }

    const getRand = (c) => {
        return Math.floor((Math.random() * c));
    }
    const handleSubmit = (e) => {
        order.orderId = getRandId();
        console.log('submitting')
        console.log(orders);
        
        // ordersArr.push(order);
        // setOrders({...orders,order})
        orders.push(order);
        axios.put("http://localhost:8000/api/user/" + userId, {orders})
            .then((res) => {
                if(res.data.errors) {
                    console.log('error')
                    console.log(res.data.errors);
                }
                else {
                    console.log(res.data)
                    // console.log("hereee")
                    setSuccess(true);
                    // setOrder({});
                    // navigate("/");
                }
            })
            .catch((err) => {
                console.log('erro2r')
                console.log(err);
            })
        
    }

    const calculatePrice = (e) => {
        let p = 0;
        for ( const key in order.toppings )
        {
            if ( order.toppings[key].value === true )
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
        order.price=p;
    }

    useEffect(() => {
        let s = "";
        let size = Object.keys(order.toppings).length;
        if ( size === 0 )
            s = "None"
        else 
        {
            for ( const key in order.toppings )
            {
                order.toppings[key].value === true ? 
                s = s + ` ${order.toppings[key].name}`
                :
                s = s
            }
        }
        setToppingsStr(s);
        calculatePrice();
    }, []);

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/" + userId)
            .then((res) => {
                // console.log('here')
                if(res.data.errors) {
                    console.log(res.data.errors);
                }
                else {
                    // setOrder(res.data)
                    // setToppings(res.data.favorite)
                    console.log("ehreheui")
                    console.log(res.data.orders)
                    if( res.data.orders != undefined && res.data.orders != null )
                        setOrders(res.data.orders);
                    console.log(orders);
                    
                }
            })
            .catch((err) => {
                console.log("Error:" + err);
            })
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
            {
                success ? 
                    <h3 className="order-success">Order Successful</h3>
                    : null
            }
        </div>
    )
};

export default Checkout;
