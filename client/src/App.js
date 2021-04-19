import './css/App.css';

import { useState } from 'react';
import { Router } from '@reach/router';
import Header from './components/Header';
import Order from './components/Order';
import AccountView from './views/AccountView';
import Login from './views/Login';
import Register from './views/Register';
import Main from './views/Main';
import Checkout from './views/Checkout';


function App() {
    const NotFound = () => {
        return (
            <h1 style={{ textAlign: "center", color: "red" }}>Sorry, but your route was not found</h1>
        )
    };

    const [ order, setOrder ] = useState({
        orderId: "",
        date: "",
        method: "carryout",
        size: "large", 
        crust: "regular",
        quantity: 1, 
        price: 0,
        toppings: {},
    })

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

    const [ loggedIn, setLoggedIn ] = useState(false);
    // const [ favorite, setFavorite ] = useState(false);
    const [ random, setRandom ] = useState(false);
    const [ userId, setUserId ] = useState("");

    return (
        <div className="App">
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> 
            <Router>
                {/* default login/register page */}
                <Login path="/login" loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUserId={setUserId}/>
                <Register path="/register" loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
                {/* landing page with 3 quick options - new order, re-order fave, random pizza*/}
                <Main path="/" />
                {/* order page for ordering a new pizza */}
                <Order path="/order" loggedIn={loggedIn} order={order} setOrder={setOrder} userId={userId}/>
                <Order path="/favorite" favorite={true} userId={userId} loggedIn={loggedIn} order={order} setOrder={setOrder}/>
                <Order path="/random" random={random} setRandom={setRandom} loggedIn={loggedIn} order={order} setOrder={setOrder} userId={userId}/>
                <Checkout path="/checkout" order={order} userId={userId} setOrder={setOrder}/>
                {/* account page for editing account */}
                <AccountView path="/account" loggedIn={loggedIn} userId={userId}/>    
                <NotFound default />
            </Router>
        </div>
    );
}

export default App;
