import './NewAssignShift.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { OutsideClick } from '../../Employee_onboarding/AddEmployee/OutsideClick'
import { OutsideClick2 } from '../../Department/DepartmentList/OutsideClick2';

const NewAssignShift = ({ ClosePop }) => {

    const { isOpen: isDepartmentOpen, ref: departmentRef, buttonRef: departmentButtonRef, handleToggle: toggleDepartment, setIsOpen: setDepartmentOpen } = OutsideClick2();
    const { isOpen: isEmployeeOpen, ref: employeeRef, buttonRef: employeeButtonRef, handleToggle: toggleEmployee, setIsOpen: setEmployeeOpen } = OutsideClick();
    const { isOpen: isShiftOpen, ref: shiftRef, buttonRef: shiftButtonRef, handleToggle: toggleShift, setIsOpen: setShiftOpen } = OutsideClick();
    const [departments, setDepartments] = useState([]); // Store department list from API
    const [empList, setEmpList] = useState([]);
    console.log('departments::', departments)
    const [formData, setFormData] = useState({
        departmentName: '',
        departmentId: '',
        employeeName: '',
        employeeId: '',
        date: '',
        shift: '',
        startTime: '',
        endTime: '',
        status: false,// Active/Inactive
        extra_hours: false
    });
    const [searchQueryDepartment, setSearchQueryDepartment] = useState('');
    const [searchQueryEmployee, setSearchQueryEmployee] = useState('');
    const [searchQueryShift, setSearchQueryShift] = useState('');

    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value
        });
    };

    const selectOption = (dropdown, value, id) => {
        setFormData(prevState => ({
            ...prevState,
            [dropdown]: value
        }));
        if (dropdown === 'department') {
            // Full name ko store karo aur user_id ko bhi alag se store karo
            setFormData(prevState => ({
                ...prevState,
                departmentName: `${value.department_name}`, // Full name
                departmentId: value.id // user_id ko alag se store karo
            }));
        }
        if (dropdown === 'employee') {
            // Full name ko store karo aur user_id ko bhi alag se store karo
            setFormData(prevState => ({
                ...prevState,
                employeeName: `${value.first_name} ${value.last_name}`, // Full name
                employeeId: value.id // user_id ko alag se store karo
            }));
        }
        setDepartmentOpen(false)
        setEmployeeOpen(false)
        setShiftOpen(false)
    };

    const token = localStorage.getItem('access_token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        const requestData = {
            department_id: formData.departmentId,
            employee_id: formData.employeeId,
            shift: formData.shift,
            start_time: formData.startTime,
            end_time: formData.endTime,
            status: formData.status ? '0' : '1',
            extra_hours: formData.extra_hours ? '0' : '1'

        };

    };
    // Fetch departments from API when component mounts
    useEffect(() => {
        axios.post('https://devstronauts.com/public/api/department/list', {
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const data = response.data.department;
                setDepartments(data);
                // console.log('setDepartments❗setDepartments', data);

                // setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                // setLoading(false);
            });
    }, []);

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
            <div className="formDivLeave">
                <div className="popForm">
                    <div className="Attendance_Head">
                        <h2> New Assign Shift</h2>
                        <div className='close_icon' onClick={ClosePop}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="form-container-Leave" onSubmit={handleSubmit}>
                        <form >
                            <div id="employeeFormLeave">

                                {/* Department Dropdown */}
                                <div className="form-group">

                                    <label className='red'>Department *</label>
                                    <div className="dropdown">
                                        <div className="dropdown-button" ref={departmentButtonRef} onClick={toggleDepartment}>
                                            <div>{formData.departmentName || "Select department"}</div>
                                            <span>{!isDepartmentOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                        </div>
                                        {isDepartmentOpen && (
                                            <div className="dropdown-menu" ref={departmentRef}>
                                                <input
                                                    type="search"
                                                    placeholder="Search department"
                                                    id='searchDepartmentHead'
                                                    className='search22'
                                                    value={searchQueryDepartment}
                                                    onChange={(e) => setSearchQueryDepartment(e.target.value)}
                                                    required
                                                />
                                                <div className="dropdown_I">
                                                    {departments.filter(option =>
                                                        (`${option.department_name} ${option.department_name}`).toLowerCase().includes(searchQueryDepartment.toLowerCase())
                                                    ).map(option => (
                                                        <div
                                                            className="dropdown-item"
                                                            onClick={() => selectOption('department', option)}
                                                            key={option.id}
                                                        >
                                                            {option.department_name}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>
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
                                {/* Date Input */}
                                <div className="form-group">
                                    <label htmlFor="date" className='red'>Date *</label>
                                    <input
                                        type="date"
                                        id="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
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
                                <div className="form-group">
                                    {/* Start Time */}
                                    <label htmlFor="startTime" className='red'>Start Time *</label>
                                    <input
                                        type="time"
                                        id="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    {/* End Time */}
                                    <label htmlFor="endTime" className='red'>End Time *</label>
                                    <input
                                        type="time"
                                        id="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    {/* Status Switch */}
                                    <label className=''>Extra Hours </label>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            id="extra_hours"
                                            checked={formData.extra_hours}
                                            onChange={handleChange}
                                            required
                                        />
                                        <span className="slider round"></span>
                                    </label>

                                </div>
                                <div className="form-group">
                                    {/* Status Switch */}
                                    <label className=''>Publish</label>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            id="status"
                                            checked={formData.status}
                                            onChange={handleChange}
                                            required
                                        />
                                        <span className="slider round"></span>
                                    </label>

                                </div>
                            </div>
                            {/* Description Input */}

                            {/* Submit Button */}
                            <div className="buttons">
                                <button type="submit" className="submit-btn">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewAssignShift;
// 