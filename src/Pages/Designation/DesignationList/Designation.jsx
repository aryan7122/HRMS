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
import './Designation.scss';
import { OutsideClick } from '../../../components/OutSideClick';

const Designation = () => {
    const { isOpen: isFilterOpen2, ref: filterRef2, buttonRef: filterButtonRef2, handleToggle: toggleFilter2 } = OutsideClick();

    const [hidImport, setHidImport] = useState(true);
    const [employees, setEmployees] = useState([
        { deptName: "UI Designer", deptHead: "Application Development", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "UX Designer", deptHead: "UI/UX Design", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "Chief Financial Officer", deptHead: "Game Client", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "President", deptHead: "QC", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "Chief Operating Officer", deptHead: "Art", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "Head of HR", deptHead: "Game Client", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "Chief Technology Officer", deptHead: "UI/UX Design", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "Director", deptHead: "Backend", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "Project Manager", deptHead: "Backend", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },
        { deptName: "Delivery Manager", deptHead: "Game Design", parentDept: "Lorem ipsum dolor sit amet crem ipsum dolor sit ame..." },


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
    const [selectedDepartmentDetails2, setSelectedDepartmentDetails2] = useState(null);
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

    const handleAddDesginationClick = () => {
        setShowPopup(true);
    };

    const closePopup = () => {
        setShowPopup(false);
    };

    const handleDesignationclick2 = (designation) => {
        setSelectedDepartmentDetails2(designation);
    };
    const navigate = useNavigate();

    const DesignationDetails = () => {
        navigate('/designationdeatils');
    }



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
    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files[0] ? files[0].name : ''
        }));
    };
    const [dropdowns, setDropdowns] = useState({
        department: false
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate if file input is provided
        // if (!formData.resume || !formData.coverLetter) {
        //     alert("Please upload both Resume and Cover Letter");
        //     return;
        // }

        console.log("add-applicant Form Data:", formData);

        // Reset form after submission
        setFormData({
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
    };


    const toggleDropdown = (dropdown) => {
        setDropdowns(prevState => ({
            ...prevState,
            [dropdown]: !prevState[dropdown]
        }));
    };

    const selectOption = (dropdown, value) => {
        setFormData(prevState => ({
            ...prevState,
            [dropdown]: value
        }));
        setDropdowns(prevState => ({
            ...prevState,
            [dropdown]: false
        }));
    };



    // popup
    const initialFormData_3 = {
        email_3: '',
        department_3: '',
        Description_3: '',
    };

    const [formData_3, setFormData_3] = useState(initialFormData_3);
    const [dropdowns_3, setDropdowns_3] = useState({
        departmentOpen_3: false,
    });

    const handleInputChange_3 = (event) => {
        const { name, value } = event.target;
        setFormData_3((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const toggleDropdown_3 = (dropdownKey) => {
        setDropdowns_3((prevState) => ({
            ...prevState,
            [dropdownKey]: !prevState[dropdownKey],
        }));
    };

    const selectOption_3 = (field, value) => {
        setFormData_3((prevState) => ({
            ...prevState,
            [field]: value,
        }));
        toggleDropdown_3('departmentOpen_3');
    };

    const handleSubmitForm_3 = (event) => {
        event.preventDefault();
        console.log("Form Submitted:", formData_3);

        // Reset form fields and dropdown
        setFormData_3(initialFormData_3);
        setDropdowns_3({ departmentOpen_3: false }); // Ensure dropdown closes
    };

    // popup

    return (
        <div>
            <div className="EmpOn_main_container">
                <div className="EmpOn_header">
                    <div className="top-bar">
                        <h2>
                            <div className='span'><HiUserPlus /></div>
                            All Designation list <p>10 total</p>
                        </h2>
                        <div className="Emp_Head_Right">
                            <div className="addEmp" onClick={handleAddDesginationClick}>
                                <p><span><IoMdAdd /></span> AddNew Designation</p>
                            </div>
                            <div className="menu_head" onClick={handleHidImport}>
                                <div className="div_top"><CiMenuKebab /></div>
                                <div className={`bottom_import  ${hidImport ? 'bottom_import_hide' : ''}`}>
                                    <AiOutlineCloudUpload />
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
            <div className="EmpOn_Second_Head" id='searchhead'>
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
                                placeholder='Search designation name, department...'
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyUp={handleFilterChange}
                            />
                        </div>
                    </div>
                    <div className="filter divRight">
                        <div className='div_box' onClick={toggleFilter2} ref={filterButtonRef2}>
                            <span><IoFilterSharp /></span>
                        </div>

                        {isFilterOpen2 && (
                            <div className="filter-container" ref={filterRef2}>
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
                                        <p onClick={handleEmploymentTypeClick}>Date Range</p>
                                        <div className="dropdown-content date-h">
                                            <p>Form Date </p>
                                            <div><MdDateRange /> Select Form date</div>
                                            <input type="date" />
                                        </div>

                                    </div>
                                    <div className="filter-option">
                                        <p onClick={handleDepartmentClick}>Department</p>
                                        {showDepartment && (
                                            <div className="dropdown-content">
                                                <ul>

                                                    <li>
                                                        <input type="radio" id="it" name="department" className="custom-radio" />
                                                        <label htmlFor="it">Entry</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="hr" name="department" className="custom-radio" />
                                                        <label htmlFor="hr">Medium</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" id="sales" name="department" className="custom-radio" />
                                                        <label htmlFor="sales">Senior</label>
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
            <div className="allEmployeeList" id="allemployeetable">
                {/* <div className="head">
                </div> */}
                <div className="employee-table">

                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
                                <th> <div>Designation Name<span><TiArrowUnsorted /></span></div></th>
                                <th>Department</th>
                                <th>Description</th>

                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.map((emp, index) => (
                                <tr key={index} >
                                    <td><input type="checkbox" checked={emp.isChecked} onChange={() => handleCheckboxChange(indexOfFirstEmployee + index)} /></td>
                                    <td onClick={() => handleDesignationclick2(DesignationDetails)}>{emp.deptName}</td>
                                    <td onClick={() => handleDesignationclick2(DesignationDetails)}>{emp.deptHead}</td>
                                    <td onClick={() => handleDesignationclick2(DesignationDetails)}>{emp.parentDept}</td>



                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showPopup && (
                        <div className="popup-overlay">
                            <div className="popup-content">
                                <div className="add-designation-header">
                                    <h2>Add New Designation</h2>
                                    <button className="close_btn" onClick={closePopup}>
                                        <IoIosCloseCircleOutline />
                                    </button>
                                </div>
                                <div className="add-designation-body">
                                    <form onSubmit={handleSubmitForm_3}>
                                        <div className="side-by-side">
                                            <div className="form-group">
                                                <label className='starred'>Designation Name*</label>
                                                <input
                                                    type="text"
                                                    placeholder="Enter designation name"
                                                    name="email_3"
                                                    value={formData_3.email_3}
                                                    onChange={handleInputChange_3}
                                                    required
                                                />
                                            </div>

                                            <div className="form-group" id="depart">
                                                <label>Department</label>
                                                <div className="dropdown10">
                                                    <div className="dropdown-button10" onClick={() => toggleDropdown_3('departmentOpen_3')}>
                                                        <div className='choose1'>{formData_3.department_3 || "Choose department"}</div>
                                                        <span id='toggle_selectIcon'>
                                                            {!dropdowns_3.departmentOpen_3 ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                                        </span>
                                                    </div>

                                                    {dropdowns_3.departmentOpen_3 && (
                                                        <div className="dropdown-menu10">
                                                            <div className="dropdown-item10" onClick={() => selectOption_3('department_3', 'Department1')}>Department1</div>
                                                            <div className="dropdown-item10" onClick={() => selectOption_3('department_3', 'Department2')}>Department2</div>
                                                            <div className="dropdown-item10" onClick={() => selectOption_3('department_3', 'Department3')}>Department3</div>
                                                            <div className="dropdown-item10" onClick={() => selectOption_3('department_3', 'Department4')}>Department4</div>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        <div className='despt'>
                                            <label>Description</label>
                                        </div>

                                        <textarea
                                            placeholder="Enter description"
                                            name="Description_3" // Ensure name matches the form data key
                                            value={formData_3.Description_3}
                                            onChange={handleInputChange_3}
                                        ></textarea>

                                        <button type="submit">Submit
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9b9b9b" fill="none">
                                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                                <path d="M10.5 8C10.5 8 13.5 10.946 13.5 12C13.5 13.0541 10.5 16 10.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </button>
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
        </div>
    );
};

export default Designation;