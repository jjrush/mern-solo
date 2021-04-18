import React, { useState } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';

const Order = (props) => {
    const { favorite, random, setFavorite, setRandom } = props;
    const [ method, setMethod ] = useState("carryout");
    const [ size, setSize ] = useState("");
    const [ crust, setCrust ] = useState("");
    const [ quantity, setQuantity ] = useState(0);
    const [ toppings, setToppings ] = useState({});

    const [ order, setOrder ] = useState({
        method: "",
        size: "", 
        crust: "", 
        quantity: 0, 
        toppings: {},
    })

    const handleChange = (e) => {
        setOrder({
            ...order,
            [e.target.name]: e.target.value,
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/order", {

        })
        .then((res) => {
            if(res.data.errors) {
                console.log(res.data.errors);
            }
            else {
                console.log(res.data)
                navigate("/");
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    const handleCancel = () => {
        navigate("/");
    }

    return (
        <div>
            <h2>Craft-A-Pizza</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label>Method: </label>
                    <select name="method">
                        <option value="carryout">Carryout</option>
                        <option value="delivery">Delivery</option>
                        value={method}
                        onChange={ (e) => setMethod( e.target.value ) }
                    </select>
                </div>
                <div>
                    <label>Size: </label>
                    <select name="size">
                        <option value="xlarge">Extra Large</option>
                        <option value="large">Large</option>
                        <option value="medium">Medium</option>
                        <option value="personal">Personal</option>
                        value={size}
                        onChange={ (e) => setMethod( e.target.value ) }
                    </select>
                </div>
                <div>
                <button type="submit">Submit Order</button>
                
                </div>
            </form>
            <button onClick={ () => handleCancel() }>Cancel</button>
        </div>
    )
};

export default Order;
