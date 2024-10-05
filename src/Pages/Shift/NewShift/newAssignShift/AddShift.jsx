import './AddShift.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { OutsideClick } from '../../../Employee_onboarding/AddEmployee/OutsideClick'
import { OutsideClick2 } from '../../../Department/DepartmentList/OutsideClick2';

const AddShift = ({ ClosePop }) => {
    const { isOpen: isDepartmentOpen, ref: departmentRef, buttonRef: departmentButtonRef, handleToggle: toggleDepartment, setIsOpen: setDepartmentOpen } = OutsideClick2();
    const { isOpen: isEmployeeOpen, ref: employeeRef, buttonRef: employeeButtonRef, handleToggle: toggleEmployee, setIsOpen: setEmployeeOpen } = OutsideClick();
    const { isOpen: isShiftOpen, ref: shiftRef, buttonRef: shiftButtonRef, handleToggle: toggleShift, setIsOpen: setShiftOpen } = OutsideClick();

    const [departments, setDepartments] = useState([]); // Store department list from API

    console.log('departments::', departments)

    const [formData, setFormData] = useState({
        shiftName: '',
        startTime: '',
        endTime: '',
        totalHours: 0,
        breakTime: 0,
        extraHours: 0,
        status: '' // Active/Inactive
    });
    const selectOption = (dropdown, value) => {
        setFormData(prevState => ({
            ...prevState,
            [dropdown]: value
        }));
        setShiftOpen(false)
    };
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        const startTime = new Date(`1970-01-01T${formData.startTime}`);
        const endTime = new Date(`1970-01-01T${formData.endTime}`);
        const totalHours = Math.abs(endTime - startTime) / 36e5; // Calculate hours
        const requestData = {
            shift: formData.shiftName,
            start_time: formData.startTime,
            end_time: formData.endTime,
            total_hours: totalHours,
            break_time: formData.breakTime,
            extra_hours: formData.extraHours ? '0' : '1',
            status: formData.status === 'Active' ? '0' : '1',
        };

        // Here you would typically send the requestData to your backend API
        // const response = await axios.post('/api/shift', requestData);
        // console.log(response.data);
    };

    return (
        <div className='NewAttendance_main'>
            <div className="blurBG"></div>
            <div className="formDivLeave">
                <div className="popForm">
                    <div className="Attendance_Head">
                        <h2> Add Shift</h2>
                        <div className='close_icon' onClick={ClosePop}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="form-container-Leave" onSubmit={handleSubmit}>
                        <form onSubmit={handleSubmit}>
                            <div id="employeeFormLeave">
                                <div className="form-group">
                                    {/* Shift Name */}
                                    <label htmlFor="shiftName" className='red'>Shift Name *</label>
                                    <input
                                        type="text"
                                        id="shiftName"
                                        value={formData.shiftName}
                                        onChange={handleChange}
                                        required
                                    />
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
                                    {/* Break Time */}
                                    <label htmlFor="breakTime" className=''>Break Time (minutes)</label>
                                    <input
                                        type="number"
                                        id="breakTime"
                                        value={formData.breakTime}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    {/* Extra Hours */}
                                    <label htmlFor="extraHours" className=''>Extra Hours</label>
                                    <input
                                        type="number"
                                        id="extraHours"
                                        value={formData.extraHours}
                                        onChange={handleChange}
                                        required
                                        min="0" // Optional: to prevent negative input
                                    />
                                </div>
                                <div className="form-group">
                                    {/* Shift Dropdown */}
                                    <label className=''>Status </label>
                                    <div className="dropdown">
                                        <div className="dropdown-button" ref={shiftButtonRef} onClick={toggleShift}>
                                            <div>{formData.status || "Select Shift"}</div>
                                            <span>{!isShiftOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                        </div>
                                        {isShiftOpen && (
                                            <div className="dropdown-menu" ref={shiftRef}>
                                              
                                                <div className="dropdown_I">
                                                    {['Active', 'Inactive'].filter(option =>
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

                            </div>
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

export default AddShift;
