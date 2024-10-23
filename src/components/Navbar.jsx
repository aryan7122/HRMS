import { useState, useRef, useEffect } from 'react';
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
import imgN from '../assets/user.png';
import { TbLogout } from "react-icons/tb";
import { OutsideClick } from './OutSideClick';


const Navbar = ({ setIsLoggedIn }) => {
    // Hook for Notifications Dropdown
    const { isOpen: isNotificationsOpen, ref: notificationsRef, buttonRef: notificationsButtonRef, handleToggle: toggleNotifications } = OutsideClick();
    const [showAlert, setShowAlert] = useState(false);

    // Hook for Account Dropdown
    const { isOpen: isAccountOpen, ref: accountRef, buttonRef: accountButtonRef, handleToggle: toggleAccount } = OutsideClick();

    const navigate = useNavigate();
    const [canGoBack, setCanGoBack] = useState(false);
    const [canGoForward, setCanGoForward] = useState(false);

    // Update navigation state
    useEffect(() => {
        const updateNavigationState = () => {
            setCanGoBack(window.history.state && window.history.state.idx > 0);
            setCanGoForward(window.history.state && window.history.state.idx < window.history.length - 1);
        };

        updateNavigationState();

        window.addEventListener('popstate', updateNavigationState);

        return () => {
            window.removeEventListener('popstate', updateNavigationState);
        };
    }, [location]);

    const handleNext = () => {
        if (canGoForward) {
            navigate(1);
        }
    };

    const handlePrevious = () => {
        if (canGoBack) {
            navigate(-1);
        }
    };

    const clickOut = () => {
        localStorage.setItem('access_token', '');
        setShowAlert(true)
        setIsLoggedIn(false);
        navigate('/');
       
    };

    const handleClick = () => {
        navigate('/');
    };

    const handleMyAccountClick = () => {
        navigate('/admin-dashboard');
        toggleAccount()
    };

    const handleAnnouncementsClick = () => {
        navigate('/announcements');
    };

    const handleSettingsClick = () => {
        navigate('/settings');
    };

    const handleSeeAllNotifications = () => {
        navigate('/notifications');
    };
    const isNotificationsClose = () => {
        toggleNotifications()
    }
    const isAccountClose = () => {
        toggleAccount()
    }

    return (
        <div className="navbar">
            {showAlert ? <div> <div id='showAlert' ><p>LogOut Successfully</p></div> </div> : ''}
            <div className="navbar-left">
                <div className="logo" onClick={handleClick}>
                    <img src={logo} alt="HRMS" />
                </div>
            </div>
            <div className="navbar-right">
                <div className="leftIcon">
                    <span>
                        <IoIosArrowDropleft
                            onClick={handlePrevious}
                            className={canGoBack ? 'icon-active' : 'icon-inactive'}
                        />
                    </span>
                    <span>
                        <IoIosArrowDropright
                            onClick={handleNext}
                            className={canGoForward ? 'icon-active' : 'icon-inactive'}
                        />
                    </span>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Search employee" />
                    <span><CiSearch /></span>
                </div>
                <div className="iconRight">
                    <span onClick={toggleNotifications} ref={notificationsButtonRef}>
                    <IoIosNotificationsOutline className="icon"   />
                    </span>
                    <IoSettingsOutline className="icon" onClick={() => navigate('/settings')} />
                    <img src={user} alt="User" onClick={toggleAccount} ref={accountButtonRef} />
                </div>
            </div>

            {/* Notifications Popup */}
            {isNotificationsOpen && (
                <div className="notification-popup" ref={notificationsRef}>
                    <h3>Notification</h3>
                    <ul>
                        <li onClick={isNotificationsClose}>
                            <img src={imgN} alt="User 1" />
                            <div>
                                <p>Lorem Ipsum Dolor Sit Amet Consectetur.</p>
                                <small>April, 2024 At 9:15 AM</small>
                            </div>
                        </li>
                        <li onClick={isNotificationsClose}>
                            <img src={imgN} alt="User 2" />
                            <div>
                                <p>Lorem Ipsum Dolor Sit Amet Consectetur.</p>
                                <small>April, 2024 At 9:15 AM</small>
                            </div>
                        </li>
                        <li onClick={isNotificationsClose}>
                            <img src={imgN} alt="User 3" />
                            <div>
                                <p>Lorem Ipsum Dolor Sit Amet Consectetur.</p>
                                <small>April, 2024 At 9:15 AM</small>
                            </div>
                        </li>
                        <li onClick={isNotificationsClose}>
                            <img src={imgN} alt="User 4" />
                            <div>
                                <p>Lorem Ipsum Dolor Sit Amet Consectetur.</p>
                                <small>April, 2024 At 9:15 AM</small>
                            </div>
                        </li>
                    </ul>
                    <div className='all_notifications' onClick={isNotificationsClose}>
                        <p onClick={handleSeeAllNotifications}>See All Notifications</p>
                    </div>
                </div>
            )}

            {/* Account Popup */}
            {isAccountOpen && (
                <div className="account-popup" ref={accountRef}>
                    <div className='img_user_profile' onClick={isAccountClose}>
                        <img src={user} alt="" />
                        <div>
                            <h2>Mr. Akash Shinde</h2>
                            <p>Akash25shinde@gmail.com</p>
                        </div>
                    </div>
                    <ul>
                        <li onClick={handleMyAccountClick}>
                            <div>
                                <span><FaRegUser /></span>
                                <p>My Account</p>
                            </div>
                        </li>
                        <li onClick={handleAnnouncementsClick}>
                            <div>
                                <span><GrAnnounce /></span>
                                <p>Announcements</p>
                            </div>
                        </li>
                        <li onClick={handleSettingsClick}>
                            <div>
                                <span><LuSettings /></span>
                                <p>Settings</p>
                            </div>
                        </li>
                    </ul>
                    <div className="out">
                        <span onClick={clickOut}><TbLogout /></span>
                       

                        <h2 onClick={clickOut}>Sign Out</h2>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
