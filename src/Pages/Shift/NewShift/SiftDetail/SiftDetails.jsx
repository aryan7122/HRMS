import { useState, useEffect } from 'react';
import './SiftDetails.scss';
import iconEdu from '../../../../assets/icons/edu.png';
import img_emp1 from '../../../../assets/emp1.png';
import axios from 'axios';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdWorkHistory, MdDeleteOutline } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate, useParams } from 'react-router-dom';
// popup
import { IoMdAdd, IoIosCloseCircleOutline } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { OutsideClick2 } from '../../../Department/DepartmentList/OutsideClick2'

// popup
// 
import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateShift from './UpdateShit/UpdateShift';
// import 'react-toastify/dist/ReactToastify.css';

// 
const SiftDetails = () => {
    const [togglNewAdd, setTogglNewAdd] = useState(false)

    const NewAttendanceClick = () => {
        setTogglNewAdd(true)
    }
    const NewAttendanceClosePop = () => {
        setTogglNewAdd(false);
    };

    const [designationDetails, setDesignationDetails] = useState(null);
    const [designationDetails2, setDesignationDetails2] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');
    const [employees, setEmployees] = useState([
        // { name: "Akash Shinde", Roll: "UI/UX Design", email: "Akashhrms@gmail.com", date: "12-Jan-2024", Image: img_emp1, DOB: '2024-08-12' },
        // { name: "Ravi Kumar", Roll: "UI/UX Design", email: "ravikumar@gmail.com", date: "12-Jan-2024", Image: img_emp1, DOB: '2023-07-11' },
        // { name: "Sita Sharma", Roll: "UI/UX Design", email: "sitasharma@gmail.com", date: "12-Jan-2024", Image: img_emp1, DOB: '2024-08-12' },
        // { name: "Mohan Verma", Roll: "UI/UX Design", email: "mohanverma@gmail.com", date: "12-Jan-2024", Image: img_emp1, DOB: '2024-06-15' },
        // { name: "New Employee 1", Roll: "HR", email: "newemp1@gmail.com", phone: "+918888888884", Image: img_emp1, DOB: '2024-08-10' },
        // { name: "New Employee 2", Roll: "Manager", email: "newemp2@gmail.com", phone: "+918888888885", Image: img_emp1, DOB: '2024-08-12' },
        // { name: "New Employee 3", Roll: "Support", email: "newemp3@gmail.com", phone: "+918888888886", Image: img_emp1, DOB: '2024-08-18' },
        // { name: "New Employee 4", Roll: "Developer", email: "newemp4@gmail.com", phone: "+918888888887", Image: img_emp1, DOB: '2024-08-13' },
    ]);
    console.log('designationDetails::', designationDetails)
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh(!refresh)
    };

    useEffect(() => {
        if (id) {
            axios.post('https://devstronauts.com/public/api/shift/master/details', { id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setDesignationDetails(response.data.result);
                    console.log('response.data.result', response.data.result)
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    setError(true);
                    console.error("Error fetching designation details:", error);
                });
        }
    }, [id, token, refresh, togglNewAdd]);

    useEffect(() => {
        if (designationDetails) {  // Ensure jobData is available before making this call
            axios.post('https://devstronauts.com/public/api/get-user', {
                enteredbyid: designationDetails.enteredbyid
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    // setJobData2(response.data.created_by);
                    console.log('👉', response.data.created_by)
                    setDesignationDetails2(response.data.created_by)
                })
                .catch(error => {
                    console.error("Error fetching user data: ", error);
                });
        }
    }, [designationDetails2,designationDetails]);

    // HandleDelete
    const [open, setOpen] = useState(false);

    const HandleDelete = () => {
        // confirm()
        setOpen(true)

    }
    const DelteConform = () => { 
        if (id) {
            axios.post('https://devstronauts.com/public/api/shift/master/delete', { id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    // setDepartmentdetails(response.data.department);
                    // setDepartmentdetails2(response.data.department.enteredbyid)
                    console.log('⚠️ delete ❗', response)
                    // setLoading(false);
                    toast.success(response.data.message || 'Deleted  successfully.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    // setLoading(false);
                    setTimeout(() => {
                        navigate('/new-shift')
                    }, 2000);
                })
                .catch(error => {
                    setLoading(false);
                    toast.error('Deleted  Failed.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setError(true);
                    console.error("Error fetching designation details:", error);
                });
        }
    }

    
    // HandleDelete

   
    if (loading) {
        return <div id="notFounPageID"><img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="Loading..." /></div>;
    }

    if (error || !designationDetails) {
        // return <div id="notFounPageID"><img src="https://miro.medium.com/v2/resize:fit:996/1*C5oq4FeTlcpNXrXfnPpxTQ.gif" alt="Error loading data" /></div>;
    }


    const AllEmp = () => {
        navigate('/new-shift')
    }
   
    const UpdatedesignationDetails = () => {
        // setShowPopup(true)
        // navigate(`/update-designation/${id}`);
        // useEffect(() => {
            // if (designationDetails) {
               
        // }, [designationDetails]);

      
    }
    const calculateHours = (time) => {
        const [h, m] = time.split(":");
        return `${h}:${m}`
    }
    const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(":");
        const period = +hours >= 12 ? 'PM' : 'AM';
        let newHours = +hours % 12 || 12; // Convert 0 to 12 for midnight
        return `${newHours}:${minutes} ${period}`;
    };

    const calculateTotalHours = (start, end, extra) => {
        // Split only hours and minutes (ignore seconds)
        const [hours1, minutes1] = start.split(":").slice(0, 2);
        const [hours2, minutes2] = end.split(":").slice(0, 2);

        // Create Date objects with hours and minutes only
        const startTime = new Date(`1970-01-01T${hours1}:${minutes1}:00`);
        const endTime = new Date(`1970-01-01T${hours2}:${minutes2}:00`);

        // Adjust for cases where end time is on the next day
        if (endTime < startTime) {
            endTime.setDate(endTime.getDate() + 1);
        }

        // Calculate the total hours, including extra
        const totalHours = (endTime - startTime) / (1000 * 60 * 60) + parseInt(extra) / 60;

        return totalHours.toFixed(2); // Return total hours as a string with 2 decimal places
    };

    // popup

    return (
        <div className="profile-page">
            {togglNewAdd && <UpdateShift ClosePop={NewAttendanceClosePop} UpdateId={id} />}

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="error"
            />
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                getPersistentElements={() => document.querySelectorAll(".Toastify")}
                backdrop={<div className="backdrop" />}
                className="dialog"
            >
                <DialogHeading className="heading">Are you sure?</DialogHeading>
                <p className="description">
                    You want to delete this Designation Detail
                </p>
                <div className="buttons">
                    <div onClick={DelteConform}>
                        <Button className="button" >
                            Delete
                        </Button>
                    </div>
                    <DialogDismiss className="button secondary">Cancel</DialogDismiss>
                </div>
            </Dialog>
            <div className="details">
                <div className="title_top">
                    <h2>Shift  Detail</h2>
                    <div className='close_btn' onClick={AllEmp}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#7f7f7f" fill="none">
                            <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                    </div>
                </div>
                <div className="profile_card">
                    <div className="img_card">
                        {/* <div className="progress-circle" >
                            <img src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" alt="" />
                        </div> */}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50" color="#9b9b9b" fill="none">
                            <path d="M4 3H3C2.44772 3 2 3.44772 2 4V18L3.5 21L5 18V4C5 3.44772 4.55228 3 4 3Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            <path d="M21 12.0013V8.00072C21 5.64336 21 4.46468 20.2678 3.73234C19.5355 3 18.357 3 16 3H13C10.643 3 9.46447 3 8.73223 3.73234C8 4.46468 8 5.64336 8 8.00072V16.0019C8 18.3592 8 19.5379 8.73223 20.2703C9.35264 20.8908 10.2934 20.9855 12 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 7H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M12 11H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M14 19C14 19 15.5 19.5 16.5 21C16.5 21 18 17 22 15" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M2 7H5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <div className="about_user">
                            <h3>{designationDetails.shift_name}</h3>
                            {/* <p>{designationDetails.department_id}</p> */}
                            <div><h4></h4> <h5>{designationDetails.status == 0 ? 'Active' : 'Inactive'} </h5></div>
                        </div>
                    </div>
                    <div className="action_card">
                        <div onClick={handleRefresh}><RxReload /></div>
                        <div onClick={NewAttendanceClick}><span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#400f6f" fill="none">
                                <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11 20H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </span> Edit</div>
                        <div onClick={HandleDelete}><span><MdDeleteOutline /></span>Delete</div>
                    </div>
                </div>
                <div className="info-cards">
                    <div className="card">
                        <div className='top_head'> <h3> <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                <path d="M7 9.00183C4.82497 9.01495 3.64706 9.11944 2.87868 9.95185C2 10.9038 2 12.4358 2 15.4999C2 18.5641 2 20.0961 2.87868 21.048C3.75736 21.9999 5.17157 21.9999 8 21.9999H16C18.8284 21.9999 20.2426 21.9999 21.1213 21.048C22 20.0961 22 18.5641 22 15.4999C22 12.4358 22 10.9038 21.1213 9.95185C20.3529 9.11944 19.175 9.01495 17 9.00183" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6 12L10.5 14.625M18 19L13.8 16.55M13.8 16.55L18 13.75M13.8 16.55L10.5 14.625M10.5 14.625L6 17.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 7C13.3807 7 14.5 5.88071 14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5C9.5 5.88071 10.6193 7 12 7ZM12 7V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </span>Shif Information</h3></div>
                        <div className='contentInformation_shift'>
                            <div>
                                <h4>Shift Name</h4>
                                <p>{designationDetails.shift_name}</p>
                            </div>
                            <div>
                                <h4>Start Time</h4>
                                <p>{convertTo12HourFormat(designationDetails.start_time)}</p>
                            </div>
                            <div>
                                <h4>End Time</h4>
                                <p>{convertTo12HourFormat(designationDetails.end_time)}</p>
                            </div>
                            <div>
                                <h4>Extra Hours</h4>
                                <p>{designationDetails.extra_hours} Hours</p>
                            </div>
                            <div>
                                <h4>Break Time</h4>
                                <p>{calculateHours(designationDetails.break_time)} Minutes</p>
                            </div>
                            <div>
                                <h4>Total Hours</h4>
                                <p>{calculateTotalHours(designationDetails.start_time, designationDetails.end_time, designationDetails.extra_hours)}</p>
                            </div>
                            <div>
                                <h4>Created By</h4>
                                <p>{designationDetails2}</p>
                            </div>

                            <div>
                                <h4>Created At</h4>
                                <p>   {`${new Date(designationDetails.created_at).getDate()}-${new Date(designationDetails.created_at).toLocaleString('en-US', { month: 'short' })}-${new Date(designationDetails.created_at).getFullYear()}`}</p>
                            </div>                           
                        </div>
                        <div id='DescriptionJOB'>
                            {/* <h4>Description</h4> */}
                            {/* <p className='paragra'>{designationDetails.description}</p> */}
                        </div>
                    </div>
                   
                </div>
                {/* table */}

            </div>
           
        </div>

    );
};

export default SiftDetails;
//