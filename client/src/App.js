import './App.css';
import Header from './components/Header';
import ListAll from './components/ListAll';
import New from './components/New';
import Edit from './components/Edit';
import Details from './components/Details';
import { Router } from '@reach/router';
import LogReg from './views/LogReg';

function App() {
    const NotFound = () => {
        return (
        <h1 style={{ textAlign: "center", color: "red" }}>Sorry, but your route was not found</h1>
        )
    };

    return (
        <div className="App">
        <Header />
        <Router>
            <ListAll path="/karaoke" />
            <New path="/karaoke/new" />
            <Edit path="/karaoke/:id/edit" />
            <Details path="/karaoke/:id" />
            <LogReg path="/logreg" />
            <NotFound default />
        </Router>
        </div>
    );
}

export default App;
