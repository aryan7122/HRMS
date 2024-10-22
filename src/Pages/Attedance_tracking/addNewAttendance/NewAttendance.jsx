import './NewAttendance.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { OutsideClick } from '../../Employee_onboarding/AddEmployee/OutsideClick'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
const NewAttendance = ({ ClosePop }) => {
    const { isOpen: isEmployeeOpen, ref: employeeRef, buttonRef: employeeButtonRef, handleToggle: toggleEmployee, setIsOpen: setEmployeeOpen } = OutsideClick();
    const { isOpen: isShiftOpen, ref: shiftRef, buttonRef: shiftButtonRef, handleToggle: toggleShift, setIsOpen: setShiftOpen } = OutsideClick();
    const { isOpen: isStatusOpen, ref: statusRef, buttonRef: statusButtonRef, handleToggle: toggleStatus, setIsOpen: setStatusOpen } = OutsideClick();

    const [empList, setEmpList] = useState([]);

    const [formData, setFormData] = useState({
        employeeName: '',
        employeeId: '',
        date: '',
        punchIn: '',
        punchOut: '',
        status: '',
        shift: '',

    });
    const [attendanceData, setAttendanceData] = useState([]); // Array to hold attendance data

    // Fetch existing attendance data from JSONBin
    const [searchQueryEmployee, setSearchQueryEmployee] = useState('');
    const [searchQueryShift, setSearchQueryShift] = useState('');
    console.log('formData', formData.status == 'Half Day' ? 2 : 0)
    const selectOption = (dropdown, value, id) => {
        setFormData(prevState => ({
            ...prevState,
            [dropdown]: value
        }));
        if (dropdown === 'employee') {
            // Full name ko store karo aur user_id ko bhi alag se store karo
            setFormData(prevState => ({
                ...prevState,
                employeeName: `${value.first_name} ${value.last_name}`, // Full name
                employeeId: value.id // user_id ko alag se store karo
            }));
        }
        setEmployeeOpen(false)
        setShiftOpen(false)
        setStatusOpen(false)
    };

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };
    const [loading, setLoading] = useState(false);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        // Add new data to the existing attendance data array
        axios.post(`https://devstronauts.com/public/api/attendance/create/update`,
            {
                user_name: formData.employeeName,
                user_id: formData.employeeId,
                date: formData.date,
                shift_id: formData.employeeId,
                shift_name: formData.shift,
                punch_in: formData.punchIn,
                punch_out: formData.punchOut,
                overtime: formData.experience,
                status: formData.status == 'Half Day' ? 2 : 0
            }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                console.log('Attendance Create successfully :', response);
                // alert(error)
                if (response.status === 200) {
                    toast.success(response.data.message || 'Attendance Create successfully', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false)
                    setTimeout(() => {
                        // etShowAlert(false)
                        // navigate('/all-job-list')
                        ClosePop();
                    }, 2000);
                }
                // Clear the form after successful submission
              
            })
            .catch(error => {
                setLoading(false)
                console.error('Error:', error);
                // const er = error.message
               
                // alert(error)
                
                setTimeout(() => {
                    // setShowAlertError(false)
                    ClosePop();
                }, 2000);
                toast.error(error.message || 'Error during create', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });

        // // Reset form data after submission
        // setFormData({
        //     employeeName: '',
        //     date: '',
        //     punchIn: '',
        //     punchOut: ''
        // });

        // Close the popup after submission
      
    };



    const [selectedStartDate, setSelectedStartDate] = useState(null);

    const handleDateChange = (event) => {
        const date = new Date(event.target.value);
        const formattedDate = date.toLocaleDateString('en-CA'); // yyyy-mm-dd format
        setSelectedStartDate(formattedDate);
    };
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        axios.post('https://devstronauts.com/public/api/employee/list', {
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const employees = response.data.result;

                // Department heads ko extract karo
                // const departmentHeads = employees
                //     .map(emp => `${emp.first_name} ${emp.last_name}`);

                setEmpList(employees);
                console.log('Department Heads:❗', employees);

                // setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                // setLoading(false);
            });
    }, []);

    return (
        <div className='NewAttendance_main'>
            <div className="blurBG"></div>
            <div className="formDiv">
                <div className="popForm">
                    <div className="Attendance_Head">
                        <h2>New Attendance</h2>
                        <div className='close_icon' onClick={ClosePop}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="form-container">
                        <form id="employeeForm" onSubmit={handleSubmit}>
                            <div className="form-group">
                                {/* Employee Dropdown */}
                                <label className='red'>Employee *</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" ref={employeeButtonRef} onClick={toggleEmployee}>
                                        <div>{formData.employeeName || "Select employee"}</div>
                                        <span>{!isEmployeeOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                    </div>
                                    {isEmployeeOpen && (
                                        <div className="dropdown-menu" ref={employeeRef}>
                                            <input
                                                type="search"
                                                id='searchDepartmentHead'
                                                placeholder="Search employee"
                                                value={searchQueryEmployee}
                                                onChange={(e) => setSearchQueryEmployee(e.target.value)}
                                                required
                                            />
                                            <div className="dropdown_I">
                                                {empList.filter(option =>
                                                    (`${option.first_name} ${option.first_name}`).toLowerCase().includes(searchQueryEmployee.toLowerCase())
                                                ).map(option => (
                                                    <div
                                                        className="dropdown-item"
                                                        onClick={() => selectOption('employee', option)}
                                                        key={option.id}
                                                    >
                                                        {option.first_name + ' ' + option.last_name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                {/* Shift Dropdown */}
                                <label className='red'>Shift *</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" ref={shiftButtonRef} onClick={toggleShift}>
                                        <div>{formData.shift || "Select Shift"}</div>
                                        <span>{!isShiftOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                    </div>
                                    {isShiftOpen && (
                                        <div className="dropdown-menu" ref={shiftRef}>
                                            <input
                                                type="search"
                                                placeholder="Search shift"
                                                value={searchQueryShift}
                                                id='searchDepartmentHead'
                                                onChange={(e) => setSearchQueryShift(e.target.value)}
                                                required
                                            />
                                            <div className="dropdown_I">
                                                {['Morning', 'Evening', 'Night'].filter(option =>
                                                    option.toLowerCase().includes(searchQueryShift.toLowerCase())
                                                ).map(option => (
                                                    <div className="dropdown-item" onClick={() => selectOption('shift', option)} key={option}>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="employeeName" className='red'>Employee Name*</label>
                                <input
                                    type="text"
                                    id="employeeName"
                                    placeholder="Enter full name of employee"
                                    required
                                    value={formData.employeeName}
                                    onChange={handleChange}
                                />
                            </div> */}
                            {/* <div className="form-group">
                                <label htmlFor="date" className='red'>Date*</label>
                                <input
                                    type="date"
                                    id="date"
                                    required
                                    value={formData.date}
                                    onChange={handleChange}
                                    className='input'
                                />
                            </div> */}
                            <div className="form-group grupdate2">
                                <label htmlFor="date" className='red'>Date*</label>
                                <div className="dropdown-content date-h" id=''>
                                    <div className='date_tittle'>
                                        <div className='title__show__d'>
                                            {!selectedStartDate ? <span> Enter Start Date</span> : selectedStartDate}
                                        </div>
                                        <div className='date_icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                                <path d="M18 2V4M6 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M3.5 8H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M3 8H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <input type="date" name="date" id="" onChange={handleDateChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="punchIn">Punch In</label>
                                <input
                                    type="time"
                                    id="punchIn"
                                    required
                                    value={formData.punchIn}
                                    onChange={handleChange}
                                    className='input'
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="punchOut">Punch Out</label>
                                <input
                                    type="time"
                                    id="punchOut"
                                    required
                                    value={formData.punchOut}
                                    onChange={handleChange}
                                    className='input'
                                />
                            </div>
                            <div className="form-group">
                                {/* Shift Dropdown */}
                                <label className=''>Status </label>
                                <div className="dropdown">
                                    <div className="dropdown-button" ref={statusButtonRef} onClick={toggleStatus}>
                                        <div>{formData.status || "Select Status"}</div>
                                        <span>{!isShiftOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                    </div>
                                    {isStatusOpen && (
                                        <div className="dropdown-menu" ref={statusRef}>

                                            <div className="dropdown_I">
                                                {['Present', 'Half Day'].filter(option =>
                                                    option.toLowerCase()
                                                ).map(option => (
                                                    <div className="dropdown-item" onClick={() => selectOption('status', option)} key={option}>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="buttons">
                                <button type="submit" className="submit-btn">Submit</button>
                                {/* <button type="submit">Submit</button> */}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewAttendance;
