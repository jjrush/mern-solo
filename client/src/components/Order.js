import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
import '../css/Order.css'

const Order = (props) => {
    const { favorite, random, order, setOrder, userId, loggedIn } = props;
    const [, updateState] = useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    let user = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        address: "",
        city: "",
        state: "",
        orders: [],
        favorite: {}
    }

    const [ toppings, setToppings ] = useState({
        pepperoni: {
            value: false,
            price: 1,
            name: "pepperoni",
        },
        tomato:  {
            value: false,
            price: .5,
            name: "tomato",
        },
        avocado:  {
            value: false,
            price: 2,
            name: "avocado",
        }, 
        mushroom:  {
            value: false,
            price: .5,
            name: "mushroom",
        },
        peppers:  {
            value: false,
            price: .5,
            name: "peppers",
        },
        bacon:  {
            value: false,
            price: 1,
            name: "bacon",
        },
        jalapeno:  {
            value: false,
            price: .5,
            name: "jalapeno",
        },
        pineapple:  {
            value: false,
            price: .5,
            name: "pineapple",
        },
        canadian_bacon:  {
            value: false,
            price: 1,
            name: "Canadian Bacon",
        },
        sausage:  {
            value: false,
            price: 1,
            name: "sausage",
        }, 
        onion:  {
            value: false,
            price: .5,
            name: "onion",
        },
        olives:  {
            value: false,
            price: .5,
            name: "olives",
        },
        spinach:  {
            value: false,
            price: .5,
            name: "spinach",
        },
        mozzarella:  {
            value: false,
            price: .5,
            name: "mozzarella",
        },
        cheddar:  {
            value: false,
            price: .5,
            name: "cheddar",
        },
    })

    const handleSetOrder = (t) => {
        setOrder({
            ...order,
            toppings: t,
        })
    } 

    const handleOrderChange = (e) => {
        setOrder({
            ...order,
            [e.target.name]: e.target.value,
        })
    }

    const handleToppingChange = (e) => {
        setToppings({
            [e.target.name]: e.target.value,
        })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        handleSetOrder(toppings);
        console.log("order")
        console.log(order);
        console.log(user);
        navigate("checkout")
        // axios.post("http://localhost:8000/api/user/" + userId, {user})
        //     .then((res) => {
        //         if(res.data.errors) {
        //             console.log('error')
        //             console.log(res.data.errors);
        //         }
        //         else {
        //             console.log(res.data)
        //             console.log("hereee")
        //             navigate("/checkout");
        //         }
        //     })
        //     .catch((err) => {
        //         console.log('erro2r')
        //         console.log(err);
        //     })
    }

    const getRand = (c) => {
        return Math.floor((Math.random() * c));
    }

    const randSetSize = (n) => {
        console.log("size: " + n)
        let size = "";
        if( n === 0 )
            size="xlarge"
        else if( n === 1 )
            size="large"
        else if( n === 2 )
            size="medium"
        else
            size="personal"
        order.size = size;
        setOrder(order)
    }

    const randSetCrust = (n) => {
        console.log("crust: " + n)
        let crust = "";
        if( n === 0 )
            crust="thin"
        else if( n === 1 )
            crust="regular"
        else if( n === 2 )
            crust="stuffed"
        else
            crust="deepdish"
        order.crust = crust;
        setOrder(order)
    }

    const getRandForToppings = (c) => {
        let n = getRand(10);
        if ( n === 1 )
            return true;
        else 
            return false;
    }

    const randSetToppings = (n) => {
        toppings.pepperoni.value = getRandForToppings(10);
        toppings.bacon.value = getRandForToppings(10);
        toppings.mushroom.value = getRandForToppings(10);
        toppings.avocado.value = getRandForToppings(10);
        toppings.tomato.value = getRandForToppings(10);
        toppings.peppers.value = getRandForToppings(10);
        toppings.jalapeno.value = getRandForToppings(10);
        toppings.onion.value = getRandForToppings(10);
        toppings.canadian_bacon.value = getRandForToppings(10);
        toppings.cheddar.value = getRandForToppings(10);
        toppings.olives.value = getRandForToppings(10);
        toppings.pineapple.value = getRandForToppings(10);
        toppings.mozzarella.value = getRandForToppings(10);
        toppings.spinach.value = getRandForToppings(10);
        toppings.sausage.value = getRandForToppings(10);
    }

    const getDate = () => {
        var dateObj = new Date();
        var month = dateObj.getUTCMonth() + 1; //months from 1-12
        var day = dateObj.getUTCDate();
        var year = dateObj.getUTCFullYear();
        return year + "/" + month + "/" + day;
    }

    useEffect(() => {
        if( !loggedIn )
            navigate("/login")
        order.date = getDate();
        setOrder(order);

        axios.get("http://localhost:8000/api/user/" + userId)
        .then((res) => {
            console.log('here')
            if(res.data.errors) {
                console.log(res.data.errors);
            }
            else {
                user.firstName=res.data.firstName;
                user.lastName=res.data.lastName;
                user.email=res.data.email;
                user.password=res.data.password;
                console.log(res);
                console.log(user)
                // setToppings(res.data.favorite)
                // console.log(res)
            }
        })
        .catch((err) => {
            console.log("Error:" + err);
        })

        if ( random )
        {
            randSetSize(getRand(4));
            randSetCrust(getRand(4));
            randSetToppings();
            forceUpdate();
            console.log(order);
        }
    }, []);

    return (
        <div>
            <h2>Craft-A-Pizza</h2>
            <form onSubmit={submitHandler}>
                <div>
                    <label style={{marginLeft: 180}}>Method: </label>
                    <select className="width-50" name="method" value={order.method} onChange={ handleOrderChange }>
                        <option value="carryout">Carry Out</option>
                        <option value="delivery">Delivery</option>
                    </select>
                </div>
                <div>
                    <label style={{marginLeft: 205}}>Size: </label>
                    <select style={{marginLeft: 3}} className="width-30" name="size" value={order.size} onChange={ handleOrderChange }> 
                        <option value="xlarge">Extra Large</option>
                        <option value="large">Large</option>
                        <option value="medium">Medium</option>
                        <option value="personal">Personal</option>
                    </select>
                    <label style={{marginLeft: 15}}>Crust: </label>
                    <select style={{marginLeft: 5}} className="width-30" name="crust" value={order.crust} onChange={ handleOrderChange }>
                        <option value="thin">Thin</option>
                        <option value="regular">Regular</option>
                        <option value="stuffed">Stuffed</option>
                        <option value="deepdish">Deep Dish</option>
                    </select>
                    <label style={{marginLeft: 15}}>Quantity:</label>
                    <input style={{marginLeft: 4}} className="width-10" type="number" name="quantity" min="1" max="5" value={order.quantity} onChange={ handleOrderChange }></input>
                </div>
                <div>
                    <label className="toppings-label" style={{marginLeft: 169}}>Toppings:</label>
                    <div className="toppings-row-top">
                        <input className="checkbox" type="checkbox" name="pepperoni" value="pepperoni" onChange={ handleToppingChange } checked={toppings.pepperoni.value}></input>
                        <label className="checkbox-label">Pepperoni</label>
                        <input className="checkbox" type="checkbox" name="mushroom" value="mushroom" onChange={ handleToppingChange } checked={toppings.mushroom.value}></input>
                        <label className="checkbox-label">Mushroom</label>
                        <input className="checkbox" type="checkbox" name="avocado" value="avocado" onChange={ handleToppingChange } checked={toppings.avocado.value}></input>
                        <label className="checkbox-label">Avocado</label>
                    </div>
                    <div className="toppings-row">
                        <input className="checkbox" type="checkbox" name="bacon" value="bacon" onChange={ handleToppingChange } checked={toppings.bacon.value}></input>
                        <label className="checkbox-label">Bacon</label>
                        <input style={{marginLeft: 68}} type="checkbox" name="tomato" value="tomato" onChange={ handleToppingChange } checked={toppings.tomato.value}></input>
                        <label className="checkbox-label">Tomato</label>
                        <input style={{marginLeft: 65}} type="checkbox" name="peppers" value="peppers" onChange={ handleToppingChange } checked={toppings.peppers.value}></input>
                        <label className="checkbox-label">Peppers</label>
                    </div>
                    <div className="toppings-row">
                        <input className="checkbox" type="checkbox" name="sausage" value="sausage" onChange={ handleToppingChange } checked={toppings.sausage.value}></input>
                        <label className="checkbox-label">Sausage</label>
                        <input style={{marginLeft: 53}} type="checkbox" name="pineapple" value="pineapple" onChange={ handleToppingChange } checked={toppings.pineapple.value}></input>
                        <label className="checkbox-label">Pineapple</label>
                        <input style={{marginLeft: 49}} type="checkbox" name="jalapeno" value="jalapeno" onChange={ handleToppingChange } checked={toppings.jalapeno.value}></input>
                        <label className="checkbox-label">Jalapeno</label>
                    </div>
                    <div className="toppings-row">
                        <input className="checkbox" type="checkbox" name="spinach" value="spinach" onChange={ handleToppingChange } checked={toppings.spinach.value}></input>
                        <label className="checkbox-label">Spinach</label>
                        <input style={{marginLeft: 55}} type="checkbox" name="olives" value="olives" onChange={ handleToppingChange } checked={toppings.olives.value}></input>
                        <label className="checkbox-label">Olives</label>
                        <input style={{marginLeft: 76}} type="checkbox" name="onion" value="onion" onChange={ handleToppingChange } checked={toppings.onion.value}></input>
                        <label className="checkbox-label">Onion</label>
                    </div>
                    <div className="toppings-row">
                        <input className="checkbox" type="checkbox" name="mozzarella" value="mozzarella" onChange={ handleToppingChange } checked={toppings.mozzarella.value}></input>
                        <label className="checkbox-label">Mozzarella</label>
                        <input style={{marginLeft: 35}} type="checkbox" name="cheddar" value="cheddar" onChange={ handleToppingChange } checked={toppings.cheddar.value}></input>
                        <label className="checkbox-label">Cheddar</label>
                        <input style={{marginLeft: 58}} type="checkbox" name="canadian_bacon" value="canadian_bacon" onChange={ handleToppingChange } checked={toppings.canadian_bacon.value}></input>
                        <label className="checkbox-label">Canadian Bacon</label>
                    </div>
                </div>
                <button className="checkout-btn" type="submit">Checkout</button>
            </form>
            <button className="cancel-btn" onClick={ () => navigate("/") }>Cancel</button>
        </div>
    )
};

export default Order;
