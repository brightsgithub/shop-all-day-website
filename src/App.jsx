import './App.css'
import './Header.jsx'
import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Navigation from './Navigation';
import ShopWebsite from "./ShopWebsite.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigation />} />
                <Route path="/ShopWebsite" element={<ShopWebsite />} />
                {/*<Route path="/screen2" element={<Screen2 />} />*/}
                {/*<Route path="/screen3" element={<Screen3 />} />*/}
            </Routes>
        </Router>
    );
}

function Home() {
    return <div>Home Page</div>;
}

export default App;
