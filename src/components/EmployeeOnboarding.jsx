import { useState } from 'react';
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


import '../styles/EmployeeOnboarding.scss';

const EmployeeOnboarding = () => {
    const [hidImport, setHidImport] = useState(true);

    const handleHidImport = () => {
        setHidImport(!hidImport);
        // alert("Import button clicked");
    };


    // 
    const [employees, setEmployees] = useState([
        { id: "EMP - 0078659", firstName: "Satyam", lastName: "Singh", email: "ananya.singh@example.com", phone: "+918555031082", department: "Human Resources", dateOfJoining: "16-May-2024", status: "Active", isChecked: false },
        { id: "EMP - 0078659", firstName: "Sumit", lastName: "Yadav", email: "vijay.shah@example.com", phone: "+917555232340", department: "Maintenance", dateOfJoining: "16-May-2024", status: "Inactive", isChecked: false },
        { id: "EMP - 0078659", firstName: "Wasif", lastName: "Hussein", email: "arjun.reddy@example.com", phone: "+918555079422", department: "Manning", dateOfJoining: "16-May-2024", status: "Resigned", isChecked: false },
        { id: "EMP - 0078659", firstName: "Satyam", lastName: "Singh", email: "aarti.pandey@example.com", phone: "+919955565042", department: "Human Resources", dateOfJoining: "16-May-2024", status: "Terminated", isChecked: false },
        { id: "EMP - 0078659", firstName: "Sumit", lastName: "Yadav", email: "priya.sharma@example.com", phone: "+918553613128", department: "Operations", dateOfJoining: "16-May-2024", status: "Notice Period", isChecked: false },
        { id: "EMP - 0078659", firstName: "Wasif", lastName: "Hussein", email: "kavita.agarwal@example.com", phone: "+918555234569", department: "Engineering", dateOfJoining: "16-May-2024", status: "Inactive", isChecked: false },
        { id: "EMP - 0078659", firstName: "Satyam", lastName: "Singh", email: "raj.malhotra@example.com", phone: "+918555205575", department: "Manning", dateOfJoining: "16-May-2024", status: "Active", isChecked: false },
        { id: "EMP - 0078659", firstName: "Sumit", lastName: "Yadav", email: "rahul.mishra@example.com", phone: "+919255544527", department: "Human Resources", dateOfJoining: "16-May-2024", status: "Inactive", isChecked: false },
        { id: "EMP - 0078659", firstName: "Wasif", lastName: "Hussein", email: "meera.verma@example.com", phone: "+919555566270", department: "Human Resources", dateOfJoining: "16-May-2024", status: "Inactive", isChecked: false },
        { id: "EMP - 0078659", firstName: "Wasif", lastName: "Hussein", email: "manish.jain@example.com", phone: "+917555639758", department: "HSEQ", dateOfJoining: "16-May-2024", status: "Inactive", isChecked: false },
        { id: "EMP - 0078659", firstName: "Wasif", lastName: "Hussein", email: "neha.patel@example.com", phone: "+919655516575", department: "IT", dateOfJoining: "16-May-2024", status: "Notice Period", isChecked: false }
    ]);

    const [selectAll, setSelectAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleSelectAll = () => {
        const updatedEmployees = employees.map(emp => ({
            ...emp,
            isChecked: !selectAll
        }));
        setEmployees(updatedEmployees);
        setSelectAll(!selectAll);
    };

    const handleCheckboxChange = (index) => {
        const updatedEmployees = [...employees];
        updatedEmployees[index].isChecked = !updatedEmployees[index].isChecked;
        setEmployees(updatedEmployees);
    };

    const indexOfLastEmployee = currentPage * rowsPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - rowsPerPage;
    const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);

    const totalPages = Math.ceil(employees.length / rowsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleRowsPerPageChange = (e) => {
        setRowsPerPage(Number(e.target.value));
        setCurrentPage(1);
    };
    // 

    const statuses = ['Active', 'Inactive', 'Resigned', 'Terminated', 'Notice Period'];

    const [isOpen, setIsOpen] = useState(true);

    const handleStatusChange = (index, newStatus) => {
        const updatedEmployees = [...employees];
        updatedEmployees[index].status = newStatus;
        setEmployees(updatedEmployees);
        setIsOpen(!isOpen);
    };
    //

    return (
        <div>
            <div className="EmpOn_main_container">
                <div className="EmpOn_header">
                    <div className="top-bar">
                        <h2>
                            <div className='span'><HiUserPlus /></div>
                            Add Employee <p>102 total</p>
                        </h2>
                        <div className="Emp_Head_Right">
                            <div className="addEmp">
                                <p><span><IoMdAdd /></span> Add New Employee</p>
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

                <div className="left">
                    <div className="all">
                        <div className='listActive'>
                            <span> <FaList /></span>All
                        </div>
                    </div>
                    <div className="active">
                        <div>
                            <span><PiCheckSquare /></span>Active
                        </div>
                    </div>
                    <div className="inactive">
                        <div>
                            <span> <IoIosCloseCircleOutline /> </span>Inactive
                        </div>
                    </div>
                    <div className="resigned">
                        <div>
                            <span> <GiBackstab /> </span>Resigned
                        </div>
                    </div>
                    <div className="terminated">
                        <div>
                            <span><FaPersonWalkingArrowLoopLeft /></span>Terminated
                        </div>
                    </div>
                    <div className="notice_period">
                        <div>
                            <span><GiNotebook /></span>Notice Period
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="refresh">
                        <div>
                            <span><BiRevision /></span>
                        </div>
                    </div>
                    <div className="search">
                        <div className='search'>
                            <span className='search_icon'><IoSearchSharp /></span>
                            <input type="search" name="search" placeholder='Search Employee name, phone number...' />
                        </div>
                    </div>
                    <div className="filter">
                        <div>
                            <span><IoFilterSharp /></span>
                        </div>
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
                                <th><input type="checkbox" checked={selectAll} onChange={handleSelectAll} /></th>
                                <th> <div>Employee ID<span><TiArrowUnsorted /></span></div></th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email ID</th>
                                <th>Phone Number</th>
                                <th><div>Department <span><TiArrowUnsorted /></span></div></th>
                                <th>Date of Joining</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentEmployees.map((emp, index) => (
                                <tr key={index}>
                                    <td><input type="checkbox" checked={emp.isChecked} onChange={() => handleCheckboxChange(indexOfFirstEmployee + index)} /></td>
                                    <td>{emp.id}</td>
                                    <td>{emp.firstName}</td>
                                    <td>{emp.lastName}</td>
                                    <td>{emp.email}</td>
                                    <td>{emp.phone}</td>
                                    <td>{emp.department}</td>
                                    <td>{emp.dateOfJoining}</td>
                                    {/* <td>
                                        <select value={emp.status} onChange={(e) => {
                                            const updatedEmployees = [...employees];
                                            updatedEmployees[index].status = e.target.value;
                                            setEmployees(updatedEmployees);
                                        }}>
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                            <option value="Resigned">Resigned</option>
                                            <option value="Terminated">Terminated</option>
                                            <option value="Notice Period">Notice Period</option>
                                        </select>
                                    </td> */}
                                    <td>
                                        <div className="status-dropdown">
                                            <div key={index} className="status-container">
                                                <div
                                                    className={`status-display ${emp.status.toLowerCase().replace(' ', '-')}`}
                                                    onClick={() => setIsOpen(isOpen === index ? null : index)}
                                                >
                                                    <span className={`left_dot ${emp.status.toLowerCase().replace(' ', '-')}`}
                                                    ></span>
                                                    {emp.status}
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
        </div>
    );
}

export default EmployeeOnboarding;
