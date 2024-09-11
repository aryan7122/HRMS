import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../../Employee_onboarding/EmployeeDetail /EmployeeDetails.scss';
import { MdWorkHistory } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";

const JobDetails = () => {
    const { id } = useParams(); // Get the job ID from the URL
    const [jobData, setJobData] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('access_token');
    const navigate = useNavigate();
 console.log('jobid',id)
    // Fetch job details based on job ID
    useEffect(() => {
        axios.post('https://devstronauts.com/public/api/jobopening/list', {}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // Find the specific job based on jobId
                const job = response.data.job_opening.find(job => job.id == id);
                setJobData(job);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching job data: ", error);
            });
    }, [id, token]);

    const JobList = () => {
        navigate('/all-job-list');
    };

    if (loading) {
        return <div id='notFounPageID'><img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="" /></div>; // Loading state
    }

    if (!jobData) {
        return <div id='notFounPageID'><img  src="https://media2.giphy.com/media/C21GGDOpKT6Z4VuXyn/200w.gif?cid=82a1493bn9krc5evd3vjd2zev16nlay9tbow8jarm2nx3rf7&ep=v1_gifs_related&rid=200w.gif&ct=g" alt="" /></div>; // Error handling if job not found
    }

    return (
        <div className="profile-page">
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
                            <div><h4></h4> <h5>{jobData.job_status}</h5></div>

                        </div>
                    </div>
                    <div className="action_card">
                        <div><BiEditAlt /></div>
                        <div><span><MdDeleteOutline /></span>Delete</div>
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
                                <p>Mr.Admin</p>
                            </div>
                            <div>
                                <h4>Creation At</h4>
                                <p>{new Date(jobData.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className='top_head'>
                            <h3><span><MdWorkHistory /></span>Description</h3>
                        </div>
                        <div id='DescriptionJOB'>
                            <div>
                                <h3>{jobData.description}</h3>
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
