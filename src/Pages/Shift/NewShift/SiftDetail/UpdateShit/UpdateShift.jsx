import './UpdateShift.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { OutsideClick } from '../../../../Employee_onboarding/AddEmployee/OutsideClick';
import { OutsideClick2 } from '../../../../Department/DepartmentList/OutsideClick2';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateShift = ({ ClosePop, UpdateId }) => {
    const { isOpen: isDepartmentOpen, ref: departmentRef, buttonRef: departmentButtonRef, handleToggle: toggleDepartment, setIsOpen: setDepartmentOpen } = OutsideClick2();
    const { isOpen: isEmployeeOpen, ref: employeeRef, buttonRef: employeeButtonRef, handleToggle: toggleEmployee, setIsOpen: setEmployeeOpen } = OutsideClick();
    const { isOpen: isShiftOpen, ref: shiftRef, buttonRef: shiftButtonRef, handleToggle: toggleShift, setIsOpen: setShiftOpen } = OutsideClick();
    const { isOpen: isBreakTimeHoursOpen, ref: breakTimeHoursRef, buttonRef: breakTimeHoursButtonRef, handleToggle: toggleBreakTimeHours, setIsOpen: setBreakTimeHoursOpen } = OutsideClick();
    const { isOpen: isBreakTimeMinutesOpen, ref: breakTimeMinutesRef, buttonRef: breakTimeMinutesButtonRef, handleToggle: toggleBreakTimeMinutes, setIsOpen: setBreakTimeMinutesOpen } = OutsideClick();
    const { isOpen: isExtraHoursHoursOpen, ref: extraHoursHoursRef, buttonRef: extraHoursHoursButtonRef, handleToggle: toggleExtraHoursHours, setIsOpen: setExtraHoursHoursOpen } = OutsideClick();
    const { isOpen: isExtraHoursMinutesOpen, ref: extraHoursMinutesRef, buttonRef: extraHoursMinutesButtonRef, handleToggle: toggleExtraHoursMinutes, setIsOpen: setExtraHoursMinutesOpen } = OutsideClick();

    const [formData, setFormData] = useState({
        shiftName: '',
        startTime: '',
        endTime: '',
        totalHours: null,
        breakTime: { hours: '00', minutes: '00' },
        extraHours: { hours: '00', minutes: '00' },
        status: '' // Active/Inactive
    });
    const token = localStorage.getItem('access_token');
    console.log('idd,up', UpdateId)
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
    // fill form auto

    useEffect(() => {
        axios.post('https://hrms.dragnilifecare.in/public/api/shift/master/list', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // Find the shift data by UpdateId
                const shift = response.data.result.find(item => item.id == UpdateId);
                console.log('shift update data', shift)
                if (shift) {
                    const [breakHours, breakMinutes] = shift.break_time.split(':');
                    setFormData({
                        shiftName: shift.shift_name,
                        startTime: shift.start_time,
                        endTime: shift.end_time,
                        breakTime: { hours: breakHours, minutes: breakMinutes },
                        extraHours: { hours: '00', minutes: '00' }, // Default extra hours
                        status: shift.status === '0' ? 'Active' : 'Inactive' // Adjust status based on response
                    });
                }

            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                console.error('Error fetching shift data:', error);
                toast.error('Error fetching shift data', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            },
            );
    }, [UpdateId]);

    // fill form auto
    const handleSubmit = async (e) => {
        e.preventDefault();

        const requestData = {
            id: UpdateId,
            shift_name: formData.shiftName,
            start_time: formData.startTime,
            end_time: formData.endTime,
            break_time: `${formData.breakTime.hours}:${formData.breakTime.minutes}`, // HH:MM format
            extra_hours: `${formData.extraHours.hours}:${formData.extraHours.minutes}`, // HH:MM format
            status: formData.status === 'Active' ? '0' : '1',
        };
        console.log('requestData', requestData)
        try {
            const response = await axios.post(`https://hrms.dragnilifecare.in/public/api/shift/master/create/update`, requestData, {
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
        <div className='NewAttendance_main'>
            <div className="blurBG"></div>
            <div className="formDivLeave">
                <div className="popForm">
                    <div className="Attendance_Head">
                        <h2> Update Shift</h2>
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
                                    <label className=''>Break Time</label>
                                    <div className="time-selector">
                                        {/* <div className="dropdown">
                                            <div className="dropdown-button" ref={breakTimeHoursButtonRef} onClick={toggleBreakTimeHours}>
                                                <div>{formData.breakTime.hours} hours</div>
                                                <span>{!isBreakTimeHoursOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                            </div>
                                            {isBreakTimeHoursOpen && (
                                                <div className="dropdown-menu" ref={breakTimeHoursRef}>
                                                    <div className="dropdown_I">
                                                        {Array.from({ length: 24 }, (_, i) => (
                                                            <div className="dropdown-item" onClick={() => selectTimeOption('breakTime', { hours: String(i).padStart(2, '0'), minutes: formData.breakTime.minutes })} key={i}>
                                                                {String(i).padStart(2, '0')} 
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div> */}
                                        <div className="dropdown">
                                            <div className="dropdown-button" ref={breakTimeMinutesButtonRef} onClick={toggleBreakTimeMinutes}>
                                                <div>{formData.breakTime.minutes} minutes</div>
                                                <span>{!isBreakTimeMinutesOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                            </div>
                                            {isBreakTimeMinutesOpen && (
                                                <div className="dropdown-menu" ref={breakTimeMinutesRef}>
                                                    <div className="dropdown_I">
                                                        {Array.from({ length: 60 }, (_, j) => (
                                                            <div className="dropdown-item" onClick={() => selectTimeOption('breakTime', { hours: formData.breakTime.hours, minutes: String(j).padStart(2, '0') })} key={j}>
                                                                {String(j).padStart(2, '0')}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className=''>Extra Hours</label>
                                    <div className="time-selector">
                                        <div className="dropdown">
                                            <div className="dropdown-button" ref={extraHoursHoursButtonRef} onClick={toggleExtraHoursHours}>
                                                <div>{formData.extraHours.hours} hours</div>
                                                <span>{!isExtraHoursHoursOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                            </div>
                                            {isExtraHoursHoursOpen && (
                                                <div className="dropdown-menu" ref={extraHoursHoursRef}>
                                                    <div className="dropdown_I">
                                                        {Array.from({ length: 24 }, (_, i) => (
                                                            <div className="dropdown-item" onClick={() => selectTimeOption('extraHours', { hours: String(i).padStart(2, '0'), minutes: formData.extraHours.minutes })} key={i}>
                                                                {String(i).padStart(2, '0')}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        <div className="dropdown">
                                            <div className="dropdown-button" ref={extraHoursMinutesButtonRef} onClick={toggleExtraHoursMinutes}>
                                                <div>{formData.extraHours.minutes} minutes</div>
                                                <span>{!isExtraHoursMinutesOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                            </div>
                                            {isExtraHoursMinutesOpen && (
                                                <div className="dropdown-menu" ref={extraHoursMinutesRef}>
                                                    <div className="dropdown_I">
                                                        {Array.from({ length: 60 }, (_, j) => (
                                                            <div className="dropdown-item" onClick={() => selectTimeOption('extraHours', { hours: formData.extraHours.hours, minutes: String(j).padStart(2, '0') })} key={j}>
                                                                {String(j).padStart(2, '0')}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
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
                            <div className="buttons">
                                <button type="submit" className="submit-btn">Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default UpdateShift;
