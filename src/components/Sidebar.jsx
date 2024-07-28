import { useState } from 'react';
import PropTypes from 'prop-types';
import { FaAngleLeft, FaChevronRight } from "react-icons/fa6";
import { RiHome6Line } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi2";
import { MdOutlineWorkOutline, MdOutlineDateRange, MdAdd } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import '../styles/Sidebar.scss';
import { TbFileMinus, TbGraph, TbFolderSymlink } from "react-icons/tb";
import { BsClipboardData } from "react-icons/bs";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [activeItem, setActiveItem] = useState(null);

    const handleClick = (index) => {
        setActiveItem(activeItem === index ? null : index);
    };

    const menuItems = [
        {
            label: 'Home',
            icon: <RiHome6Line />,
            submenu: ['List View', 'Calendar View', 'Leave Application', 'Holidays', 'Setting']
        },
        {
            label: 'Profile',
            icon: <HiOutlineUser />,
            submenu: ['Profile View', 'Edit Profile', 'Security Settings']
        },
        {
            label: 'Organization',
            icon: <MdOutlineWorkOutline />,
            submenu: ['Department', 'Teams', 'Hierarchy', 'Policies']
        },
        {
            label: 'Task',
            icon: <FiClock />,
            submenu: ['Task List', 'Completed Tasks', 'Pending Tasks']
        },
        {
            label: 'Attendance',
            icon: <MdOutlineDateRange />,
            submenu: ['Attendance Report', 'Request Leave', 'Attendance History']
        }
    ];

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'close'}`}>
            <div id='top_bar' className="slide-btn">
                <button className="toggle-button" onClick={toggleSidebar}>
                    {isOpen ? <FaAngleLeft /> : <FaChevronRight />}
                </button>
            </div>
            <ul id='top-ul-hide'>
                {menuItems.map((item, index) => (
                    <li key={index} className={`${activeItem === index ? 'li' : ''}`}>
                        <span onClick={() => handleClick(index)}>
                            {item.icon}
                        </span>
                        {isOpen && <p>{item.label}</p>}
                        <div className={`hover_menu ${activeItem === index ? 'show' : ''}`}>
                            <div className='side_arrow'>
                                {item.submenu.map((_, subIndex) => (
                                    <div className='leftArrow' key={subIndex}><div className='divL'></div></div>
                                ))}
                            </div>
                            <div className="lineS"></div>
                            <ul>
                                {item.submenu.map((submenuItem, subIndex) => (
                                    <li onClick={() => handleClick(index)} key={subIndex}>{submenuItem}</li>
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
                    <div className='dot'></div>
                    <ul className='ul2'>
                        <li><span><TbFileMinus /></span>{isOpen && <p>Files</p>} {isOpen ? '' : <div className='hover_P'><p>Files</p> <div></div></div>}</li>
                        <li><span><TbGraph /></span>{isOpen && <p>Performance</p>}  {isOpen ? '' : <div className='hover_P'><p>Performance</p> <div></div></div>}</li>
                        <li><span><TbFolderSymlink /></span>{isOpen && <p>Onboarding</p>}  {isOpen ? '' : <div className='hover_P'><p>Onboarding</p> <div></div></div>}</li>
                        <li><span><BsClipboardData /></span>{isOpen && <p>Report</p>}  {isOpen ? '' : <div className='hover_P'><p>Report</p> <div></div></div>}</li>
                   </ul>
                </div>
            </div>
            <div className="fix-add">
                <span><MdAdd /></span>
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    toggleSidebar: PropTypes.func.isRequired
};

export default Sidebar;
