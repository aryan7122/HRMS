import './NewAttendance.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { OutsideClick } from '../../Employee_onboarding/AddEmployee/OutsideClick'
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";
import DatePicker from '../../../utils/Form/DatePicker';
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
    const [startDate, setStartDate] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

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
        axios.post(`https://hrms.dragnilifecare.in/public/api/attendance/create/update`,
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
    const token = localStorage.getItem('access_token');

    useEffect(() => {
        axios.post('https://hrms.dragnilifecare.in/public/api/employee/list', {
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
                            <DatePicker label="Date" onDateChange={handleStartDateChange} />

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
