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
import { OutsideClick } from '../../../components/OutSideClick';
import axios from 'axios';
import { OutsideClick2 } from './OutsideClick2'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Department = () => {
    const { isOpen: isFilterOpen2, ref: filterRef2, buttonRef: filterButtonRef2, handleToggle: toggleFilter2 } = OutsideClick();
    const { isOpen: isDepartmentOpen, ref: departmentRef, buttonRef: departmentButtonRef, handleToggle: toggleDepartment, setIsOpen: setDepartmentOpen } = OutsideClick2();
    const { isOpen: isDepartmentOpen2, ref: departmentRef2, buttonRef: departmentButtonRef2, handleToggle: toggleDepartment2, setIsOpen: setDepartmentOpen2 } = OutsideClick2();
    const [loading, setLoading] = useState(true);
    const [hidImport, setHidImport] = useState(true);
    const [employees, setEmployees] = useState([
        // { deptName: "Manning", deptHead: "Sunil Bhadouriya", parentDept: "HSEQ" },
        // { deptName: "IT", deptHead: "Nandan Raikwar", parentDept: "Operations" },
        // { deptName: "HSEQ", deptHead: "Vikas Tiwari", parentDept: "IT" },
        // { deptName: "Operations", deptHead: "Paartho Ghosh", parentDept: "Manning" },
        // { deptName: "Engineering", deptHead: "Rahul Choudary", parentDept: "Engineering" },
        // { deptName: "Maintenance", deptHead: "Jayshri Tiwari", parentDept: "Operations" },
        // { deptName: "Operations", deptHead: "Shalini Jain", parentDept: "Maintenance" },
        // { deptName: "Human Resources", deptHead: "Viswas Patel", parentDept: "IT" },
        // { deptName: "IT", deptHead: "Kailash Chaurasia", parentDept: "Maintenance" },
        // { deptName: "Manning", deptHead: "Mamta Lodhi", parentDept: "Human Resources" },
        // { deptName: "IT", deptHead: "Kailash Chaurasia", parentDept: "Maintenance" },

    ]);
    const token = localStorage.getItem('access_token');

    // 
    const [departmentHead, setDepartmentHead] = useState([]);
    console.log('departmentHead❗', departmentHead)
    useEffect(() => {
        axios.post('https://hrms.dragnilifecare.in/public/api/employee/list', {
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const employees = response.data.result; // API se result array

                // Department heads ko extract karo
                const departmentHeads = employees
                    .map(emp => `${emp.first_name} ${emp.last_name}`); // Full name bana rahe hain

                setDepartmentHead(departmentHeads); // Department heads ko store kar rahe hain
                console.log('Department Heads:❗', employees);

                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setLoading(false);
            });
    }, []);


    // 

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
    // 
    // page index active

    // Function to generate the pages to display
    const generatePages = () => {
        let pages = [];

        // If total pages <= 5, show all pages
        if (totalPages <= 5) {
            pages = [...Array(totalPages).keys()].map(pageIndex => pageIndex + 1);
        }
        // If total pages > 5
        else {
            if (currentPage <= 3) {
                pages = [1, 2, 3, 4, 5];
            } else if (currentPage >= totalPages - 2) {
                pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
            } else {
                pages = [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
            }
        }

        return pages;
    };

    // Function to handle page change
    const handlePageChange = (page) => {
        if (page !== '...') {
            setCurrentPage(page);
        }
    };
    // page index active
    // 


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
        setSelectedDate(null)
        setFromDate(null)
        setToDate(null)
    };

    // 
    const [showFilter, setShowFilter] = useState(false);
    const [showCustomDate, setShowCustomDate] = useState(false);
    const [showEmploymentType, setShowEmploymentType] = useState(false);
    const [showDepartment, setShowDepartment] = useState(false);
    const [showDateRange, setShowDateRange] = useState(false)

    const [dropdowns, setDropdowns] = useState({
        department1: false
    });
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const toggleDropdown = (dropdown) => {
        setDropdowns(prevState => ({
            ...prevState,
            [dropdown]: !prevState[dropdown]
        }));
    };





    const showFilterHandle = () => {
        setShowFilter(!showFilter)
    }
    const handleDateRangeClick = () => {
        setShowDateRange(!showDateRange)
        setShowCustomDate(false);
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

    // const selectOption = (dropdown, value) => {
    //     setFormData(prev => ({ ...prev, department1: value }));
    //     setSearchTerm(''); // Clear search term on select
    //     toggleDropdown(dropdown); // Hide dropdown after selection
    //     setDepartmentOpen(false)

    // };
    // Function to select an option and update the formDetails_2
    // const selectOption = (field, option) => {
    //     setFormDetails_2((prevState) => ({
    //         ...prevState,
    //         parentDepartment_2: option,
    //     }));
    //     setDepartmentOpen(false); // Close the dropdown after selection
    //     setDepartmentOpen2(false)

    //     // setIsDepartmentOpen(false); 
    // };
    const selectOption = (field, option) => {
        // alert(field)
        setFormDetails_2((prevState) => ({
            ...prevState,
            [field]: option, // Correctly update the field
        }));
        if (field === 'parentDepartment_2') {
            setDepartmentOpen(false); // Close parent department dropdown
        } else if (field === 'departmentHead_2') {
            setDepartmentOpen2(false); // Close department head dropdown
        }
    };

    const handleSubmit222 = () => {
        // Your custom logic here
        console.log("Button clicked!");
    };



    // popup
    const initialFormDetails_2 = {
        departmentName_2: '',
        departmentHead_2: '',
        parentDepartment_2: '',
    };

    const [formDetails_2, setFormDetails_2] = useState(initialFormDetails_2);
    const [dropdownVisibility_2, setDropdownVisibility_2] = useState({
        departmentDropdownOpen_2: false,
    });
    const [searchQuery_2, setSearchQuery_2] = useState('');

    const handleInputChangeForm_2 = (event) => {
        const { name, value } = event.target;
        setFormDetails_2((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSearchQueryChange_2 = (event) => {
        setSearchQuery_2(event.target.value);
    };

    const toggleDropdownVisibility_2 = (dropdownKey) => {
        setDropdownVisibility_2((prevState) => ({
            ...prevState,
            [dropdownKey]: !prevState[dropdownKey],
        }));
    };

    const handleDepartmentHeadSelection_2 = (head) => {
        setFormDetails_2((prevState) => ({
            ...prevState,
            departmentHead_2: head,
        }));
        toggleDropdownVisibility_2('departmentDropdownOpen_2');
    };
    // useEffect(() => {
    //     setFilteredEmployees(employees);
    // }, [handleRefresh])
    const [run, setRun] = useState(null)
    console.log('formDetails_2', formDetails_2)
    const handleSubmitForm_2 = (event) => {
        setRun(',')
        event.preventDefault();
        axios.post('https://hrms.dragnilifecare.in/public/api/department/create/update', {
            department_name: formDetails_2.departmentName_2,  // Email ko formData se lo
            department_head: formDetails_2.departmentHead_2, // Department ID ko formData se lo
            parent_department: formDetails_2.parentDepartment_2, // Description ko formData se lo
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setRun(null)
                // setEmployees(prevEmployees => [...prevEmployees, response.data.department]);
                console.log('response', response)
                // Optional: Form reset kar sakte ho
                // setFormData_3(initialFormDetails_2);
                toast.success(response.data.message || 'Department  Create successfully', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setTimeout(() => {
                    formDetails_2.departmentName_2 = ''  // Email ko formData se lo
                    formDetails_2.departmentHead_2 = '' // Department ID ko formData se lo
                    formDetails_2.parentDepartment_2 = ''
                    setShowPopup()
                }, 2000);
            })
            .catch(error => {
                toast.error('Error during create', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.error("Error during create/update:", error);
            });
    };
    // popup


    const [selectedDate, setSelectedDate] = useState(null);
    console.log('selectedDate', selectedDate)
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

    useEffect(() => {
        axios.post('https://hrms.dragnilifecare.in/public/api/department/list', {
            search: searchQuery,
            custom_date: selectedDate,
            fromDate: fromDate,
            toDate: toDate
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setEmployees(response.data.department);
                setFilteredEmployees(response.data.department); // filteredEmployees ko bhi sync karo
                console.log('response 🥳', response.data.department);
                setLoading(false);

            })
            .catch(error => {
                console.error("Error fetching data: ", error);
            });
    }, [token, run, selectedDate, fromDate, toDate, searchQuery]);
    // 
    const [searchQueryDepartment, setSearchQueryDepartment] = useState('');
    const handleSearchQueryChangeDepartment = (e) => setSearchQueryDepartment(e.target.value);

    const [searchQueryDepartment2, setSearchQueryDepartment2] = useState('');
    const handleSearchQueryChangeDepartment2 = (e) => setSearchQueryDepartment2(e.target.value);

    return (
        <div>

            <div className="EmpOn_main_container">
                <div className="EmpOn_header">
                    <div className="top-bar">
                        <h2>
                            <div className='span'><HiUserPlus /></div>
                            All Departments list <p>{currentEmployees.length} total</p>
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
                                placeholder='Search Department name...'
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
                                    {/* <div className="filter-option">
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
                                    </div> */}
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
                <div className="employee-table" id='Small_employee_table'>

                    <table id='Small_table'>
                        <thead>
                            <tr>
                                <th id='inputD'><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
                                <th> <div>Department Name
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
                                <th>Parent Department</th>

                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.map((emp, index) => (
                                <tr key={index} >
                                    <td>
                                        <input type="checkbox" checked={emp.isChecked} onChange={() => handleCheckboxChange(indexOfFirstEmployee + index)} />
                                    </td>
                                    {console.log(' emp.department_namelllll', emp.department_name)}
                                    <td onClick={() => navigate(`/departmentdetails/${emp.id}`)}>{emp.department_name || '-'}</td>
                                    <td onClick={() => navigate(`/departmentdetails/${emp.id}`)}>{emp.department_head || '-'}</td>
                                    <td onClick={() => navigate(`/departmentdetails/${emp.id}`)}>{emp.parent_department || '-'}</td>
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

                    {showPopup && (
                        <div className="popup-overlay">
                            <ToastContainer
                                position="top-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                closeOnClick
                                pauseOnHover
                                draggable
                                theme="error"
                            />
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
                                    <form className="upfom" onSubmit={handleSubmitForm_2}>
                                        <label className="redcolor">Department Name*</label>
                                        <input
                                            type="text"
                                            name="departmentName_2"
                                            placeholder="Enter Department Name"
                                            value={formDetails_2.departmentName_2}
                                            onChange={handleInputChangeForm_2}
                                            required
                                        />

                                        <label className="blackcolor1">Parent Department</label>
                                        <div className="dropdown  dropdown_2d">
                                            <div className="dropdown-button" ref={departmentButtonRef} onClick={toggleDepartment}>
                                                <div className='divselect'>{formDetails_2.parentDepartment_2 || "Select department"}</div>
                                                <span id="toggle_selectIcon"> {!isDepartmentOpen ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                            </div>
                                            {isDepartmentOpen && (
                                                <div className="dropdown-menu" ref={departmentRef}>
                                                    <input
                                                        type="search"
                                                        className="search22"
                                                        placeholder="Search department"
                                                        value={searchQueryDepartment}
                                                        id="searchDepartmentHead"
                                                        onChange={handleSearchQueryChangeDepartment}
                                                    />
                                                    <div className="dropdown_I">
                                                        {['Management', 'HR', 'Sales', 'IT'].filter(option =>
                                                            option.toLowerCase().includes(searchQueryDepartment.toLowerCase())
                                                        ).map(option => (
                                                            <div className="dropdown-item" onClick={() => selectOption('parentDepartment_2', option)} key={option}>
                                                                {option}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <label>Department Head</label>
                                        <div className="dropdown dropdown_2d">
                                            <div className="dropdown-button" ref={departmentButtonRef2} onClick={toggleDepartment2}>
                                                <div className='divselect'>{formDetails_2.departmentHead_2 || "Select department head"}</div>
                                                <span id="toggle_selectIcon"> {!isDepartmentOpen2 ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                            </div>
                                            {isDepartmentOpen2 && (
                                                <div className="dropdown-menu" ref={departmentRef2}>
                                                    <input
                                                        type="search"
                                                        className="search22"
                                                        placeholder="Search head of Department"
                                                        value={searchQueryDepartment2}
                                                        id="searchDepartmentHead"
                                                        onChange={handleSearchQueryChangeDepartment2}
                                                    />
                                                    <div className="dropdown_I">
                                                        {departmentHead.filter(option =>
                                                            option.toLowerCase().includes(searchQueryDepartment2.toLowerCase())
                                                        ).map(option => (
                                                            <div className="dropdown-item" onClick={() => selectOption('departmentHead_2', option)} key={option}>
                                                                {option}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        <div className="popupbtn" id="submitDepartmentFormButton_2">
                                            <button type="submit" >Submit
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9b9b9b" fill="none">
                                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                                    <path d="M10.5 8C10.5 8 13.5 10.946 13.5 12C13.5 13.0541 10.5 16 10.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
                                    className={currentPage === pageIndex + 1 ? 'activePageIndex' : ''}
                                    onClick={() => handlePageChange(pageIndex + 1)}
                                >
                                    {pageIndex + 1}
                                    {console.log('currentPage', pageIndex + 1)}
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

export default Department;