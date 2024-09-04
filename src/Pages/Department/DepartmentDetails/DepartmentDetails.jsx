import { useState } from 'react';
import './DepartmentDetails.scss';
import iconEdu from '../../../assets/icons/edu.png'
import img_emp1 from '../../../assets/emp1.png'

import { IoMdCloseCircleOutline } from "react-icons/io";
// import Img_user from '../../../assets/user.png'
import { MdWorkHistory } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

import { MdDeleteOutline } from "react-icons/md";

const DepartmentDetails = () => {
    const [activeTab, setActiveTab] = useState('experience');
    const navigate = useNavigate()

    const renderContent = () => {
        switch (activeTab) {
            case 'experience':
                return <Experience />;
            case 'education':
                return <Education />;
            case 'documents':
                return <Documents />;
            default:
                return <Experience />;
        }
    };

    const AllEmp = () => {
        navigate('/department')
    }
    const AllEmpPage = () => {
        navigate('/department')
    }
    const projects = [
        {
            name: "E-commerce Website Redesign",
            manager: "Abha Patel",
            contact: "919555502041",
            createdDate: "12/06/2020",
            status: "Completed"
        },
        {
            name: "Learning Platform Development",
            manager: "Adarsh Pal",
            contact: "919555502041",
            createdDate: "12/06/2020",
            status: "Completed"
        },
        {
            name: "Marketing Campaign",
            manager: "Akanksha Tewatia",
            contact: "919555502041",
            createdDate: "12/06/2020",
            status: "Completed"
        },
        {
            name: "User Interface Improvements",
            manager: "Abishek Tiwari",
            contact: "919555502041",
            createdDate: "12/06/2020",
            status: "Completed"
        },
        {
            name: "User Interface Improvements",
            manager: "Adri Green",
            contact: "919555502041",
            createdDate: "12/06/2020",
            status: "Pending"
        }
    ];
    const [employees, setEmployees] = useState([
        { name: "Akash Shinde", Roll: "Lead Design", email: "Akashhrms@gmail.com", phone: "+918555031082", Image: img_emp1, DOB: '2024-08-12' },
        { name: "Ravi Kumar", Roll: "Developer", email: "ravikumar@gmail.com", phone: "+918888888881", Image: img_emp1, DOB: '2023-07-11' },
        { name: "Sita Sharma", Roll: "Designer", email: "sitasharma@gmail.com", phone: "+918888888882", Image: img_emp1, DOB: '2024-08-12' },
        { name: "Mohan Verma", Roll: "Tester", email: "mohanverma@gmail.com", phone: "+918888888883", Image: img_emp1, DOB: '2024-06-15' },
        // { name: "New Employee 1", Roll: "HR", email: "newemp1@gmail.com", phone: "+918888888884", Image: img_emp1, DOB: '2024-08-10' },
        // { name: "New Employee 2", Roll: "Manager", email: "newemp2@gmail.com", phone: "+918888888885", Image: img_emp1, DOB: '2024-08-12' },
        // { name: "New Employee 3", Roll: "Support", email: "newemp3@gmail.com", phone: "+918888888886", Image: img_emp1, DOB: '2024-08-18' },
        // { name: "New Employee 4", Roll: "Developer", email: "newemp4@gmail.com", phone: "+918888888887", Image: img_emp1, DOB: '2024-08-13' },
    ]);

    return (
        <div className="profile-page">
            <div className="details">
                <div className="title_top">
                    <h2>Department Detail</h2>
                    <div className='close_btn' onClick={AllEmp}>
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
                            <h3>UI/UX Design</h3>
                            <p>UI/UX Designer</p>
                            {/* <div><h4></h4> <h5>Active</h5></div> */}
                        </div>
                    </div>
                    <div className="action_card">
                        <div><RxReload /></div>
                        <div><BiEditAlt /></div>
                        <div><span><MdDeleteOutline /></span>Delete</div>
                    </div>
                </div>
                <div className="info-cards">
                    <div className="card">
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
                        </span>Department Information</h3></div>
                        <div className='contentInformation'>
                            <div>
                                <h4>Department Code</h4>
                                <p>DP-001</p>
                            </div>
                            <div>
                                <h4>Department Head</h4>
                                <p>Mr. Arman Wagh</p>
                            </div>
                            <div>
                                <h4>Location</h4>
                                <p>Office Building</p>
                            </div>
                            <div>
                                <h4>Parent Department</h4>
                                <p>Web Development</p>
                            </div>
                            <div>
                                <h4>Sub Department</h4>
                                <p>-</p>
                            </div>
                            <div>
                                <h4>Created By</h4>
                                <p>Mr.Admin</p>
                            </div>
                            <div>
                                <h4>Last Modified By</h4>
                                <p>Akash Shinde</p>
                            </div>
                            <div>
                                <h4>Last Modified Date</h4>
                                <p>02-Jan-2024</p>
                            </div>
                            <div>
                                <h4>Created Date</h4>
                                <p>01-Jan-2024</p>
                            </div>
                        </div>
                        <div id='DescriptionJOB'>
                            <h4>Description</h4>
                            <p className='paragra'>Lorem ipsum dolor sit amet consectetur. Ultrices nunc at sollicitudin leo nunc
                                Lorem ipsum dolor sit amet consectetur.
                            </p>
                        </div>
                    </div>
                    <div className="card">
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
                        </span>Employees in Department</h3></div>
                        <div className="Emp">
                            {employees.map((emp, i) => (
                                <div key={i} className='div_dob'>
                                    <div className='img_dob_name'>
                                        <img src={emp.Image} alt={emp.name} />
                                        <div>
                                            <h3>{emp.name}</h3>
                                            <p> {emp.Roll}</p>
                                        </div>
                                    </div>
                                    <p>{emp.phone}</p>
                                </div>
                            ))}
                        </div>
                        {/* Personal information content */}
                    </div>
                </div>
                {/* table */}
                <div className="contents">
                    <div>
                        <div className="ProjectList">
                            <div className="section-header">
                                {/* <FaGraduationCap className="icon" /> */}
                                <img src={iconEdu} alt="" className='icon' />
                                <h2>Education</h2>
                            </div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>PROJECT NAME</th>
                                        <th>PROJECT MANAGER</th>
                                        <th>CONTACT</th>
                                        <th>CREATED DATE</th>
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

export default DepartmentDetails;
