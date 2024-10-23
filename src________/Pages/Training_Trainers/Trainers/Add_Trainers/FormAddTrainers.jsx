import { useState, useEffect } from 'react';
import '../../../Employee_onboarding/AddEmployee/AddEmloyee.scss';
import '../../../Employee_onboarding/AddEmployee/NavbarForm.scss';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { OutsideClick } from '../../../Employee_onboarding/AddEmployee/OutsideClick'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const FormAddTrainers = ({ onSubmit }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isOpen: isLeaveTypeOpen, ref: leaveTypeRef, buttonRef: leaveTypeButtonRef, handleToggle: toggleLeaveType, setIsOpen: setLeaveTypeOpen } = OutsideClick();
    const { isOpen: isTypeOpen, ref: typeRef, buttonRef: typeButtonRef, handleToggle: toggleType, setIsOpen: setTypeOpen } = OutsideClick();
    const { isOpen: isEmployeeNameOpen, ref: EmployeeNameRef, buttonRef: EmployeeNameButtonRef, handleToggle: toggleEmployeeName, setIsOpen: setEmployeeNameOpen } = OutsideClick();

    const [formData, setFormData] = useState({
        employeeName: '',
        leaveType: '',
        email: '',
        training: '',
        number:'',
        role: '',
        cost: '',
        totalDays: '',
        type: '',
        leaveReason: '',
        user_id: '',
        leave_type_id: ''
    });

    const [loading, setLoading] = useState(false);
    const [searchQueryLeaveType, setSearchQueryLeaveType] = useState('');
    const [searchQueryType, setSearchQueryType] = useState('');
    const token = localStorage.getItem('access_token'); // Get token from local storage or set it directly
    const [searchQueryEmployeeName, setSearchQueryEmployeeName] = useState('');

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

    };

    console.log("Submitted form data:❗", formData);
    const handleSubmit = async (event) => {
        event.preventDefault();
        // setLoading(true); // Show loading indicator

        // Prepare request data
        const requestData = {
            user_id: formData.user_id,
            name: formData.employeeName,
            leave_type_id: formData.leave_type_id,
            leave_type_name: formData.leaveType,
            from_date: formData.fromDate,
            to_date: formData.toDate,
            type_of_leave: formData.type,
            days: formData.totalDays,
            resion: formData.leaveReason,
        };

        try {
            const response = await axios.post('https://devstronauts.com/public/api/leave/create/update', requestData, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include token in header
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                console.log('response', response)
                toast.success(response.data.message || 'Create Leave successfully.', {
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
                    navigate(`/all-leave`)
                }, 2000);
            }
        } catch (error) {
            toast.error(error.message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            console.error('Error submitting form:', error);
            toast.error("Error submitting form. Please try again."); // Show error message
        } finally {
            setLoading(false); // Hide loading indicator
        }
    };
    
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);

    const handleDateChange = (event) => {
        const date = new Date(event.target.value);
        const formattedDate = date.toLocaleDateString('en-CA'); // yyyy-mm-dd format
        setSelectedStartDate(formattedDate);
        calculateTotalDays(formattedDate, selectedEndDate);
    };

    const handleDateEndChange = (event) => {
        const date = new Date(event.target.value);
        const formattedDate = date.toLocaleDateString('en-CA'); // yyyy-mm-dd format
        setSelectedEndDate(formattedDate);
        calculateTotalDays(selectedStartDate, formattedDate);
    };

    const calculateTotalDays = (startDate, endDate) => {
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);

            // Time difference in milliseconds
            const timeDiff = end - start;

            // Convert milliseconds to days (1 day = 1000 * 60 * 60 * 24 milliseconds)
            const diffInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            // Update formData with totalDays
            setFormData((prevFormData) => ({
                ...prevFormData,
                totalDays: diffInDays > 0 ? diffInDays : 0, // Ensure no negative values
            }));
        }
    };

    const selectOption = (dropdown, value) => {
        setFormData(prevState => ({
            ...prevState,
            [dropdown]: value
        }));
        setLeaveTypeOpen(false);
        setTypeOpen(false);
        // if (dropdown === 'leaveType') {
        // } else {
        // }
        if (dropdown === 'employeeName') {
            // Full name ko store karo aur user_id ko bhi alag se store karo
            setFormData(prevState => ({
                ...prevState,
                employeeName: `${value.first_name} ${value.last_name}`, // Full name
                user_id: value.user_id // user_id ko alag se store karo
            }));
        }
        if (dropdown === 'leaveType') {
            // Full name ko store karo aur user_id ko bhi alag se store karo
            setFormData(prevState => ({
                ...prevState,
                leaveType: `${value.leave_type}`, // Full name
                leave_type_id: value.id // user_id ko alag se store karo
            }));
        }
        setEmployeeNameOpen(false)
    };
    // api emp list
    const [departmentHead, setDepartmentHead] = useState([]);
    const [leaveTypeData, setLeaveTypeData] = useState([]);

    console.log('leaveTypeData', leaveTypeData)

    useEffect(() => {
        if (departmentHead.length > 0) {
            return
        }
        axios.post('https://devstronauts.com/public/api/employee/list', {
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const employees = response.data.result;
                setDepartmentHead(employees);
                // console.log('employees❗ ', employees)
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (leaveTypeData.length > 0) {
            return
        }
        axios.post('https://devstronauts.com/public/api/leave/master/list', {
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const employees = response.data.result;
                setLeaveTypeData(employees);
                console.log('leaveTypeData ⚠️❤️👋 ', employees)
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setLoading(false);
            });
    }, []);

    // api emp list

    const handleSearchQueryChangeLeaveType = (e) => setSearchQueryLeaveType(e.target.value);
    const handleSearchQueryChangeType = (e) => setSearchQueryType(e.target.value);
    const handleSearchQueryChangeEmployeeName = (e) => setSearchQueryEmployeeName(e.target.value);

    if (loading) {
        return <div id='notFounPageID'><img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="loading" /></div>;
    }

    return (
        <>
            <div className="" onSubmit={onSubmit}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    closeOnClick
                    pauseOnHover
                    draggable
                    theme="error"
                />
                <form onSubmit={handleSubmit}>
                    <div id='form'>
                        <div className="from1">

                            <div className="form-group">
                                <label className='starred'>Trainer Name*</label>
                                <input type="text" name="fromDate" placeholder='Enter full name' value={formData.fromDate} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label className='starred'>Email ID*</label>
                                <input type="text" name="email" placeholder='Enter Email ID' value={formData.email} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label className='starred'>Training Type*</label>
                                <input type="text" name="training" placeholder='Enter training type' value={formData.training} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label className=''>Contact Number</label>
                                <input type="number" name="number" placeholder='Enter Contact Number' value={formData.number} onChange={handleChange} />
                            </div>
                            <div className="form-group grupdate2">
                                <label htmlFor="">Start Date</label>
                                <div className="dropdown-content date-h" id=''>
                                    <div className='date_tittle'>
                                        <div className='title__show__d'>
                                            {!selectedStartDate ? <span> Custom date</span> : selectedStartDate}
                                        </div>
                                        <div className='date_icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                                <path d="M18 2V4M6 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M3.5 8H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M3 8H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <input type="date" name="date" id="" onChange={handleDateChange} />
                                </div>
                            </div>
                            <div className="form-group grupdate2">
                                <label htmlFor="">End Date</label>
                                <div className="dropdown-content date-h" id=''>
                                    <div className='date_tittle'>
                                        <div className='title__show__d'>
                                            {!selectedEndDate ? <span> Custom date</span> : selectedEndDate}
                                        </div>
                                        <div className='date_icon'>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                                <path d="M18 2V4M6 2V4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M3.5 8H20.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                <path d="M3 8H21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                    <input type="date" name="date" id="" onChange={handleDateEndChange} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Duration</label>
                                <input type="number" name="totalDays" placeholder='Select Start and End Date' disabled value={formData.totalDays} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Role</label>
                                <input type="text" name="role" placeholder='Enter Role Name'  value={formData.role} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Training Cost</label>
                                {/* <input id='doller' type="number" name="cost" placeholder='Enter Training Cost' value={formData.cost} onChange={handleChange} /> */}
                                <div className="input-wrapper">
                                    <span id="dollar-symbol">{formData.cost && '₹'}</span>
                                    <input
                                        id='doller'
                                        type="number"
                                        name="cost"
                                        min='0'
                                        placeholder='Enter Training Cost'
                                        value={formData.cost}
                                        onChange={handleChange}
                                        style={{
                                            paddingLeft: formData.cost ? '20px' : '10px'
                                        }}                                    />
                                </div>
                            </div>

                         
                        </div>

                        <div id='Description' className='DescriptionJob'>
                            <div className="form-group">
                                <label>Reason</label>
                                <textarea
                                    placeholder="Enter Reason"
                                    name="leaveReason"
                                    value={formData.leaveReason}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div id='submitBtn_next_main'>
                        <div id='submitBtn' >
                            <div className='div'>
                                <button type="submit">Submit</button>
                                <span><CiCircleChevRight /></span>
                            </div>
                            <div className="lineBar"></div>
                            <div className='x'>
                                <span> <TfiClose /></span>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FormAddTrainers;
