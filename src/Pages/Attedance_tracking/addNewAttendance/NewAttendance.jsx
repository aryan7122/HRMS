import './NewAttendance.scss';
import { useState } from 'react';

const NewAttendance = ({ ClosePop }) => {
    const [formData, setFormData] = useState({
        employeeName: '',
        date: '',
        punchIn: '',
        punchOut: ''
    });

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        // Reset form data after submission
        setFormData({
            employeeName: '',
            date: '',
            punchIn: '',
            punchOut: ''
        });
    };

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
                                <label htmlFor="employeeName" className='red'>Employee Name*</label>
                                <input
                                    type="text"
                                    id="employeeName"
                                    placeholder="Enter full name of employee"
                                    required
                                    value={formData.employeeName}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="date" className='red'>Date*</label>
                                <input
                                    type="date"
                                    id="date"
                                    required
                                    value={formData.date}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="punchIn">Punch In</label>
                                <input
                                    type="time"
                                    id="punchIn"
                                    required
                                    value={formData.punchIn}
                                    onChange={handleChange}
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
                                />
                            </div>
                        </form>
                        <div className="button">
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewAttendance;
