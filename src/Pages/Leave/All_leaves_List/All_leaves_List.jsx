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
import './All_leaves_List.scss';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import axios from 'axios';

import { IoIosCloseCircleOutline } from "react-icons/io";
// import { GiBackstab, GiNotebook } from "react-icons/gi";
// import { FaPersonWalkingArrowLoopLeft } from "react-icons/fa6";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

import NewAttendance from '../../Attedance_tracking/addNewAttendance/NewAttendance.jsx';
import { OutsideClick } from '../../../components/OutSideClick.jsx';

import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const All_leaves_List = (ClosePop) => {
    const { isOpen: isFilterOpen, ref: filterRef, buttonRef: filterButtonRef, handleToggle: toggleFilter } = OutsideClick();
    const { isOpen: isFilterOpen2, ref: filterRef2, buttonRef: filterButtonRef2, handleToggle: toggleFilter2 } = OutsideClick();
    const { isOpen: isFilterOpen3, ref: filterRef3, buttonRef: filterButtonRef3, handleToggle: toggleFilter3 } = OutsideClick();
    const { isOpen: isFilterOpen4, ref: filterRef4, buttonRef: filterButtonRef4, handleToggle: toggleFilter4 } = OutsideClick();

    const [allDel, setAllDel] = useState(true);
    const [thisDel, setThisDel] = useState(false)
    const [toggleLeft, setToggleLeft] = useState(false)
    const [togglNewAdd, setTogglNewAdd] = useState(false)

    const [conformStatus, setConformStatus] = useState(false);
    const [open, setOpen] = useState(false);

    const DelThis = () => {
        setThisDel(!thisDel);

    }
    const [dropdowns, setDropdowns] = useState(false)
    const [hidImport, setHidImport] = useState(true);
    const navigate = useNavigate()
    const [employees, setEmployees] = useState([
        // { EmployeeName: "Hillery Moses", Date: 'aa', Shift: "General", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "-", status: "Present", isChecked: false },
        // { EmployeeName: "Nandan Raikwar", Date: "17-Apr-2024", Shift: "Second", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "-", status: "Absent", isChecked: false },
        // { EmployeeName: "Vishwas Patel", Date: "17-Apr-2024", Shift: "Night", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "-", status: "Absent", isChecked: false },
        // { EmployeeName: "Paartho Ghosh", Date: "17-Apr-2024", Shift: "Second", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "-", status: "Half day", isChecked: false },
        // { EmployeeName: "Bhavna Goyal", Date: "17-Apr-2024", Shift: "Night", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "-", status: "Present", isChecked: false },
        // { EmployeeName: "Jayshri Tiwari", Date: "17-Apr-2024", Shift: "Night", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "-", status: "Present", isChecked: false },
        // { EmployeeName: "Amardeep Singh", Date: "17-Apr-2024", Shift: "Second", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "-", status: "Present", isChecked: false },
        // { EmployeeName: "Ramesh Gupta", Date: "17-Apr-2024", Shift: "Second", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "06.00 PM", status: "Present", isChecked: false },
        // { EmployeeName: "Rahul Choudhary", Date: "17-Apr-2024", Shift: "Night", PunchIn: "09.00 AM", PunchOut: "06.00 PM", TotalHoursWorked: "09Hrs", Overtime: "06.00 PM", status: "Present", isChecked: false },
    ]);


    const [filteredEmployees, setFilteredEmployees] = useState(employees);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectAll, setSelectAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isOpen, setIsOpen] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


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
    const [statusId, setStatusId] = useState('')

    const statuses = ['Pending', 'Approved', 'Declined'];
    const departments = ['All', 'Human Resources', 'Maintenance', 'Manning', 'Operations', 'Engineering', 'IT', 'HSEQ'];
    const employeeType = ['All', 'Permanent', 'On Contract', 'Intern', 'Trainee'];
    const [statusNew, setStatusNew] = useState('')


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
        // setFilteredEmployees(employees);
        setSearchQuery('');
        // setSelectedDepartment('');
        setSelectedStatus(' ');
        // setCurrentPage(1);
        // setRowsPerPage(10);
        setSelectedFilter(null)
        // setSelectedDepartmentId(null)
        setSelectedDate(null)
        setFromDate(null)
        setToDate(null)
    };
    // 

    const NewLeaveMaster = () => {
        navigate('/new-leave')
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
    const [showCustomDate, setShowCustomDate] = useState(false);

    const [showDateRange, setShowDateRange] = useState(false)

    const handleDateRangeClick = () => {
        setShowDateRange(!showDateRange)
        setShowCustomDate(false);
    }
    const handleCustomDateClick = () => {
        setShowCustomDate(!showCustomDate);

        setShowDateRange(false)
    };

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
    const JobDetailsPage = () => {
        navigate('/leave-details')
    }
    console.log('currentEmployees', employees)
    // 
    const token = localStorage.getItem('access_token');

    const [selectedFilter, setSelectedFilter] = useState(null);
    // alert(selectedFilter)
    console.log('states', selectedFilter)

    const filter_leftClose = (filterName) => {
        setSelectedFilter(filterName);
        setToggleLeft(false)
        toggleFilter2()
    };


    useEffect(() => {
        const fetchJobOpenings = async () => {
            setLoading(true); // Data fetching shuru karte waqt loading ko true set karna
            setError(null);   // Har bar call se pehle error ko reset karna

            try {
                const response = await axios.post('https://devstronauts.com/public/api/leave/list', {
                    search: searchQuery,
                    status: selectedFilter,
                    custom_date: selectedDate,
                    fromDate: fromDate,
                    toDate: toDate
                }, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                // Data ko state me set kar rahe hain
                console.log('respone❗', response)
                setEmployees(response.data);
                setFilteredEmployees(response.data.result); // filteredEmployees ko sync kar rahe hain
            } catch (error) {
                // Agar error aaye toh usko handle kar rahe hain
                console.error("Error fetching data: ", error);
                setError("Data fetching failed!");
            } finally {
                // Loading ko false set karna
                setLoading(false);
            }
        };

        fetchJobOpenings();
    }, [searchQuery, selectedFilter, selectedDate, fromDate, toDate, open]);
    let isRequestInProgress = false;



    const handleStatusChange = (index, newStatus) => {
        // if (conformStatus) {
        // setConformStatus(!conformStatus)
        setStatusNew(newStatus)
        // const updatedEmployees = [...filteredEmployees];
        // updatedEmployees[index].status = newStatus;
        // setFilteredEmployees(updatedEmployees);
        setIsOpen(null);
        // }
        setOpen(true)
    };
    const UpdateStatusHndle = (id) => {
        setStatusId(id)
    }

    const ConformOk = () => {
        setTimeout(() => {
            setOpen(false)
        }, 400);
        if (statusId && statusNew && !isRequestInProgress) {
            isRequestInProgress = true;  // Request start hone par flag true
            axios.post('https://devstronauts.com/public/api/leave/status/update', {
                id: statusId,
                status: statusNew
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    // Success handling'      
                    setConformStatus(false)
                    toast.success('Status update successfully.', {
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

            {togglNewAdd && <NewAttendance ClosePop={NewAttendanceClosePop} />}

            <div className="EmpOn_main_container">
                <div className="EmpOn_header">
                    <div className="top-bar">
                        <h2>
                            <div className='span'><HiUserPlus /></div>
                            All Leaves list <p>{currentEmployees.length} total</p>
                        </h2>
                        <div className="Emp_Head_Right">
                            <div className="addEmp" onClick={NewLeaveMaster}>
                                <p><span><IoMdAdd /></span> Add New Leave</p>
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
            <div className="LeavesOverview">
                <h2>Overview</h2>
                <div className="Overview4">
                    <div className="Overview_box">
                        <div className="Overview_Top">
                            <p>Today Presents</p>
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                    <path d="M20.7739 18C21.5232 18 22.1192 17.5285 22.6543 16.8691C23.7498 15.5194 21.9512 14.4408 21.2652 13.9126C20.5679 13.3756 19.7893 13.0714 18.9999 13M17.9999 11C19.3806 11 20.4999 9.88071 20.4999 8.5C20.4999 7.11929 19.3806 6 17.9999 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M3.2259 18C2.47659 18 1.88061 17.5285 1.34548 16.8691C0.250028 15.5194 2.04861 14.4408 2.73458 13.9126C3.43191 13.3756 4.21052 13.0714 4.99994 13M5.49994 11C4.11923 11 2.99994 9.88071 2.99994 8.5C2.99994 7.11929 4.11923 6 5.49994 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M8.08368 15.1112C7.0619 15.743 4.38286 17.0331 6.01458 18.6474C6.81166 19.436 7.6994 20 8.8155 20H15.1843C16.3004 20 17.1881 19.436 17.9852 18.6474C19.6169 17.0331 16.9379 15.743 15.9161 15.1112C13.52 13.6296 10.4797 13.6296 8.08368 15.1112Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M15.4999 7.5C15.4999 9.433 13.9329 11 11.9999 11C10.0669 11 8.49988 9.433 8.49988 7.5C8.49988 5.567 10.0669 4 11.9999 4C13.9329 4 15.4999 5.567 15.4999 7.5Z" stroke="currentColor" stroke-width="1.5" />
                                </svg>
                            </span>
                        </div>
                        <div className="Overview_Bottom">
                            <h3>{employees.today_present_count}</h3>
                            {/* <p>TOTAL EMPLOYEE</p> */}
                        </div>

                    </div>
                    <div className="Overview_box">
                        <div className="Overview_Top">
                            <p>Planned Leaves</p>
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#417505" fill="none">
                                    <path d="M9 15C9 12.1716 9 10.7574 9.87868 9.87868C10.7574 9 12.1716 9 15 9L16 9C18.8284 9 20.2426 9 21.1213 9.87868C22 10.7574 22 12.1716 22 15V16C22 18.8284 22 20.2426 21.1213 21.1213C20.2426 22 18.8284 22 16 22H15C12.1716 22 10.7574 22 9.87868 21.1213C9 20.2426 9 18.8284 9 16L9 15Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M16.9999 9C16.9975 6.04291 16.9528 4.51121 16.092 3.46243C15.9258 3.25989 15.7401 3.07418 15.5376 2.90796C14.4312 2 12.7875 2 9.5 2C6.21252 2 4.56878 2 3.46243 2.90796C3.25989 3.07417 3.07418 3.25989 2.90796 3.46243C2 4.56878 2 6.21252 2 9.5C2 12.7875 2 14.4312 2.90796 15.5376C3.07417 15.7401 3.25989 15.9258 3.46243 16.092C4.51121 16.9528 6.04291 16.9975 9 16.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                        </div>
                        <div className="Overview_Bottom">
                            <h3>{employees.planned_leaves_count}</h3>
                            <p>Today</p>
                        </div>

                    </div>
                    <div className="Overview_box">
                        <div className="Overview_Top">
                            <p>UNPlanned Leaves</p>
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#6d0dc1" fill="none">
                                    <path d="M15.5 12C15.5 13.933 13.933 15.5 12 15.5C10.067 15.5 8.5 13.933 8.5 12C8.5 10.067 10.067 8.5 12 8.5C13.933 8.5 15.5 10.067 15.5 12Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M21.011 14.0965C21.5329 13.9558 21.7939 13.8854 21.8969 13.7508C22 13.6163 22 13.3998 22 12.9669V11.0332C22 10.6003 22 10.3838 21.8969 10.2493C21.7938 10.1147 21.5329 10.0443 21.011 9.90358C19.0606 9.37759 17.8399 7.33851 18.3433 5.40087C18.4817 4.86799 18.5509 4.60156 18.4848 4.44529C18.4187 4.28902 18.2291 4.18134 17.8497 3.96596L16.125 2.98673C15.7528 2.77539 15.5667 2.66972 15.3997 2.69222C15.2326 2.71472 15.0442 2.90273 14.6672 3.27873C13.208 4.73448 10.7936 4.73442 9.33434 3.27864C8.95743 2.90263 8.76898 2.71463 8.60193 2.69212C8.43489 2.66962 8.24877 2.77529 7.87653 2.98663L6.15184 3.96587C5.77253 4.18123 5.58287 4.28891 5.51678 4.44515C5.45068 4.6014 5.51987 4.86787 5.65825 5.4008C6.16137 7.3385 4.93972 9.37763 2.98902 9.9036C2.46712 10.0443 2.20617 10.1147 2.10308 10.2492C2 10.3838 2 10.6003 2 11.0332V12.9669C2 13.3998 2 13.6163 2.10308 13.7508C2.20615 13.8854 2.46711 13.9558 2.98902 14.0965C4.9394 14.6225 6.16008 16.6616 5.65672 18.5992C5.51829 19.1321 5.44907 19.3985 5.51516 19.5548C5.58126 19.7111 5.77092 19.8188 6.15025 20.0341L7.87495 21.0134C8.24721 21.2247 8.43334 21.3304 8.6004 21.3079C8.76746 21.2854 8.95588 21.0973 9.33271 20.7213C10.7927 19.2644 13.2088 19.2643 14.6689 20.7212C15.0457 21.0973 15.2341 21.2853 15.4012 21.3078C15.5682 21.3303 15.7544 21.2246 16.1266 21.0133L17.8513 20.034C18.2307 19.8187 18.4204 19.711 18.4864 19.5547C18.5525 19.3984 18.4833 19.132 18.3448 18.5991C17.8412 16.6616 19.0609 14.6226 21.011 14.0965Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                            </span>
                        </div>
                        <div className="Overview_Bottom">
                            <h3>{employees.unplanned_leaves_count}</h3>
                            <p>Today</p>
                        </div>

                    </div>
                    <div className="Overview_box">
                        <div className="Overview_Top">
                            <p>Pending Requests</p>
                            <span className="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#d0021b" fill="none">
                                    <path d="M18 2V4M6 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3.5 8H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M3 8H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </span>
                        </div>
                        <div className="Overview_Bottom">
                            <h3>{employees.pending_leaves_count}</h3>
                            <p>Today</p>
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
                        onClick={() => filter_leftClose('Pending')}
                    >
                        <div
                            className={`active ${selectedFilter === 'Pending' ? 'listActiveStatus' : ''}`}
                        >
                            <span><PiCheckSquare /></span>Pending
                        </div>
                    </div>
                    <div
                        onClick={() => filter_leftClose('Approved')}
                    >
                        <div className={`inactive ${selectedFilter === 'Approved' ? 'listActive' : ''}`}
                        >
                            <span><MdWork /></span>Approved
                        </div>
                    </div>
                    <div
                        onClick={() => filter_leftClose('Declined')}
                    >
                        <div className={`resigned ${selectedFilter === 'Declined' ? 'listActive' : ''}`}
                        >
                            <span><FaRegClock /></span>Declined
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
                                <th>Leave Type</th>
                                <th>Type</th>
                                <th>Leave Period</th>
                                <th>No of Days</th>
                                <th>Date of Request</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.map((emp, index) => (
                                <tr key={index}  >
                                    <td>
                                        <input type="checkbox" checked={emp.isChecked} onChange={() => handleCheckboxChange(indexOfFirstEmployee + index)} onClick={DelThis} />

                                    </td>
                                    <td onClick={() => navigate(`/leave-details/${emp.id}`)}>{emp.name}</td>
                                    <td onClick={() => navigate(`/leave-details/${emp.id}`)}>{emp.leave_type_name}</td>
                                    <td onClick={() => navigate(`/leave-details/${emp.id}`)}>{emp.type_of_leave}</td>
                                    {/* <td onClick={() => navigate(`/leave-details/${emp.id}`)}>{emp.to_date + ' - ' + emp.from_date}</td> */}
                                    <td onClick={() => navigate(`/leave-details/${emp.id}`)}>
                                        {`${new Date(emp.from_date).getDate()}-${new Date(emp.from_date).toLocaleString('en-US', { month: 'short' }).toLowerCase()}-${new Date(emp.from_date).getFullYear()}  - 
                                        ${new Date(emp.to_date).getDate()}-${new Date(emp.to_date).toLocaleString('en-US', { month: 'short' }).toLowerCase()}-${new Date(emp.to_date).getFullYear()}
                                        `} 
                                    </td>

                                    <td onClick={() => navigate(`/leave-details/${emp.id}`)}>{emp.days}</td>
                                    <td onClick={() => navigate(`/leave-details/${emp.id}`)}>
                                        {`${new Date(emp.created_at).getDate()}-${new Date(emp.created_at).toLocaleString('en-US', { month: 'short' })}-${new Date(emp.created_at).getFullYear()}`}
                                    </td>
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
                                                    <div onClick={() => {
                                                        UpdateStatusHndle(emp.id);
                                                    }}>
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
                            {/* <>
                                {AttendanceData.map((data, index) => {
                                    const punchInTime = new Date(`1970-01-01T${data.punchIn}:00`);
                                    const punchOutTime = new Date(`1970-01-01T${data.punchOut}:00`);

                                    // Total time in milliseconds
                                    const totalMilliseconds = punchOutTime - punchInTime;

                                    // Convert milliseconds to hours and minutes
                                    const totalHours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
                                    const totalMinutes = Math.floor((totalMilliseconds % (1000 * 60 * 60)) / (1000 * 60));

                                    // Format as "HH:MM"
                                    const totalTimeWorked = `${totalHours}h ${totalMinutes}m`;

                                    return (
                                        <tr key={index}>
                                            <td>
                                                <input type="checkbox" checked={data.isChecked} onChange={() => handleCheckboxChange(index)} />
                                            </td>
                                            <td onClick={AttendanceDetailsPage}>{data.employeeName}</td>
                                            <td onClick={AttendanceDetailsPage}>{data.date}</td>
                                            <td onClick={AttendanceDetailsPage}>{data.shift}</td>
                                            <td onClick={AttendanceDetailsPage}>{data.punchIn}</td>
                                            <td onClick={AttendanceDetailsPage}>{data.punchOut}</td>
                                            <td>{totalHours > 0 ? totalTimeWorked : '-'}</td>
                                            <td onClick={AttendanceDetailsPage}>{data.overtime}</td>
                                            <td>
                                                <div className="status-dropdown">
                                                    <div key={index} className="status-container">
                                                        <div
                                                            className={`status-display ${data.status ? data.status.toLowerCase().replace(' ', '-') : ''}`}
                                                            onClick={() => setIsOpen(isOpen === index ? null : index)}
                                                        >
                                                            {data.status && (
                                                                <>
                                                                    <span className={`left_dot ${data.status.toLowerCase().replace(' ', '-')}`}></span>
                                                                    <div>
                                                                        <div className="">
                                                                            {data.status}
                                                                        </div>
                                                                        <div className="^wdown">
                                                                            <MdOutlineKeyboardArrowDown />
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )}
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
                                    );
                                })}
                            </> */}

                        </tbody>
                    </table>
                    {loading ? (
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
                    ) : ('')}
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
        </div>
    );
};

export default All_leaves_List;
// 