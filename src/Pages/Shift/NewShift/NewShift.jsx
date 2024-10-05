import { useState, useEffect } from 'react';
import { HiUserPlus } from "react-icons/hi2";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { IoMdAdd, IoIosCloseCircleOutline } from "react-icons/io";
import { FaList } from "react-icons/fa6";
import { PiCheckSquare } from "react-icons/pi";
import { GiBackstab, GiNotebook } from "react-icons/gi";
import { MdWork } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";

import { FaPersonWalkingArrowLoopLeft, FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { BiRevision } from "react-icons/bi";
import { IoFilterSharp, IoSearchSharp } from "react-icons/io5";
import { TiArrowUnsorted } from "react-icons/ti";
import { MdDateRange } from "react-icons/md";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { OutsideClick } from '../../../components/OutSideClick';
import OutsideClick4 from '../../Employee_onboarding/AllEmployeeList/OutSideClick4';
import axios from 'axios';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import './NewShift.scss';
import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewAssignShift from './newAssignShift/AddShift';

// import { TiArrowUnsorted } from "react-icons/ti";
import dayjs from "dayjs";

const NewShift = () => {
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
    const [togglNewAdd, setTogglNewAdd] = useState(false)

    const [conformStatus, setConformStatus] = useState(false);
    const [open, setOpen] = useState(false);
    // 
    const navigate = useNavigate()
    const NewAttendanceClick = () => {
        setTogglNewAdd(true)
    }
    const NewAttendanceClosePop = () => {
        setTogglNewAdd(false);
    };
   const [employees, setEmployees] = useState([
    {
        sift_name: "Morning Shift",
        start_time: "08:00", // 24-hour format
        end_time: "16:00",   // 24-hour format
        extra_hours: "60",
        break_time: "45",
        status: "Active"
    },
    {
        sift_name: "Evening Shift",
        start_time: "16:00", // 24-hour format
        end_time: "00:00",   // 24-hour format
        extra_hours: "30",
        break_time: "45",
        status: "Inactive"
    },
    {
        sift_name: "Night Shift",
        start_time: "00:00", // 24-hour format
        end_time: "08:00",   // 24-hour format
        extra_hours: "0",
        break_time: "45",
        status: "Active"
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
    const handleStatusChange = (index, newStatus) => {
        console.log('|||||', newStatus)
        if (newStatus == 'Inactive') {
            setStatusNew(0)
        } else {
            setStatusNew(1)
        }
        const updatedEmployees = [...filteredEmployees];
        updatedEmployees[index].status = newStatus;
        setFilteredEmployees(updatedEmployees);
        setIsOpen(null);
        setOpen(true)

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
    const token = localStorage.getItem('access_token');
    const statuses = ['Active', 'Inactive'];

    // 

    const [showDateRange, setShowDateRange] = useState(false)
    const handleDateRangeClick = () => {
        setShowDateRange(!showDateRange)
        setShowCustomDate(false);
    }

    const [selectedDate, setSelectedDate] = useState(null);
    console.log('selectedDate', selectedDate)
    const handleDateChange = (event) => {
        const date = new Date(event.target.value);
        // Format the date as yyyy/MM/dd
        const formattedDate = date.toLocaleDateString('en-CA'); // yyyy-mm-dd format
        setSelectedDate(formattedDate);
    }; //
    // 
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    // Function to handle the date change and format it to yyyy/mm/dd
    const handleFromDateChange = (event) => {

        const date = new Date(event.target.value);
        // Format the date as yyyy/MM/dd
        const formattedDate = date.toLocaleDateString('en-CA'); // yyyy-mm-dd format
        setFromDate(formattedDate);
    };
    const handleToDateChange = (event) => {
        const date = new Date(event.target.value);
        // Format the date as yyyy/MM/dd
        const formattedDate = date.toLocaleDateString('en-CA'); // yyyy-mm-dd format
        setToDate(formattedDate);
    };
    // 


    // Toggle the status (real-time)
    const ConformOk = () => {
        setTimeout(() => {
            setOpen(false)
        }, 400);
        // if (statusId && statusNew) {

        axios.post('https://devstronauts.com/public/api/leave/master/status/update', {
            id: statusId,
            status: statusNew
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // setUpdatingEmpId(statusId);
                // setSms(`Status update successfully`)
                toast.success(response.data.message || 'Status update successfully.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.log('👉✅❤️👋', response)
                if (response.data.success === true) {
                    // setShowAlert(true)
                    // setTimeout(() => {
                    //     setShowAlert(false)
                    // }, 4000);
                }
            })
            .catch(error => {
                // setSms('Status update Failed')
                // alert(error)
                toast.error(error.message || 'Status update Failed.', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                // setShowAlertError(true)
                // setTimeout(() => {
                //     setShowAlertError(false)
                // }, 4000);

                console.error("Error fetching data: ", error);
            });
        // }
    }



    console.log('statusNew', statusNew)
    if (error || !employees) {
        // return <div id="notFounPageID"><img src="https://media2.giphy.com/media/C21GGDOpKT6Z4VuXyn/200w.gif" alt="Error loading data" /></div>;
    }

    const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(":");
        const period = +hours >= 12 ? 'PM' : 'AM';
        let newHours = +hours % 12 || 12; // Convert 0 to 12 for midnight
        return `${newHours}:${minutes} ${period}`;
    };

    const calculateTotalHours = (start, end, extra) => {
        const startTime = new Date(`1970-01-01T${start}:00`);
        const endTime = new Date(`1970-01-01T${end}:00`);

        // Adjust for cases where end time is on the next day (e.g., 12 AM to 8 AM)
        if (endTime < startTime) {
            endTime.setDate(endTime.getDate() + 1);
        }

        const totalHours = (endTime - startTime) / (1000 * 60 * 60) + parseInt(extra) / 60; // Convert extra hours to hours
        return totalHours.toFixed(2); // Return total hours as a string with 2 decimal places
    };

    // 
    return (
        <div id='allEmp'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="error"
            />
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                getPersistentElements={() => document.querySelectorAll(".Toastify")}
                backdrop={<div className="backdrop" />}
                className="dialog"
            >
                <DialogHeading className="heading">Are you sure?</DialogHeading>
                <p className="description">
                    You want to Update this Status
                </p>
                <div className="buttons">
                    <div onClick={ConformOk}>
                        <Button className="button">
                            Update
                        </Button>
                    </div>
                    <DialogDismiss className="button secondary">Cancel</DialogDismiss>
                </div>
            </Dialog>

            {togglNewAdd && <NewAssignShift ClosePop={NewAttendanceClosePop} />}

            <div className="EmpOn_main_container">
                <div className="EmpOn_header">
                    <div className="top-bar">
                        <h2>
                            <div className='span'><HiUserPlus /></div>
                            All Shifts list <p>{employees.length} total</p>
                        </h2>
                        <div className="Emp_Head_Right">
                            <div className="addEmp" onClick={() => navigate('/shift')}>
                                <p><span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#ffffff" fill="none">
                                        <path d="M5.18007 15.2964C3.92249 16.0335 0.625213 17.5386 2.63348 19.422C3.6145 20.342 4.7071 21 6.08077 21H13.9192C15.2929 21 16.3855 20.342 17.3665 19.422C19.3748 17.5386 16.0775 16.0335 14.8199 15.2964C11.8709 13.5679 8.12906 13.5679 5.18007 15.2964Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M14 7C14 9.20914 12.2091 11 10 11C7.79086 11 6 9.20914 6 7C6 4.79086 7.79086 3 10 3C12.2091 3 14 4.79086 14 7Z" stroke="currentColor" stroke-width="1.5" />
                                        <path d="M17 5.71429C17 5.71429 18 6.23573 18.5 7C18.5 7 20 4 22 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span> Assign shift</p>
                            </div>

                            <div className="addEmp" style={{ marginLeft: '20px' }} onClick={NewAttendanceClick}>
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
                <div className={`left ${!isFilterOpen2 ? 'filterLeftOpen' : 'filterLeftClose'}`} ref={filterRef2}>
                    <div className="all">
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
                        <div
                            className={`active ${selectedFilter === 'Active' ? 'listActiveStatus' : ''}`}
                        >
                            <span><PiCheckSquare /></span>Active
                        </div>
                    </div>

                    <div
                        onClick={() => filter_leftClose('Inactive')}
                    >
                        <div className={`resigned ${selectedFilter === 'Inactive' ? 'listActive' : ''}`}
                        >
                            <span><FaRegClock /></span>Inactive
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
                            <span>
                                {!isFilterOpen ?
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                        <path d="M3 7H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M3 17H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M18 17L21 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M15 7L21 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z" stroke="currentColor" stroke-width="1.5" />
                                        <path d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z" stroke="currentColor" stroke-width="1.5" />
                                    </svg>
                                    :
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                        <path d="M7 21L7 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M17 21L17 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M17 6L17 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7 9L7 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M7 18C6.06812 18 5.60218 18 5.23463 17.8478C4.74458 17.6448 4.35523 17.2554 4.15224 16.7654C4 16.3978 4 15.9319 4 15C4 14.0681 4 13.6022 4.15224 13.2346C4.35523 12.7446 4.74458 12.3552 5.23463 12.1522C5.60218 12 6.06812 12 7 12C7.93188 12 8.39782 12 8.76537 12.1522C9.25542 12.3552 9.64477 12.7446 9.84776 13.2346C10 13.6022 10 14.0681 10 15C10 15.9319 10 16.3978 9.84776 16.7654C9.64477 17.2554 9.25542 17.6448 8.76537 17.8478C8.39782 18 7.93188 18 7 18Z" stroke="currentColor" stroke-width="1.5" />
                                        <path d="M17 12C16.0681 12 15.6022 12 15.2346 11.8478C14.7446 11.6448 14.3552 11.2554 14.1522 10.7654C14 10.3978 14 9.93188 14 9C14 8.06812 14 7.60218 14.1522 7.23463C14.3552 6.74458 14.7446 6.35523 15.2346 6.15224C15.6022 6 16.0681 6 17 6C17.9319 6 18.3978 6 18.7654 6.15224C19.2554 6.35523 19.6448 6.74458 19.8478 7.23463C20 7.60218 20 8.06812 20 9C20 9.93188 20 10.3978 19.8478 10.7654C19.6448 11.2554 19.2554 11.6448 18.7654 11.8478C18.3978 12 17.9319 12 17 12Z" stroke="currentColor" stroke-width="1.5" />
                                    </svg>
                                }

                            </span>
                        </div>
                        {isFilterOpen && (

                            <div className="filter-container" ref={filterRef}>
                                <div className="filter-options">

                                    <div className="filter-option" >
                                        <p onClick={handleCustomDateClick}>Custom Date {!showCustomDate ? <IoIosArrowDown /> : <IoIosArrowUp />}</p>
                                        {showCustomDate && (
                                            <div className="dropdown-content date-h">
                                                <div><span><MdDateRange /></span>{!selectedDate ? 'Select Custom date' : selectedDate} </div>
                                                <input type="date" name="date" id="" onChange={handleDateChange} />
                                            </div>
                                        )}
                                    </div>

                                    <div className="filter-option">
                                        <p onClick={handleDateRangeClick}>Date Range  {!showDateRange ? <IoIosArrowDown /> : <IoIosArrowUp />}</p>
                                        {showDateRange && (
                                            <div >
                                                <label id='daterange-contener'>From</label>
                                                <div className="dropdown-content date-h">
                                                    <div><span><MdDateRange /></span>{!fromDate ? 'Select Custom date' : fromDate} </div>
                                                    <input type="date" name="date" id="" onChange={handleFromDateChange} />
                                                </div>
                                                <label id='daterange-contener'>To</label>
                                                <div className="dropdown-content date-h">
                                                    <div><span><MdDateRange /></span>{!toDate ? 'Select Custom date' : toDate} </div>
                                                    <input type="date" name="date" id="" onChange={handleToDateChange} />
                                                </div>
                                            </div>
                                        )}

                                    </div>




                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* All   List*/}

            <div className="allEmployeeList">
                <div className="employee-table">


                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                                </th>
                                <th><div>Sift Name<span><TiArrowUnsorted /></span></div></th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Extra Minutes</th>
                                <th>Total Hours</th>
                                <th>Break Time</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((emp, index) => (
                                <tr key={index}>
                                    <td>
                                        <input type="checkbox" checked={emp.isChecked} onChange={() => handleCheckboxChange(index)} />
                                    </td>
                                    <td>{emp.sift_name}</td>
                                    <td>{convertTo12HourFormat(emp.start_time)}</td>
                                    <td>{convertTo12HourFormat(emp.end_time)}</td>
                                    <td>{emp.extra_hours} mins</td>
                                    <td>{calculateTotalHours(emp.start_time, emp.end_time, emp.extra_hours)} hours</td>
                                    <td>{emp.break_time} Minutes</td>
                                    <td>
                                        <div className="status-dropdown">
                                            <div key={index} className="status-container">
                                                <div onClick={toggleFilter4} ref={filterButtonRef4}>
                                                    <div
                                                        className={`status-display ${emp.status === "Active" ? 'active' : 'inactive'}`}
                                                        onClick={() => setIsOpen(isOpen === index ? null : index)}
                                                    >
                                                        <span className={`left_dot ${emp.status === "Active" ? 'active' : 'inactive'}`}></span>
                                                        <div onClick={() => UpdateStatusHndle(emp.id)}>
                                                            <div className="EmpS">
                                                                {emp.status}
                                                            </div>
                                                            <div className="^wdown">
                                                                <MdOutlineKeyboardArrowDown />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {isOpen === index && (
                                                    <div className="status-options" ref={filterRef4}>
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
        </div>
    );
};

export default NewShift;
// 