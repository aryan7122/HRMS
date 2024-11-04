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

const FormPerformance = ({ onSubmit }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isOpen: isLeaveTypeOpen, ref: leaveTypeRef, buttonRef: leaveTypeButtonRef, handleToggle: toggleLeaveType, setIsOpen: setLeaveTypeOpen } = OutsideClick();
    const { isOpen: isTypeOpen, ref: typeRef, buttonRef: typeButtonRef, handleToggle: toggleType, setIsOpen: setTypeOpen } = OutsideClick();
    const { isOpen: isEmployeeNameOpen, ref: EmployeeNameRef, buttonRef: EmployeeNameButtonRef, handleToggle: toggleEmployeeName, setIsOpen: setEmployeeNameOpen } = OutsideClick();

    const [formData, setFormData] = useState({
        employeeName: '',
        leaveType: '',
        fromDate: '',
        toDate: '',
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
        setFormData((prevData) => {
            const updatedData = { ...prevData, [name]: value };

            // Calculate totalDays if fromDate and toDate are both set
            if (updatedData.fromDate && updatedData.toDate) {
                const fromDate = new Date(updatedData.fromDate);
                const toDate = new Date(updatedData.toDate);

                // Calculate difference in milliseconds
                const timeDifference = toDate - fromDate;

                // Convert milliseconds to days
                const daysDifference = timeDifference / (1000 * 3600 * 24);

                // Update totalDays only if daysDifference is non-negative
                updatedData.totalDays = daysDifference >= 0 ? daysDifference + 1 : 0; // +1 to include both days
            }

            return updatedData;
        });
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
            const response = await axios.post('https://hrms.dragnilifecare.in/public/api/leave/create/update', requestData, {
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

    // useEffect(() => {
    //     if (departmentHead.length > 0) {
    //         return
    //     }
    //     axios.post('https://hrms.dragnilifecare.in/public/api/employee/list', {
    //     }, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //         .then(response => {
    //             const employees = response.data.result;
    //             setDepartmentHead(employees);
    //             // console.log('employees❗ ', employees)
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching data: ", error);
    //             setLoading(false);
    //         });
    // }, []);

    // useEffect(() => {
    //     if (leaveTypeData.length > 0) {
    //         return
    //     }
    //     axios.post('https://hrms.dragnilifecare.in/public/api/leave/master/list', {
    //     }, {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //         .then(response => {
    //             const employees = response.data.result;
    //             setLeaveTypeData(employees);
    //             console.log('leaveTypeData ⚠️❤️👋 ', employees)
    //             setLoading(false);
    //         })
    //         .catch(error => {
    //             console.error("Error fetching data: ", error);
    //             setLoading(false);
    //         });
    // }, []);

    // api emp list

    const handleSearchQueryChangeLeaveType = (e) => setSearchQueryLeaveType(e.target.value);
    const handleSearchQueryChangeType = (e) => setSearchQueryType(e.target.value);
    const handleSearchQueryChangeEmployeeName = (e) => setSearchQueryEmployeeName(e.target.value);

    if (loading) {
        return <div id='notFounPageID'><img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="loading" /></div>;
    }
    const [activeTab, setActiveTab] = useState('Technical');  // Default Tab

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

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
                                <label className='starred'>Employee Name*</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" ref={EmployeeNameButtonRef} onClick={toggleEmployeeName}>
                                        <div className='divselect'>{formData.employeeName || "Select Employee Name"}</div>
                                        <span id="toggle_selectIcon">
                                            {!isEmployeeNameOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                        </span>
                                    </div>
                                    {isEmployeeNameOpen && (
                                        <div className="dropdown-menu" ref={EmployeeNameRef}>
                                            <input
                                                type="search"
                                                className="search22"
                                                placeholder="Search Employee Name"
                                                value={searchQueryEmployeeName}
                                                id="searchDepartmentHead"
                                                onChange={handleSearchQueryChangeEmployeeName}
                                            />
                                            <div className="dropdown_I">
                                                {departmentHead.filter(option =>
                                                    (`${option.first_name} ${option.last_name}`).toLowerCase().includes(searchQueryEmployeeName.toLowerCase())
                                                ).map(option => (
                                                    <div
                                                        className="dropdown-item"
                                                        onClick={() => selectOption('employeeName', option)}
                                                        key={option.user_id}
                                                    >
                                                        {option.first_name} {option.last_name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group ">
                                <label htmlFor="">Designation</label>
                                <input type="text" name="date" id="" onChange={handleDateChange} />
                            </div>
                            {/* Leave Type Dropdown */}
                            <div className="form-group">
                                <label className=''>Department</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" ref={leaveTypeButtonRef} onClick={toggleLeaveType}>
                                        <div>{formData.leaveType || "Select Department"}</div>
                                        <span id='toggle_selectIcon'> {!isLeaveTypeOpen ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                    </div>
                                    {isLeaveTypeOpen && (
                                        <div className="dropdown-menu" ref={leaveTypeRef}>
                                            <input
                                                type="search"
                                                className='search22'
                                                placeholder="Search Department"
                                                value={searchQueryLeaveType}
                                                id='searchDepartmentHead'
                                                onChange={handleSearchQueryChangeLeaveType}
                                            />
                                            <div className="dropdown_I">
                                                {leaveTypeData.filter(option =>
                                                    (`${option.leave_type} ${option.leave_type}`).toLowerCase().includes(searchQueryLeaveType.toLowerCase())
                                                ).map(option => (
                                                    <div
                                                        className="dropdown-item"
                                                        onClick={() => selectOption('leaveType', option)}
                                                        key={option.id}
                                                    >
                                                        {option.leave_type}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>



                            {/* Type Dropdown */}
                            <div className="form-group">
                                <label >Status</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" ref={typeButtonRef} onClick={toggleType}>
                                        <div>{formData.type || "Select Status"}</div>
                                        <span id='toggle_selectIcon'> {!isTypeOpen ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                    </div>
                                    {isTypeOpen && (
                                        <div className="dropdown-menu" ref={typeRef}>
                                            {/* <input
                                                type="search"
                                                className='search22'
                                                placeholder="Search Status"
                                                value={searchQueryType}
                                                id='searchDepartmentHead'
                                                onChange={handleSearchQueryChangeType}
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
                        </div>

                        <div className="competency-form-container">
                            {/* Tabs */}
                            <div className="tabs-container">
                                <button
                                    className={`tab-button ${activeTab === 'Technical' ? 'active' : ''}`}
                                    onClick={() => handleTabClick('Technical')}
                                >
                                    Technical
                                </button>
                                <button
                                    className={`tab-button ${activeTab === 'Organizational' ? 'active' : ''}`}
                                    onClick={() => handleTabClick('Organizational')}
                                >
                                    Organizational
                                </button>
                            </div>

                            {/* Tab Content */}
                            <div className="tab-content">
                                {activeTab === 'Technical' && (
                                    <form className="form-content">
                                        <table className="competency-table">
                                            <thead>
                                                <tr>
                                                    <th>COMPETENCIES</th>
                                                    <th>EXPECTED VALUE</th>
                                                    <th>CURRENT VALUE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Customer Experience</td>
                                                    <td>Intermediate</td>
                                                    <td>
                                                        <select className="value-select">
                                                            <option>None</option>
                                                            <option>Intermediate</option>
                                                            <option>Advanced</option>
                                                            <option>Expert</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Marketing</td>
                                                    <td>Advanced</td>
                                                    <td>
                                                        <select className="value-select">
                                                            <option>None</option>
                                                            <option>Intermediate</option>
                                                            <option>Advanced</option>
                                                            <option>Expert</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                {/* Add more rows as per your data */}
                                            </tbody>
                                        </table>
                                    </form>
                                )}

                                {activeTab === 'Organizational' && (
                                    <form className="form-content">
                                        <table className="competency-table">
                                            <thead>
                                                <tr>
                                                    <th>COMPETENCIES</th>
                                                    <th>EXPECTED VALUE</th>
                                                    <th>CURRENT VALUE</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>Team Collaboration</td>
                                                    <td>Expert</td>
                                                    <td>
                                                        <select className="value-select">
                                                            <option>None</option>
                                                            <option>Intermediate</option>
                                                            <option>Advanced</option>
                                                            <option>Expert</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>Leadership</td>
                                                    <td>Advanced</td>
                                                    <td>
                                                        <select className="value-select">
                                                            <option>None</option>
                                                            <option>Intermediate</option>
                                                            <option>Advanced</option>
                                                            <option>Expert</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                {/* Add more rows as per your data */}
                                            </tbody>
                                        </table>
                                    </form>
                                )}
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

export default FormPerformance;
