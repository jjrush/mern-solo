import React, { useEffect, useState } from 'react';
// import { Link } from '@reach/router';
import axios from 'axios';

const ListOrders = (props) => {
    const { userId } = props;

    useEffect(() => {
        axios.get("http://localhost:8000/api/user/" + userId)
        .then((res) => {
            console.log('here')
            if(res.data.errors) {
                console.log(res.data.errors);
            }
            else {
                console.log("favorite");
                console.log(res.data.favorite);
                // setToppings(res.data.favorite)
                // console.log(res)
            }
        })
        .catch((err) => {
            console.log("Error:" + err);
        })
    }, []);

    return (
        <div>

        </div>
    )
};

export default ListOrders;
