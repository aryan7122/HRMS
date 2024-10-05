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
import { OutsideClick } from '../../components/OutSideClick';
import OutsideClick4 from '../Employee_onboarding/AllEmployeeList/OutSideClick4';
import axios from 'axios';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import './Shift.scss';
import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { TiArrowUnsorted } from "react-icons/ti";
import dayjs from "dayjs";

const Shift = () => {
    const { isOpen: isFilterOpen, ref: filterRef, buttonRef: filterButtonRef, handleToggle: toggleFilter } = OutsideClick();
    const { isOpen: isFilterOpen2, ref: filterRef2, buttonRef: filterButtonRef2, handleToggle: toggleFilter2 } = OutsideClick();
    const { isOpen: isFilterOpen3, ref: filterRef3, buttonRef: filterButtonRef3, handleToggle: toggleFilter3 } = OutsideClick();
    // const [filteredEmployees, setFilteredEmployees] = useState(employees);
    const { isOpen: isFilterOpen4, ref: filterRef4, buttonRef: filterButtonRef4, handleToggle: toggleFilter4 } = OutsideClick4();
    // const { isOpen: isFilterOpen4, ref: filterRef4, buttonRef: filterButtonRef4, handleToggle: toggleFilter4 } = OutsideClick();

    // 
    const [error, setError] = useState(false);

    const [loading, setLoading] = useState(true);
    const [sms, setSms] = useState('')
    const [statusId, setStatusId] = useState('')
    const [statusNew, setStatusNew] = useState('')
    // 
    const [hidImport, setHidImport] = useState(true);
    const [allDel, setAllDel] = useState(false);
    const [toggleLeft, setToggleLeft] = useState(false)
    // 

    const [conformStatus, setConformStatus] = useState(false);
    const [open, setOpen] = useState(false);
    // 
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([
        {
            name: "John Doe",
            isChecked: false,
            department: "Cloud",
            shifts: [
                { date: "10/05/2024", start: "08:00", end: "19:00" },
                { date: "10/02/2024", start: "16:00", end: "00:00" },
                { date: "10/03/2024", start: "00:00", end: "08:00" },
                { date: "10/06/2024", start: "16:00", end: "00:00" },
            ]
        },
        {
            name: 'John Smith',
            isChecked: false,
            department: "Web Development",
            shifts: [
                { date: "10/03/2024", start: "00:00", end: "08:00" },
                { date: "10/05/2024", start: "12:00", end: "20:00" },
                { date: "10/07/2024", start: "09:00", end: "18:00" },
            ]
        },
        {
            name: 'Emily Davis',
            isChecked: false,
            department: "HR",
            shifts: [
                { date: "10/01/2024", start: "09:00", end: "17:00" },
                { date: "10/04/2024", start: "10:00", end: "18:00" },
                { date: "10/08/2024", start: "11:00", end: "19:00" },
            ]
        },
        {
            name: 'Michael Brown',
            isChecked: false,
            department: "App Development",
            shifts: [
                { date: "10/02/2024", start: "14:00", end: "22:00" },
                { date: "10/05/2024", start: "08:00", end: "16:00" },
                { date: "10/07/2024", start: "13:00", end: "21:00" },
            ]
        },
        {
            name: 'Sarah Johnson',
            isChecked: false,
            department: "Cloud",
            shifts: [
                { date: "10/06/2024", start: "08:00", end: "17:00" },
                { date: "10/07/2024", start: "10:00", end: "19:00" },
                { date: "10/09/2024", start: "09:00", end: "18:00" },
            ]
        },
        {
            name: 'David Miller',
            isChecked: false,
            department: "Marketing",
            shifts: [
                { date: "10/03/2024", start: "09:00", end: "17:00" },
                { date: "10/05/2024", start: "10:00", end: "18:00" },
                { date: "10/07/2024", start: "08:00", end: "16:00" },
            ]
        },
        {
            name: 'Anna Taylor',
            isChecked: false,
            department: "Sales",
            shifts: [
                { date: "10/02/2024", start: "12:00", end: "20:00" },
                { date: "10/04/2024", start: "11:00", end: "19:00" },
                { date: "10/06/2024", start: "09:00", end: "17:00" },
            ]
        },
        {
            name: 'James Wilson',
            isChecked: false,
            department: "Finance",
            shifts: [
                { date: "10/01/2024", start: "08:00", end: "16:00" },
                { date: "10/05/2024", start: "10:00", end: "18:00" },
                { date: "10/08/2024", start: "11:00", end: "19:00" },
            ]
        },
        {
            name: 'Maria Garcia',
            isChecked: false,
            department: "Operations",
            shifts: [
                { date: "10/03/2024", start: "07:00", end: "15:00" },
                { date: "10/05/2024", start: "09:00", end: "17:00" },
                { date: "10/09/2024", start: "11:00", end: "19:00" },
            ]
        }
    ]);


    console.log('employees', employees)
    const [filteredEmployees, setFilteredEmployees] = useState(employees);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectAll, setSelectAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isOpen, setIsOpen] = useState(null);
    // 

    // 
    const [selectedFilter, setSelectedFilter] = useState(null);
    // alert(selectedFilter)
    console.log('states', selectedFilter)

    const filter_leftClose = (filterName) => {
        setSelectedFilter(filterName);
        setToggleLeft(false)
        toggleFilter2()
    };
    // console.log(selectedDepartment)

    const handleHidImport = () => {
        setHidImport(!hidImport);
        toggleFilter3()
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


    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const UpdateStatusHndle = (id) => {
        setStatusId(id)
    }


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
        // setSelectedDepartmentId(null)
        // setSelectedDate(null)
        setSelectedFilter(null)
        setEmploymentType(null)
        setSelectedDate(new Date());
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
    const NewJobPage = () => {
        navigate('/add-employee')
    }
    const JobDetailsPage = () => {
        navigate(`/employee-details`)
    }
    const filter_left = () => {
        setToggleLeft(!toggleLeft)
    }
    // const filter_leftClose = () => {
    //     setToggleLeft(false)
    //     toggleFilter2()
    // }
    // console.log('toggleLeft', toggleLeft)
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name); // Set the file name in the state
        }
    };

    // 
    const [employmentType, setEmploymentType] = useState('');
    const [selectedDate, setSelectedDate] = useState(null);


    // Handle change when a radio button is clicked
    const handleEmploymentTypeChange = (event) => {
        setEmploymentType(event.target.value);
        console.log('Selected Employment Type:', event.target.value); // Debugging purpose
        // toggleFilter()
    };

    //   date

    const [startDate, setStartDate] = useState(getStartOfWeek(new Date()));
    // const [isFilterOpen4, setIsFilterOpen4] = useState(false);

    // Helper function to get the start of the selected week
    function getStartOfWeek(date) {
        const day = date.getDay(); // Sunday: 0, Monday: 1, etc.
        const diff = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
        return new Date(date.setDate(diff));
    }



    // Handle date change and set the selected week's start date
    const handleDateChange = (newDate) => {
        const selectedStartDate = getStartOfWeek(new Date(newDate));
        setStartDate(selectedStartDate);
    };

    // Function to get the date for each day of the current week
    const getDatesForWeek = (startDate) => {
        const dates = [];

        // Find the previous Sunday based on the given startDate
        const firstDayOfWeek = new Date(startDate);
        firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay()); // Adjust to previous Sunday

        // Generate 7 dates starting from Sunday
        for (let i = 0; i < 7; i++) {
            const date = new Date(firstDayOfWeek);
            date.setDate(firstDayOfWeek.getDate() + i); // Add days incrementally
            dates.push(date);
        }

        return dates;
    };

    // Get the current week's dates
    const weekDates = getDatesForWeek(startDate);

    const today = new Date().toLocaleDateString();
    console.log('today', today)
    // date
    // Handle shift addition
    // Handle adding shifts
    const handleAddShift = (empIndex, date) => {
        const shiftStart = prompt("Enter shift start time (HH:MM):");
        const shiftEnd = prompt("Enter shift end time (HH:MM):");

        if (shiftStart && shiftEnd) {
            const updatedEmployees = [...employees];
            updatedEmployees[empIndex].shifts.push({ date, start: shiftStart, end: shiftEnd });
            setEmployees(updatedEmployees);
        }
    };
    // Function to get dates for the week in "MM/DD/YYYY" format
    const getFormattedDate = (date) => {
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        return date.toLocaleDateString('en-US', options); // Returns date in MM/DD/YYYY format
    };
    const formatTime = (time) => {
        const [hour, minute] = time.split(':');
        const hour12 = (hour % 12) || 12; // Convert to 12-hour format
        const ampm = hour < 12 ? 'AM' : 'PM'; // Determine AM/PM
        return `${hour12}:${minute} ${ampm}`; // Return formatted time
    };

    console.log('statusNew', statusNew)
    if (error || !employees) {
        // return <div id="notFounPageID"><img src="https://media2.giphy.com/media/C21GGDOpKT6Z4VuXyn/200w.gif" alt="Error loading data" /></div>;
    }

    // 
    return (
        <div id='allEmp'>

            <div className="EmpOn_main_container">
                <div className="EmpOn_header">
                    <div className="top-bar">
                        <h2>
                            <div className='span'><HiUserPlus /></div>
                            All Shifts list <p>11 total</p>
                        </h2>
                        <div className="Emp_Head_Right">
                            <div className="addEmp" onClick={NewJobPage}>
                                <p><span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#ffffff" fill="none">
                                        <path d="M5.18007 15.2964C3.92249 16.0335 0.625213 17.5386 2.63348 19.422C3.6145 20.342 4.7071 21 6.08077 21H13.9192C15.2929 21 16.3855 20.342 17.3665 19.422C19.3748 17.5386 16.0775 16.0335 14.8199 15.2964C11.8709 13.5679 8.12906 13.5679 5.18007 15.2964Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M14 7C14 9.20914 12.2091 11 10 11C7.79086 11 6 9.20914 6 7C6 4.79086 7.79086 3 10 3C12.2091 3 14 4.79086 14 7Z" stroke="currentColor" stroke-width="1.5" />
                                        <path d="M17 5.71429C17 5.71429 18 6.23573 18.5 7C18.5 7 20 4 22 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span> Assign shift</p>
                            </div>

                            <div className="addEmp" onClick={NewJobPage} style={{ marginLeft: '20px' }}>
                                <p><span><IoMdAdd /></span> Add New Shift</p>
                            </div>
                            <div className="menu_head" onClick={handleHidImport} ref={filterButtonRef3}>
                                <div className="div_top"><CiMenuKebab /></div>
                                <div className={`bottom_import ${!isFilterOpen3 ? 'bottom_import_hide' : ''}`} ref={filterRef3}>
                                    {fileName ? '' : <AiOutlineCloudUpload />}
                                    <input type="file" accept="image/*" onChange={handleFileChange} />
                                    {fileName ? fileName : 'Uploaded File'}
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
                <div className={`left ${!isFilterOpen2 ? 'filterLeftOpen' : 'filterLeftClose'}`} ref={filterRef2} >
                    <div>
                        <div
                            className={selectedFilter == null ? 'listActiveStatus' : ''}
                            onClick={() => filter_leftClose(null)}
                        >
                            <span className=''><FaList /></span>All
                        </div>
                    </div>
                    <div
                        onClick={() => filter_leftClose('Active')}
                    >
                        <div className={selectedFilter === 'Active' ? 'listActiveStatus' : ''}
                        >
                            <span><PiCheckSquare /></span>Active
                        </div>
                    </div>
                    <div
                        onClick={() => filter_leftClose('Inactive')}
                    >
                        <div className={selectedFilter === 'Inactive' ? 'listActiveStatus' : ''}
                        >
                            <span><IoIosCloseCircleOutline /></span>Inactive
                        </div>
                    </div>

                </div>
                <div className="right">
                    <div className="toggle_selectIcon divRight" onClick={toggleFilter4} ref={filterButtonRef4}>
                        <div className='div_box'>
                            <span id='toggle_selectIcon'>
                                Select Week {!isFilterOpen4 ? <IoIosArrowDown /> : <IoIosArrowUp />}
                            </span>
                        </div>
                        {isFilterOpen4 &&
                            <div id='DateDropdowns' ref={filterRef4}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateCalendar onChange={(newDate) => handleDateChange(newDate)} />
                                </LocalizationProvider>
                            </div>
                        }
                    </div>
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
                                    <div className="filter-option" >
                                        <p onClick={handleCustomDateClick}>Custom Date {!showCustomDate ? <IoIosArrowDown /> : <IoIosArrowUp />}</p>
                                        {showCustomDate && (
                                            <div className="dropdown-content date-h">
                                                <div><span><MdDateRange /></span>{!selectedDate ? 'Select Custom date' : selectedDate} </div>
                                                {/* <br /> */}
                                                <input type="date" name="date" id="" onChange={handleDateChange} />
                                            </div>
                                        )}
                                    </div>
                                    <div className="filter-option">
                                        <p onClick={handleEmploymentTypeClick}>Employment Type {!showEmploymentType ? <IoIosArrowDown /> : <IoIosArrowUp />}</p>
                                        {showEmploymentType && (
                                            <div className="dropdown-content">
                                                <ul>
                                                    <li>
                                                        <input
                                                            type="radio"
                                                            id="All"
                                                            name="employmentType"
                                                            className="custom-radio"
                                                            value=" "
                                                            onChange={handleEmploymentTypeChange}
                                                        />
                                                        <label htmlFor="All">All</label>
                                                    </li>
                                                    <li>
                                                        <input
                                                            type="radio"
                                                            id="permanent"
                                                            name="employmentType"
                                                            className="custom-radio"
                                                            value="Permanent"
                                                            onChange={handleEmploymentTypeChange}
                                                        />
                                                        <label htmlFor="permanent">Permanent</label>
                                                    </li>
                                                    <li>
                                                        <input
                                                            type="radio"
                                                            id="contract"
                                                            name="employmentType"
                                                            className="custom-radio"
                                                            value="Contract"
                                                            onChange={handleEmploymentTypeChange}
                                                        />
                                                        <label htmlFor="contract">On Contract</label>
                                                    </li>
                                                    <li>
                                                        <input
                                                            type="radio"
                                                            id="intern"
                                                            name="employmentType"
                                                            className="custom-radio"
                                                            value="Intern"
                                                            onChange={handleEmploymentTypeChange}
                                                        />
                                                        <label htmlFor="intern">Intern</label>
                                                    </li>
                                                    <li>
                                                        <input
                                                            type="radio"
                                                            id="trainee"
                                                            name="employmentType"
                                                            className="custom-radio"
                                                            value="Trainee"
                                                            onChange={handleEmploymentTypeChange}
                                                        />
                                                        <label htmlFor="trainee">Trainee</label>
                                                    </li>

                                                </ul>
                                                {/* <p>Selected Employment Type: {employmentType}</p> Displaying selected value */}
                                            </div>



                                        )}
                                    </div>
                                    <div className="filter-option">
                                        <p onClick={handleDepartmentClick}>Department {!showDepartment ? <IoIosArrowDown /> : <IoIosArrowUp />}</p>
                                        {showDepartment && (
                                            <div className="dropdown-content">
                                                <ul>
                                                    <li>
                                                        <input
                                                            type="radio"
                                                            id="all-department"
                                                            name="department"
                                                            value=" " // Value to be stored
                                                            className="custom-radio"
                                                            onChange={handleDepartmentChange}
                                                        />
                                                        <label htmlFor="all-department">All Department</label>
                                                    </li>
                                                    <li>
                                                        <input
                                                            type="radio"
                                                            id="it"
                                                            name="department"
                                                            value="IT" // Value to be stored
                                                            className="custom-radio"
                                                            onChange={handleDepartmentChange}
                                                        />
                                                        <label htmlFor="it">IT</label>
                                                    </li>
                                                    <li>
                                                        <input
                                                            type="radio"
                                                            id="hr"
                                                            name="department"
                                                            value="HR" // Value to be stored
                                                            className="custom-radio"
                                                            onChange={handleDepartmentChange}
                                                        />
                                                        <label htmlFor="hr">HR</label>
                                                    </li>
                                                    <li>
                                                        <input
                                                            type="radio"
                                                            id="sales"
                                                            name="department"
                                                            value="Sales" // Value to be stored
                                                            className="custom-radio"
                                                            onChange={handleDepartmentChange}
                                                        />
                                                        <label htmlFor="sales">Sales</label>
                                                    </li>
                                                    <li>
                                                        <input
                                                            type="radio"
                                                            id="management"
                                                            name="department"
                                                            value="Management" // Value to be stored
                                                            className="custom-radio"
                                                            onChange={handleDepartmentChange}
                                                        />
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
                {/* <div className="employee-table">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                </th>
                                <th> <div>Scheduled Shift<span><TiArrowUnsorted /></span></div></th>
                                <th> Mon 6</th>
                                <th>Tue 7</th>
                                <th>wed 8</th>
                                <th>Thu 9</th>
                                <th>fri 10</th>
                                <th>sat 11</th>
                                <th>sun 12</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.map((emp, index) => (
                                <tr key={index}>
                                    <td>
                                        <input type="checkbox" checked={emp.isChecked} onChange={() => handleCheckboxChange(indexOfFirstEmployee + index)} />
                                    </td>
                                    <td></td>
                                    ...
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div> */}
                <div className="employee-table">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                </th>
                                <th>
                                    <div>
                                        Scheduled Shift<span><TiArrowUnsorted /></span>
                                    </div>
                                </th>
                                {weekDates.map((date, index) => (
                                    <th key={index} style={{
                                        backgroundColor: today === date.toLocaleDateString() ? '#730fad57' : '#946fb618',
                                        color: 'black'
                                    }}>

                                        {`${date.toLocaleDateString('en-US', { weekday: 'short' })} ${date.getDate()} ${today === date.toLocaleDateString() ? '(Today)' : ''}`}

                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.map((emp, empIndex) => (
                                <tr key={empIndex}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={emp.isChecked}
                                            onChange={() => handleCheckboxChange(empIndex)}
                                        />
                                    </td>
                                    <td className='td'>
                                        {emp.name} <br />
                                        {emp.department}

                                    </td>
                                    {weekDates.map((date, dateIndex) => {
                                        const dateStr = getFormattedDate(date);
                                        const shiftsForDate = emp.shifts.filter(shift => shift.date === dateStr);

                                        // Function to calculate total working hours
                                        const calculateTotalHours = (shifts) => {
                                            return shifts.reduce((total, shift) => {
                                                const startTime = new Date(`1970-01-01T${shift.start}:00`);
                                                const endTime = new Date(`1970-01-01T${shift.end}:00`);

                                                if (endTime < startTime) {
                                                    endTime.setDate(endTime.getDate() + 1);  // Handle overnight shifts
                                                }

                                                const hours = (endTime - startTime) / 3600000;  // Convert ms to hours
                                                return total + hours;
                                            }, 0);
                                        };

                                        const totalHours = calculateTotalHours(shiftsForDate);

                                        // Correct Date comparison logic
                                        const todayDate = new Date(); // Today's date
                                        todayDate.setHours(0, 0, 0, 0); // Set time to midnight to ignore time part
                                        const compareDate = new Date(date); // Date to compare
                                        compareDate.setHours(0, 0, 0, 0); // Set time to midnight to ignore time part

                                        let cellColor = 'black'; // Default future date color (black)
                                        if (compareDate.getTime() < todayDate.getTime()) {
                                            cellColor = 'grey'; // Past date color (grey)
                                        } else if (compareDate.getTime() === todayDate.getTime()) {
                                            cellColor = 'green'; // Current date color (green)
                                        }

                                        return (
                                            <td className='sift_td' key={dateIndex} style={{
                                                backgroundColor: today === dateStr ? '#730fad57' : 'transparent',
                                                color: cellColor, // Setting text color based on date comparison
                                            }}>
                                                {shiftsForDate.length > 0 ? (
                                                    <div className='sift_hours_td' style={{
                                                        border: `1px dashed ${cellColor}`
                                                    }}>
                                                        {shiftsForDate.map((shift, index) => (
                                                            <div key={index}>{`${formatTime(shift.start)} - ${formatTime(shift.end)}`}</div>
                                                        ))}
                                                        <div>Total Hours: {totalHours.toFixed(2)}</div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {compareDate.getTime() < todayDate.getTime() ?
                                                            <span
                                                            >
                                                                <svg
                                                                    style={{
                                                                        color: `${cellColor}`,
                                                                    }}
                                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                                                    <path d="M12 8V16M16 12L8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
                                                                </svg>
                                                            </span>
                                                            :
                                                            <span onClick={() => handleAddShift(empIndex, dateStr)}
                                                            >
                                                                <svg
                                                                    style={{
                                                                        color: `${cellColor}`
                                                                    }}
                                                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                                                    <path d="M12 8V16M16 12L8 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                    <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
                                                                </svg>
                                                            </span>
                                                        }
                                                    </>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
                {/* {loading ? (
                    <div id='Loading'>
                        <img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="" />
                    </div> // Show loading text or spinner when data is being fetched
                ) : ('')} */}
                {loading ? '' : employees == '' ? (
                    <div className="not-found-container">
                        <img src="https://cdn.dribbble.com/userupload/11708150/file/original-825be68b3517931ad747e0180a4116d3.png?resize=1200x900" alt="" />
                        <h1 className="grey-text">No matching records found</h1>
                        <p className="grey-text">Sorry, we couldn't find the data you're looking for.</p>
                    </div>
                ) : ('')}
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
                                    className={currentPage === pageIndex + 1 ? 'activePageIndex' : ''}
                                    onClick={() => handlePageChange(pageIndex + 1)}
                                >
                                    {pageIndex + 1}
                                    {/* {console.log('currentPage', pageIndex + 1)} */}
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

export default Shift;
// 