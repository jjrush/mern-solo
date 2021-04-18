import './css/App.css';
import Header from './components/Header';
import ListAll from './components/ListAll';
import Order from './components/Order';
import AccountView from './views/AccountView';
import Details from './components/Details';
import { Router } from '@reach/router';
import Login from './components/LoginUser';
import Register from './views/Register';
import Main from './views/Main';
import { useState } from 'react';

function App() {
    const NotFound = () => {
        return (
            <h1 style={{ textAlign: "center", color: "red" }}>Sorry, but your route was not found</h1>
        )
    };

    const [ loggedIn, setLoggedIn ] = useState(false);

    return (
        <div className="App">
            <Header loggedIn={loggedIn} /> {/* title, home, orders, account, logout buttons*/}
            <Router>
                {/* default login/register page */}
                <Login path="/login" loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
                <Register path="/register" loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
                {/* landing page with 3 quick options - new order, re-order fave, random pizza*/}
                <Main path="/"/>
                {/* order page for ordering a new pizza */}
                <Order path="/order" />
                {/* account page for editing account */}
                <AccountView path="/account" loggedIn={loggedIn}/>
                {/* <ListAll path="/karaoke" /> */}
                
                
                {/* <Details path="/karaoke/:id" /> */}
                
                <NotFound default />
            </Router>
        </div>
    );
}

export default App;
