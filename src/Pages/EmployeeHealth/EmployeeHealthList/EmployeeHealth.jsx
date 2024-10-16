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
import './EmployeeHealth.scss';
import { OutsideClick } from '../../../components/OutSideClick';
import axios from 'axios';
import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const EmployeeHealth = () => {
    const { isOpen: isFilterOpen2, ref: filterRef2, buttonRef: filterButtonRef2, handleToggle: toggleFilter2 } = OutsideClick();
    const [isOpen, setIsOpen] = useState(null);
    const statuses = ['Fully Vaccinated ', 'Partially Vaccinated','Not Vaccinated'];
    const [statusId, setStatusId] = useState('')
    const [statusNew, setStatusNew] = useState('')

    const [hidImport, setHidImport] = useState(true);
    const [conformStatus, setConformStatus] = useState(false);
    const [open, setOpen] = useState(false);

    const [employees, setEmployees] = useState([
        // { deptName: "Hillery Moses", deptHead: "HSEQ", parentDept: "14-Apr-2024", overall: "Healthy", allerig: "Soy", chorninc: "Lorem ipsum dolor sit amet c...", status:'status' },
        // { deptName: "Nandan Raikwar", deptHead: "Operations", parentDept: "14-Apr-2024", overall: "Healthy", allerig: "Milk", chorninc: "Lorem ipsum dolor sit amet c", status: 'status' },
        // { deptName: "Vishwas Patel", deptHead: "Operations", parentDept: "14-Apr-2024", overall: "UnHealthy", allerig: "Pollen", chorninc: "Lorem ipsum dolor sit amet c", status: 'status' },
        // { deptName: "Paartho Ghosh", deptHead: "Engineering", parentDept: "14-Apr-2024", overall: "UnHealthy", allerig: "Latex", chorninc: "Lorem ipsum dolor sit amet c", status: 'status' },
        // { deptName: "Vikas Tiwari", deptHead: "Maintenance", parentDept: "14-Apr-2024", overall: "UnHealthy", allerig: "Insect stings (e.g., bee stings)", chorninc: "Lorem ipsum dolor sit amet c", status: 'status' },
        // { deptName: "Lalita Thakur", deptHead: "HSEQ", parentDept: "14-Apr-2024", overall: "Healthy", allerig: "Penicillin", chorninc: "Lorem ipsum dolor sit amet c", status: '-' },
        // { deptName: "Mamta Lodhi", deptHead: "Shalini Jain", parentDept: "14-Apr-2024", overall: "Healthy", allerig: "Sulfa drugs", chorninc: "Lorem ipsum dolor sit amet c", status: '-' },
        // { deptName: "M. S. Subramaniam", deptHead: "Human Resources", parentDept: "14-Apr-2024T", overall: "Healthy", allerig: "Pet dander", chorninc: "Lorem ipsum dolor sit amet c", status: 'status' },
        // { deptName: "Amardeep Singh", deptHead: "IT", parentDept: "14-Apr-2024", overall: "Healthy", allerig: "Grass", chorninc: "Lorem ipsum dolor sit amet c", status: '-' },
        // { deptName: "Shalini Jain", deptHead: "IT", parentDept: "14-Apr-2024", overall: "Healthy", allerig: "Cockroach allergens", chorninc: "Lorem ipsum dolor sit amet c", status: 'status' },
    ]);




    const [loading, setLoading] = useState(true);
    const [sms, setSms] = useState('')

    const [filteredEmployees, setFilteredEmployees] = useState(employees);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [selectedStatus, setSelectedStatus] = useState('All');
    const [selectAll, setSelectAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [showPopup, setShowPopup] = useState(false);
    // const [SelectedHealthDetails, setSelectedHealthDetails] = useState(null);
    console.log(selectedDepartment)
    const navigate = useNavigate();
    const [selectedFilter, setSelectedFilter] = useState(null);


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
        setSelectedDepartment('');
        setSelectedStatus('');
        // setCurrentPage(1);
        // setRowsPerPage(10);
        setSelectedDate(null)
        // setSelectedFilter(null)
        setSelectedDepartmentId(null)
        setFromDate(null)
        setToDate(null)
    };
    // 
    const [showFilter, setShowFilter] = useState(false);
    const [showCustomDate, setShowCustomDate] = useState(false);
    const [showEmploymentType, setShowEmploymentType] = useState(false);
    const [showDepartment, setShowDepartment] = useState(false);
    const [showDateRange, setShowDateRange] = useState(false)

    const showFilterHandle = () => {
        setShowFilter(!showFilter)
    }
    const handleDateRangeClick = () => {
        setShowDateRange(!showDateRange)
        setShowCustomDate(false);
        setShowEmploymentType(false)
        setShowDepartment(false)
    }
    const handleCustomDateClick = () => {
        setShowCustomDate(!showCustomDate);
        setShowEmploymentType(false);
        setShowDepartment(false);
        setShowDateRange(false)

    };

    const handleEmploymentTypeClick = () => {
        setShowEmploymentType(!showEmploymentType);
        setShowCustomDate(false);
        setShowDepartment(false);
        setShowDateRange(false)

    };

    const handleDepartmentClick = () => {
        setShowDepartment(!showDepartment);
        setShowCustomDate(false);
        setShowEmploymentType(false);
        setShowDateRange(false)


    };

    const EmpHDetailsPage = () => {
        navigate('/employeehealthdetails')
    }


    const AddEmployeeHealth = () => {
        navigate('/addemployeehealth');
    }

    // status
    const filter_leftClose = (filterName) => {
        setSelectedFilter(filterName);
        setToggleLeft(false)
        toggleFilter2()
    };
    const toggleDropdown = (i) => {
        setIsOpen(prev => (prev == i ? null : i));
    };
    const UpdateStatusHndle = (id) => {
        setStatusId(id)
    }


    const handleStatusChange = (index, newStatus) => {
        setStatusNew(newStatus)
        // console.log('status chenge:::', newStatus)
        // const updatedEmployees = [...filteredEmployees];
        // updatedEmployees[index].status = newStatus;
        // setFilteredEmployees(updatedEmployees);
        setIsOpen(null);
       setOpen(true)
        setSms('')
    };

    // status
    const [selectedDepartmentId, setSelectedDepartmentId] = useState(''); // State to store selected department


    const [selectedDate, setSelectedDate] = useState(null);
    console.log('selectedDate', selectedDate)
    const handleDateChange = (event) => {
        const date = new Date(event.target.value);
        // Format the date as yyyy/MM/dd
        const formattedDate = date.toLocaleDateString('en-CA'); // yyyy-mm-dd format
        setSelectedDate(formattedDate);
    };

    const handleDepartmentChange = (event) => {
        setSelectedDepartmentId(event.target.value); // Update state on radio button change
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


    // list api
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        setLoading(true)
        axios.post('https://devstronauts.com/public/api/employee/health/list', {
            search: searchQuery,
            department_head: selectedDepartmentId,
            custom_date: selectedDate,
            fromDate: fromDate,
            toDate: toDate
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {

                setLoading(false)
                setEmployees(response.data.result);
                setFilteredEmployees(response.data.result); // filteredEmployees ko bhi sync karo
                console.log('response 🥳', response.data.result);
                // setLoading(false);
                // setSms()
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setLoading(false)

            })
    }, [searchQuery, selectedDepartmentId, selectedDate, toDate, fromDate, statusNew,sms,open]);
// list api
    // status update
    let isRequestInProgress = false;

    const ConformOk = () => {
        setTimeout(() => {
            setOpen(false)
        }, 400);
        if (statusId && statusNew && !isRequestInProgress) {
            isRequestInProgress = true; // Request start hone par flag true ho jaye

            const updateStatus = async () => {
                try {
                    const response = await axios.post('https://devstronauts.com/public/api/employee/health/status/update', {
                        id: statusId,
                        covid_status: statusNew
                    }, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });

                    // Success handling
                    setSms(`Status update successfully`);
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
                        // Aap apne hisaab se alert ya koi action le sakte hain
                        // setShowAlert(true);
                        // setTimeout(() => {
                        //     setShowAlert(false);
                        // }, 4000);
                    }
                } catch (error) {
                    // Error handling
                    toast.error('Status update Failed.', {
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

                    // Optionally, you can setSms with an error message if needed
                    // setSms('Status update Failed');
                } finally {
                    // Request complete hone ke baad flag reset hoga
                    isRequestInProgress = false;
                }
            };

            // Call the async function
            updateStatus();
        }
    }
    // status update

    return (
        <div>
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
                                placeholder='Search employee name, department...'
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyUp={handleFilterChange}
                            />
                        </div>
                    </div>
                    <div className="filter divRight">
                        <div className='div_box' onClick={toggleFilter2} ref={filterButtonRef2}>
                            {!isFilterOpen2 ?
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

                        {isFilterOpen2 && (
                            <div className="filter-container" ref={filterRef2}>
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
            <div className="allEmployeeList" id='emplhealthlist'>
                {/* <div className="head">
                </div> */}
                <div className="employee-table">

                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
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
                                <th>Department Head</th>
                                <th>Last Health Check Date</th>
                                <th>Health Check Results</th>
                                <th>Allergies</th>
                                {/* <th>Chronic Conditions</th> */}
                                <th>Status</th>

                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.map((emp, index) => (
                                <tr key={index} >
                                    <td><input type="checkbox" checked={emp.isChecked} onChange={() => handleCheckboxChange(indexOfFirstEmployee + index)} /></td>
                                    <td onClick={() => navigate(`/employeehealthdetails/${emp.id}`)}>{emp.employee_name || '-'}{ console.log('emp',emp)}</td>
                                    <td onClick={() => navigate(`/employeehealthdetails/${emp.id}`)}>{emp.department_head || '-'}</td>
                                    <td onClick={() => navigate(`/employeehealthdetails/${emp.id}`)}>{emp.last_checkup_date || '-'}</td>
                                    <td onClick={() => navigate(`/employeehealthdetails/${emp.id}`)}>{emp.checkup_result}</td>
                                    <td onClick={() => navigate(`/employeehealthdetails/${emp.id}`)}>{emp.allergies || '-'}</td>
                                    {/* <td onClick={EmpHDetailsPage}>{emp.chorninc}</td> */}
                                    <td>
                                        <div className="status-dropdown" >
                                            <div key={index} className="status-container" >
                                                <div
                                                    className={`status-display  ${emp.covid_status ? emp.covid_status.toLowerCase().replace(' ', '-') : ''}`}
                                                    onClick={() => toggleDropdown(index)}
                                                >
                                                    {/* {console.log(`status-display ${emp.covid_status ? emp.covid_status.toLowerCase().replace(' ', '-') : ''}`)} */}
                                                    <span className={`left_dot  ${emp.covid_status ? emp.covid_status.toLowerCase().replace(' ', '-') : ''}`}></span>
                                                    <div onClick={() => {
                                                        UpdateStatusHndle(emp.id);
                                                    }}>
                                                        <div

                                                        >
                                                            {emp.covid_status}
                                                        </div>
                                                        <div className="^wdown">
                                                            <MdOutlineKeyboardArrowDown />
                                                        </div>
                                                    </div>
                                                </div>
                                                {isOpen === index && (
                                                    <div>
                                                        <div className="status-options" >
                                                            {
                                                                statuses.map(status => (
                                                                    <div
                                                                        key={status}
                                                                        className="status-option"
                                                                        onClick={() => {
                                                                            handleStatusChange(index, status)
                                                                        }
                                                                        }
                                                                    >
                                                                        {status}
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>

                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
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