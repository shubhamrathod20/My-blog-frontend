import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";

const Navbar = () => {
    return (
        <nav>
            <h2>My Blog</h2>
            <Link to="/" style={{marginRight: "5px"}}>Home</Link>
            <Link to="/register" style={{marginRight: "5px"}}>Register</Link>
            <Link to="/login">Login</Link>
        </nav>    
    );
}

export default Navbar;