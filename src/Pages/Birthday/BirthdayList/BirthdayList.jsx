import { useState, useEffect } from 'react';
import { HiUserPlus } from "react-icons/hi2";;
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { BiRevision } from "react-icons/bi";
import { IoFilterSharp, IoSearchSharp } from "react-icons/io5";
import { TiArrowUnsorted } from "react-icons/ti";
import { MdDateRange } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { OutsideClick } from '../../../components/OutSideClick';
import axios from 'axios';

const BirthdayList = () => {
    const { isOpen: isFilterOpen2, ref: filterRef2, buttonRef: filterButtonRef2, handleToggle: toggleFilter2 } = OutsideClick();

    const [hidImport, setHidImport] = useState(true);
    const [employees, setEmployees] = useState([
        // { deptName: "001", deptHead: "Abc@gmail.com", parentDept: "Nandan", subparent: "akash", parent: "9876543456", parent1: "20-09-2024" },
        // { deptName: "002", deptHead: "Nandan@gmail.com", parentDept: "Rahul", subparent: "akash", parent: "9876543456", parent1: "20-09-2024" },
        // { deptName: "003", deptHead: "Vikas@gmail.com", parentDept: "Vikas", subparent: "akash", parent: "9876543456", parent1: "20-09-2024" },
        // { deptName: "004", deptHead: "Paartho@gmail.com", parentDept: "Rahul", subparent: "akash", parent: "9876543456", parent1: "20-09-2024" },
        // { deptName: "005", deptHead: "Rahul@gmail.com", parentDept: "Jayshri", subparent: "akash", parent: "9876543456", parent1: "20-09-2024" },
        // { deptName: "006", deptHead: "Jayshri@gmail.com", parentDept: "Abc", subparent: "akash", parent: "9876543456", parent1: "20-09-2024" },
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
        // navigate('/departmentdetails');
    }
    const token = localStorage.getItem('access_token');


    useEffect(() => {
        axios.post('https://devstronauts.com/public/api/employee/list', {
            search: searchQuery,
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                setEmployees(response.data.result);
                // setFilteredEmployees(response.data.result);  // Initially showing all employees
                const employeeData = response.data.result;
                setEmployees(employeeData);
                setFilteredEmployees(filterAndSortEmployees(employeeData));
                console.log('bbbbbb', response.data.result)
            })
            .catch(error => {
                console.error("Error fetching job data: ", error);
            });
    }, [searchQuery]);

    const filterAndSortEmployees = (employeeData) => {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth(); // 0-based index
        const currentDay = currentDate.getDate();

        // Sort employees by upcoming birthday
        const sortedEmployees = employeeData.sort((a, b) => {
            const dobA = new Date(a.date_of_birth);
            const dobB = new Date(b.date_of_birth);

            // Adjust the year for comparison
            dobA.setFullYear(currentDate.getFullYear());
            dobB.setFullYear(currentDate.getFullYear());

            // If the birthday has already occurred this year, compare with next year
            if (dobA < currentDate) {
                dobA.setFullYear(currentDate.getFullYear() + 1);
            }
            if (dobB < currentDate) {
                dobB.setFullYear(currentDate.getFullYear() + 1);
            }

            return dobA - dobB; // Sort by upcoming birthday
        });

        return sortedEmployees;
    };


    return (
        <div>
            <div className="EmpOn_main_container">
                <div className="EmpOn_header">
                    <div className="top-bar">
                        <h2>
                            <div className='span'><HiUserPlus /></div>
                            All Birthday List <p>08 total</p>
                        </h2>
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
            <div className="EmpOn_Second_Head" id="birthhead">
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
                                placeholder='Search Birthday name...'
                                value={searchQuery}
                                onChange={handleSearchChange}
                                onKeyUp={handleFilterChange}
                            />
                        </div>
                    </div>
                    {/* <div className="filter divRight">
                        <div className='div_box' onClick={toggleFilter2} ref={filterButtonRef2}>
                            <span><IoFilterSharp /></span>
                        </div>
                    </div> */}
                </div>
            </div>
            {/* All Employee  List*/}
            <div className="allEmployeeList" id="bdaytab">
                {/* <div className="head">
                </div> */}
                <div className="employee-table">

                    <table>
                        <thead>
                            <tr>
                                <th><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
                                <th> <div>Employee Id<span><TiArrowUnsorted /></span></div></th>
                                <th>Email Id</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone Number</th>
                                <th>Date of birth</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.map((emp, index) => (
                                <tr key={index} onClick={() => handleDepartmentClick1(DepartmentDetails)}>
                                    <td><input type="checkbox" checked={emp.isChecked} onChange={() => handleCheckboxChange(indexOfFirstEmployee + index)} /></td>
                                    <td onClick={() => navigate(`/employee-details/${emp.user_id}`)}>{emp.employee_id}</td>
                                    <td onClick={() => navigate(`/employee-details/${emp.user_id}`)} className='td'>{emp.email}</td>
                                    <td onClick={() => navigate(`/employee-details/${emp.user_id}`)}>{emp.first_name}</td>
                                    <td onClick={() => navigate(`/employee-details/${emp.user_id}`)}>{emp.last_name}</td>
                                    <td onClick={() => navigate(`/employee-details/${emp.user_id}`)}>{emp.mobile_no}</td>
                                    <td onClick={() => navigate(`/employee-details/${emp.user_id}`)}>{emp.date_of_birth}</td>  {/* 1990-05-15 */}
                                </tr>
                            ))}
                        </tbody>
                    </table>
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

export default BirthdayList;