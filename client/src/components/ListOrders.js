import React, { useEffect, useState } from 'react';
// import { Link } from '@reach/router';
import axios from 'axios';
import '../css/ListOrders.css'

const ListOrders = (props) => {
    const { userId } = props;
    const [ favorite, setFavorite ] = useState({});
    const [ orders, setOrders ] = useState([]);
    const [, updateState] = useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

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

    const handleFavorite = (index, favorite) => {
        // console.log(favorite);
        favorite.orderId = orders[index].orderId;
        axios.put("http://localhost:8000/api/user/favorite/" + userId, {favorite})
            .then((res) => {
                if(res.data.errors) {
                    console.log('error')
                    console.log(res.data.errors);
                }
                else {
                    axios.get("http://localhost:8000/api/user/" + userId)
                    .then((res) => {
                        // console.log('here')
                        if(res.data.errors) {
                            console.log(res.data.errors);
                        }
                        else {
                            // setOrder(res.data)
                            // setToppings(res.data.favorite)
                            // console.log(res.data)
                            setFavorite(res.data.favorite);
                            setOrders(res.data.orders);
                        }
                    })
                    .catch((err) => {
                        console.log("Error:" + err);
                    })
                    // console.log(res.data)
                    // console.log("hereee")
                    // setOrder({});
                    // navigate("/");
                    
                }
            })
            .catch((err) => {
                console.log('erro2r')
                console.log(err);
            })
        forceUpdate();
    }

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
                    // console.log(res.data)
                    setFavorite(res.data.favorite);
                    setOrders(res.data.orders);
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
                    <div className="order" key={index}>
                        {/* date */}
                        <div className="" >
                            <p className="garbo">{element.date}</p>
                            <div className="garbo">
                                <label>Favorite:</label>
                                <input name="favorite" type="radio" checked={element.orderId == favorite.orderId} 
                                        value={element.orderId} onChange={() => handleFavorite(index,element)}>
                                </input>
                            </div>
                        </div>
                        <div>
                            <p>{convertSize(element.size)} {element.crust} - {convertToppingsToStr(element.toppings)} - ${element.price}</p>
                        </div>
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
