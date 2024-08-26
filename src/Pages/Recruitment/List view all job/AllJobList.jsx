import { useState, } from 'react';
import { HiUserPlus } from "react-icons/hi2";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { PiCheckSquare } from "react-icons/pi";
import {  FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { BiRevision } from "react-icons/bi";
import { IoFilterSharp, IoSearchSharp } from "react-icons/io5";
import { TiArrowUnsorted } from "react-icons/ti";
import { MdDateRange } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdWork } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { RiFilterOffFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';
import './AllJobList.scss';

const AllJobList = () => {
    const [hidImport, setHidImport] = useState(true);
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([
        { JobTitle: "IT Consultant", Department: "Marketing", Positions: "10", ExperienceRequired: "03 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Open", isChecked: false },
        { JobTitle: "Cloud Architect", Department: "Customer Success", Positions: "10", ExperienceRequired: "01 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Draft", isChecked: false },
        { JobTitle: "Software Engineer", Department: "Office Administration", Positions: "10", ExperienceRequired: "03 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "On hold", isChecked: false },
        { JobTitle: "IT Auditor", Department: "Operations", Positions: "10", ExperienceRequired: "07 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Cancelled", isChecked: false },
        { JobTitle: "Technical Writer", Department: "Executive Management", Positions: "10", ExperienceRequired: "02 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "On hold", isChecked: false },
        { JobTitle: "UI/UX Designer", Department: "Product", Positions: "10", ExperienceRequired: "2.6 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Filled", isChecked: false },
        { JobTitle: "Database Administrator", Department: "UX", Positions: "10", ExperienceRequired: "03 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Filled", isChecked: false },
        { JobTitle: "Network Administrator", Department: "Finance", Positions: "10", ExperienceRequired: "03 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Open", isChecked: false },
        { JobTitle: "QA Engineer", Department: "Sales", Positions: "10", ExperienceRequired: "01 Years", SkillsRequired: "PHP, React, Laravel, Flutter", status: "Open", isChecked: false },
       
    ]);
    const [filteredEmployees, setFilteredEmployees] = useState(employees);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectAll, setSelectAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isOpen, setIsOpen] = useState(null);
    console.log(selectedDepartment)

    const handleHidImport = () => {
        setHidImport(!hidImport);
    };

    const handleSelectAll = () => {
        const updatedEmployees = filteredEmployees.map(emp => ({
            ...emp,
            isChecked: !selectAll
        }));
        setFilteredEmployees(updatedEmployees);
        setSelectAll(!selectAll);
    };

    const handleCheckboxChange = (index) => {
        const updatedEmployees = [...filteredEmployees];
        updatedEmployees[index].isChecked = !updatedEmployees[index].isChecked;
        setFilteredEmployees(updatedEmployees);
    };

    const indexOfLastEmployee = currentPage * rowsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);
    const totalPages = Math.ceil(filteredEmployees.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };

    const statuses = ['Open', 'Draft', 'On hold', 'Failld', 'Cancelled'];
    // const departments = ['All', 'Human Resources', 'Maintenance', 'Manning', 'Operations', 'Engineering', 'IT', 'HSEQ'];
    // const employeeType = ['All', 'Permanent', 'On Contract', 'Intern', 'Trainee'];

    const handleStatusChange = (index, newStatus) => {
        const updatedEmployees = [...filteredEmployees];
        updatedEmployees[index].status = newStatus;
        setFilteredEmployees(updatedEmployees);
        setIsOpen(null);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };


    const handleFilterChange = (e) => {
        setSelectedDepartment(e.target.value);
        let updatedEmployees = employees;

        if (searchQuery) {
            updatedEmployees = updatedEmployees.filter(emp =>
                emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                emp.phone.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        if (selectedDepartment !== 'All') {
            updatedEmployees = updatedEmployees.filter(emp => emp.department === selectedDepartment);
        }

        if (selectedStatus !== 'All') {
            updatedEmployees = updatedEmployees.filter(emp => emp.status === selectedStatus);
        }

        setFilteredEmployees(updatedEmployees);
    };



    const handleRefresh = () => {
        setFilteredEmployees(employees);
        setSearchQuery('');
        setSelectedDepartment('All');
        setSelectedStatus('All');
        setCurrentPage(1);
        setRowsPerPage(10);
    };
    // 
    const [showFilter, setShowFilter] = useState(false);
    const [showCustomDate, setShowCustomDate] = useState(false);
    const [showEmploymentType, setShowEmploymentType] = useState(false);
    const [showDepartment, setShowDepartment] = useState(false);

    const showFilterHandle = () => {
        setShowFilter(!showFilter)
    }
    const handleCustomDateClick = () => {
        setShowCustomDate(!showCustomDate);
        setShowEmploymentType(false);
        setShowDepartment(false);
    };

    const handleEmploymentTypeClick = () => {
        setShowEmploymentType(!showEmploymentType);
        setShowCustomDate(false);
        setShowDepartment(false);
    };

    const handleDepartmentClick = () => {
        setShowDepartment(!showDepartment);
        setShowCustomDate(false);
        setShowEmploymentType(false);
    };

    const JobDetailsPage = (index) => {
        navigate(`/job-details/${+index}`)
    }

    return (
        <div id='allEmp'>
            <div className="EmpOn_main_container">
                <div className="EmpOn_header">
                    <div className="top-bar">
                        <h2>
                            <div className='span'><HiUserPlus /></div>
                            All Jobs list <p>204 total</p>
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
                            <span><RiFilterOffFill /></span>Draft
                        </div>
                    </div>
                    <div className="inactive">
                        <div>
                            <span> <MdWork /> </span>Open
                        </div>
                    </div>
                    <div className="resigned">
                        <div>
                            <span> <FaRegClock /> </span>On hold
                        </div>
                    </div>
                    <div className="terminated">
                        <div>
                            <span><PiCheckSquare /></span>Filled
                        </div>
                    </div>
                    <div className="notice_period">
                        <div>
                            <span><IoMdCloseCircleOutline /></span>Cancelled
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="refresh divRight" onClick={handleRefresh}>
                        <div className='div_box'>
                            <span><BiRevision /></span>
                        </div>
                    </div>
                    <div className="search divRight">
                        <div className='search div_box'>
                            <span className='search_icon'><IoSearchSharp /></span>
                            <input
                                type="search"
                                name="search"
                                placeholder='Search Employee name, phone number...'
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyUp={handleFilterChange}
                            />
                        </div>
                    </div>
                    <div className="filter divRight">
                        <div className='div_box' onClick={showFilterHandle}>
                            <span><IoFilterSharp /></span>
                        </div>

                        {showFilter && (
                            <div className="filter-container">
                                <div className="filter-options">
                                    {/* <div className="filter-option" onClick={handleCustomDateClick}>
                                        <p>Custom Date </p>
                                        {showCustomDate && (
                                            <div className="dropdown-content date-h">
                                                <div><MdDateRange /> Select Custom date</div>
                                                <input type="date" />
                                            </div>
                                        )}
                                    </div> */}
                                    <div className="filter-option">
                                        <p onClick={handleEmploymentTypeClick}>Experience Level</p>
                                        {showEmploymentType && (
                                            <div className="dropdown-content">
                                                <ul>
                                                    <li>
                                                        <input type="radio" id="permanent" name="employmentType" className="custom-radio" />
                                                        <label htmlFor="permanent">Entry level</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="contract" name="employmentType" className="custom-radio" />
                                                        <label htmlFor="contract">Mid level</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="intern" name="employmentType" className="custom-radio" />
                                                        <label htmlFor="intern">Senior</label>
                                                    </li>
                                                    
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                    <div className="filter-option">
                                        <p onClick={handleDepartmentClick}>Department</p>
                                        {showDepartment && (
                                            <div className="dropdown-content">
                                                <ul>
                                                    <li>
                                                        <input type="radio" id="all-department" name="department" className="custom-radio" />
                                                        <label htmlFor="all-department">All Department</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="it" name="department" className="custom-radio" />
                                                        <label htmlFor="it">IT</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="hr" name="department" className="custom-radio" />
                                                        <label htmlFor="hr">HR</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="sales" name="department" className="custom-radio" />
                                                        <label htmlFor="sales">Sales</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="management" name="department" className="custom-radio" />
                                                        <label htmlFor="management">Management</label>
                                                    </li>
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>




                        )}

                    </div>
                </div>
            </div>
            {/* All Employee  List*/}
            <div className="allEmployeeList">
                {/* <div className="head">
                </div> */}
                <div className="employee-table">

                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
                                <th> <div>Job Title<span><TiArrowUnsorted /></span></div></th>
                                <th>Department</th>
                                <th>Positions</th>
                                <th>Experience Required</th>
                                <th>Skills Required</th>
                               
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.map((emp, index) => (
                                <tr key={index} onClick={JobDetailsPage(index)} >
                                    <td><input type="checkbox" checked={emp.isChecked} onChange={() => handleCheckboxChange(indexOfFirstEmployee + index)} /></td>
                                    <td>{emp.JobTitle}</td>
                                    <td>{emp.Department}</td>
                                    <td>{emp.Positions}</td>
                                    <td>{emp.ExperienceRequired}</td>
                                    <td>{emp.SkillsRequired}</td>
                                   
                                    <td>
                                        <div className="status-dropdown">
                                            <div key={index} className="status-container">
                                                <div
                                                    className={`status-display ${emp.status.toLowerCase().replace(' ', '-')}`}
                                                    onClick={() => setIsOpen(isOpen === index ? null : index)}
                                                >
                                                    {console.log(emp.status.toLowerCase().replace(' ', '-'))}
                                                    <span className={`left_dot ${emp.status.toLowerCase().replace(' ', '-')}`}
                                                    ></span>
                                                    <div>
                                                        <div className="">
                                                            {emp.status}
                                                        </div>
                                                        <div className="^wdown">
                                                            <MdOutlineKeyboardArrowDown />
                                                        </div>
                                                    </div>
                                                </div>
                                                {isOpen === index && (
                                                    <div className="status-options">
                                                        {statuses.map(status => (
                                                            <div
                                                                key={status}
                                                                className="status-option"
                                                                onClick={() => handleStatusChange(index, status)}
                                                            >
                                                                {status}
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>


                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <div className="rows-per-page">
                            <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                                <option value={5}>5 par page</option>
                                <option value={10}>10 par page</option>
                                <option value={30}>30 par page</option>
                                <option value={50}>50 par page</option>
                                <option value={70}>70 par page</option>
                                <option value={100}>100 par page</option>
                            </select>
                        </div>
                        <div className="page-navigation">
                            <div className="page-numbers">
                                {[...Array(totalPages)].map((_, pageIndex) => (
                                    <button
                                        key={pageIndex + 1}
                                        className={currentPage === pageIndex + 1 ? 'active' : ''}
                                        onClick={() => handlePageChange(pageIndex + 1)}
                                    >
                                        {pageIndex + 1}
                                    </button>
                                ))}
                            </div>
                            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}> <FaAngleLeft /></button>
                            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}><FaAngleRight /></button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default AllJobList;
// 