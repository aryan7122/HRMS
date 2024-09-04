import { useState } from 'react';
import './DesignationDetails.scss';
import iconEdu from '../../../assets/icons/edu.png'
import img_emp1 from '../../../assets/emp1.png'

import { IoMdCloseCircleOutline } from "react-icons/io";
// import Img_user from '../../../assets/user.png'
import { MdWorkHistory } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';

import { MdDeleteOutline } from "react-icons/md";

const DesignationDetails = () => {
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
        navigate('/designation')
    }
    const AllEmpPage = () => {
        navigate('/designation')
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
        { name: "Akash Shinde", Roll: "UI/UX Design", email: "Akashhrms@gmail.com", date: "12-Jan-2024", Image: img_emp1, DOB: '2024-08-12' },
        { name: "Ravi Kumar", Roll: "UI/UX Design", email: "ravikumar@gmail.com", date: "12-Jan-2024", Image: img_emp1, DOB: '2023-07-11' },
        { name: "Sita Sharma", Roll: "UI/UX Design", email: "sitasharma@gmail.com", date: "12-Jan-2024", Image: img_emp1, DOB: '2024-08-12' },
        { name: "Mohan Verma", Roll: "UI/UX Design", email: "mohanverma@gmail.com", date: "12-Jan-2024", Image: img_emp1, DOB: '2024-06-15' },
        // { name: "New Employee 1", Roll: "HR", email: "newemp1@gmail.com", phone: "+918888888884", Image: img_emp1, DOB: '2024-08-10' },
        // { name: "New Employee 2", Roll: "Manager", email: "newemp2@gmail.com", phone: "+918888888885", Image: img_emp1, DOB: '2024-08-12' },
        // { name: "New Employee 3", Roll: "Support", email: "newemp3@gmail.com", phone: "+918888888886", Image: img_emp1, DOB: '2024-08-18' },
        // { name: "New Employee 4", Roll: "Developer", email: "newemp4@gmail.com", phone: "+918888888887", Image: img_emp1, DOB: '2024-08-13' },
    ]);

    return (
        <div className="profile-page">
            <div className="details">
                <div className="title_top">
                    <h2>Designation  Detail</h2>
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
                                <path d="M7 9.00183C4.82497 9.01495 3.64706 9.11944 2.87868 9.95185C2 10.9038 2 12.4358 2 15.4999C2 18.5641 2 20.0961 2.87868 21.048C3.75736 21.9999 5.17157 21.9999 8 21.9999H16C18.8284 21.9999 20.2426 21.9999 21.1213 21.048C22 20.0961 22 18.5641 22 15.4999C22 12.4358 22 10.9038 21.1213 9.95185C20.3529 9.11944 19.175 9.01495 17 9.00183" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6 12L10.5 14.625M18 19L13.8 16.55M13.8 16.55L18 13.75M13.8 16.55L10.5 14.625M10.5 14.625L6 17.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 7C13.3807 7 14.5 5.88071 14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5C9.5 5.88071 10.6193 7 12 7ZM12 7V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </span>Designation Information</h3></div>
                        <div className='contentInformation'>
                            <div>
                                <h4>Level</h4>
                                <p>Junior</p>
                            </div>
                            <div>
                                <h4>Required Skills</h4>
                                <p>Wireframing, Prototyping, Visual Design, UX Writing</p>
                            </div>
                            <div>
                                <h4>Reports To</h4>
                                <p>Project Manager</p>
                            </div>
                            <div>
                                <h4>Created By</h4>
                                <p>Mr.Admin</p>
                            </div>
                            <div>
                                <h4>Created Date</h4>
                                <p>16-Apr-2024</p>
                            </div>
                            <div>
                                <h4>Last Modified By</h4>
                                <p>Akash Shinde </p>
                            </div>
                           
                            <div>
                                <h4>Last Modified Date</h4>
                                <p>16-Apr-2024</p>
                            </div>
                            <div>
                                <h4>Created Date</h4>
                                <p>01-Jan-2024</p>
                            </div>
                        </div>
                        <div id='DescriptionJOB'>
                            <h4>Responsibilities</h4>
                            <p className='paragra'>Lorem ipsum dolor sit amet consectetur. Ultrices nunc at sollicitudin leo nunc lorem ac tellus gravida. Tellus eu tortor lectus nulla vel egestas massa viverra. Lorem ipsum dolor sit amet consectetur. Ultrices nunc at sollicitudin leo nunc lorem ac tellus gravida. Tellus eu tortor lectus nulla vel egestas massa viverra.
                            </p>
                        </div>
                    </div>
                    <div className="card">
                        <div className='top_head'> <h3> <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                <path d="M7 9.00183C4.82497 9.01495 3.64706 9.11944 2.87868 9.95185C2 10.9038 2 12.4358 2 15.4999C2 18.5641 2 20.0961 2.87868 21.048C3.75736 21.9999 5.17157 21.9999 8 21.9999H16C18.8284 21.9999 20.2426 21.9999 21.1213 21.048C22 20.0961 22 18.5641 22 15.4999C22 12.4358 22 10.9038 21.1213 9.95185C20.3529 9.11944 19.175 9.01495 17 9.00183" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M6 12L10.5 14.625M18 19L13.8 16.55M13.8 16.55L18 13.75M13.8 16.55L10.5 14.625M10.5 14.625L6 17.6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M12 7C13.3807 7 14.5 5.88071 14.5 4.5C14.5 3.11929 13.3807 2 12 2C10.6193 2 9.5 3.11929 9.5 4.5C9.5 5.88071 10.6193 7 12 7ZM12 7V11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </span>Employees in Designation</h3></div>
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
                                    <p>{emp.date}</p>
                                </div>
                            ))}
                        </div>
                        {/* Personal information content */}
                    </div>
                </div>
                {/* table */}
               
            </div>
        </div>
    );
};

export default DesignationDetails;
