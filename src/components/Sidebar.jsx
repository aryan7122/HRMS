import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaAngleLeft, FaChevronRight } from "react-icons/fa6";
import { RiHome6Line } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi2";
import { MdOutlineWorkOutline, MdOutlineDateRange, MdAdd } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { TbFileMinus, TbGraph, TbFolderSymlink } from "react-icons/tb";
import { BsClipboardData } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { MdOutlineSwitchAccessShortcut } from "react-icons/md";
import { Link } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import FilledItemIco from '../assets/FilledItemIco.svg';
import FilledSalesIco from '../assets/FilledSalesIco.svg';
import FilledPurchasesIco from '../assets/FilledPurchasesIco.svg';
import FilledEwaybillsIco from '../assets/FilledEwaybillsIco.svg';
import FilledAccountantIco from '../assets/FilledAccountantIco.svg';

import '../styles/Sidebar.scss';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [activeItem, setActiveItem] = useState(null);
    const [activeItem2, setActiveItem2] = useState(true);

    const [showAddShorts, setShowAddShorts] = useState(false);

    const navigate = useNavigate();
    const handleShowActivespan = () => {
        setActiveItem2(!activeItem2)
        console.log(activeItem2)
    }

    // const handleClick = (index, path) => {
    //     setActiveItem(activeItem === index ? null : index);
    //     // setActiveItem2(activeItem2 === index ? false : index)
    //     // handleShowActivespan()
    //     if (path) {
    //         navigate(path);
    //     }
    // };
    const handleClick = (index, path, isSubmenu = false) => {
        handleShowActivespan()
        if (!isSubmenu) {
            // setActiveItem2(!activeItem2)
            // alert()
            // Only update activeItem if the click is not on a submenu item
            setActiveItem(activeItem === index ? null : index);
        }
        if (path) {
            navigate(path);
        }
    };
    const combinedClickHandler = (index, path) => {
        handleClick(index, path);
        setActiveItem2(false)

    };
    const handleClickShortCut = () => {
        setShowAddShorts(!showAddShorts)
    }


    const menuItems = [
        {
            label: 'Home',
            icon: <RiHome6Line />,
            submenu: [
                { label: 'Admin Dashboard', path: '/admin-dashboard' },
                { label: 'Employee Dashboard', path: '/employee-dashboard' },
                // { label: 'Setting', path: '/setting' }
            ]
        },
        {
            label: 'Profile',
            icon: <HiOutlineUser />,
            submenu: [
                { label: 'Admin Profile', path: '/admin-profile' },
                { label: 'Employee Profile', path: '/Employee-profile' },
                { label: 'Add Employee', path: '/add-employee' },
                { label: 'Employee Details', path: '/employee-details' },
            ]
        },
        {
            label: 'Organization',
            icon: <MdOutlineWorkOutline />,
            submenu: [
                { label: 'All Employee List', path: '/all-employee-list' },
                { label: 'Department', path: '/department' },
                { label: 'Designation', path: '/designation' },
                { label: 'Employee Health', path: '/health' },
                { label: 'Birthday', path: '/birthday' }
            ]
        },
        {
            label: 'Live Tracker',
            icon: <FiClock />,
            submenu: [
                { label: 'All Leave', path: '/all-leave' },
                { label: 'Leave Master', path: '/Leave Master' },
                { label: 'Leave Application', path: '/leave-application' },
                { label: 'Attendance', path: '/attendance' },
                { label: 'Holidays', path: '/holidays' },
            ]
        },
        {
            label: 'Attendance',
            icon: <MdOutlineDateRange />,
            submenu: [
                { label: 'All Attendance List', path: '/all-Attendance-list' },
                { label: 'Shift Management', path: '/shift-management' },
            ]
        }
    ];

    return (
        <>
            <div className={`sidebar ${isOpen ? 'open' : 'close'}`}>
                <div className="ul">
                    <div id='top_bar' className="slide-btn">
                        <button className="toggle-button" onClick={toggleSidebar}>
                            {isOpen ? <FaAngleLeft /> : <FaChevronRight />}
                        </button>
                    </div>
                    <ul id='top-ul-hide'>
                        {menuItems.map((item, index) => (
                            <li key={index} className={`${activeItem === index ? 'li' : ''}`}>
                                {/* <span onClick={() => handleClick(index)}
                                    // className={`${activeItem2 == false ? 'active_span_li' : ''}`}
                                    // className={`${activeItem === index ? 'active_span_li' : ''}`}
                                    className={`${activeItem === index ? ' color_li' : ''}`}

                                >
                                    {item.icon}
                                </span> */}
                                <span
                                    // onClick={() => handleClick(index, item.path)}
                                    onClick={() => combinedClickHandler(index, item.path)}
                                    className={`${activeItem === index ? ' color_li' : ''}`}
                                >
                                    {/* {item.icon} */}
                                    {item.icon}


                                    {activeItem2 && <p className={` ${isOpen ? 'openP' : 'closeP'}`}></p>} {isOpen ? '' : <div className='hover_P'><p>{item.label}</p> <div></div></div>}
                                </span>
                                {isOpen && <p className={` ${isOpen ? 'openP' : 'closeP'}`}>{item.label}</p>}
                                <div className={`hover_menu ${activeItem === index ? 'show' : ''} ${activeItem2 == true ? 'active_span_li ' : 'active_span_li_2'}`}>
                                    <div className='side_arrow'>
                                        {item.submenu.map((_, subIndex) => (
                                            <div className='leftArrow' key={subIndex}><div className='divL'></div></div>
                                        ))}
                                    </div>
                                    <div className="lineS"></div>
                                    <ul>
                                        {/* {item.submenu.map((submenuItem, subIndex) => (
                                            <li onClick={() => handleClick(index, submenuItem.path)} key={subIndex}>{submenuItem.label}</li>
                                        ))} */}
                                        {item.submenu.map((submenuItem, subIndex) => (
                                            <li
                                                onClick={() => handleClick(index, submenuItem.path, true,)}
                                                key={subIndex}
                                            >
                                                {submenuItem.label}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </li>
                        ))}
                        <li><h5>MORE</h5></li>
                        <li><div className='border-b'></div></li>
                    </ul>
                    <div className={` ${isOpen ? '' : 'side'} `}>
                        <div className={` ${isOpen ? '' : 'sideLine'} `}>
                            <div className='dot'><div></div></div>
                            <ul className='ul2'>
                                <li><span><TbFileMinus /></span>{isOpen && <p className={` ${isOpen ? 'openP' : 'closeP'}`}>Files</p>} {isOpen ? '' : <div className='hover_P'><p>Files</p> <div></div></div>}</li>
                                <li><span><TbGraph /></span>{isOpen && <p className={` ${isOpen ? 'openP' : 'closeP'}`}>Performance</p>}  {isOpen ? '' : <div className='hover_P'><p>Performance</p> <div></div></div>}</li>
                                <li><span><TbFolderSymlink /></span>{isOpen && <p className={` ${isOpen ? 'openP' : 'closeP'}`}>Onboarding</p>}  {isOpen ? '' : <div className='hover_P'><p>Onboarding</p> <div></div></div>}</li>
                                <li><span><BsClipboardData /></span>{isOpen && <p className={` ${isOpen ? 'openP' : 'closeP'}`}>Report</p>}  {isOpen ? '' : <div className='hover_P'><p>Report</p> <div></div></div>}</li>
                            </ul>
                        </div>
                    </div>
                    <div className="fix-add">
                        <span onClick={handleClickShortCut}><MdAdd /></span>
                    </div>
                    {showAddShorts && (
                        <div id="shortcuts-box">
                            <div id="sugnboxsxx1">
                                <h3>Shortcuts <MdOutlineSwitchAccessShortcut /></h3>
                                <ul>

                                    <div className="firstboxxlw51ws1">
                                        <div className="xkwloxs654s2">
                                            <img src={FilledItemIco} alt="" />

                                            <p>Items</p>
                                        </div>
                                        <div className="xkwloxs654s25">
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Add Item</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Category</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Sub-Category</li>
                                        </div>

                                    </div>


                                    <div className="firstboxxlw51ws1">
                                        <div className="xkwloxs654s2">
                                            {/* {otherIcons?.salesiconex} */}

                                            <img src={FilledSalesIco} alt="" />

                                            <p>Sales</p>
                                        </div>
                                        <div className="xkwloxs654s25">
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Customer</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Quotation</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Sales Order</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Invoice</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Credit Notes</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Payment Recieved</li>
                                        </div>

                                    </div>

                                    <div className="firstboxxlw51ws1">
                                        <div className="xkwloxs654s2">

                                            <img src={FilledPurchasesIco} alt="" />
                                            <p>Purchases</p>
                                        </div>
                                        <div className="xkwloxs654s25">
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Vendor</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Purchases</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Bill</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Expense</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Debit Notes</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Payment Mode</li>
                                        </div>

                                    </div>


                                    <div className="firstboxxlw51ws1">
                                        <div className="xkwloxs654s2">

                                            <img src={FilledEwaybillsIco} alt="" />
                                            {/* {otherIcons?.ewaybillsiconex} */}
                                            {/* <svg id="fi_6992035" height="512" viewBox="0 0 100 100" width="512" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><linearGradient id="New_Gradient_Swatch_2" gradientUnits="userSpaceOnUse" x1="13.603" x2="76.403" y1="21.4" y2="84.2"><stop offset="0" stop-color="#0a75a1"></stop><stop offset="1" stop-color="#020088"></stop></linearGradient><g id="_09" data-name="09"><path d="m71.119 61.873a3.578 3.578 0 1 0 3.581 3.578 3.582 3.582 0 0 0 -3.581-3.578zm-50.625 0a3.578 3.578 0 1 0 3.578 3.578 3.582 3.582 0 0 0 -3.578-3.578zm6.588-15.018-2.711-2.71a1 1 0 0 1 1.414-1.414l2 2 1.066-1.066 5.109-5.109a1 1 0 1 1 1.414 1.414l-4.4 4.4.361.36 6.178-6.177a1 1 0 1 1 1.414 1.414l-6.885 6.884a1 1 0 0 1 -1.414 0l-1.068-1.067-1.06 1.071a1 1 0 0 1 -1.414 0zm67.118 11.972-6.131-3.25-2.569-12.712a10.21 10.21 0 0 0 -9.974-8.151h-17.492v-2.471a6.062 6.062 0 0 0 -6.049-6.062h-40.656a6.067 6.067 0 0 0 -6.061 6.062v33.214a1 1 0 0 0 1 1h5.924a8.362 8.362 0 0 0 16.6 0h34.025a8.362 8.362 0 0 0 16.6 0h14.315a1 1 0 0 0 1-1v-5.747a1 1 0 0 0 -.532-.883zm-67.34 6.648a6.367 6.367 0 0 1 -12.734 0c0-.007 0-.012 0-.018s0-.014 0-.021a6.368 6.368 0 0 1 12.735 0 .129.129 0 0 0 0 .021c-.004.006 0 .011 0 .018zm4.79-11.567a11.2 11.2 0 1 1 11.2-11.2 11.214 11.214 0 0 1 -11.2 11.2zm22.321 3.016a1 1 0 0 1 -1 1 1 1 0 0 1 -1-1v-6.3a1 1 0 0 1 1-1 1 1 0 0 1 1 1zm.007-10.608a1 1 0 0 1 -1 1 1 1 0 0 1 -1-1l.007-14.067a1 1 0 0 1 1-1 1 1 0 0 1 1 1zm17.141 25.5a6.375 6.375 0 0 1 -6.367-6.352v-.01-.013a6.368 6.368 0 1 1 6.368 6.375zm21.613-7.362h-13.309a8.362 8.362 0 0 0 -16.607 0h-4.782v-27.74h12.085v12.986a1 1 0 0 0 1 1h13.922l1.163 5.74a1.006 1.006 0 0 0 .512.685l6.016 3.189z" fill="url(#New_Gradient_Swatch_2)"></path></g></svg> */}
                                            <p>e-Way Bills</p>
                                        </div>
                                        <div className="xkwloxs654s25">
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Create e-Way Bill</li>
                                        </div>

                                    </div>



                                    <div className="firstboxxlw51ws1">
                                        <div className="xkwloxs654s2">

                                            <img src={FilledAccountantIco} alt="" />
                                            {/* {otherIcons?.accountanticonex} */}
                                            {/* <svg enableBackground="new 0 0 36 36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg" id="fi_16597634"><path d="m8.114 5.564c-1.805 6.677-6.504 10.327-7.374 13.545s-.847 10.475 13.955 14.477 19.432-4.501 20.388-8.041c4.481-16.572-23.772-31.807-26.969-19.981z" fill="#efefef"></path><circle cx="15" cy="11" fill="#f3f3f1" r="4.25"></circle><path d="m13 11c0-1.955 1.328-3.585 3.125-4.08-.361-.1-.733-.17-1.125-.17-2.347 0-4.25 1.903-4.25 4.25s1.903 4.25 4.25 4.25c.392 0 .764-.07 1.125-.17-1.797-.495-3.125-2.125-3.125-4.08z" fill="#d5dbe1"></path><path d="m20.39 18.75h-1.14-7.36-1.14c-2.209 0-4 1.791-4 4v3.5h8.39.86 8.39v-3.5c0-2.209-1.791-4-4-4z" fill="#f3f3f1"></path><path d="m13 18.75h-1.11-1.14c-2.209 0-4 1.791-4 4v3.5h2.25v-3.5c0-2.209 1.791-4 4-4z" fill="#d5dbe1"></path><g fill="#a4afc1"><path d="m26.555 3.967h1v2h-1z" transform="matrix(.707 -.707 .707 .707 4.412 20.586)"></path><path d="m30.621 8.033h1v2h-1z" transform="matrix(.707 -.707 .707 .707 2.728 24.652)"></path><path d="m25.878 8.533h2v1h-2z" transform="matrix(.707 -.707 .707 .707 1.485 21.652)"></path><path d="m29.944 4.467h2v1h-2z" transform="matrix(.707 -.707 .707 .707 5.551 23.336)"></path><path d="m9.875 32.5c-.827 0-1.5-.673-1.5-1.5s.673-1.5 1.5-1.5 1.5.673 1.5 1.5-.673 1.5-1.5 1.5zm0-2c-.276 0-.5.224-.5.5s.224.5.5.5.5-.224.5-.5-.224-.5-.5-.5z"></path></g><circle cx="23" cy="24.5" fill="#2fdf84" r="2.75"></circle><path d="m22.5 24.5c0-1.117.669-2.074 1.625-2.504-.344-.155-.723-.246-1.125-.246-1.519 0-2.75 1.231-2.75 2.75s1.231 2.75 2.75 2.75c.402 0 .781-.091 1.125-.246-.956-.43-1.625-1.387-1.625-2.504z" fill="#00b871"></path><path d="m23 28c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5zm0-5.5c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z"></path><path d="m22.25 27.25h1.5v2h-1.5z"></path><path d="m22.25 19.75h1.5v2h-1.5z"></path><path d="m25.246 21.88h1.998v1.5h-1.998z" transform="matrix(.866 -.5 .5 .866 -7.803 16.176)"></path><path d="m18.756 25.62h1.998v1.5h-1.998z" transform="matrix(.866 -.5 .5 .866 -10.547 13.43)"></path><path d="m19.005 21.631h1.5v1.998h-1.5z" transform="matrix(.5 -.866 .866 .5 -9.724 28.408)"></path><path d="m25.495 25.371h1.5v1.998h-1.5z" transform="matrix(.5 -.866 .866 .5 -9.72 35.895)"></path><path d="m15 16c-2.757 0-5-2.243-5-5s2.243-5 5-5 5 2.243 5 5-2.243 5-5 5zm0-8.5c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5z"></path><path d="m16 27h-9.25c-.414 0-.75-.336-.75-.75v-3.5c0-2.619 2.131-4.75 4.75-4.75h8.5v1.5h-8.5c-1.792 0-3.25 1.458-3.25 3.25v2.75h8.5z"></path></svg> */}
                                            <p>Accountant</p>
                                        </div>
                                        <div className="xkwloxs654s25">
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Account Chart</li>
                                            <li><Link to={"/"}><BsPlusCircle /></Link>Journal</li>
                                        </div>

                                    </div>





                                    {/* <li><Link to={"/"}><HiOutlineHome /></Link>Add Organization</li>
              <li><Link to={"/"}><TfiMore /></Link>Create Items</li>
              <li><Link to={"/"}><RiNotification3Line /></Link>Add Customer</li>
              <li><Link to={"/"}><TfiMore /></Link>Invite User</li>
              <li><Link to={"/"}><HiOutlineHome /></Link>Add Organization</li>
              <li><Link to={"/"}><TfiMore /></Link>Create Items</li>
              <li><Link to={"/"}><TfiMore /></Link>Create Items</li>
              <li><Link to={"/"}><RiNotification3Line /></Link>Add Customer</li>
              <li><Link to={"/"}><TfiMore /></Link>Invite User</li> */}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired
};

export default Sidebar;
