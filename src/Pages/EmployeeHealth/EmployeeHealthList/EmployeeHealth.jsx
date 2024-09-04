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
// import './EmployeeHealth.scss';

const EmployeeHealth = () => {
    const [hidImport, setHidImport] = useState(true);
    const [employees, setEmployees] = useState([
        { deptName: "Hillery Moses", deptHead: "HSEQ", parentDept: "14-Apr-2024", overall: "Healthy", allerig: "Soy", chorninc: "Lorem ipsum dolor sit amet c..." },
        { deptName: "Nandan Raikwar", deptHead: "Operations", parentDept: "14-Apr-2024", overall: "Healthy", allerig: "Milk", chorninc: "Lorem ipsum dolor sit amet c" },
        { deptName: "Vishwas Patel", deptHead: "Operations", parentDept: "14-Apr-2024", overall: "UnHealthy", allerig: "Pollen", chorninc: "Lorem ipsum dolor sit amet c" },
        { deptName: "Paartho Ghosh", deptHead: "Engineering", parentDept: "14-Apr-2024", overall: "UnHealthy", allerig: "Latex", chorninc: "Lorem ipsum dolor sit amet c" },
        { deptName: "Vikas Tiwari", deptHead: "Maintenance", parentDept: "14-Apr-2024", overall: "UnHealthy", allerig: "Insect stings (e.g., bee stings)", chorninc: "Lorem ipsum dolor sit amet c" },
        { deptName: "Lalita Thakur", deptHead: "HSEQ", parentDept: "14-Apr-2024", overall: "Healthy", allerig: "Penicillin", chorninc: "Lorem ipsum dolor sit amet c" },
        { deptName: "Mamta Lodhi", deptHead: "Shalini Jain", parentDept: "14-Apr-2024", overall: "Healthy", allerig: "Sulfa drugs", chorninc: "Lorem ipsum dolor sit amet c" },
        { deptName: "M. S. Subramaniam", deptHead: "Human Resources", parentDept: "14-Apr-2024T", overall: "Healthy", allerig: "Pet dander", chorninc: "Lorem ipsum dolor sit amet c" },
        { deptName: "Amardeep Singh", deptHead: "IT", parentDept: "14-Apr-2024", overall: "Healthy", allerig: "Grass", chorninc: "Lorem ipsum dolor sit amet c" },
        { deptName: "Shalini Jain", deptHead: "IT", parentDept: "14-Apr-2024", overall: "Healthy", allerig: "Cockroach allergens", chorninc: "Lorem ipsum dolor sit amet c" },


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
    // const [SelectedHealthDetails, setSelectedHealthDetails] = useState(null);
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

    const EmpHDetailsPage = () => {
        navigate('/employeehealthdetails')
    }


    const AddEmployeeHealth = () => {
        navigate('/addemployeehealth');
    }
    return (
        <div>
            <div className="EmpOn_main_container">
                <div className="EmpOn_header">
                    <div className="top-bar">
                        <h2>
                            <div className='span'><HiUserPlus /></div>
                            All Employee Health List <p>92 total</p>
                        </h2>
                        <div className="Emp_Head_Right">
                            <div className="addEmp" onClick={AddEmployeeHealth}>
                                <p><span><IoMdAdd /></span>  NewEmployee Health</p>
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
            <div className="EmpOn_Second_Head" id="headlist">
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
                                placeholder='Search employee name, department...'
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
            <div className="allEmployeeList" id='emplhealthlist'>
                {/* <div className="head">
                </div> */}
                <div className="employee-table">

                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
                                <th> <div>Employee Name<span><TiArrowUnsorted /></span></div></th>
                                <th>Department Head</th>
                                <th>Last Health Check Date</th>
                                <th>Overall Health Status</th>
                                <th>Allergies</th>
                                <th>Chronic Conditions</th>

                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.map((emp, index) => (
                                <tr key={index} >
                                    <td><input type="checkbox" checked={emp.isChecked} onChange={() => handleCheckboxChange(indexOfFirstEmployee + index)} /></td>
                                    <td onClick={EmpHDetailsPage}>{emp.deptName}</td>
                                    <td onClick={EmpHDetailsPage}>{emp.deptHead}</td>
                                    <td onClick={EmpHDetailsPage}>{emp.parentDept}</td>
                                    <td onClick={EmpHDetailsPage}>{emp.overall}</td>
                                    <td onClick={EmpHDetailsPage}>{emp.allerig}</td>
                                    <td onClick={EmpHDetailsPage}>{emp.chorninc}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {/* {showPopup && (
                        <div className="popup-overlay">
                            <div className="popup">
                                <div className="popup-header">
                                    <h3>Add New Department</h3>
                                    <button onClick={closePopup}><IoIosCloseCircleOutline /></button>
                                </div>
                                <div className="popup-body">
                                    <form className='upfom'>
                                        <label className='redcolor'>Department Name*</label>
                                        <input type="text" placeholder="Enter Department Name" />
                                        <label className='blackcolor1'>Department Head</label>
                                        <input type="text" placeholder="Enter Department Head" />
                                        <label className='blackcolor2'>Parent Department</label>
                                        <select>
                                            <option value="">Choose or search head</option>
                                            <option value="department1">Department 1</option>
                                            <option value="department2">Department 2</option>
                                        
                                        </select>
                                        <div className='popupbtn'>
                                            <button type="submit">Submit</button>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    )} */}
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

export default EmployeeHealth;