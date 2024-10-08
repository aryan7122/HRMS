import './AddShift.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { OutsideClick } from '../../../Employee_onboarding/AddEmployee/OutsideClick'
import { OutsideClick2 } from '../../../Department/DepartmentList/OutsideClick2';

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        totalHours: null,
        breakTime: null,
        extraHours: null,
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
    const token = localStorage.getItem('access_token');
    const [loading, setLoading] = useState(false); // Track loading state

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (loading) return; // If loading, prevent another submit

        setLoading(true); // Set loading to true when API request starts

        const requestData = {
            // id:4,
            shift_name: formData.shiftName,
            start_time: formData.startTime,
            end_time: formData.endTime,
            break_time: formData.breakTime,
            extra_hours: formData.extraHours || '0', // Default to '0' if null
            status: formData.status === 'Active' ? '0' : '1',
        };

        console.log('Form Data requestData:::::', requestData);

        try {
            const response = await axios.post(`https://devstronauts.com/public/api/shift/master/create/update`, requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                toast.success(response.data.message || 'Created successfully.', {
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
                    ClosePop()
                    // Redirect or reset form if necessary
                }, 2000);
            }
        } catch (error) {
            console.error('Error:', error);
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
        } finally {
            setLoading(false); // Set loading back to false after API request is complete
        }
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
                        <form >
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
                                        placeholder='HH:MM'
                                        min="0"
                                    />
                                </div>
                                <div className="form-group">
                                    {/* Extra Hours */}
                                    <label htmlFor="extraHours" className=''>Extra Work (Minutes)</label>
                                    <input
                                        
                                        type="number"
                                        placeholder='HH:MM'
                                        id="extraHours"
                                        value={formData.extraHours}
                                        onChange={handleChange}
                                        min="0" // Optional: to prevent negative input
                                    />
                                </div>
                                <div className="form-group">
                                    {/* Shift Dropdown */}
                                    <label className=''>Status </label>
                                    <div className="dropdown">
                                        <div className="dropdown-button" ref={shiftButtonRef} onClick={toggleShift}>
                                            <div>{formData.status || "Select Status"}</div>
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
