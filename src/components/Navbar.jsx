// import React from 'react';
import { FaSearch, FaBell, FaCog, FaUserCircle } from 'react-icons/fa';
import '../styles/Navbar.scss';
import logo from "../assets/logo.png"
const Navbar = () => {
    return (
        <div className="navbar">
            <div className="navbar-left">
                <div className="logo">
                    <img src={logo} alt="HRMS" />
                </div>
                <div className="nav-items">
                    
                </div>
            </div>
            <div className="navbar-right">
                <div className="search-bar">
                    <input type="text" placeholder="Search employee" />
                    <FaSearch />
                </div>
                <FaBell className="icon" />
                <FaCog className="icon" />
                <FaUserCircle className="icon" />
            </div>
        </div>
    );
};

export default Navbar;
