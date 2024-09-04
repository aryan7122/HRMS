import { useState, useEffect } from 'react';
import { HiUserPlus } from "react-icons/hi2";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdAdd, IoIosCloseCircleOutline } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { PiCheckSquare } from "react-icons/pi";
import { GiBackstab, GiNotebook } from "react-icons/gi";
import { FaPersonWalkingArrowLoopLeft, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { BiRevision } from "react-icons/bi";
import { IoFilterSharp, IoSearchSharp } from "react-icons/io5";
import { TiArrowUnsorted } from "react-icons/ti";
import { MdDateRange } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import './Department.scss';

const Department = () => {
    const [hidImport, setHidImport] = useState(true);
    const [employees, setEmployees] = useState([
        { deptName: "Manning", deptHead: "Sunil Bhadouriya", parentDept: "HSEQ" },
        { deptName: "IT", deptHead: "Nandan Raikwar", parentDept: "Operations" },
        { deptName: "HSEQ", deptHead: "Vikas Tiwari", parentDept: "IT" },
        { deptName: "Operations", deptHead: "Paartho Ghosh", parentDept: "Manning" },
        { deptName: "Engineering", deptHead: "Rahul Choudary", parentDept: "Engineering" },
        { deptName: "Maintenance", deptHead: "Jayshri Tiwari", parentDept: "Operations" },
        { deptName: "Operations", deptHead: "Shalini Jain", parentDept: "Maintenance" },
        { deptName: "Human Resources", deptHead: "Viswas Patel", parentDept: "IT" },
        { deptName: "IT", deptHead: "Kailash Chaurasia", parentDept: "Maintenance" },
        { deptName: "Manning", deptHead: "Mamta Lodhi", parentDept: "Human Resources" },
        { deptName: "IT", deptHead: "Kailash Chaurasia", parentDept: "Maintenance" },

    ]);
    const [filteredEmployees, setFilteredEmployees] = useState(employees);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectAll, setSelectAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isOpen, setIsOpen] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [selectedDepartmentDetails, setSelectedDepartmentDetails] = useState(null);

    console.log(selectedDepartment)
    const navigate = useNavigate();
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

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };


    const handleFilterChange = (e) => {
        setSelectedDepartment(e.target.value);
        let updatedEmployees = employees;

        if (searchQuery) {
            updatedEmployees = updatedEmployees.filter(emp =>
                emp.deptHead.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
    const [dropdowns, setDropdowns] = useState({
        department1: false
    });
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        jobOpening: '',
        resume: '',
        coverLetter: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',
        source: '',
        availabilityDate: '',
        expectedSalary: '',
        referredPerson: ''
    });
    const toggleDropdown = (dropdown) => {
        setDropdowns(prevState => ({
            ...prevState,
            [dropdown]: !prevState[dropdown]
        }));
    };





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


    const handleAddDepartmentClick = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleDepartmentClick1 = (department) => {
        setSelectedDepartmentDetails(department);
    };

    const DepartmentDetails = () => {
        navigate('/departmentdetails');
    }

    const selectOption = (dropdown, value) => {
        setFormData(prev => ({ ...prev, department1: value }));
        setSearchTerm(''); // Clear search term on select
        toggleDropdown(dropdown); // Hide dropdown after selection
    };

    const handleSubmit222 = () => {
        // Your custom logic here
        console.log("Button clicked!");
    };

    return (
        <div>
            <div className="EmpOn_main_container">
                <div className="EmpOn_header">
                    <div className="top-bar">
                        <h2>
                            <div className='span'><HiUserPlus /></div>
                            All Departments list <p>08 total</p>
                        </h2>
                        <div className="Emp_Head_Right">
                            <div className="addEmp" onClick={handleAddDepartmentClick}>
                                <p><span><IoMdAdd /></span> Add New Department</p>
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
            <div className="EmpOn_Second_Head" id="searchlist">
                <div className="left">

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
                                placeholder='Search Department name...'
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
                                    <div className="filter-option" onClick={handleCustomDateClick}>
                                        <p>Custom Date </p>
                                        {showCustomDate && (
                                            <div className="dropdown-content date-h">
                                                <div><MdDateRange /> Select Custom date</div>
                                                <input type="date" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="filter-option">
                                        <p onClick={handleEmploymentTypeClick}>Employment Type</p>
                                        {showEmploymentType && (
                                            <div className="dropdown-content">
                                                <ul>
                                                    <li>
                                                        <input type="radio" id="permanent" name="employmentType" className="custom-radio" />
                                                        <label htmlFor="permanent">Permanent</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="contract" name="employmentType" className="custom-radio" />
                                                        <label htmlFor="contract">On Contract</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="intern" name="employmentType" className="custom-radio" />
                                                        <label htmlFor="intern">Intern</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="trainee" name="employmentType" className="custom-radio" />
                                                        <label htmlFor="trainee">Trainee</label>
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
            <div className="allEmployeeList" id="departmentlist">
                {/* <div className="head">
                </div> */}
                <div className="employee-table">

                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
                                <th> <div>Department Name<span><TiArrowUnsorted /></span></div></th>
                                <th>Department Head</th>
                                <th>Parent Department</th>

                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.map((emp, index) => (
                                <tr key={index} onClick={() => handleDepartmentClick1(DepartmentDetails)}>
                                    <td><input type="checkbox" checked={emp.isChecked} onChange={() => handleCheckboxChange(indexOfFirstEmployee + index)} /></td>
                                    <td>{emp.deptName}</td>
                                    <td>{emp.deptHead}</td>
                                    <td>{emp.parentDept}</td>



                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {showPopup && (
                        <div className="popup-overlay">
                            <div className="popup">
                                <div className="popup-header">
                                    <h3>Add New Department</h3>
                                    <div className="close_btn" onClick={closePopup}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                            <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="popup-body">
                                    <form className='upfom'>
                                        <label className='redcolor'>Department Name*</label>
                                        <input type="text" placeholder="Enter Department Name" />
                                        <label className='blackcolor1'> Parent Department</label>
                                        <input type="text" placeholder="Enter Department Head" />

                                        <div className="form-group">
                                            <label>Department Head</label>
                                            <div className="dropdown1">
                                                <div className="dropdown-button1" onClick={() => toggleDropdown('department1')}>
                                                    <div className='downbtn'>{formData.department1 || "Choose or search head"}</div>
                                                    <span id='toggle_selectIcon'> {!dropdowns.department1 ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                                </div>

                                                {dropdowns.department1 && (

                                                    <div className="dropdown-menu1">

                                                        <input
                                                            type="text"
                                                            className='search22'
                                                            placeholder="Search head of Department"
                                                            value={searchTerm}
                                                            onChange={handleSearch}
                                                            id="handlesearch"
                                                        />

                                                        <div className="dropdown-item1" onClick={() => selectOption('department1', 'Akash shinde ')}>Akash shinde</div>
                                                        <div className="dropdown-item1" onClick={() => selectOption('department1', 'Rajat Munde')}>Rajat Munde</div>
                                                        <div className="dropdown-item1" onClick={() => selectOption('department1', 'Arman Signh')}>Arman Signh</div>
                                                        <div className="dropdown-item1" onClick={() => selectOption('department1', 'Rajat Munde')}>Rajat Munde</div>
                                                        <div className="dropdown-item1" onClick={() => selectOption('department1', 'Arman Signh')}>Arman Signh</div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className='popupbtn' id="popupbtnnnnn"  >
                                            <button type="submit" onClick={handleSubmit222}>Submit
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9b9b9b" fill="none">
                                                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                                                    <path d="M10.5 8C10.5 8 13.5 10.946 13.5 12C13.5 13.0541 10.5 16 10.5 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                </svg>
                                            </button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    )}

                </div>
                    <div className="pagination">
                        <div className="rows-per-page">
                            <select value={rowsPerPage} onChange={handleRowsPerPageChange}>
                                <option value={5}>5 per page</option>
                                <option value={10}>10 per page</option>
                                <option value={30}>30 per page</option>
                                <option value={50}>50 per page</option>
                                <option value={70}>70 per page</option>
                                <option value={100}>100 per page</option>
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
        </div >


    );

};

export default Department;