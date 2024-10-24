import React, { useState } from "react";
import { useLocation, useNavigate } from 'react-router-dom'; // Add useNavigate here
import './Dashboard.scss';

const Dashboard = () => {
    const navigate = useNavigate(); // Use useNavigate here
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [showDropdown, setShowDropdown] = useState(false);
    const [activetab, setActivetab] = useState('Dashboard');

    const navigationData = [
        {
            subItems: ["Dashboard", "Attrition Trend", "Addition Trend", "Headcount"]
        },
        {
            name: "Home",
        }
    ];

    const handlePrevClick = () => {
        if (selectedIndex > 0) {
            setSelectedIndex(selectedIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (selectedIndex < navigationData.length - 1) {
            setSelectedIndex(selectedIndex + 1);
        }
    };

    const currentURL = window.location.pathname;

    const newUrl = currentURL.split('/').slice(0, -1).join('/');
    const handleHomeClick = () => {
        navigate(newUrl); // Use navigate here instead of window.location.href
    };

    const handleDropdownClick = (subItem) => {
        // Add navigation logic based on the subItem
        navigate(`/reports/organizational/${subItem.toLowerCase().replace(/\s+/g, '-')}`); // Example navigation
    };

    return (
        <div className="breadcrumb-container">
            <div className="arrow_left_right">
                <span className="arrow-btn" onClick={handlePrevClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                        <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>

                <span className="arrow-btn" onClick={handleNextClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                        <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </span>
            </div>
            <div className="breadcrumb">
                <button className="breadcrumb-item" onClick={handleHomeClick}>
                    <i className="icon-home"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#400f6f" fill="none">
                        <path d="M15.0002 17C14.2007 17.6224 13.1504 18 12.0002 18C10.8499 18 9.79971 17.6224 9.00018 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M2.35157 13.2135C1.99855 10.9162 1.82204 9.76763 2.25635 8.74938C2.69065 7.73112 3.65421 7.03443 5.58132 5.64106L7.02117 4.6C9.41847 2.86667 10.6171 2 12.0002 2C13.3832 2 14.5819 2.86667 16.9792 4.6L18.419 5.64106C20.3462 7.03443 21.3097 7.73112 21.744 8.74938C22.1783 9.76763 22.0018 10.9162 21.6488 13.2135L21.3478 15.1724C20.8473 18.4289 20.5971 20.0572 19.4292 21.0286C18.2613 22 16.5538 22 13.139 22H10.8614C7.44652 22 5.73909 22 4.57118 21.0286C3.40327 20.0572 3.15305 18.4289 2.65261 15.1724L2.35157 13.2135Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    </svg></i> Home
                </button>
                <span className="separator">/</span>
                <div
                    className="breadcrumb-item dropdown"
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <div>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#400f6f" fill="none">
                            <path d="M7 17L7 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M12 17L12 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M17 17L17 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        </svg>
                        {activetab}
                    </div>

                    {showDropdown && navigationData[selectedIndex].subItems.length > 0 && (
                        <div className="dropdown-menu">
                            {navigationData[selectedIndex].subItems.map((item, index) => (
                                <a key={index} onClick={() => {
                                    handleDropdownClick(item);
                                    setActiveTab(item); // Yeh line change hui hai
                                }}>
                                    {item}
                                </a>
                            ))}

                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
