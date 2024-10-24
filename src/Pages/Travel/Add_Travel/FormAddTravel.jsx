import { useState, useEffect } from 'react';
import '../../Employee_onboarding/AddEmployee/AddEmloyee.scss';
import '../../Employee_onboarding/AddEmployee/NavbarForm.scss';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { OutsideClick } from '../../Employee_onboarding/AddEmployee/OutsideClick'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { OutsideClick2 } from '../../Department/DepartmentList/OutsideClick2';
import DatePicker from '../../../utils/Form/DatePicker';

const FormAddTravel = ({ onSubmit }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isOpen: isLeaveTypeOpen, ref: leaveTypeRef, buttonRef: leaveTypeButtonRef, handleToggle: toggleLeaveType, setIsOpen: setLeaveTypeOpen } = OutsideClick();
    const { isOpen: isTypeOpen, ref: typeRef, buttonRef: typeButtonRef, handleToggle: toggleType, setIsOpen: setTypeOpen } = OutsideClick();
    const { isOpen: isEmployeeNameOpen, ref: EmployeeNameRef, buttonRef: EmployeeNameButtonRef, handleToggle: toggleEmployeeName, setIsOpen: setEmployeeNameOpen } = OutsideClick();
    const { isOpen: isDepartmentOpen, ref: departmentRef, buttonRef: departmentButtonRef, handleToggle: toggleDepartment, setIsOpen: setDepartmentOpen } = OutsideClick2();
    const [departments, setDepartments] = useState([]); // Store department list from API
    const [searchQueryDepartment, setSearchQueryDepartment] = useState('');

    const [formData, setFormData] = useState({
        departmentName: '',
        departmentId: '',
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
    ////
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalDays, setTotalDays] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
        calculateTotalDays(date, endDate); // Pass the new startDate and current endDate
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
        calculateTotalDays(startDate, date); // Pass the current startDate and new endDate
    };
    const calculateTotalDays = (start, end) => {
        if (start && end) {
            const startDate = new Date(start);
            const endDate = new Date(end);
            const diffTime = Math.abs(endDate - startDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            console.log("Total Days: ", diffDays);
            setTotalDays(diffDays + 1); // Add 1 to include both start and end dates
        }
    };
    ////////
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

    };
    const [selectedOption, setSelectedOption] = useState("");

    const handleChangeCeck = (event) => {
        setSelectedOption(event.target.value);
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
                                <label className='starred'>Email ID*</label>
                                <input type="text" name="email" placeholder='Enter Email ID' value={formData.email} onChange={handleChange} />
                            </div>
                            {/* Department Dropdown */}
                            <div className="form-group">

                                <label className='starred'>Department *</label>
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
                                <label className=''>Place of visit</label>
                                <input type="text" name="number" placeholder='Enter Place of visit' value={formData.number} onChange={handleChange} />
                            </div>
                           
                            <DatePicker label="Expected date of arrival" onDateChange={handleStartDateChange} />
                            <DatePicker label="Choose date of arrival" onDateChange={handleEndDateChange} />
                            <div className="form-group">
                                <label>Expected duration in days</label>
                                <input type="number" name="totalDays" placeholder='Expected duration in days' disabled value={totalDays} onChange={handleChange} />
                            </div>

                            <div className="form-group">
                                <label>Purpose of visit</label>
                                <input type="text" name="role" placeholder='Enter Role Name'  value={formData.role} onChange={handleChange} />
                            </div>
                            <div className="form-group">
                                <label>Purpose of visit</label>
                                {/* <input id='doller' type="number" name="cost" placeholder='Enter Training Cost' value={formData.cost} onChange={handleChange} /> */}
                                <div className="input-wrapper">
                                    {/* <span id="dollar-symbol">{formData.cost && '₹'}</span> */}
                                    <input
                                        id='doller'
                                        type="text"
                                        name="cost"
                                        placeholder='Enter Training Cost'
                                        value={formData.cost}
                                        onChange={handleChange}
                                        // style={{
                                        //     paddingLeft: formData.cost ? '20px' : '10px'
                                    // }}                                    
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Billable</label>
                                <div className="box_red">
                                    <div>
                                        <input
                                            type="radio"
                                            name="Billable"
                                            value="Yes"
                                            checked={selectedOption === "Yes"}
                                            onChange={handleChangeCeck}
                                        />
                                        Yes
                                    </div>
                                    <div>
                                        <input
                                            type="radio"
                                            name="Billable"
                                            value="No"
                                            checked={selectedOption === "No"}
                                            onChange={handleChangeCeck}
                                        />
                                        No
                                    </div>
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

export default FormAddTravel;
