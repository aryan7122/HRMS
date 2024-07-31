import  { useState } from 'react';
import PropTypes from 'prop-types';
import { FaAngleLeft, FaChevronRight } from "react-icons/fa6";
import { RiHome6Line } from "react-icons/ri";
import { HiOutlineUser } from "react-icons/hi2";
import { MdOutlineWorkOutline, MdOutlineDateRange, MdAdd } from "react-icons/md";
import { FiClock } from "react-icons/fi";
import { TbFileMinus, TbGraph, TbFolderSymlink } from "react-icons/tb";
import { BsClipboardData } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.scss';

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const [activeItem, setActiveItem] = useState(null);
    const navigate = useNavigate();

    const handleClick = (index, path) => {
        setActiveItem(activeItem === index ? null : index);
        if (path) {
            navigate(path);
        }
    };

    const menuItems = [
        {
            label: 'Home',
            icon: <RiHome6Line />,
            submenu: [
                { label: 'List View', path: '/list-view' },
                { label: 'Calendar View', path: '/calendar-view' },
                { label: 'Leave Application', path: '/leave-application' },
                { label: 'Holidays', path: '/holidays' },
                { label: 'Setting', path: '/setting' }
            ]
        },
        {
            label: 'Profile',
            icon: <HiOutlineUser />,
            submenu: [
                { label: 'Employee Onboarding', path: '/employee-onboarding' },
                { label: 'Recruitment', path: '/recruitment' },
                { label: 'Applicant Tracking', path: '/applicant-tracking' },
                { label: 'Attendance Tracking', path: '/attendance-tracking' }
            ]
        },
        {
            label: 'Organization',
            icon: <MdOutlineWorkOutline />,
            submenu: [
                { label: 'Department', path: '/department' },
                { label: 'Teams', path: '/teams' },
                { label: 'Hierarchy', path: '/hierarchy' },
                { label: 'Policies', path: '/policies' }
            ]
        },
        {
            label: 'Task',
            icon: <FiClock />,
            submenu: [
                { label: 'Task List', path: '/task-list' },
                { label: 'Completed Tasks', path: '/completed-tasks' },
                { label: 'Pending Tasks', path: '/pending-tasks' }
            ]
        },
        {
            label: 'Attendance',
            icon: <MdOutlineDateRange />,
            submenu: [
                { label: 'Attendance Report', path: '/attendance-report' },
                { label: 'Request Leave', path: '/request-leave' },
                { label: 'Attendance History', path: '/attendance-history' }
            ]
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
                        {isOpen && <p className={` ${isOpen ? 'openP' : 'closeP'}`}>{item.label}</p>}
                        <div className={`hover_menu ${activeItem === index ? 'show' : ''}`}>
                            <div className='side_arrow'>
                                {item.submenu.map((_, subIndex) => (
                                    <div className='leftArrow' key={subIndex}><div className='divL'></div></div>
                                ))}
                            </div>
                            <div className="lineS"></div>
                            <ul>
                                {item.submenu.map((submenuItem, subIndex) => (
                                    <li onClick={() => handleClick(index, submenuItem.path)} key={subIndex}>{submenuItem.label}</li>
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
