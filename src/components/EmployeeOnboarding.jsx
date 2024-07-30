import { useState } from 'react';
import { HiUserPlus } from "react-icons/hi2";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdAdd, IoIosCloseCircleOutline } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { PiCheckSquare } from "react-icons/pi";
import { GiBackstab, GiNotebook } from "react-icons/gi";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import { BiRevision } from "react-icons/bi";
import { IoFilterSharp, IoSearchSharp } from "react-icons/io5";


import '../styles/EmployeeOnboarding.scss';

const EmployeeOnboarding = () => {
    const [hidImport, setHidImport] = useState(true);

    const handleHidImport = () => {
        setHidImport(!hidImport);
        // alert("Import button clicked");
    };

    return (
        <div>
            <div className="EmpOn_main_container">
                <div className="EmpOn_header">
                    <div className="top-bar">
                        <h2>
                            <div className='span'><HiUserPlus /></div>
                            Add Employee <p>102 total</p>
                        </h2>
                        <div className="Emp_Head_Right">
                            <div className="addEmp">
                                <p><span><IoMdAdd /></span> Add New Employee</p>
                            </div>
                            <div className="menu_head" onClick={handleHidImport}>
                                <div className="div_top"><CiMenuKebab /></div>
                                <div className={`bottom_import  ${hidImport ? 'bottom_import_hide' : ''}`}>
                                    <AiOutlineCloudUpload /> Import
                                    <input type="file" accept='image/*' />
                                </div>
                            </div>
                        </div>
                        <div className="_div">
                            <span className="1"></span>
                            <span className="2"></span>
                            <span className="3"></span>
                            <span className="4"></span>
                            <span className="5"></span>
                            <span className="6"></span>
                            <span className="7"></span>
                            <span className="8"></span>
                            <span className="9"></span>
                            <span className="10"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="EmpOn_Second_Head">

                <div className="left">
                    <div className="all">
                        <div className='listActive'>
                            <span> <FaList /></span>All
                        </div>
                    </div>
                    <div className="active">
                        <div>
                            <span><PiCheckSquare /></span>Active
                        </div>
                    </div>
                    <div className="inactive">
                        <div>
                            <span> <IoIosCloseCircleOutline /> </span>Inactive
                        </div>
                    </div>
                    <div className="resigned">
                        <div>
                            <span> <GiBackstab /> </span>Resigned
                        </div>
                    </div>
                    <div className="terminated">
                        <div>
                            <span><FaPersonWalkingArrowLoopLeft /></span>Terminated
                        </div>
                    </div>
                    <div className="notice_period">
                        <div>
                            <span><GiNotebook /></span>Notice Period
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="refresh">
                        <div>
                            <span><BiRevision /></span>
                        </div>
                    </div>
                    <div className="search">
                        <div className='search'>
                            <span className='search_icon'><IoSearchSharp/></span>
                            <input type="search" name="search" placeholder='Search Employee name, phone number...' />
                        </div>
                    </div>
                    <div className="filter">
                        <div>
                            <span><IoFilterSharp /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeOnboarding;
