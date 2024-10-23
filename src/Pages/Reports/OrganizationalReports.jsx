import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportsPage.scss'; // Import the SCSS file
import user from '../../assets/repot/user.png'
const settingsData = [
    {
        left: [
            {
                name: 'Employee Information',
                description: 'Lorem ipsum dolor sit amet consectetur. Diam aliquam proin vitae lorem eget. Odio non id dui viverra dictum venenatis orci.',
                img: user,
            },
        ],
        right: [
            {
                buttonText: 'Dashboard',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M7 17L7 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M12 17L12 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M17 17L17 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    </svg>
                ),
            },
            {
                buttonText: 'Employee Attrition Trend',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M14 8.99988H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M14 12.4999H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <rect x="2" y="2.99988" width="20" height="18" rx="5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        <path d="M5 15.9999C6.20831 13.4188 10.7122 13.249 12 15.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.5 8.99988C10.5 10.1044 9.60457 10.9999 8.5 10.9999C7.39543 10.9999 6.5 10.1044 6.5 8.99988C6.5 7.89531 7.39543 6.99988 8.5 6.99988C9.60457 6.99988 10.5 7.89531 10.5 8.99988Z" stroke="currentColor" stroke-width="1.5" />
                    </svg>
                ),
            },
            {
                buttonText: 'Headcount',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M18 12.5743C18 12.2721 18 12.1209 18.0416 11.9862C18.1626 11.5947 18.4814 11.4428 18.8009 11.2838C19.1599 11.1049 19.3395 11.0155 19.5174 10.9998C19.7193 10.9819 19.9217 11.0295 20.0943 11.1354C20.3232 11.2759 20.4828 11.5427 20.6462 11.7597C21.4008 12.7619 21.7782 13.263 21.9162 13.8155C22.0277 14.2614 22.0277 14.7279 21.9162 15.1738C21.7148 15.9797 21.0786 16.6554 20.6077 17.2807C20.3668 17.6007 20.2464 17.7606 20.0943 17.8539C19.9217 17.9598 19.7193 18.0074 19.5174 17.9895C19.3395 17.9738 19.1599 17.8844 18.8009 17.7055C18.4814 17.5465 18.1626 17.3946 18.0416 17.0031C18 16.8684 18 16.7172 18 16.415V12.5743Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M5.99978 12.5745C5.99978 12.1937 5.99 11.8517 5.70853 11.584C5.60615 11.4867 5.47041 11.419 5.19896 11.2839C4.83986 11.1051 4.66031 11.0157 4.4824 10.9999C3.94863 10.9527 3.66145 11.3511 3.35363 11.7598C2.59897 12.762 2.22164 13.263 2.08357 13.8156C1.97214 14.2615 1.97214 14.7278 2.08357 15.1738C2.28495 15.9797 2.92117 16.6553 3.3921 17.2806C3.68894 17.6748 3.9725 18.0345 4.4824 17.9894C4.66031 17.9737 4.83986 17.8843 5.19896 17.7055C5.47041 17.5702 5.60615 17.5026 5.70853 17.4053C5.99 17.1377 5.99978 16.7955 5.99978 16.4149V12.5745Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M19.9991 10.9958V9.87129C19.9991 5.52383 16.4176 1.99951 11.9996 1.99951C7.58152 1.99951 4 5.52383 4 9.87129V10.9958" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round" />
                        <path d="M11.9977 13.4592C10.752 12.8002 7.99771 11.6788 6.73429 12.0203C6.49453 12.1204 5.99805 12.4652 5.99805 13.6189L6.09383 19.5962C6.09975 19.9659 6.38606 20.2689 6.74809 20.32C7.98052 20.4942 10.0798 20.9935 11.9977 22.0002M11.9977 13.4592V22.0002M11.9977 13.4592C13.2434 12.8002 15.9988 11.6788 17.2623 12.0203C17.502 12.1204 17.9985 12.4652 17.9985 13.6189L17.9027 19.5962C17.8968 19.9659 17.6105 20.2689 17.2485 20.32C16.016 20.4942 13.9156 20.9935 11.9977 22.0002" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
            },
            {
                buttonText: 'Employee Addition Trend',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#9b9b9b" fill="none">
                        <path d="M14 8.99988H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M14 12.4999H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <rect x="2" y="2.99988" width="20" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M5 15.9999C6.20831 13.4188 10.7122 13.249 12 15.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.5 8.99988C10.5 10.1044 9.60457 10.9999 8.5 10.9999C7.39543 10.9999 6.5 10.1044 6.5 8.99988C6.5 7.89531 7.39543 6.99988 8.5 6.99988C9.60457 6.99988 10.5 7.89531 10.5 8.99988Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                ),
            },
            // Add more items here as needed
        ]
    },
    {
        left: [
            {
                name: 'Employee xxx',
                description: 'Lorem ipsum dolor sit amet consectetur. Diam aliquam proin vitae lorem eget. Odio non id dui viverra dictum venenatis orci.',
                img: user,
            },
        ],
        right: [
            {
                buttonText: 'Daily Leave Status',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M15 17.625C14.9264 19.4769 13.3831 21.0494 11.3156 20.9988C10.8346 20.987 10.2401 20.8194 9.05112 20.484C6.18961 19.6768 3.70555 18.3203 3.10956 15.2815C3 14.723 3 14.0944 3 12.8373L3 11.1627C3 9.90561 3 9.27705 3.10956 8.71846C3.70555 5.67965 6.18961 4.32316 9.05112 3.51603C10.2401 3.18064 10.8346 3.01295 11.3156 3.00119C13.3831 2.95061 14.9264 4.52307 15 6.37501" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M21 12H10M21 12C21 11.2998 19.0057 9.99153 18.5 9.5M21 12C21 12.7002 19.0057 14.0085 18.5 14.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
            },
            {
                buttonText: 'Employee Attrition Trend',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M14 8.99988H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M14 12.4999H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <rect x="2" y="2.99988" width="20" height="18" rx="5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        <path d="M5 15.9999C6.20831 13.4188 10.7122 13.249 12 15.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.5 8.99988C10.5 10.1044 9.60457 10.9999 8.5 10.9999C7.39543 10.9999 6.5 10.1044 6.5 8.99988C6.5 7.89531 7.39543 6.99988 8.5 6.99988C9.60457 6.99988 10.5 7.89531 10.5 8.99988Z" stroke="currentColor" stroke-width="1.5" />
                    </svg>
                ),
            },
            {
                buttonText: 'Headcount',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M18 12.5743C18 12.2721 18 12.1209 18.0416 11.9862C18.1626 11.5947 18.4814 11.4428 18.8009 11.2838C19.1599 11.1049 19.3395 11.0155 19.5174 10.9998C19.7193 10.9819 19.9217 11.0295 20.0943 11.1354C20.3232 11.2759 20.4828 11.5427 20.6462 11.7597C21.4008 12.7619 21.7782 13.263 21.9162 13.8155C22.0277 14.2614 22.0277 14.7279 21.9162 15.1738C21.7148 15.9797 21.0786 16.6554 20.6077 17.2807C20.3668 17.6007 20.2464 17.7606 20.0943 17.8539C19.9217 17.9598 19.7193 18.0074 19.5174 17.9895C19.3395 17.9738 19.1599 17.8844 18.8009 17.7055C18.4814 17.5465 18.1626 17.3946 18.0416 17.0031C18 16.8684 18 16.7172 18 16.415V12.5743Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M5.99978 12.5745C5.99978 12.1937 5.99 11.8517 5.70853 11.584C5.60615 11.4867 5.47041 11.419 5.19896 11.2839C4.83986 11.1051 4.66031 11.0157 4.4824 10.9999C3.94863 10.9527 3.66145 11.3511 3.35363 11.7598C2.59897 12.762 2.22164 13.263 2.08357 13.8156C1.97214 14.2615 1.97214 14.7278 2.08357 15.1738C2.28495 15.9797 2.92117 16.6553 3.3921 17.2806C3.68894 17.6748 3.9725 18.0345 4.4824 17.9894C4.66031 17.9737 4.83986 17.8843 5.19896 17.7055C5.47041 17.5702 5.60615 17.5026 5.70853 17.4053C5.99 17.1377 5.99978 16.7955 5.99978 16.4149V12.5745Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M19.9991 10.9958V9.87129C19.9991 5.52383 16.4176 1.99951 11.9996 1.99951C7.58152 1.99951 4 5.52383 4 9.87129V10.9958" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round" />
                        <path d="M11.9977 13.4592C10.752 12.8002 7.99771 11.6788 6.73429 12.0203C6.49453 12.1204 5.99805 12.4652 5.99805 13.6189L6.09383 19.5962C6.09975 19.9659 6.38606 20.2689 6.74809 20.32C7.98052 20.4942 10.0798 20.9935 11.9977 22.0002M11.9977 13.4592V22.0002M11.9977 13.4592C13.2434 12.8002 15.9988 11.6788 17.2623 12.0203C17.502 12.1204 17.9985 12.4652 17.9985 13.6189L17.9027 19.5962C17.8968 19.9659 17.6105 20.2689 17.2485 20.32C16.016 20.4942 13.9156 20.9935 11.9977 22.0002" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
            },
            {
                buttonText: 'Employee Addition Trend',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#9b9b9b" fill="none">
                        <path d="M14 8.99988H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M14 12.4999H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <rect x="2" y="2.99988" width="20" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M5 15.9999C6.20831 13.4188 10.7122 13.249 12 15.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.5 8.99988C10.5 10.1044 9.60457 10.9999 8.5 10.9999C7.39543 10.9999 6.5 10.1044 6.5 8.99988C6.5 7.89531 7.39543 6.99988 8.5 6.99988C9.60457 6.99988 10.5 7.89531 10.5 8.99988Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                ),
            },
            // Add more items here as needed
        ]
    },
    {
        left: [
            {
                name: 'Employee Information',
                description: 'Lorem ipsum dolor sit amet consectetur. Diam aliquam proin vitae lorem eget. Odio non id dui viverra dictum venenatis orci.',
                img: user,
            },
        ],
        right: [
            {
                buttonText: 'Dashboard',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M7 17L7 13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M12 17L12 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M17 17L17 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                    </svg>
                ),
            },
            {
                buttonText: 'Employee Attrition Trend',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M14 8.99988H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <path d="M14 12.4999H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                        <rect x="2" y="2.99988" width="20" height="18" rx="5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                        <path d="M5 15.9999C6.20831 13.4188 10.7122 13.249 12 15.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M10.5 8.99988C10.5 10.1044 9.60457 10.9999 8.5 10.9999C7.39543 10.9999 6.5 10.1044 6.5 8.99988C6.5 7.89531 7.39543 6.99988 8.5 6.99988C9.60457 6.99988 10.5 7.89531 10.5 8.99988Z" stroke="currentColor" stroke-width="1.5" />
                    </svg>
                ),
            },
            {
                buttonText: 'Headcount',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#000000" fill="none">
                        <path d="M18 12.5743C18 12.2721 18 12.1209 18.0416 11.9862C18.1626 11.5947 18.4814 11.4428 18.8009 11.2838C19.1599 11.1049 19.3395 11.0155 19.5174 10.9998C19.7193 10.9819 19.9217 11.0295 20.0943 11.1354C20.3232 11.2759 20.4828 11.5427 20.6462 11.7597C21.4008 12.7619 21.7782 13.263 21.9162 13.8155C22.0277 14.2614 22.0277 14.7279 21.9162 15.1738C21.7148 15.9797 21.0786 16.6554 20.6077 17.2807C20.3668 17.6007 20.2464 17.7606 20.0943 17.8539C19.9217 17.9598 19.7193 18.0074 19.5174 17.9895C19.3395 17.9738 19.1599 17.8844 18.8009 17.7055C18.4814 17.5465 18.1626 17.3946 18.0416 17.0031C18 16.8684 18 16.7172 18 16.415V12.5743Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M5.99978 12.5745C5.99978 12.1937 5.99 11.8517 5.70853 11.584C5.60615 11.4867 5.47041 11.419 5.19896 11.2839C4.83986 11.1051 4.66031 11.0157 4.4824 10.9999C3.94863 10.9527 3.66145 11.3511 3.35363 11.7598C2.59897 12.762 2.22164 13.263 2.08357 13.8156C1.97214 14.2615 1.97214 14.7278 2.08357 15.1738C2.28495 15.9797 2.92117 16.6553 3.3921 17.2806C3.68894 17.6748 3.9725 18.0345 4.4824 17.9894C4.66031 17.9737 4.83986 17.8843 5.19896 17.7055C5.47041 17.5702 5.60615 17.5026 5.70853 17.4053C5.99 17.1377 5.99978 16.7955 5.99978 16.4149V12.5745Z" stroke="currentColor" stroke-width="1.5" />
                        <path d="M19.9991 10.9958V9.87129C19.9991 5.52383 16.4176 1.99951 11.9996 1.99951C7.58152 1.99951 4 5.52383 4 9.87129V10.9958" stroke="currentColor" stroke-width="1.5" stroke-linecap="square" stroke-linejoin="round" />
                        <path d="M11.9977 13.4592C10.752 12.8002 7.99771 11.6788 6.73429 12.0203C6.49453 12.1204 5.99805 12.4652 5.99805 13.6189L6.09383 19.5962C6.09975 19.9659 6.38606 20.2689 6.74809 20.32C7.98052 20.4942 10.0798 20.9935 11.9977 22.0002M11.9977 13.4592V22.0002M11.9977 13.4592C13.2434 12.8002 15.9988 11.6788 17.2623 12.0203C17.502 12.1204 17.9985 12.4652 17.9985 13.6189L17.9027 19.5962C17.8968 19.9659 17.6105 20.2689 17.2485 20.32C16.016 20.4942 13.9156 20.9935 11.9977 22.0002" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                ),
            },
            {
                buttonText: 'Employee Addition Trend',
                svg: (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="40" height="40" color="#9b9b9b" fill="none">
                        <path d="M14 8.99988H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <path d="M14 12.4999H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <rect x="2" y="2.99988" width="20" height="18" rx="5" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                        <path d="M5 15.9999C6.20831 13.4188 10.7122 13.249 12 15.9999" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.5 8.99988C10.5 10.1044 9.60457 10.9999 8.5 10.9999C7.39543 10.9999 6.5 10.1044 6.5 8.99988C6.5 7.89531 7.39543 6.99988 8.5 6.99988C9.60457 6.99988 10.5 7.89531 10.5 8.99988Z" stroke="currentColor" strokeWidth="1.5" />
                    </svg>
                ),
            },
            // Add more items here as needed
        ]
    },
];

