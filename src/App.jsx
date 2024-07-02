import './App.css'
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Navigation from './components/Navigation.jsx';
import ShopWebsite from "./components/ShopWebsite.jsx";
import Erd from "./components/Erd.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigation />} />
                <Route path="/ShopWebsite" element={<ShopWebsite />} />
                <Route path="/Erd" element={<Erd />} />
                {/*<Route path="/screen3" element={<Screen3 />} />*/}
            </Routes>
        </Router>
    );
}

function Home() {
    return <div>Home Page</div>;
}

export default App;
