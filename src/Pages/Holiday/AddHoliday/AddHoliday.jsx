import './AddHoliday.scss';
import { useState } from 'react';
import axios from 'axios';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { OutsideClick } from '../../Employee_onboarding/AddEmployee/OutsideClick';
import { OutsideClick2 } from '../../Department/DepartmentList/OutsideClick2';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddHoliday = ({ ClosePop }) => {
    const { isOpen: isDepartmentOpen, ref: departmentRef, buttonRef: departmentButtonRef, handleToggle: toggleDepartment, setIsOpen: setDepartmentOpen } = OutsideClick2();
    const { isOpen: isEmployeeOpen, ref: employeeRef, buttonRef: employeeButtonRef, handleToggle: toggleEmployee, setIsOpen: setEmployeeOpen } = OutsideClick();
    const { isOpen: isShiftOpen, ref: shiftRef, buttonRef: shiftButtonRef, handleToggle: toggleShift, setIsOpen: setShiftOpen } = OutsideClick();
    const { isOpen: isBreakTimeHoursOpen, ref: breakTimeHoursRef, buttonRef: breakTimeHoursButtonRef, handleToggle: toggleBreakTimeHours, setIsOpen: setBreakTimeHoursOpen } = OutsideClick();
    const { isOpen: isBreakTimeMinutesOpen, ref: breakTimeMinutesRef, buttonRef: breakTimeMinutesButtonRef, handleToggle: toggleBreakTimeMinutes, setIsOpen: setBreakTimeMinutesOpen } = OutsideClick();
    const { isOpen: isExtraHoursHoursOpen, ref: extraHoursHoursRef, buttonRef: extraHoursHoursButtonRef, handleToggle: toggleExtraHoursHours, setIsOpen: setExtraHoursHoursOpen } = OutsideClick();
    const { isOpen: isExtraHoursMinutesOpen, ref: extraHoursMinutesRef, buttonRef: extraHoursMinutesButtonRef, handleToggle: toggleExtraHoursMinutes, setIsOpen: setExtraHoursMinutesOpen } = OutsideClick();

    const [formData, setFormData] = useState({
        holidayName: '',
        startTime: '',
        endTime: '',
        recurrence: '',// Active/Inactive
        description:''
    });
    console.log('formData', formData)
    const handleChange = (e) => {
        const { id, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'checkbox' ? checked : value
        });
    };
    const selectOption = (dropdown, value) => {
        setFormData(prevState => ({
            ...prevState,
            [dropdown]: value
        }));
        setShiftOpen(false)
    };
    const selectTimeOption = (dropdown, value) => {
        setFormData(prevState => ({
            ...prevState,
            [dropdown]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');

        const requestData = {
            shift_name: formData.holidayName,
            start_time: formData.startTime,
            end_time: formData.endTime,
            recurrence: formData.recurrence === 'No' ? '0' : '1',
            description: formData.description,
        };
        console.log('requestData', requestData)
        try {
            const response = await axios.post(`https://devstronauts.com/public/api/smm`, requestData, {
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
                    ClosePop();
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
        }
    };

    return (
        <div className='NewHoliday_main'>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="error"
            />
            <div className="blurBG"></div>
            <div className="formDivLeave">
                <div className="popForm_h">
                    <div className="Attendance_Head">
                        <h2> Add Holiday</h2>
                        <div className='close_icon' onClick={ClosePop}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" />
                            </svg>
                        </div>
                    </div>
                    <div className="form-container-Leave" onSubmit={handleSubmit}>
                        <form>
                            <div id="employeeFormLeave">
                                <div className="form-group">
                                    <label htmlFor="holidayName" className='red'>Holiday Name *</label>
                                    <input
                                        type="text"
                                        id="holidayName"
                                        value={formData.holidayName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    {/* Shift Dropdown */}
                                    <label className=''>Recurrence </label>
                                    <div className="dropdown">
                                        <div className="dropdown-button" ref={shiftButtonRef} onClick={toggleShift}>
                                            <div>{formData.recurrence || "Select recurrence"}</div>
                                            <span>{!isShiftOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                        </div>
                                        {isShiftOpen && (
                                            <div className="dropdown-menu" ref={shiftRef}>

                                                <div className="dropdown_I">
                                                    {['Yas', 'No'].filter(option =>
                                                        option.toLowerCase()
                                                    ).map(option => (
                                                        <div className="dropdown-item" onClick={() => selectOption('recurrence', option)} key={option}>
                                                            {option}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="startTime" className=''>Start Date</label>
                                    <input
                                        type="date"
                                        id="startTime"
                                        value={formData.startTime}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="endTime" className=''>To Date</label>
                                    <input
                                        type="date"
                                        id="endTime"
                                        value={formData.endTime}
                                        onChange={handleChange}
                                        
                                    />
                                </div>
                               
                            </div>
                            <div id="Description" className="">
                                <div className="form-group">
                                    <label className='descriptionsL'>Description</label>
                                    <textarea placeholder="Enter Description" className="descriptions"
                                        id="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    >
                                    </textarea>
                                </div>
                            </div>
                            <div className="buttons">
                                <button type="submit" className="submit-btn">Submit
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#ffffff" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" />
                                        <path d="M10.5 8C10.5 8 13.5 10.946 13.5 12C13.5 13.0541 10.5 16 10.5 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default AddHoliday;
