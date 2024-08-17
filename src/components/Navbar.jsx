import React, { useState } from 'react';
import '../styles/Navbar.scss';
import logo from "../assets/logo.png";
import { CiSearch } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosNotificationsOutline, IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import user from '../assets/user.png';
import { FaRegUser } from "react-icons/fa";
import { GrAnnounce } from "react-icons/gr";
import { LuSettings } from "react-icons/lu";

const Navbar = () => {
    const navigate = useNavigate();
    const [showNotifications, setShowNotifications] = useState(false);
    const [showAccount, setShowAccount] = useState(false);

    const handleClick = () => {
        navigate('/');
    };

    const handleNext = () => {
        navigate(1); // Move forward in history
    };

    const handlePrevious = () => {
        navigate(-1); // Move back in history
    };

    const toggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };
    const toggleAccount = () => {
        setShowAccount(!showAccount);
        
    };

    return (
        <div className="navbar">
            <div className="navbar-left">
                <div className="logo" onClick={handleClick}>
                    <img src={logo} alt="HRMS" />
                </div>
            </div>
            <div className="navbar-right">
                <div className="leftIcon">
                    <span><IoIosArrowDropleft onClick={handlePrevious} /></span>
                    <span><IoIosArrowDropright className='icon2' onClick={handleNext} /></span>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search employee" />
                    <span><CiSearch /></span>
                </div>
                <div className="iconRight">
                    <IoIosNotificationsOutline className="icon" onClick={toggleNotifications} />
                    <IoSettingsOutline className="icon"  />
                    <img src={user} alt="User" onClick={toggleAccount} />
                </div>
            </div>

            {showNotifications && (
                <div className="notification-popup">
                    <h3>Notification</h3>
                    <ul>
                        <li>
                            <img src="https://via.placeholder.com/40" alt="User 1" />
                            <div>
                                <p>Lorem Ipsum Dolor Sit Amet Consectetur.</p>
                                <small>April, 2024 At 9:15 AM</small>
                            </div>
                        </li>
                        <li>
                            <img src="https://via.placeholder.com/40" alt="User 2" />
                            <div>
                                <p>Lorem Ipsum Dolor Sit Amet Consectetur.</p>
                                <small>April, 2024 At 9:15 AM</small>
                            </div>
                        </li>
                        <li>
                            <img src="https://via.placeholder.com/40" alt="User 3" />
                            <div>
                                <p>Lorem Ipsum Dolor Sit Amet Consectetur.</p>
                                <small>April, 2024 At 9:15 AM</small>
                            </div>
                        </li>
                        <li>
                            <img src="https://via.placeholder.com/40" alt="User 4" />
                            <div>
                                <p>Lorem Ipsum Dolor Sit Amet Consectetur.</p>
                                <small>April, 2024 At 9:15 AM</small>
                            </div>
                        </li>
                    </ul>
                    <a href="/notifications">See All Notifications</a>
                </div>
            )}
            {showAccount && (
                <div className="notification-popup">
                    <div className='img_user_profile'>
                        <img src={user} alt="" />
                        <div>
                            <h2>Mr.Akash Shinde</h2>
                            <p>Akash25shinde@gmail.com</p>
                        </div>
                    </div>
                    <ul>
                        <li>
                            <div>
                                <span><FaRegUser/></span>
                                <p>My Account</p>
                           </div>
                        </li>
                        <li>
                            <div>
                                <span><GrAnnounce /></span>
                                <p>Announcements</p>
                            </div>
                        </li>
                        <li>
                            <div>
                                <span><LuSettings /></span>
                                <p>Settings</p>
                            </div>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;
