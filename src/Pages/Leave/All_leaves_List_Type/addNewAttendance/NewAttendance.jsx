import './NewAttendance.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { OutsideClick } from '../../../Employee_onboarding/AddEmployee/OutsideClick'

const NewAttendance = ({ ClosePop }) => {

    const { isOpen: isTypeOpen, ref: typeRef, buttonRef: typeButtonRef, handleToggle: toggleType, setIsOpen: setTypeOpen } = OutsideClick();
    const { isOpen: isVisibilityOpen, ref: visibilityRef, buttonRef: visibilityButtonRef, handleToggle: toggleVisibility, setIsOpen: setVisibilityOpen } = OutsideClick();

    const [formData, setFormData] = useState({
        leaveType: '',
        available: '',
        description: '',
        type: '',
        visibility: ''
    });
    const [searchQueryType, setSearchQueryType] = useState('');
    const [searchQueryVisibility, setSearchQueryVisibility] = useState('');

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };
    const token = localStorage.getItem('access_token');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        const requestData = {
            leave_type: formData.leaveType,
            type_of_leave: formData.type,
            available_days: formData.available,
            description: formData.description,
            status: formData.visibility === 'Active' ? '0' : '1' // Active or Inactive
        };

        try {
            const response = await axios.post('https://hrms.dragnilifecare.in/public/api/leave/master/create/update', requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (response.status === 200) {
                console.log('Success:', response.data);
                // Close the popup after successful submission
                ClosePop();
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };


    const selectOption = (dropdown, value) => {
        setFormData(prevState => ({
            ...prevState,
            [dropdown]: value
        }));
        if (dropdown === 'type') {
            setTypeOpen(false);
        } else {
            setVisibilityOpen(false);
        }
    };

    return (
        <div className='NewAttendance_main'>
            <div className="blurBG"></div>
            <div className="formDivLeave">
                <div className="popForm leave_form__">
                    <div className="Attendance_Head">
                        <h2>Add New Leave Type</h2>
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


                                {/* Leave Type Input */}
                                <div className="form-group">
                                    <label htmlFor="leaveType" className='red'>Leave Type *</label>
                                    <input
                                        type="text"
                                        id="leaveType"
                                        placeholder="Enter leave type"
                                        required
                                        value={formData.leaveType}
                                        onChange={handleChange}
                                    />
                                </div>
                                {/* Type Dropdown */}
                                <div className="form-group">
                                    <label>Type *</label>
                                    <div className="dropdown">
                                        <div className="dropdown-button" ref={typeButtonRef} onClick={toggleType}>
                                            <div>{formData.type || "Select Type"}</div>
                                            <span id='toggle_selectIcon'> {!isTypeOpen ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                        </div>
                                        {isTypeOpen && (
                                            <div className="dropdown-menu" ref={typeRef}>
                                                {/* <input
                                                type="search"
                                                className='search22'
                                                placeholder="Search Type"
                                                value={searchQueryType}
                                                id='searchDepartmentHead'
                                                onChange={(e) => setSearchQueryType(e.target.value)}
                                            /> */}
                                                <div className="dropdown_I">
                                                    {['Paid', 'Unpaid', 'On Duty'].filter(option =>
                                                        option.toLowerCase().includes(searchQueryType.toLowerCase())
                                                    ).map(option => (
                                                        <div className="dropdown-item" onClick={() => selectOption('type', option)} key={option}>
                                                            {option}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Available Input */}
                                <div className="form-group">
                                    <label htmlFor="available" className='red'>Available *</label>
                                    <input
                                        type="number"
                                        id="available"
                                        placeholder="Enter available days"
                                        required
                                        value={formData.available}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Leave Visibility Dropdown */}
                                <div className="form-group">
                                    <label>Leave Visibility *</label>
                                    <div className="dropdown">
                                        <div className="dropdown-button" ref={visibilityButtonRef} onClick={toggleVisibility}>
                                            <div>{formData.visibility || "Select Visibility"}</div>
                                            <span id='toggle_selectIcon'> {!isVisibilityOpen ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                        </div>
                                        {isVisibilityOpen && (
                                            <div className="dropdown-menu" ref={visibilityRef}>
                                                {/* <input
                                                type="search"
                                                className='search22'
                                                placeholder="Search Visibility"
                                                id='searchDepartmentHead'
                                                value={searchQueryVisibility}
                                                onChange={(e) => setSearchQueryVisibility(e.target.value)}
                                            /> */}
                                                <div className="dropdown_I">
                                                    {['Active', 'Inactive',].filter(option =>
                                                        option.toLowerCase().includes(searchQueryVisibility.toLowerCase())
                                                    ).map(option => (
                                                        <div className="dropdown-item" onClick={() => selectOption('visibility', option)} key={option}>
                                                            {option}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            {/* Description Input */}
                            <div id='Description' className='DescriptionJob DescriptionLeave'>

                                <div className="form-group">
                                    <label htmlFor="description" className='red'>Description</label>
                                    <textarea
                                        id="description"
                                        placeholder="Enter description"
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
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

export default NewAttendance;
