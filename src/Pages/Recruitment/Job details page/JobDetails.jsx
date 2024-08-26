import { useState } from 'react';
import '../../Employee onboarding/EmployeeDetail /EmployeeDetails.scss';

import { IoMdCloseCircleOutline } from "react-icons/io";
// import Img_user from '../../../assets/user.png'
import { MdWorkHistory } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

import { MdDeleteOutline } from "react-icons/md";

const JobDetails = () => {
    const navigate = useNavigate()
    const JobList = () => {
        navigate('/all-job-list')
    }


    return (
        <div className="profile-page">
            <div className="details">
                <div className="title_top">
                    <h2>Job Details</h2>
                    <div className='close_btn' onClick={JobList}><IoMdCloseCircleOutline /></div>
                </div>
                <div className="profile_card">
                    <div className="img_card">
                        <div className="progress-circle" >
                            <img src="https://w7.pngwing.com/pngs/564/690/png-transparent-computer-icons-web-browser-new-job-hand-business-silhouette-thumbnail.png" alt="" />
                        </div>
                        <div className="about_user">
                            <h3>Software Developer</h3>
                            {/* <p>Web Developer / Full-Time</p> */}
                            <div><h4></h4> <h5>Open</h5></div>
                        </div>
                    </div>
                    <div className="action_card">
                        {/* <div><RxReload /></div> */}
                        <div><BiEditAlt /></div>
                        <div><span><MdDeleteOutline /></span>Delete</div>
                    </div>
                </div>
                <div className="info-cards" style={{paddingBottom:'30px'}}>
                    <div className="card">
                        <div className='top_head'> <h3> <span><MdWorkHistory /></span>Job Information</h3></div>
                        <div className='contentInformation'>
                            <div>
                                <h4>Department</h4>
                                <p>Research & Development</p>
                            </div>
                            <div>
                                <h4>Designation</h4>
                                <p>Engineer</p>
                            </div>
                            <div>
                                <h4>Required Experience</h4>
                                <p>Mid Level</p>
                            </div>
                            <div>
                                <h4>Job Location</h4>
                                <p>Office</p>
                            </div>
                            <div>
                                <h4>No. Of Positions</h4>
                                <p>10</p>
                            </div>
                            <div>
                                <h4>Employee Type</h4>
                                <p>Permanent-Full time</p>
                            </div>
                            <div>
                                <h4>Required Skills</h4>
                                <p>PHP, Laravel, Java</p>
                            </div>
                            <div>
                                <h4>Created By</h4>
                                <p>Mr.Admin</p>
                            </div>
                            <div>
                                <h4>Creation At</h4>
                                <p>12-Apr-2024</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className='top_head'> <h3> <span><MdWorkHistory /></span>Description</h3></div>
                        <div id='DescriptionJOB'>
                            <div>
                                <h3> Urgent requirement for experienced Software developer</h3>
                                <p>What You'll Do As Financial Analyst, you'll responsible for financial planning and analysis. You will analyze business performance, create forecasts, and help the executive team make strategic business decisions through your reports</p>
                                <p>Responsibilities:</p>
                                    <p>Provide forecasting, reporting, and budgeting support to senior management
                                        Produce monthly reports with key metrics and financial results
                                        Drive annual and quarterly budgeting and forecasting processes
                                    </p>
                            </div>
                        </div>
                        {/* Personal information content */}
                    </div>
                </div>

                
            </div>
        </div>
    );
};

export default JobDetails;
