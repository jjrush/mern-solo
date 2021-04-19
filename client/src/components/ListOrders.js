import React, { useEffect, useState } from 'react';
// import { Link } from '@reach/router';
import axios from 'axios';
import '../css/ListOrders.css'

const ListOrders = (props) => {
    const { userId } = props;
    const [ user, setUser ] = useState({});
    const [ orders, setOrders ] = useState([]);
    // const [ toppingsStr, setToppingsStr ] = useState([]);

    const convertToppingsToStr = (toppings) => {
        let str = "";
        let first = true;
        for ( const key in toppings )
        {
            if( toppings[key].value === true )
            {
                if ( first )
                {
                    str = str + `${toppings[key].name}`
                    first = false;
                }
                else
                    str = str + `, ${toppings[key].name}`
            }
        }
        return str;
    }

    const convertSize = (size) => {
        if ( size == "xlarge" )
            return "Extra Large"
        if( size == "large" )
            return "Large"
        if( size == "medium" )
            return "Medium"
        if( size == "personal" )
            return "Personal"
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/" + userId)
            .then((res) => {
                console.log('here')
                if(res.data.errors) {
                    console.log(res.data.errors);
                }
                else {
                    // setOrder(res.data)
                    // setToppings(res.data.favorite)
                    console.log(res.data)
                    setUser(res.data.orders);
                    setOrders(res.data.orders);
                    console.log("orders");
                    console.log(orders);
                }
            })
            .catch((err) => {
                console.log("Error:" + err);
            })
        convertToppingsToStr();
    }, []);

    return (
        <div className="list-orders">
            <h2>Past Orders</h2>
            {
                orders.map((element, index) => (
                    <div className="order">
                        {/* date */}
                        <p>{element.date}</p>
                        <p>{convertSize(element.size)} - {convertToppingsToStr(element.toppings)} - ${element.price}</p>
                        <hr></hr>
                        {/* size - toppings - price */}
                        {/* favorite??? */}
                    </div>
                ))
            }
        </div>
    )
};

export default ListOrders;
