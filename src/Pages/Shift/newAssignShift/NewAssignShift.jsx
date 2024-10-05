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

    const [formData, setFormData] = useState({
        departmentName: '',
        departmentId: '',
        employeeName: '',
        employeeId: '',
        date: '',
        shift: '',
        startTime: '',
        endTime: '',
        status: false // Active/Inactive
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
            [dropdown]: value,
            [`${dropdown}Id`]: id
        }));
        if (dropdown === 'departmentName') {
            setDepartmentOpen(false);
        } else if (dropdown === 'employeeName') {
            setEmployeeOpen(false);
        } else {
            setShiftOpen(false);
        }
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
            status: formData.status ? '0' : '1'
        };

        try {
            const response = await axios.post('https://devstronauts.com/public/api/shift/assign', requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                console.log('Success:', response.data);
                ClosePop();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className='NewAttendance_main'>
            <div className="blurBG"></div>
            <div className="formDivLeave">
                <div className="popForm">
                    <div className="Attendance_Head">
                        <h2>Add New Shift</h2>
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

                                    <label>Department *</label>
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
                                                />
                                                <div className="dropdown_I">
                                                    {['Management', 'HR', 'Sales', 'IT'].filter(option =>
                                                        option.toLowerCase().includes(searchQueryDepartment.toLowerCase())
                                                    ).map((option, id) => (
                                                        <div className="dropdown-item" onClick={() => selectOption('departmentName', option, id)} key={id}>
                                                            {option}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                </div>
                                <div className="form-group">
                                    {/* Employee Dropdown */}
                                    <label>Employee *</label>
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
                                                />
                                                <div className="dropdown_I">
                                                    {['John Doe', 'Jane Smith', 'Michael Brown'].filter(option =>
                                                        option.toLowerCase().includes(searchQueryEmployee.toLowerCase())
                                                    ).map((option, id) => (
                                                        <div className="dropdown-item" onClick={() => selectOption('employeeName', option, id)} key={id}>
                                                            {option}
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
                                    />
                                </div>
                                <div className="form-group">
                                    {/* Shift Dropdown */}
                                    <label>Shift *</label>
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
                                    <label htmlFor="startTime">Start Time *</label>
                                    <input
                                        type="time"
                                        id="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    {/* End Time */}
                                    <label htmlFor="endTime">End Time *</label>
                                    <input
                                        type="time"
                                        id="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    {/* Status Switch */}
                                    <label>Shift Active</label>
                                    <label className="switch">
                                        <input
                                            type="checkbox"
                                            id="status"
                                            checked={formData.status}
                                            onChange={handleChange}
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
