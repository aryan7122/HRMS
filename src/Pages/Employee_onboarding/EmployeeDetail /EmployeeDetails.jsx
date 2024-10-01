import { useState, useEffect } from 'react';
import './EmployeeDetails.scss';
import Experience from './Experience.jsx';
import Education from './Education.jsx';
import Documents from './Documents.jsx';
import { IoMdCloseCircleOutline } from "react-icons/io";
// import Img_user from '../../../assets/user.png'
import { MdWorkHistory } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

import { MdDeleteOutline } from "react-icons/md";
import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contacts from './Contacts.jsx';
const EmployeeDetails = () => {
    const [activeTab, setActiveTab] = useState('experience');
    const navigate = useNavigate();
    const { id } = useParams();
    const token = localStorage.getItem('access_token');
    const [refresh, setRefresh] = useState(false);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [rotationAngle, setRotationAngle] = useState(0); // Starting angle 10

    const [employeeData, setEmployeeData] = useState(null); // To store the employee details from API
    const [employeeData2, setEmployeeData2] = useState(null); // To store the employee details from API
    console.log('experience employeeData 👉', employeeData)
    useEffect(() => {
        // const totalFields = Object.keys(employeeData).length; // Total fields count
        // const filledFields = Object.values(employeeData).filter(value => value !== null && value !== '').length; // Filled fields count

        // // Calculate percentage
        // const filledPercentage = (filledFields / totalFields) * 100;
        // setRotationAngle(filledPercentage)
        // console.log(`Filled fields 🗑️: ${filledFields}/${totalFields}, Percentage: ${filledPercentage.toFixed(2)}%`);

    }, [employeeData])
    useEffect(() => {
        if (employeeData && Object.keys(employeeData).length > 0) {
            // Check if employeeData exists and is not empty
            const totalFields = Object.keys(employeeData).length; // Total fields count
            const filledFields = Object.values(employeeData).filter(value => value !== null && value !== '').length; // Filled fields count

            // Calculate percentage
            const filledPercentage = (filledFields / totalFields) * 100;
            setRotationAngle(filledPercentage + 15);
            console.log(`Filled fields: ${filledFields}/${totalFields}, Percentage: ${filledPercentage.toFixed(2)}%`);
        }
    }, [employeeData]);

    useEffect(() => {
        setLoading(true)
        if (id) {
            axios.post('https://devstronauts.com/public/api/employee/details', {
                user_id: id
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setEmployeeData(response.data.result.employee[0]); // Store API data
                    setEmployeeData2(response.data.result); // Store API data
                    // Calculate filled fields percentage


                    console.log('response ....', response)

                    // toast.success(response.data.message, {
                    //     position: "top-right",
                    //     autoClose: 3000,
                    //     hideProgressBar: false,
                    //     closeOnClick: true,
                    //     pauseOnHover: true,
                    //     draggable: true,
                    //     progress: undefined,
                    //     theme: "light",
                    // });
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    setError(true);
                    // setLoading(false);
                    // setError(true);
                    console.error("Error fetching designation details:", error);
                    toast.error('Designation Detail update Failed.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                });
        }
    }, [id, token]);

    const renderContent = () => {
        if (!employeeData2) return <div>Loading...</div>
        switch (activeTab) {
            case 'experience':
                return <Experience employeeData={employeeData2.experiences} />;
            case 'education':
                return <Education employeeData={employeeData2.educations} />;
            case 'documents':
                return <Documents employeeData={employeeData2.documents} />;
            case 'contacts':
                return <Contacts employeeData={employeeData2.contacts} />;
            default:
                return <Experience />;
        }
    };

    const AllEmp = () => {
        navigate('/all-employee-list')
    }
    const AllEmpPage = () => {
        navigate('/all-employee-list')
    }
    const UpdateEmloyee = () => {
        navigate('/UpdateEmloyee')
    }

    const handleRefresh = () => {
        setRefresh(!refresh)
    };
    // console.log('employeeData 🧭', employeeData2)


    const HandleDelete = () => {
        setOpen(true)
    }
    const DelteConform = () => {
        if (id) {
            axios.post('https://devstronauts.com/public/api/employee/delete', {
                user_id: id
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    // setDepartmentdetails(response.data.department);
                    // setDepartmentdetails2(response.data.department.enteredbyid)
                    console.log('⚠️ delete ❗', response)
                    // setLoading(false);
                    navigate('/all-employee-list')

                })
                .catch(error => {
                    // setLoading(false);
                    // setError(true);
                    console.error("Error fetching designation details:", error);
                });
        }
    }
    if (loading) {
        return <div id="notFounPageID"><img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="Loading..." /></div>;
    }

    if (error || !employeeData) {
        return <div id="notFounPageID"><img src="https://media2.giphy.com/media/C21GGDOpKT6Z4VuXyn/200w.gif" alt="Error loading data" /></div>;
    }

    let EmployeeProfilePic = JSON.parse(employeeData.image);
    console.log('EmployeeProfilePic: ', EmployeeProfilePic);
    let picurl = ''
    // For logging each item in the parsed array
    EmployeeProfilePic.forEach(pic => {
        picurl = pic.name
        console.log('Image Name: ', pic.name);
        console.log('Image URL: ', pic.url);
    });
    const dummyImageUrl = "https://www.pngitem.com/pimgs/m/80-800194_transparent-users-icon-png-flat-user-icon-png.png"; // Dummy user icon ka URL

    // if (employeeData) {

    // }
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
                    You want to delete this Department Detail
                </p>
                <div className="buttons">
                    <div onClick={DelteConform}>
                        <Button className="button" onClick={() => toast("Deleted")}>
                            Delete
                        </Button>
                    </div>
                    <DialogDismiss className="button secondary">Cancel</DialogDismiss>
                </div>
            </Dialog>
            <div className="details">
                <div className="title_top">
                    <h2>Employee Details</h2>
                    <div className='close_btn' onClick={AllEmp}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#7f7f7f" fill="none">
                            <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                    </div>
                </div>
                <div className="profile_card">
                    <div className="img_card">
                        <div className="progress-circle" style={{ "--angle": `${rotationAngle}%` }}>
                            {EmployeeProfilePic.map((pic, index) => (
                                <img key={index} src={pic.url || dummyImageUrl} alt={pic.name} />
                            ))}
                        </div>
                        <div className="about_user">
                            <h3>{employeeData.first_name + ' ' + employeeData.last_name || ''}</h3>
                            <p>Web Developer / Full-Time</p>
                            <div><h4></h4><h5>{employeeData.employee_status}</h5></div>
                        </div>
                    </div>
                    <div className="action_card">
                        <div onClick={handleRefresh}><RxReload /></div>
                        <div onClick={() => navigate(`/UpdateEmloyee/${employeeData.id}`)}><BiEditAlt /></div>
                        <div onClick={HandleDelete}><span><MdDeleteOutline /></span>Delete</div>
                    </div>
                </div>
                <div className="info_cardsEmp">
                    <div className="card">
                        <div className='top_head'> <h3> <span><MdWorkHistory /></span>Work Information</h3></div>
                        <div className='contentInformation'>
                            <div>
                                <h4>Department</h4>
                                <p>Research & Development</p>
                            </div>
                            <div>
                                <h4>Employment Status</h4>
                                <p>Active</p>
                            </div>
                            <div>
                                <h4>Date of Joining</h4>
                                <p>{employeeData.joining_date || '-'}</p>
                            </div>
                            <div>
                                <h4>Designation</h4>
                                <p>Web Developer</p>
                            </div>
                            <div>
                                <h4>Reporting manager</h4>
                                <p>Satyam Singh</p>
                            </div>
                            <div>
                                <h4>Source of Hire</h4>
                                <p>{employeeData.source_of_hire || '-'}</p>
                            </div>
                            <div>
                                <h4>Employee Type</h4>
                                <p>{employeeData.employment_type || '-'}</p>
                            </div>
                            <div>
                                <h4>Employee Experience</h4>
                                <p>{employeeData.experience || '-'}</p>
                            </div>
                            <div>
                                <h4>Work Mail</h4>
                                <p>akasahcodes@gmail.com</p>
                            </div>
                            <div>
                                <h4>Date of Exit</h4>
                                <p>{employeeData.date_of_exit || '-'}</p>
                            </div>
                        </div>
                    </div>
                    <div className="card">
                        <div className='top_head'> <h3> <span><MdWorkHistory /></span>Personal Information</h3></div>
                        <div className='contentInformation'>
                            <div>
                                <h4>Employee ID</h4>
                                <p>{employeeData.employee_id || '-'}</p>
                            </div>
                            <div>
                                <h4>Contact Number</h4>
                                <p>{employeeData.mobile_no || '-'}</p>
                            </div>
                            <div>
                                <h4>Email</h4>
                                <p>{employeeData.email || '-'}</p>
                            </div>
                            <div>
                                <h4>Date of Birth</h4>
                                <p>{employeeData.date_of_birth || '-'}</p>
                            </div>
                            <div>
                                <h4>Age</h4>
                                <p>{employeeData.age || '-'}</p>
                            </div>
                            <div>
                                <h4>Gender</h4>
                                <p>{employeeData.gender || '-'}</p>
                            </div>
                            <div>
                                <h4>Marital</h4>
                                <p>{employeeData.marital || '-'}</p>
                            </div>
                        </div>
                        {/* Personal information content */}
                    </div>
                </div>

                <div className="nav-bar">
                    <button
                        className={activeTab === 'experience' ? 'active' : ''}
                        onClick={() => setActiveTab('experience')}
                    >
                        Experience
                    </button>
                    <button
                        className={activeTab === 'education' ? 'active' : ''}
                        onClick={() => setActiveTab('education')}
                    >
                        Education
                    </button>
                    <button
                        className={activeTab === 'documents' ? 'active' : ''}
                        onClick={() => setActiveTab('documents')}
                    >
                        Documents
                    </button>
                    <button
                        className={activeTab === 'contacts' ? 'active' : ''}
                        onClick={() => setActiveTab('contacts')}
                    >
                        Contacts
                    </button>
                </div>

                <div className="contents">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
