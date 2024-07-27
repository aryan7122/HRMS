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

    return (
        <div className={`sidebar ${isOpen ? 'open' : 'close'}`}>
            <div id='top_bar' className="slide-btn">
                <button className="toggle-button" onClick={toggleSidebar}>
                    {isOpen ? <FaAngleLeft /> : <FaChevronRight />}
                </button>
            </div>
            <ul id='top-ul-hide'>
                {['Home', 'Profile', 'Organization', 'Task', 'Attendance'].map((item, index) => (
                    <li key={index} className={`${activeItem === index ? 'li' : ''}`}>
                        <span onClick={() => handleClick(index)}>
                            {index === 0 && <RiHome6Line />}
                            {index === 1 && <HiOutlineUser />}
                            {index === 2 && <MdOutlineWorkOutline />}
                            {index === 3 && <FiClock />}
                            {index === 4 && <MdOutlineDateRange />}
                        </span>
                        {isOpen && <p>{item}</p>}
                        <div className={`hover_menu ${activeItem === index ? 'show' : ''}`}>
                            <div className='side_arrow'>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                                <div></div>
                            </div>
                            <ul>
                                <li>List View</li>
                                <li>Calendar View</li>
                                <li>Leave Application</li>
                                <li>Holidays</li>
                                <li>Setting</li>
                            </ul>
                        </div>
                    </li>
                ))}
                <li><h5>MORE</h5></li>
                <li><div className='border-b'></div></li>
            </ul>
            <ul className={` ${isOpen ? '' : 'side'}`}>
                <div className={` ${isOpen ? '' : 'sideLine'}`}>
                    <div className='dot'></div>
                    <li><span><TbFileMinus /></span>{isOpen && <p>Files</p>}</li>
                    <li><span><TbGraph /></span>{isOpen && <p>Performance</p>}</li>
                    <li><span><TbFolderSymlink /></span>{isOpen && <p>Onboarding</p>}</li>
                    <li><span><BsClipboardData /></span>{isOpen && <p>Report</p>}</li>
                </div>
            </ul>
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
