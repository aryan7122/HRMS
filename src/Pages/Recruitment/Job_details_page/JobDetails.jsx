import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../Employee_onboarding/EmployeeDetail/EmployeeDetails.scss';
import { MdWorkHistory } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 
const JobDetails = () => {
    const { id } = useParams(); // Get the job ID from the URL
    const [jobData, setJobData] = useState(null);
    const [jobData2, setJobData2] = useState('');

    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();
    console.log('byUser', jobData2)

    // Fetch  details based 
    useEffect(() => {
        axios.post('https://hrms.dragnilifecare.in/public/api/jobopening/list', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // Find the specific job based on jobId
                const job = response.data.job_opening.find(job => job.id == id);
                console.log('data Job', job)
                setJobData(job);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching job data: ", error);
            });
    }, [id, token]);

    // Fetch user data based on enteredbyid from jobData
    useEffect(() => {
        if (jobData) {  // Ensure jobData is available before making this call
            axios.post('https://hrms.dragnilifecare.in/public/api/get-user', {
                enteredbyid: jobData.enteredbyid
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
    }, [jobData, token]); // Add jobData as dependency
    // HandleDelete
    const [open, setOpen] = useState(false);

    const HandleDelete = () => {
        // confirm()
        setOpen(true)

    }
    const DelteConform = () => {
        if (id) {
            axios.post('https://hrms.dragnilifecare.in/public/api/jobopening/delete', { id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    // setDepartmentdetails(response.data.department);
                    // setDepartmentdetails2(response.data.department.enteredbyid)
                    console.log('⚠️ delete ❗', response)
                    // setLoading(false);
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
                        navigate('/all-job-list')
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
                    // setError(true);
                    console.error("Error fetching designation details:", error);
                });
        }
    }

    // HandleDelete

    const JobList = () => {
        navigate('/all-job-list');
    };

    const JOBUPDATE = () => {
        navigate(`/job-update/${id}`);
    }

    if (loading) {
        return <div id='notFounPageID'><img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="" /></div>; // Loading state
    }

    if (!jobData) {
        return <div id='notFounPageID'><img src="https://media2.giphy.com/media/C21GGDOpKT6Z4VuXyn/200w.gif?cid=82a1493bn9krc5evd3vjd2zev16nlay9tbow8jarm2nx3rf7&ep=v1_gifs_related&rid=200w.gif&ct=g" alt="" /></div>; // Error handling if job not found
    }

    return (
        <div className="profile-page">
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
                    You want to delete this Job Detail
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
            <div className="details">
                <div className="title_top">
                    <h2>Job Details</h2>
                    <div className='close_btn' onClick={JobList}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#7f7f7f" fill="none">
                            <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                    </div>
                </div>
                <div className="profile_card">
                    <div className="img_card">
                        <div className="progress-circle">
                            <img src="https://w7.pngwing.com/pngs/564/690/png-transparent-computer-icons-web-browser-new-job-hand-business-silhouette-thumbnail.png" alt="" />
                        </div>
                        <div className="about_user">
                            <h3>{jobData.job_title}</h3>
                            <p>{jobData.department}</p>
                            <div><h4></h4><h5>{jobData.job_status}</h5></div>

                        </div>
                    </div>
                    <div className="action_card">
                        <div onClick={JOBUPDATE}><span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#400f6f" fill="none">
                                <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11 20H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </span>  Edit</div>
                        <div onClick={HandleDelete}><span><MdDeleteOutline /></span>Delete</div>
                    </div>
                </div>
                <div className="info-cards" style={{ paddingBottom: '30px' }}>
                    <div className="card">
                        <div className='top_head'>
                            <h3><span><MdWorkHistory /></span>Job Information</h3>
                        </div>
                        <div className='contentInformation'>
                            <div>
                                <h4>Department</h4>
                                <p>{jobData.department}</p>
                            </div>
                            <div>
                                <h4>Designation</h4>
                                <p>{jobData.designation}</p>
                            </div>
                            <div>
                                <h4>Required Experience</h4>
                                <p>{jobData.experience}</p>
                            </div>
                            <div>
                                <h4>Job Location</h4>
                                <p>{jobData.job_location}</p>
                            </div>
                            <div>
                                <h4>No. Of Positions</h4>
                                <p>{jobData.no_of_position}</p>
                            </div>
                            <div>
                                <h4>Employee Type</h4>
                                <p>{jobData.employee_type}</p>
                            </div>
                            <div>
                                <h4>Required Skills</h4>
                                <p>{jobData.skills}</p>
                            </div>
                            <div>
                                <h4>Created By</h4>
                                <p>{jobData2}</p> {/* Updated to display created_by */}
                            </div>
                            <div>
                                <h4> Created At</h4>
                                <p> {`${new Date(jobData.created_at).getDate()}-${new Date(jobData.created_at).toLocaleString('en-US', { month: 'short' })}-${new Date(jobData.created_at).getFullYear()}`}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className='top_head'>
                            <h3><span><MdWorkHistory /></span>Description</h3>
                        </div>
                        <div id='DescriptionJOB'>
                            <div>
                                {/* <h3>{jobData.description}</h3> */}
                                <p>{jobData.description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;
