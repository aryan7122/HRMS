import { useState, useEffect } from 'react';
import './LeaveDetails.scss';
import iconEdu from '../../../assets/icons/edu.png'
import img_emp1 from '../../../assets/emp1.png'
import axios from 'axios';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { IoMdCloseCircleOutline } from "react-icons/io";
// import Img_user from '../../../assets/user.png'
import { MdWorkHistory } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate, useParams } from 'react-router-dom';

import { MdDeleteOutline } from "react-icons/md";
import { deprecatedPropType } from '@mui/material';
// popup
import { IoMdAdd, IoIosCloseCircleOutline } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { OutsideClick2 } from '../../Department/DepartmentList/OutsideClick2'
import '../../../components/style.css';
// 
import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// popup
const LeaveDetails = () => {

    // const [activeTab, setActiveTab] = useState('experience');
    const [leavedetails, setLeavedetails] = useState(null);
    const projects = [
        // {
        //     name: "E-commerce Website Redesign",
        //     manager: "Abha Patel",
        //     contact: "919555502041",
        //     createdDate: "12/06/2020",
        //     status: "Completed"
        // },
        // {
        //     name: "Learning Platform Development",
        //     manager: "Adarsh Pal",
        //     contact: "919555502041",
        //     createdDate: "12/06/2020",
        //     status: "Completed"
        // },
        // {
        //     name: "Marketing Campaign",
        //     manager: "Akanksha Tewatia",
        //     contact: "919555502041",
        //     createdDate: "12/06/2020",
        //     status: "Completed"
        // },
        // {
        //     name: "User Interface Improvements",
        //     manager: "Abishek Tiwari",
        //     contact: "919555502041",
        //     createdDate: "12/06/2020",
        //     status: "Completed"
        // },
        // {
        //     name: "User Interface Improvements",
        //     manager: "Adri Green",
        //     contact: "919555502041",
        //     createdDate: "12/06/2020",
        //     status: "Pending"
        // }
    ];
    // popup
    // popup

    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);
    const [jobData2, setJobData2] = useState('');

    const [error, setError] = useState(false);
    const { id } = useParams();
    // alert(id)
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    const handleRefresh = () => {
        setRefresh(!refresh)
    };

    console.log('leavedetails::', leavedetails);

    useEffect(() => {
        if (id) {
            axios.post('https://devstronauts.com/public/api/leave/details', { id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setLeavedetails(response.data.result);
                    // setDepartmentdetails2(response.data.department.enteredbyid)
                    console.log('response ❗🗑️❗', response.data.result)
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    setError(true);
                    console.error("Error fetching designation details:", error);
                });
        }
    }, [id, token, refresh,]);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (leavedetails) {  // Ensure jobData is available before making this call
            axios.post('https://devstronauts.com/public/api/get-user', {
                enteredbyid: leavedetails.enteredbyid
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setJobData2(response.data.created_by);
                })
                .catch(error => {
                    console.error("Error fetching user data: ", error);
                });
        }
        return
    }, [leavedetails, token]);

    // HandleDelete
    const HandleDelete = () => {
        // confirm()
        setOpen(true)

    }
    const DelteConform = () => {
        if (id) {
            axios.post('https://devstronauts.com/public/api/leave/delete', { id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    // setDepartmentdetails(response.data.department);
                    // setDepartmentdetails2(response.data.department.enteredbyid)
                    console.log('⚠️ delete ❗', response)
                    toast.success('Deleted  successfully.', {
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
                        navigate('/all-leave')
                    }, 2000);

                })
                .catch(error => {
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
                    setLoading(false);
                    setError(true);
                    console.error("Error fetching designation details:", error);
                });
        }
    }



    const closePage = () => {
        navigate('/all-leave')
    }
    const UpdateLeave = () => {
        navigate(`/update-leave/${id}`)
    }

    if (loading) {
        return <div id="notFounPageID"><img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="Loading..." /></div>;
    }

    if (error || !leavedetails) {
        return <div id="notFounPageID"><img src="https://miro.medium.com/v2/resize:fit:996/1*C5oq4FeTlcpNXrXfnPpxTQ.gif" alt="Error loading data" /></div>;
    }


    // const EmployeeSlider = ({ employees }) => {
    // Helper function to chunk the employees array
    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    return (
        <div className="profile-page">
            <div className="">

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
                        You want to delete this Employee Leave Details
                    </p>
                    <div className="buttons">
                        <div onClick={DelteConform}>
                            <Button className="button">
                                Delete
                            </Button>
                        </div>
                        <DialogDismiss className="button secondary">Cancel</DialogDismiss>
                    </div>
                </Dialog>
            </div>
            {/* <ToastContainer className="toast-container" /> */}
            <div className="details">
                <div className="title_top">
                    <h2>Employee Leave Details</h2>
                    <div className='close_btn' onClick={closePage}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#7f7f7f" fill="none">
                            <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                    </div>
                </div>
                <div className="profile_card">
                    <div className="img_card">
                        <div className="progress-circle" >
                            <img src="https://media.sproutsocial.com/uploads/2022/06/profile-picture.jpeg" alt="" />
                        </div>
                        <div className="about_user">
                            <h3>{leavedetails.name || '-'}</h3>
                            <p>{leavedetails.leave_type_name || '-'}</p>
                            <div><h4></h4> <h5>{leavedetails.status}</h5></div>
                        </div>
                    </div>
                    <div className="action_card">
                        <div onClick={handleRefresh} ><RxReload /></div>
                        <div onClick={UpdateLeave}><span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#400f6f" fill="none">
                                <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11 20H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </span>Edit</div>
                        <div onClick={HandleDelete}><span><MdDeleteOutline /></span>Delete</div>
                    </div>
                </div>
                <div className="info-cards">
                    <div className="card  ">
                        <div className='top_head'> <h3> <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                <path d="M13 2L2 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 3V22H7C5.11438 22 4.17157 22 3.58579 21.4142C3 20.8284 3 19.8856 3 18V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 7L22 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 21.9997H17C18.8856 21.9997 19.8284 21.9997 20.4142 21.4139C21 20.8281 21 19.8853 21 17.9997V11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18 10L18 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7 11H8M7 15H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16 14H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16.5 22V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span> Leave Details</h3></div>
                        <div className='contentInformation'>
                            <div>
                                <h4> Type of Leave</h4>
                                <p>{leavedetails.type_of_leave || '-'}</p>
                            </div>
                            <div>
                                <h4> Leave Start Date</h4>
                                <p>{leavedetails.from_date || '-'}</p>
                            </div>
                            <div>
                                <h4> Leave End Date</h4>
                                <p>{leavedetails.to_date || '-'}</p>
                            </div>

                            <div>
                                <h4> No of Days</h4>
                                <p>{leavedetails.days + ' Day' || '-'}</p>
                            </div>
                            <div>
                                <h4>Leave Status</h4>
                                <p>{leavedetails.status || '-'}</p>
                            </div>
                            <div>
                                <h4>Created At</h4>
                                <p>
                                    {`${new Date(leavedetails.created_at).getDate()}-${new Date(leavedetails.created_at).toLocaleString('en-US', { month: 'short' })}-${new Date(leavedetails.created_at).getFullYear()}`}
                                </p>

                            </div>
                            <div>
                                <h4>Created By</h4>
                                <p>{jobData2}</p> {/* Updated to display created_by */}
                            </div>


                        </div>
                        <div id='DescriptionJOB'>
                            <div>
                                <h4 style={{ marginLeft: '-15px' }}> Resion</h4>
                                <p>{leavedetails.resion || '-'}</p>
                            </div>
                        </div>


                    </div>
                    <div className="card4" >
                        <div className='top_head4'> <h3> <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                <path d="M13 2L2 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 3V22H7C5.11438 22 4.17157 22 3.58579 21.4142C3 20.8284 3 19.8856 3 18V7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 7L22 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M10 21.9997H17C18.8856 21.9997 19.8284 21.9997 20.4142 21.4139C21 20.8281 21 19.8853 21 17.9997V11.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M18 10L18 7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7 11H8M7 15H8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16 14H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16.5 22V18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>Leave Summary</h3></div>

                        <div className="Emp4">
                            <div className='Leave_Summary'>
                                <p>Total Leave Balance</p>
                                <h2>29</h2>
                            </div>
                            <div className='Leave_Summary'>
                                <p>Total Leave Balance</p>
                                <h2>29</h2>
                            </div>
                            <div className='Leave_Summary'>
                                <p>Total Leave Balance</p>
                                <h2>29</h2>
                            </div>
                        </div>
                        {/* Personal information content */}
                    </div>
                </div>
                {/* table */}
                <div className="contents">
                    <div>
                        <div className="ProjectList">
                            <div className="section-header-title">
                                {/* <FaGraduationCap className="icon" /> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" color="#9b9b9b" fill="none">
                                    <path d="M12 22L10 16H2L4 22H12ZM12 22H16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M12 13V12.5C12 10.6144 12 9.67157 11.4142 9.08579C10.8284 8.5 9.88562 8.5 8 8.5C6.11438 8.5 5.17157 8.5 4.58579 9.08579C4 9.67157 4 10.6144 4 12.5V13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M19 13C19 14.1046 18.1046 15 17 15C15.8954 15 15 14.1046 15 13C15 11.8954 15.8954 11 17 11C18.1046 11 19 11.8954 19 13Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M10 4C10 5.10457 9.10457 6 8 6C6.89543 6 6 5.10457 6 4C6 2.89543 6.89543 2 8 2C9.10457 2 10 2.89543 10 4Z" stroke="currentColor" stroke-width="1.5" />
                                    <path d="M14 17.5H20C21.1046 17.5 22 18.3954 22 19.5V20C22 21.1046 21.1046 22 20 22H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                </svg>
                                <h2>Leave History</h2>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Leave Type</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Reason</th>
                                        <th>STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.map((project, index) => (
                                        <tr key={index}>
                                            <td>{project.name}</td>
                                            <td>{project.manager}</td>
                                            <td>{project.contact}</td>
                                            <td>{project.createdDate}</td>
                                            <td className={project.status === "Completed" ? "completed" : "pending"}>
                                                <span className="td">
                                                    {project.status.toUpperCase()}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LeaveDetails;
