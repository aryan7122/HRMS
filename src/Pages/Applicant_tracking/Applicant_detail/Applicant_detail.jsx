// import { useState } from 'react';
import '../../Employee_onboarding/EmployeeDetail /EmployeeDetails.scss';

import { IoMdCloseCircleOutline } from "react-icons/io";
// import Img_user from '../../../assets/user.png'
import { MdWorkHistory } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

import { MdDeleteOutline } from "react-icons/md";

const Applicant_detail = () => {
    const navigate = useNavigate()
    const JobList = () => {
        navigate('/all-applicant-list')
    }


    return (
        <div className="profile-page">
            <div className="details">
                <div className="title_top">
                    <h2>Applicant Details</h2>
                    <div className='close_btn' onClick={JobList}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#7f7f7f" fill="none">
                            <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                    </div>
                </div>
                <div className="profile_card">
                    <div className="img_card">
                        <div className="progress-circle" >
                            <img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                        </div>
                        <div className="about_user">
                            <h3>Ramesh Gupta</h3>
                            {/* <p>Web Developer / Full-Time</p> */}
                            <div className=''><h4></h4> <h5>On Hold</h5></div>
                        </div>
                    </div>
                    <div className="action_card">
                        {/* <div><RxReload /></div> */}
                        <div><BiEditAlt /></div>
                        <div><span><MdDeleteOutline /></span>Delete</div>
                    </div>
                </div>
                <div className="info-cards" style={{ paddingBottom: '30px' }}>
                    <div className="card">
                        <div className='top_head'> <h3>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#7f7f7f" fill="none">
                                    <path d="M14 8.99988H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M14 12.4999H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <rect x="2" y="2.99988" width="20" height="18" rx="5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                    <path d="M5 15.9999C6.20831 13.4188 10.7122 13.249 12 15.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10.5 8.99988C10.5 10.1044 9.60457 10.9999 8.5 10.9999C7.39543 10.9999 6.5 10.1044 6.5 8.99988C6.5 7.89531 7.39543 6.99988 8.5 6.99988C9.60457 6.99988 10.5 7.89531 10.5 8.99988Z" stroke="currentColor" stroke-width="1.5" />
                                </svg>
                            </span>
                            Personal Information</h3></div>
                        <div className='contentInformation'>
                            <div>
                                <h4>Email ID</h4>
                                <p>ramesh25@gmail.com</p>
                            </div>
                            <div>
                                <h4>Contact Number</h4>
                                <p>+91 80173 65995</p>
                            </div>
                            <div>
                                <h4>Country</h4>
                                <p>India</p>
                            </div>
                            <div>
                                <h4>State</h4>
                                <p>Maharashtra</p>
                            </div>
                            <div>
                                <h4>City</h4>
                                <p>Pune</p>
                            </div>
                            <div>
                                <h4>Zip code</h4>
                                <p>415002</p>
                            </div>
                            <div>
                                <h4>Resume</h4>
                                <span className='privew'>
                                    <p>My resume.PDF </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" height="17" color="#7f7f7f" fill="none">
                                        <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" stroke-width="1.5" />
                                        <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" stroke-width="1.5" />
                                    </svg>
                               </span>
                            </div>
                            <div>
                                <h4>Cover Letter</h4>
                                <span className='privew'>
                                    <p>My resume.PDF </p>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="17" height="17" color="#7f7f7f" fill="none">
                                        <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" stroke-width="1.5" />
                                        <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" stroke-width="1.5" />
                                    </svg>
                                </span>
                            </div>
                           
                        </div>
                    </div>
                    <div className="card">
                        <div className='top_head'> <h3> <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#7f7f7f" fill="none">
                                <path d="M20 22V19C20 17.1144 20 16.1716 19.4142 15.5858C18.8284 15 17.8856 15 16 15H14L12 17L10 15H8C6.11438 15 5.17157 15 4.58579 15.5858C4 16.1716 4 17.1144 4 19V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16 15V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8 15V22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M15.5 9V7C15.5 5.067 13.933 3.5 12 3.5C10.067 3.5 8.5 5.067 8.5 7V9C8.5 10.933 10.067 12.5 12 12.5C13.933 12.5 15.5 10.933 15.5 9Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7.5 7.5H16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 2V3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>Work Information</h3></div>
                        <div className='contentInformation'>
                            <div>
                                <h4>Applied for</h4>
                                <p>Web Developer</p>
                            </div>
                            <div>
                                <h4>Source</h4>
                                <p>Employee Referral</p>
                            </div>
                            <div>
                                <h4>Referral Employee</h4>
                                <p>EMP-001</p>
                            </div>
                            <div>
                                <h4>Availability Date</h4>
                                <p>25-Apr-2024</p>
                            </div>
                            <div>
                                <h4>Expected Salary</h4>
                                <p>$25000</p>
                            </div>
                            <div>
                                <h4>Created at</h4>
                                <p>25-Apr-2024</p>
                            </div>
                            <div>
                                <h4>Created By</h4>
                                <p>Mr.Admin</p>
                            </div>
                        </div>
                        {/* Personal information content */}
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Applicant_detail;
