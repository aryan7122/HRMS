import { useState, useEffect } from 'react';
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
import './Ticket.scss';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import axios from 'axios';

import { IoIosCloseCircleOutline } from "react-icons/io";
// import { GiBackstab, GiNotebook } from "react-icons/gi";
// import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

// import NewAttendance from './addNewAttendance/NewAttendance.jsx';
// import { OutsideClick } from '../../../components/OutSideClick.jsx';
import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { OutsideClick } from '../../Employee_onboarding/AddEmployee/OutsideClick'

const Ticket = (ClosePop) => {
    const { isOpen: isFilterOpen, ref: filterRef, buttonRef: filterButtonRef, handleToggle: toggleFilter } = OutsideClick();
    const { isOpen: isFilterOpen2, ref: filterRef2, buttonRef: filterButtonRef2, handleToggle: toggleFilter2 } = OutsideClick();
    const { isOpen: isFilterOpen3, ref: filterRef3, buttonRef: filterButtonRef3, handleToggle: toggleFilter3 } = OutsideClick();
    const { isOpen: isFilterOpen4, ref: filterRef4, buttonRef: filterButtonRef4, handleToggle: toggleFilter4 } = OutsideClick();
    const { isOpen: isStatusOpen, ref: statusRef, buttonRef: statusButtonRef, handleToggle: toggleStatus, setIsOpen: setStatusOpen } = OutsideClick();

    const [allDel, setAllDel] = useState(true);
    const [thisDel, setThisDel] = useState(false)
    const [toggleLeft, setToggleLeft] = useState(false)
    const [togglNewAdd, setTogglNewAdd] = useState(false)
    const aa = '0'
    const DelThis = () => {
        setThisDel(!thisDel);

    }
    const [dropdowns, setDropdowns] = useState(false)
    const [hidImport, setHidImport] = useState(true);
    const navigate = useNavigate()
    const [overview, setOverview] = useState([])
    const [employees, setEmployees] = useState([
        { EmployeeName: "Hillery Moses", Date: aa, Shift: "General", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "-", status: "0", isChecked: false },
        // { EmployeeName: "Nandan Raikwar", Date: "17-Apr-2024", Shift: "Second", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "-", status: "Absent", isChecked: false },
        // { EmployeeName: "Vishwas Patel", Date: "17-Apr-2024", Shift: "Night", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "-", status: "Absent", isChecked: false },
        // { EmployeeName: "Paartho Ghosh", Date: "17-Apr-2024", Shift: "Second", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "-", status: "Half day", isChecked: false },
        // { EmployeeName: "Bhavna Goyal", Date: "17-Apr-2024", Shift: "Night", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "-", status: "Present", isChecked: false },
        // { EmployeeName: "Jayshri Tiwari", Date: "17-Apr-2024", Shift: "Night", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "-", status: "Present", isChecked: false },
        // { EmployeeName: "Amardeep Singh", Date: "17-Apr-2024", Shift: "Second", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "-", status: "Present", isChecked: false },
        // { EmployeeName: "Ramesh Gupta", Date: "17-Apr-2024", Shift: "Second", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "06.00 PM", status: "Present", isChecked: false },
        // { EmployeeName: "Rahul Choudhary", Date: "17-Apr-2024", Shift: "Night", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "06.00 PM", status: "Present", isChecked: false },
    ]);
    const [statusNew, setStatusNew] = useState('')
    console.log('statusNewstatusNew', statusNew)
    const [filteredEmployees, setFilteredEmployees] = useState(employees);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectAll, setSelectAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isOpen, setIsOpen] = useState(null);

    // filter api
    const [statusId, setStatusId] = useState('')
    const UpdateStatusHndle = (id) => {
        setStatusId(id)
        setStatusOpen(false)

    }
    const [selectedFilter, setSelectedFilter] = useState(null);

    const filter_leftClose = (filterName) => {
        // setSelectedFilter(filterName);
        if (filterName == 'Resolved') {
            setSelectedFilter(0)
        }
        if (filterName == 'Pending') {
            setSelectedFilter(1)
        }
        if (filterName == 'Rejected') {
            setSelectedFilter(2)
        }
        if (filterName == 'all') {
            setSelectedFilter(null)
        }
        setToggleLeft(false)
        toggleFilter2()
    };

    // const [showCustomDate, setShowCustomDate] = useState(false);
    const [showDateRange, setShowDateRange] = useState(false)

    const handleDateRangeClick = () => {
        setShowDateRange(!showDateRange)
        setShowCustomDate(false);
    }
    // const handleCustomDateClick = () => {
    //     setShowCustomDate(!showCustomDate);

    //     setShowDateRange(false)
    // };


    const [selectedDate, setSelectedDate] = useState(null);
    console.log('selectedFilter', selectedFilter)
    const handleDateChange = (event) => {
        const date = new Date(event.target.value);
        // Format the date as yyyy/MM/dd
        const formattedDate = date.toLocaleDateString('en-CA'); // yyyy-mm-dd format
        setSelectedDate(formattedDate);
    };


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

    // filer api
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
    const [open, setOpen] = useState(false);

    const statuses = ['Resolved', 'Pending', 'Rejected'];
    // const departments = ['All', 'Human Resources', 'Maintenance', 'Manning', 'Operations', 'Engineering', 'IT', 'HSEQ'];
    // const employeeType = ['All', 'Permanent', 'On Contract', 'Intern', 'Trainee'];
    const handleStatusChange = (index, newStatus) => {
        // const updatedEmployees = [...filteredEmployees];
        // updatedEmployees[index].status = newStatus;
        // setFilteredEmployees(updatedEmployees);
        console.log('<><><>', newStatus)
        setIsOpen(null);
        if (newStatus == 'Resolved') {
            setStatusNew(0)
        }
        if (newStatus == 'Pending') {
            setStatusNew(1)
        }
        if (newStatus == 'Rejected') {
            setStatusNew(2)
        }
        setOpen(true)
        setStatusOpen(false)

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
        // setCurrentPage(1);
        // setRowsPerPage(10);
        setSelectedFilter(null)
        setSelectedDate(null)
        setFromDate(null)
        setToDate(null)
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

    const AttendanceDetailsPage = () => {
        navigate('/attendance-details')
    }
    const NewAttendanceClick = () => {
        setTogglNewAdd(true)
    }
    const NewAttendanceClosePop = () => {
        setTogglNewAdd(false);
    };
    const filter_left = () => {
        setToggleLeft(!toggleLeft)
    }

    const DateDropdowns = () => {
        setDropdowns(!dropdowns)
    }
    const [fileName, setFileName] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name); // Set the file name in the state
        }
    };

    // 

    const [loading, setLoading] = useState(true);
    const [AttendanceData, setJobJsonData] = useState([]);

    const JobDetailsPage = () => {
        navigate('/attendance-details')
    }
    const token = localStorage.getItem('access_token');
    // console.log('token:', token)
    console.log('ssss', selectedFilter)
    useEffect(() => {
        setLoading(true)
        axios.post('https://hrms.dragnilifecare.in/public/api/attendance/list', {
            search: searchQuery,
            status: selectedFilter,   //
            custom_date: selectedDate,
            fromDate: fromDate,
            toDate: toDate
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // setEmployees(response.data.job_opening);
                setEmployees(response.data.result)
                setFilteredEmployees(response.data.result); // filteredEmployees ko bhi sync karo
                console.log('response 🥳', response.data);
                setOverview(response.data)
                // setDepartmentdetails2(response.data.result.department_id)
                setLoading(false);
                // setSms()
                // setError(false)
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                // setError(true)

            });
    }, [searchQuery, selectedFilter, fromDate, toDate, selectedDate, open, togglNewAdd]);

    // 
    let isRequestInProgress = false;

    const ConformOk = () => {
        setTimeout(() => {
            setOpen(false)
        }, 400);
        if (statusId && !isRequestInProgress) {
            isRequestInProgress = true;  // Request start hone par flag true
            axios.post('https://hrms.dragnilifecare.in/public/api/attendance/status/update', {
                id: statusId,
                status: statusNew
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    // Success handling
                    // setSms(`Status update successfully`);
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

                    if (response.data.success === true) {
                        // setShowAlert(true);
                        // setTimeout(() => {
                        //     setShowAlert(false);
                        // }, 4000);
                    }
                })
                .catch(error => {
                    // Error handling
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

                    console.error("Error fetching data: ", error);
                })
                .finally(() => {
                    // Request complete hone ke baad flag reset hoga
                    isRequestInProgress = false;
                });
        }
    }
    //
    const calculateTotalHours = (start, end) => {
        const startTime = new Date(`1970-01-01T${start}:00`);
        const endTime = new Date(`1970-01-01T${end}:00`);

        // Adjust for cases where end time is on the next day (e.g., 12 AM to 8 AM)
        if (endTime < startTime) {
            endTime.setDate(endTime.getDate() + 1);
        }

        const totalHours = (endTime - startTime) / (1000 * 60 * 60); // Total working hours
        let overtime = 0;

        // Overtime calculation, if total working hours are more than 8
        if (totalHours > 8) {
            overtime = totalHours - 8;
        }

        return overtime.toFixed(2); // Return overtime hours as a string with 2 decimal places
    };
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
            <div className="EmpOn_main_container">
                <div className="EmpOn_header">
                    <div className="top-bar">
                        <h2>
                            <div className='span'><HiUserPlus /></div>
                            All Tickets list <p>345 total</p>
                        </h2>
                        <div className="Emp_Head_Right">
                            <div className="addEmp" onClick={() => navigate('/add-ticket')}>
                                <p><span><IoMdAdd /></span>New Ticket</p>
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
            <div className="Overview">
                <h2>Overview</h2>
                <div className="Overview4">
                    <div className="Overview_box">
                        <div className="Overview_Left">
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9013fe" fill="none">
                                    <path d="M22 8.87895C21.9331 7.33687 21.7456 6.33298 21.2203 5.53884C20.9181 5.08196 20.5428 4.68459 20.1112 4.36468C18.9447 3.5 17.299 3.5 14.0078 3.5H9.99305C6.70178 3.5 5.05614 3.5 3.88962 4.36468C3.45805 4.68459 3.08267 5.08196 2.78047 5.53884C2.25526 6.33289 2.06776 7.33665 2.00083 8.87843C1.98938 9.14208 2.21648 9.34375 2.46531 9.34375C3.85109 9.34375 4.97449 10.533 4.97449 12C4.97449 13.467 3.85109 14.6562 2.46531 14.6562C2.21648 14.6562 1.98938 14.8579 2.00083 15.1216C2.06776 16.6634 2.25526 17.6671 2.78047 18.4612C3.08267 18.918 3.45805 19.3154 3.88962 19.6353C5.05614 20.5 6.70178 20.5 9.99306 20.5H14.0078C17.299 20.5 18.9447 20.5 20.1112 19.6353C20.5428 19.3154 20.9181 18.918 21.2203 18.4612C21.7456 17.667 21.9331 16.6631 22 15.1211V8.87895Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                    <path d="M13 12L17 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M9 16L17 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                        </div>
                        <div className="Overview_Right">
                            <p>TOTAL TICKETS</p>
                            <h3>{overview.total_employee || '0'}</h3>
                        </div>
                    </div>
                    <div className="Overview_box">
                        <div className="Overview_Left">
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                    <path d="M10.9961 10H11.0111M10.9998 16H11.0148" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7 13H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <circle cx="1.5" cy="1.5" r="1.5" transform="matrix(1 0 0 -1 16 8)" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.77423 11.1439C1.77108 12.2643 1.7495 13.9546 2.67016 15.1437C4.49711 17.5033 6.49674 19.5029 8.85633 21.3298C10.0454 22.2505 11.7357 22.2289 12.8561 21.2258C15.8979 18.5022 18.6835 15.6559 21.3719 12.5279C21.6377 12.2187 21.8039 11.8397 21.8412 11.4336C22.0062 9.63798 22.3452 4.46467 20.9403 3.05974C19.5353 1.65481 14.362 1.99377 12.5664 2.15876C12.1603 2.19608 11.7813 2.36233 11.472 2.62811C8.34412 5.31646 5.49781 8.10211 2.77423 11.1439Z" stroke="currentColor" stroke-width="1.5" />
                                </svg>
                            </span>
                        </div>
                        <div className="Overview_Right">
                            <p>Solved Tickets</p>
                            <h3>{overview.today_present || '0'}</h3>
                        </div>
                    </div>
                    <div className="Overview_box">
                        <div className="Overview_Left">
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#417505" fill="none">
                                    <path d="M5 15C5 11.134 8.13401 8 12 8C15.866 8 19 11.134 19 15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M7.5 9.5V6.5C7.5 4.01472 9.51472 2 12 2C13.5602 2 14.935 2.79401 15.7422 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M12 16V14" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                        </div>
                        <div className="Overview_Right">
                            <p>OPEN TICKETS</p>
                            <h3>{overview.today_absent || '0'}</h3>
                        </div>
                    </div>
                    <div className="Overview_box">
                        <div className="Overview_Left">
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#d0021b" fill="none">
                                    <path d="M2 21H22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M20 18L20 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M16 15L16 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 13L12 10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M8 10L8 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M4 10L4 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                        </div>
                        <div className="Overview_Right">
                            <p>PENDING TICKETS</p>
                            <h3>{overview.today_halfday || '0'}</h3>
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
                            onClick={() => filter_leftClose('all')}
                        >
                            <span className=''><FaList /></span>All
                        </div>
                    </div>
                    <div
                        onClick={() => filter_leftClose('Resolved')}
                    >
                        <div
                            className={`active ${selectedFilter == '0' ? 'listActiveStatus' : ''}`}
                        >
                            <span><PiCheckSquare /></span>Resolved
                        </div>
                    </div>
                    <div
                        onClick={() => filter_leftClose('Pending')}
                    >
                        <div className={`inactive ${selectedFilter == '1' ? 'listActiveStatus' : ''}`}
                        >

                            <span><FaRegClock /></span>Pending
                        </div>
                    </div>
                    <div
                        onClick={() => filter_leftClose('Rejected')}
                    >
                        <div className={`resigned ${selectedFilter == '2' ? 'listActiveStatus' : ''}`}
                        >
                            <span> <IoIosCloseCircleOutline /></span>Rejected
                        </div>
                    </div>

                </div>

                <div className="right">
                    <div className="refresh divRight" onClick={handleRefresh}>
                        <div className='div_box'>
                            <span id='reload_data_page'>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#400f6f" fill="none">
                                    <path d="M15.1667 0.999756L15.7646 2.11753C16.1689 2.87322 16.371 3.25107 16.2374 3.41289C16.1037 3.57471 15.6635 3.44402 14.7831 3.18264C13.9029 2.92131 12.9684 2.78071 12 2.78071C6.75329 2.78071 2.5 6.90822 2.5 11.9998C2.5 13.6789 2.96262 15.2533 3.77093 16.6093M8.83333 22.9998L8.23536 21.882C7.83108 21.1263 7.62894 20.7484 7.7626 20.5866C7.89627 20.4248 8.33649 20.5555 9.21689 20.8169C10.0971 21.0782 11.0316 21.2188 12 21.2188C17.2467 21.2188 21.5 17.0913 21.5 11.9998C21.5 10.3206 21.0374 8.74623 20.2291 7.39023" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
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
                            {!isFilterOpen ?
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#400F6F" fill="none">
                                    <path d="M3 7H6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3 17H9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M18 17L21 17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15 7L21 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M6 7C6 6.06812 6 5.60218 6.15224 5.23463C6.35523 4.74458 6.74458 4.35523 7.23463 4.15224C7.60218 4 8.06812 4 9 4C9.93188 4 10.3978 4 10.7654 4.15224C11.2554 4.35523 11.6448 4.74458 11.8478 5.23463C12 5.60218 12 6.06812 12 7C12 7.93188 12 8.39782 11.8478 8.76537C11.6448 9.25542 11.2554 9.64477 10.7654 9.84776C10.3978 10 9.93188 10 9 10C8.06812 10 7.60218 10 7.23463 9.84776C6.74458 9.64477 6.35523 9.25542 6.15224 8.76537C6 8.39782 6 7.93188 6 7Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M12 17C12 16.0681 12 15.6022 12.1522 15.2346C12.3552 14.7446 12.7446 14.3552 13.2346 14.1522C13.6022 14 14.0681 14 15 14C15.9319 14 16.3978 14 16.7654 14.1522C17.2554 14.3552 17.6448 14.7446 17.8478 15.2346C18 15.6022 18 16.0681 18 17C18 17.9319 18 18.3978 17.8478 18.7654C17.6448 19.2554 17.2554 19.6448 16.7654 19.8478C16.3978 20 15.9319 20 15 20C14.0681 20 13.6022 20 13.2346 19.8478C12.7446 19.6448 12.3552 19.2554 12.1522 18.7654C12 18.3978 12 17.9319 12 17Z" stroke="currentColor" stroke-width="1.5" />
                                </svg>
                                :
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" color="#400F6F" fill="none">
                                    <path d="M7 21L7 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M17 21L17 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M17 6L17 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7 9L7 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7 18C6.06812 18 5.60218 18 5.23463 17.8478C4.74458 17.6448 4.35523 17.2554 4.15224 16.7654C4 16.3978 4 15.9319 4 15C4 14.0681 4 13.6022 4.15224 13.2346C4.35523 12.7446 4.74458 12.3552 5.23463 12.1522C5.60218 12 6.06812 12 7 12C7.93188 12 8.39782 12 8.76537 12.1522C9.25542 12.3552 9.64477 12.7446 9.84776 13.2346C10 13.6022 10 14.0681 10 15C10 15.9319 10 16.3978 9.84776 16.7654C9.64477 17.2554 9.25542 17.6448 8.76537 17.8478C8.39782 18 7.93188 18 7 18Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M17 12C16.0681 12 15.6022 12 15.2346 11.8478C14.7446 11.6448 14.3552 11.2554 14.1522 10.7654C14 10.3978 14 9.93188 14 9C14 8.06812 14 7.60218 14.1522 7.23463C14.3552 6.74458 14.7446 6.35523 15.2346 6.15224C15.6022 6 16.0681 6 17 6C17.9319 6 18.3978 6 18.7654 6.15224C19.2554 6.35523 19.6448 6.74458 19.8478 7.23463C20 7.60218 20 8.06812 20 9C20 9.93188 20 10.3978 19.8478 10.7654C19.6448 11.2554 19.2554 11.6448 18.7654 11.8478C18.3978 12 17.9319 12 17 12Z" stroke="currentColor" stroke-width="1.5" />
                                </svg>
                            }
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
                                        <p onClick={handleDateRangeClick}>Date Range  {!showDateRange ? <IoIosArrowDown /> : <IoIosArrowUp />}</p>
                                        {showDateRange && (
                                            <div >
                                                <label id='daterange-contener'>From</label>
                                                <div className="dropdown-content date-h">
                                                    <div><span><MdDateRange /></span>{!fromDate ? 'Select Custom date' : fromDate} </div>
                                                    {/* <br /> */}
                                                    <input type="date" name="date" id="" onChange={handleFromDateChange} />
                                                </div>
                                                <label id='daterange-contener'>To</label>
                                                <div className="dropdown-content date-h">
                                                    <div><span><MdDateRange /></span>{!toDate ? 'Select Custom date' : toDate} </div>
                                                    {/* <br /> */}
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
                                <th> <div>Employee Name
                                    <div className="short_ascending_designation">
                                        <div className='ascending'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#400f6f" fill="none">
                                                <path d="M17.9998 15C17.9998 15 13.5809 9.00001 11.9998 9C10.4187 8.99999 5.99985 15 5.99985 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                        <div className='designation'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#400f6f" fill="none">
                                                <path d="M18 9.00005C18 9.00005 13.5811 15 12 15C10.4188 15 6 9 6 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div></th>
                                <th>Requested To</th>
                                <th>Priority</th>
                                <th>Subject</th>
                                <th>Creation date</th>

                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.map((emp, index) => (
                                <tr key={index}  >
                                    <td>
                                        <input type="checkbox" checked={emp.isChecked} onChange={() => handleCheckboxChange(indexOfFirstEmployee + index)} onClick={DelThis} />

                                    </td>
                                    <td className='td' onClick={() => navigate(`/ticket-details`)}></td>
                                    <td className='td' onClick={() => navigate(`/ticket-details`)}>{emp?.date}</td>
                                    <td className='td' onClick={() => navigate(`/ticket-details`)}>{emp.shift_name}</td>
                                    <td className='td' onClick={() => navigate(`/ticket-details`)}>{emp.punch_in}</td>
                                    <td className='td' onClick={() => navigate(`/ticket-details/${emp?.id}`)}>{emp.punch_out}</td>


                                    <td>
                                        <div className="status-dropdown">
                                            <div key={index} className="status-container">
                                                <div onClick={toggleStatus} ref={statusButtonRef}>
                                                    <div
                                                        className={`status-display ${emp.status == 0 ? 'Resolved' : emp.status == 1 ? 'Pending' : emp.status == 2 ? 'Rejected' : ''}`}
                                                        onClick={() => setIsOpen(isOpen === index ? null : index)}
                                                    >
                                                        <span className={`left_dot ${emp.status == 0 ? 'Resolved' : emp.status == 1 ? 'Pending' : emp.status == 2 ? 'Rejected' : ''}`}
                                                        ></span>
                                                        <div
                                                            onClick={() => {
                                                                UpdateStatusHndle(emp.id);
                                                            }}
                                                        >
                                                            <div className="">
                                                                {/* {emp.status} */}
                                                                {emp.status == 0 ? 'Resolved' : emp.status == 1 ? 'Pending' : emp.status == 2 ? 'Rejected' : ''}
                                                            </div>
                                                            <div className="^wdown">
                                                                <MdOutlineKeyboardArrowDown />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {isStatusOpen &&
                                                    <>
                                                        {isOpen === index && (
                                                            <div className="status-options" ref={statusRef}>
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
                                                    </>
                                                }
                                            </div>
                                        </div>
                                    </td>


                                </tr>
                            ))}

                        </tbody>
                    </table>
                    {/* {loading ? (
                        <div id='Loading'>
                            <img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="" />
                        </div> // Show loading text or spinner when data is being fetched
                    ) : ('')}
                    {loading ? '' : employees == '' ? (
                        <div className="not-found-container">
                            <img src="https://cdn.dribbble.com/userupload/11708150/file/original-825be68b3517931ad747e0180a4116d3.png?resize=1200x900" alt="" />
                            <h1 className="grey-text">No matching records found</h1>
                            <p className="grey-text">Sorry, we couldn't find the data you're looking for.</p>
                        </div>
                    ) : ('')} */}
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

export default Ticket;
// 