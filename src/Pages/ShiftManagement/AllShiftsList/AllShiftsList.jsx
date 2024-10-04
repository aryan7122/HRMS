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
import { OutsideClick } from '../../../components/OutSideClick';
import OutsideClick4 from '../../Employee_onboarding/AllEmployeeList/OutSideClick4';
import axios from 'axios';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

import './AllShiftsList.scss';
import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllShiftsList = () => {
  const { isOpen: isFilterOpen, ref: filterRef, buttonRef: filterButtonRef, handleToggle: toggleFilter } = OutsideClick();
  const { isOpen: isFilterOpen2, ref: filterRef2, buttonRef: filterButtonRef2, handleToggle: toggleFilter2 } = OutsideClick();
  const { isOpen: isFilterOpen3, ref: filterRef3, buttonRef: filterButtonRef3, handleToggle: toggleFilter3 } = OutsideClick();
  // const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const { isOpen: isFilterOpen4, ref: filterRef4, buttonRef: filterButtonRef4, handleToggle: toggleFilter4 } = OutsideClick4();
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
    // { id: "EMP - 0078659", firstName: "Satyam", lastName: "Singh", email: "ananya.singh@example.com", phone: "+918555031082", department: "Human Resources", dateOfJoining: "16-May-2024", status: "Active", isChecked: false },
    // { id: "EMP - 0078659", firstName: "Sumit", lastName: "Yadav", email: "vijay.shah@example.com", phone: "+917555232340", department: "Maintenance", dateOfJoining: "16-May-2024", status: "Inactive", isChecked: false },
    // { id: "EMP - 0078659", firstName: "Wasif", lastName: "Hussein", email: "arjun.reddy@example.com", phone: "+918555079422", department: "Manning", dateOfJoining: "16-May-2024", status: "Resigned", isChecked: false },
    // { id: "EMP - 0078659", firstName: "Satyam", lastName: "Singh", email: "aarti.pandey@example.com", phone: "+919955565042", department: "Human Resources", dateOfJoining: "16-May-2024", status: "Terminated", isChecked: false },
    // { id: "EMP - 0078659", firstName: "Sumit", lastName: "Yadav", email: "priya.sharma@example.com", phone: "+918553613128", department: "Operations", dateOfJoining: "16-May-2024", status: "Notice Period", isChecked: false },
    // { id: "EMP - 0078659", firstName: "Wasif", lastName: "Hussein", email: "kavita.agarwal@example.com", phone: "+918555234569", department: "Engineering", dateOfJoining: "16-May-2024", status: "Inactive", isChecked: false },
    // { id: "EMP - 0078659", firstName: "Satyam", lastName: "Singh", email: "raj.malhotra@example.com", phone: "+918555205575", department: "Manning", dateOfJoining: "16-May-2024", status: "Active", isChecked: false },
    // { id: "EMP - 0078659", firstName: "Sumit", lastName: "Yadav", email: "rahul.mishra@example.com", phone: "+919255544527", department: "Human Resources", dateOfJoining: "16-May-2024", status: "Inactive", isChecked: false },
    // { id: "EMP - 0078659", firstName: "Wasif", lastName: "Hussein", email: "meera.verma@example.com", phone: "+919555566270", department: "Human Resources", dateOfJoining: "16-May-2024", status: "Inactive", isChecked: false },
    // { id: "EMP - 0078659", firstName: "Wasif", lastName: "Hussein", email: "manish.jain@example.com", phone: "+917555639758", department: "HSEQ", dateOfJoining: "16-May-2024", status: "Inactive", isChecked: false },
    // { id: "EMP - 0078659", firstName: "Wasif", lastName: "Hussein", email: "neha.patel@example.com", phone: "+919655516575", department: "IT", dateOfJoining: "16-May-2024", status: "Notice Period", isChecked: false }
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


  const statuses = ['Active', 'Inactive'];
  const departments = ['All', 'Human Resources', 'Maintenance', 'Manning', 'Operations', 'Engineering', 'IT', 'HSEQ'];
  const employeeType = ['All', 'Permanent', 'On Contract', 'Intern', 'Trainee'];


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
    setSelectedDepartmentId(null)
    setSelectedDate(null)
    setSelectedFilter(null)
    setEmploymentType(null)
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

  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    // Format the date as yyyy/MM/dd
    const formattedDate = date.toLocaleDateString('en-CA'); // yyyy-mm-dd format
    setSelectedDate(formattedDate);
  };
  // Handle change when a radio button is clicked
  const handleEmploymentTypeChange = (event) => {
    setEmploymentType(event.target.value);
    console.log('Selected Employment Type:', event.target.value); // Debugging purpose
    // toggleFilter()
  };

  const [selectedDepartmentId, setSelectedDepartmentId] = useState(''); // State to store selected department

  const handleDepartmentChange = (event) => {
    setSelectedDepartmentId(event.target.value); // Update state on radio button change
  };

  // api get6 list
  const token = localStorage.getItem('access_token');
  // console.log('token:', token)

  useEffect(() => {
    axios.post('https://devstronauts.com/public/api/shift/list', {
      search: searchQuery,
      employee_status: selectedFilter,   //
      employment_type: employmentType,
      department_id: selectedDepartmentId,
      custom_date: selectedDate
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        // setEmployees(response.data.job_opening);
        setEmployees(response.data.result)
        setFilteredEmployees(response.data.result); // filteredEmployees ko bhi sync karo
        console.log('response 🥳❗🥳', response.data.result);
        // setDepartmentdetails2(response.data.result.department_id)
        setLoading(false);
        // setSms()
        setError(false)
      })
      .catch(error => {
        console.error("Error fetching data: ", error);
        setError(true)

      });
  }, [statusId, statusNew, token, sms, searchQuery, selectedFilter, employmentType, selectedDate, selectedDepartmentId, open]);

  //  
  const [departmentdetails3, setDepartmentdetails3] = useState('');
  const [departmentdetails2, setDepartmentdetails2] = useState('');
  // console.log('departmentdetails3 ::', departmentdetails3)
  useEffect(() => {
    // if (departmentdetails) {  // Ensure jobData is available before making this call
    axios.post('https://devstronauts.com/public/api/get-user', {
      enteredbyid: departmentdetails2
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => {
        // setJobData2(response.data.created_by);
        console.log('👉👉👉👉', response.data.created_by)
        setDepartmentdetails3(response.data.department_id)
      })
      .catch(error => {
        console.error("Error fetching user data: ", error);
      });
    // }
  }, [token]);
  // 
  const ConformOk = () => {
    setTimeout(() => {
      setOpen(false)
    }, 400);
    if (statusId && statusNew) {

      axios.post('https://devstronauts.com/public/api/shift/status/update', {
        emp_id: statusId,
        employee_status: statusNew
      }, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => {
          // setUpdatingEmpId(statusId);
          setSms(`Status update successfully`)
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
          // setShowAlertError(true)
          // setTimeout(() => {
          //     setShowAlertError(false)
          // }, 4000);

          console.error("Error fetching data: ", error);
        });
    }
  }
  // 
  const handleStatusChange = (index, newStatus) => {
    if (newStatus == 'Inactive') {
      setStatusNew(0)
    } else {
      setStatusNew(1)
    }
    const updatedEmployees = [...filteredEmployees];
    updatedEmployees[index].status = newStatus;
    setFilteredEmployees(updatedEmployees);
    setIsOpen(null);
    setSms('')
    setOpen(true)
  };



  console.log('statusNew', statusNew)
  if (error || !employees) {
    // return <div id="notFounPageID"><img src="https://media2.giphy.com/media/C21GGDOpKT6Z4VuXyn/200w.gif" alt="Error loading data" /></div>;
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
      <div className="EmpOn_main_container">
        <div className="EmpOn_header">
          <div className="top-bar">
            <h2>
              <div className='span'><HiUserPlus /></div>
              All Shifts list <p>{currentEmployees.length} total</p>
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
        {/* <div className="head">
                </div> */}
        <div className="employee-table">

          <table>
            <thead>
              <tr>
                <th>
                  <input type="checkbox" checked={selectAll} onChange={handleSelectAll} />
                  {/* {allDel &&
                                        <span id='deleteThis'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ff0000" fill="none">
                                                <path d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                <path d="M9 11.7349H15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                <path d="M10.5 15.6543H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                                <path d="M3 5.5H21M16.0555 5.5L15.3729 4.09173C14.9194 3.15626 14.6926 2.68852 14.3015 2.39681C14.2148 2.3321 14.1229 2.27454 14.0268 2.2247C13.5937 2 13.0739 2 12.0343 2C10.9686 2 10.4358 2 9.99549 2.23412C9.89791 2.28601 9.80479 2.3459 9.7171 2.41317C9.32145 2.7167 9.10044 3.20155 8.65842 4.17126L8.05273 5.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                            </svg>
                                        </span>
                                    } */}
                </th>
                <th> <div>Shift Name<span><TiArrowUnsorted /></span></div></th>
                <th>Start time</th>
                <th>End Time</th>
                <th>No. of Employees</th>
                <th>Shift Days</th>
                <th>Department</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.map((emp, index) => (
                <tr key={index}>
                  <td>
                    <input type="checkbox" checked={emp.isChecked} onChange={() => handleCheckboxChange(indexOfFirstEmployee + index)} />
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
                  <td onClick={() => navigate(`/employee-details/${emp.user_id}`)}>{emp.shift}</td>
                  <td onClick={() => navigate(`/employee-details/${emp.user_id}`)}>{emp.start_time}</td>
                  <td onClick={() => navigate(`/employee-details/${emp.user_id}`)}>{emp.end_time}</td>
                  <td onClick={() => navigate(`/employee-details/${emp.user_id}`)}>{emp.no_of_emp}</td>
                  <td onClick={() => navigate(`/employee-details/${emp.user_id}`)}>{emp.days}</td>
                  <td onClick={() => navigate(`/employee-details/${emp.user_id}`)}>{emp.department.department_name}</td>
                  <td>
                    <div className="status-dropdown">
                      <div key={index} className="status-container">
                        <div onClick={toggleFilter4} ref={filterButtonRef4}>
                          <div
                            className={`status-display ${emp.employee_status == 1 ? 'active' : 'inactive'}`}
                            onClick={() => setIsOpen(isOpen === index ? null : index)}
                          >
                            <span className={`left_dot ${emp.employee_status == 1 ? 'active' : 'inactive'}`}></span>
                            <div onClick={() => {
                              UpdateStatusHndle(emp.id);
                            }}>
                              <div className="EmpS" >
                                {emp.employee_status == 1 ? 'Active' : 'Inactive'}
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
    </div >
  );
};

export default AllShiftsList;
// 