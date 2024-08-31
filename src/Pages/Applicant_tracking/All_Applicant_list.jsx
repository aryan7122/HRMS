import { useState, } from 'react';
import { HiUserPlus } from "react-icons/hi2";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { PiCheckSquare } from "react-icons/pi";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
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
import './All_Applicant_list.scss';
// 
import {  IoIosCloseCircleOutline } from "react-icons/io";
import { GiBackstab, GiNotebook } from "react-icons/gi";
import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import { OutsideClick } from '../../components/OutSideClick';

const All_Applicant_list = () => {
    const { isOpen: isFilterOpen, ref: filterRef, buttonRef: filterButtonRef, handleToggle: toggleFilter } = OutsideClick();
    const { isOpen: isFilterOpen2, ref: filterRef2, buttonRef: filterButtonRef2, handleToggle: toggleFilter2 } = OutsideClick();

    const [allDel, setAllDel] = useState(true);
    const [thisDel, setThisDel] = useState(false)
    const [toggleLeft, setToggleLeft] = useState(false)

    const DelThis = () => {
        setThisDel(!thisDel);

    }

    const [hidImport, setHidImport] = useState(true);
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([
        { ApplicantName: "Ramesh Gupta", Email: "kavita.agarwal@example.com", MobileNumber: "9876543201", JobOpening: "IT coordinator", Source: "Website", SourceName: "-", status: "New", isChecked: false },
        { ApplicantName: "M. S. Subramaniam", Email: "rahul.mishra@example.com", MobileNumber: "9876543201", JobOpening: "Data quality manager", Source: "Walk in", SourceName: "-", status: "New", isChecked: false },
        { ApplicantName: "Vishwas Patel", Email: "priya.sharma@example.com", MobileNumber: "9876543206", JobOpening: "Help desk technician", Source: "Campaign", SourceName: "-", status: "New", isChecked: false },
        { ApplicantName: "Sunil Bhadouriya", Email: "rahul.gupta@example.com", MobileNumber: "9876543210", JobOpening: "Support specialist", Source: "Employ Referral", SourceName: "HR-EMP-001", status: "New", isChecked: false },
        { ApplicantName: "Vikas Tiwari", Email: "raj.malhotra@example.com", MobileNumber: "9876543208", JobOpening: "Database administrator", Source: "Website", SourceName: "-", status: "Rejected", isChecked: false },
        { ApplicantName: "Paartho Ghosh", Email: "amit.kumar@example.com", MobileNumber: "9876543205", JobOpening: "IT technician", Source: "Website", SourceName: "-", status: "New", isChecked: false },
        { ApplicantName: "Bhavna Goyal", Email: "aarti.pandey@example.com", MobileNumber: "9876543202", JobOpening: "Web developer", Source: "Website", SourceName: "-", status: "New", isChecked: false },
        { ApplicantName: "Navjot Kaur", Email: "anjali.rao@example.com", MobileNumber: "9876543209", JobOpening: "Cloud system engineer", Source: "Website", SourceName: "-", status: "On Hold", isChecked: false },
        { ApplicantName: "Hillery Moses", Email: "manish.jain@example.com", MobileNumber: "9876543203", JobOpening: "Web administrator", Source: "Website", SourceName: "-", status: "Rejected", isChecked: false },
        { ApplicantName: "Jayshri Tiwari", Email: "amar.singh@example.com", MobileNumber: "9876543207", JobOpening: "Applications engineer", Source: "Website", SourceName: "-", status: "Rejected", isChecked: false },
        { ApplicantName: "Shalini Jain", Email: "meera.verma@example.com", MobileNumber: "9876543204", JobOpening: "Network engineer", Source: "Website", SourceName: "-", status: "Hired", isChecked: false },
        { ApplicantName: "Bhavna Goyal", Email: "aarti.pandey@example.com", MobileNumber: "9876543202", JobOpening: "Web developer", Source: "Website", SourceName: "-", status: "New", isChecked: false },
        { ApplicantName: "Navjot Kaur", Email: "anjali.rao@example.com", MobileNumber: "9876543209", JobOpening: "Cloud system engineer", Source: "Website", SourceName: "-", status: "On Hold", isChecked: false },
        { ApplicantName: "Hillery Moses", Email: "manish.jain@example.com", MobileNumber: "9876543203", JobOpening: "Web administrator", Source: "Website", SourceName: "-", status: "Rejected", isChecked: false },
        { ApplicantName: "Jayshri Tiwari", Email: "amar.singh@example.com", MobileNumber: "9876543207", JobOpening: "Applications engineer", Source: "Website", SourceName: "-", status: "Rejected", isChecked: false },
        { ApplicantName: "Shalini Jain", Email: "meera.verma@example.com", MobileNumber: "9876543204", JobOpening: "Network engineer", Source: "Website", SourceName: "-", status: "Hired", isChecked: false },
        { ApplicantName: "Bhavna Goyal", Email: "aarti.pandey@example.com", MobileNumber: "9876543202", JobOpening: "Web developer", Source: "Website", SourceName: "-", status: "New", isChecked: false },
        { ApplicantName: "Navjot Kaur", Email: "anjali.rao@example.com", MobileNumber: "9876543209", JobOpening: "Cloud system engineer", Source: "Website", SourceName: "-", status: "On Hold", isChecked: false },
        { ApplicantName: "Hillery Moses", Email: "manish.jain@example.com", MobileNumber: "9876543203", JobOpening: "Web administrator", Source: "Website", SourceName: "-", status: "Rejected", isChecked: false },
        { ApplicantName: "Jayshri Tiwari", Email: "amar.singh@example.com", MobileNumber: "9876543207", JobOpening: "Applications engineer", Source: "Website", SourceName: "-", status: "Rejected", isChecked: false },
        { ApplicantName: "Shalini Jain", Email: "meera.verma@example.com", MobileNumber: "9876543204", JobOpening: "Network engineer", Source: "Website", SourceName: "-", status: "Hired", isChecked: false },
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
        setAllDel(!allDel)
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

    const statuses = ['New', 'Schedule', 'Interviewed', 'Hired', 'On Hold', 'Rejected'];
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

    const JobDetailsPage = () => {
        navigate('/applicant-details')
    }
    const NewJobPage = () => {
        navigate('/add-applicant')
    }
    const filter_left = () => {
        setToggleLeft(!toggleLeft)
    }
    const filter_leftClose = () => {
        setToggleLeft(false)
        toggleFilter2()
    }

    return (
        <div id='allEmp'>
            <div className="EmpOn_main_container">
                <div className="EmpOn_header">
                    <div className="top-bar">
                        <h2>
                            <div className='span'><HiUserPlus /></div>
                            All Applicant’s list <p>102 total</p>
                        </h2>
                        <div className="Emp_Head_Right">
                            <div className="addEmp" onClick={NewJobPage}>
                                <p><span><IoMdAdd /></span> Add New Applicant</p>
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
                <div id='filter_left' onClick={toggleFilter2} ref={filterButtonRef2}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#7f7f7f" fill="none">
                        <path d="M7 21H16.9999C19.3569 21 20.5354 21 21.2677 20.2678C21.9999 19.5355 21.9999 18.357 21.9999 16C21.9999 13.643 21.9999 12.4645 21.2677 11.7322C20.5354 11 19.3569 11 16.9999 11H7C4.64302 11 3.46453 11 2.7323 11.7322C2.00007 12.4644 2.00005 13.6429 2 15.9999C1.99995 18.357 1.99993 19.5355 2.73217 20.2677C3.4644 21 4.64294 21 7 21Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M4 11C4.00005 9.59977 4.00008 8.89966 4.27263 8.36485C4.5123 7.89455 4.89469 7.51218 5.365 7.27253C5.89981 7 6.59993 7 8.00015 7H16C17.4001 7 18.1002 7 18.635 7.27248C19.1054 7.51217 19.4878 7.89462 19.7275 8.36502C20 8.8998 20 9.59987 20 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M6 7C6.00004 5.5998 6.00006 4.89969 6.27259 4.3649C6.51227 3.89457 6.89467 3.51218 7.36501 3.27252C7.89981 3 8.59991 3 10.0001 3H14C15.4001 3 16.1002 3 16.635 3.27248C17.1054 3.51217 17.4878 3.89462 17.7275 4.36502C18 4.8998 18 5.59987 18 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        <path d="M16 15L15.7 15.4C15.1111 16.1851 14.8167 16.5777 14.3944 16.7889C13.9721 17 13.4814 17 12.5 17H11.5C10.5186 17 10.0279 17 9.60557 16.7889C9.18328 16.5777 8.88885 16.1851 8.3 15.4L8 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
                <div className={`left ${!isFilterOpen2 ? 'filterLeftOpen' : 'filterLeftClose filterLeftCloseJOB'}`} ref={filterRef2}>
                    <div className="all">
                        <div className='listActive' onClick={filter_leftClose}>
                            <span> <FaList /></span>All
                        </div>
                    </div>
                    <div className="active" onClick={filter_leftClose}>
                        <div>
                            <span><PiCheckSquare /></span>New
                        </div>
                    </div>
                    <div className="inactive" onClick={filter_leftClose}>
                        <div>
                            <span> <MdDateRange /> </span>Schedule
                        </div>
                    </div>
                    <div className="resigned" onClick={filter_leftClose}>
                        <div>
                            <span> <MdWork /> </span>Interviewed
                        </div>
                    </div>
                    <div className="terminated" onClick={filter_leftClose}>
                        <div>
                            <span><FaRegClock /></span>On hold
                        </div>
                    </div>
                    <div className="notice_period" onClick={filter_leftClose}>
                        <div>
                            <span><GiNotebook /></span>Hired
                        </div>
                    </div>
                    <div className="notice_period" onClick={filter_leftClose}>
                        <div>
                            <span><IoMdCloseCircleOutline /></span>Rejected
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
                        <div className='div_box' onClick={toggleFilter} ref={filterButtonRef}>
                            <span><IoFilterSharp /></span>
                        </div>

                        {isFilterOpen && (
                            <div className="filter-container" ref={filterRef}>
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
                                <th>
                                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                    {/* {!allDel &&
                                        <span id='deleteAll'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ff0000" fill="none">
                                                <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                <path d="M9 11.7349H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                <path d="M10.5 15.6543H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                <path d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            </svg>
                                        </span>
                                    } */}
                                </th>
                                <th> <div>Applicant Name<span><TiArrowUnsorted /></span></div></th>
                                <th>Email</th>
                                <th>Mobile Number</th>
                                <th>Job Opening</th>
                                <th>Source</th>
                                <th>Source Name</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.map((emp, index) => (
                                <tr key={index}  >
                                    <td>
                                        <input type="checkbox" checked={emp.isChecked} onChange={() => handleCheckboxChange(indexOfFirstEmployee + index)} onClick={DelThis} />
                                        {/* {emp.isChecked &&
                                            <span id='deleteThis'>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ff0000" fill="none">
                                                    <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                    <path d="M9 11.7349H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                    <path d="M10.5 15.6543H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                    <path d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                </svg>
                                            </span>
                                        } */}
                                    </td>
                                    <td onClick={JobDetailsPage}>{emp.ApplicantName}</td>
                                    <td onClick={JobDetailsPage}>{emp.Email}</td>
                                    <td onClick={JobDetailsPage}>{emp.MobileNumber}</td>
                                    <td onClick={JobDetailsPage}>{emp.JobOpening}</td>
                                    <td onClick={JobDetailsPage}>{emp.Source}</td>
                                    <td onClick={JobDetailsPage}>{emp.SourceName}</td>
                                    <td>
                                        <div className="status-dropdown">
                                            <div key={index} className="status-container">
                                                <div
                                                    className={`status-display ${emp.status ? emp.status.toLowerCase().replace(' ', '-') : ''}`}
                                                    onClick={() => setIsOpen(isOpen === index ? null : index)}
                                                >
                                                    <span className={`left_dot ${emp.status ? emp.status.toLowerCase().replace(' ', '-') : ''}`}></span>
                                                    <div>
                                                        <div className="">
                                                            {emp.status || 'Unknown Status'} {/* Optional: Fallback text */}
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
                </div>
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
    );
};

export default All_Applicant_list;
// 