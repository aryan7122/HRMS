import './NewAttendance.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';

const NewAttendance = ({ ClosePop }) => {
    const [formData, setFormData] = useState({
        employeeName: '',
        date: '',
        punchIn: '',
        punchOut: ''
    });
    const [attendanceData, setAttendanceData] = useState([]); // Array to hold attendance data

    // Fetch existing attendance data from JSONBin
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://api.jsonbin.io/v3/b/66dad0faad19ca34f8a0c6dd', {
                    headers: {
                        'X-Master-Key': '$2a$10$/rHkEpcXQ78/XRNvCpPl4ehBkySOH2T6teIVgZEumbX/if6UWLRly'
                    }
                });
                if (response.status === 200) {
                    // Check if the response data is an array, if not, initialize an empty array
                    const existingData = Array.isArray(response.data.record) ? response.data.record : [];
                    setAttendanceData(existingData);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);

        // Add new data to the existing attendance data array
        const updatedAttendanceData = [...attendanceData, formData];

        try {
            const response = await axios.put(
                'https://api.jsonbin.io/v3/b/66dad0faad19ca34f8a0c6dd',
               updatedAttendanceData , // Send the updated array within an object
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Master-Key': '$2a$10$/rHkEpcXQ78/XRNvCpPl4ehBkySOH2T6teIVgZEumbX/if6UWLRly'
                    }
                }
            );

            if (response.status === 200) {
                console.log('Data successfully saved to JSONBin!', response.data);
                setAttendanceData(updatedAttendanceData); // Update local state with new data
            } else {
                console.error('Failed to save data:', response.statusText);
            }
        } catch (error) {
            console.error('Error occurred while saving data:', error);
        }

        // Reset form data after submission
        setFormData({
            employeeName: '',
            date: '',
            punchIn: '',
            punchOut: ''
        });

        // Close the popup after submission
        ClosePop();
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