const OrganizationalReports = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase());
    };

    // const filteredData = settingsData.map(category => ({
    //     left: category.left.filter(item => item.name.toLowerCase().includes(searchTerm)),
    //     right: category.right.filter(item => item.buttonText.toLowerCase().includes(searchTerm)),
    // }));
    const filteredData = settingsData.map(category => {
        const leftFiltered = category.left.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())); // searchTerm ko lower case mein convert karna
        const rightFiltered = category.right.filter(item => item.buttonText.toLowerCase().includes(searchTerm.toLowerCase())); // searchTerm ko lower case mein convert karna

        // Agar rightFiltered mein koi data hai, to leftFiltered ko dikhana
        const result = {
            left: [],
            right: []
        };

        if (rightFiltered.length > 0) {
            result.left = category.left; // yahaan `:` ki jagah `=` ka istemal karna hai
            result.right = rightFiltered; // yahaan bhi `:` ki jagah `=` ka istemal karna hai
        } else if (leftFiltered.length > 0) {
            result.left = category.left; // yahaan `:` ki jagah `=` ka istemal karna hai
            result.right = category.right; // yahaan bhi `:` ki jagah `=` ka istemal karna hai
        } else {
            result.left = leftFiltered; // yahaan bhi `:` ki jagah `=` ka istemal karna hai
            result.right = rightFiltered; // yahaan bhi `:` ki jagah `=` ka istemal karna hai
        }

        return result; // `result` ko return karna
    });


    return (
        <div className="OrganizationalReports-dashboard">
            <div className="search-bar">
                <div className="span_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#000" fill="none">
                        <path d="M17.5 17.5L22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M20 11C20 6.02944 15.9706 2 11 2C6.02944 2 2 6.02944 2 11C2 15.9706 6.02944 20 11 20C15.9706 20 20 15.9706 20 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    </svg>
                </div>
                <input
                    type="text"
                    placeholder="Search Settings"
                    className="search-input"
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="categories_section">
                {settingsData.map((category, i) => (
                    <div className='Cards_l_r' key={i}>
                        <div className="left-section">
                            {filteredData[i].left.length > 0 ? (
                                filteredData[i].left.map((item, index) => (
                                    <div key={index} className="-card">
                                        <img src={item.img} alt="" />
                                        <h4 className="-name">{item.name}</h4>
                                        <p className="-description">{item.description}</p>
                                    </div>
                                ))
                            ) : (
                                ''
                            )}
                        </div>
                        <div className="right-section">
                            {filteredData[i].right.length > 0 ? (
                                filteredData[i].right.map((item, index) => (
                                    <div key={index} className="section-card">
                                        <div className="section-svg">{item.svg}</div>
                                        <span className="visit-button">
                                            {/* Uncomment and add navigation logic here if needed */}
                                            {/* onClick={() => navigate(`/permissions`)} */}
                                            {item.buttonText}
                                        </span>
                                    </div>
                                ))
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default OrganizationalReports;
//