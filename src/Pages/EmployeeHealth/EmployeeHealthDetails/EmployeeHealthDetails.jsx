import { useState,useEffect } from 'react';
import './EmployeeHealthDetails.scss';
import iconEdu from '../../../assets/icons/edu.png'
import img_emp1 from '../../../assets/emp1.png'
import axios from 'axios';

import { IoMdCloseCircleOutline } from "react-icons/io";
// import Img_user from '../../../assets/user.png'
import { MdWorkHistory } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate, useParams } from 'react-router-dom';

import { MdDeleteOutline } from "react-icons/md";
import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const EmployeeHealthDetails = () => {
    const [activeTab, setActiveTab] = useState('experience');
    const navigate = useNavigate()
    const { id } = useParams();
    

    const AllEmp = () => {
        navigate('/health')
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
        // { name: "Akash Shinde", Roll: "Lead Design", email: "Akashhrms@gmail.com", phone: "+918555031082", Image: img_emp1, DOB: '2024-08-12' },
        // { name: "Ravi Kumar", Roll: "Developer", email: "ravikumar@gmail.com", phone: "+918888888881", Image: img_emp1, DOB: '2023-07-11' },
        // { name: "Sita Sharma", Roll: "Designer", email: "sitasharma@gmail.com", phone: "+918888888882", Image: img_emp1, DOB: '2024-08-12' },
        // { name: "Mohan Verma", Roll: "Tester", email: "mohanverma@gmail.com", phone: "+918888888883", Image: img_emp1, DOB: '2024-06-15' },
        // { name: "New Employee 1", Roll: "HR", email: "newemp1@gmail.com", phone: "+918888888884", Image: img_emp1, DOB: '2024-08-10' },
        // { name: "New Employee 2", Roll: "Manager", email: "newemp2@gmail.com", phone: "+918888888885", Image: img_emp1, DOB: '2024-08-12' },
        // { name: "New Employee 3", Roll: "Support", email: "newemp3@gmail.com", phone: "+918888888886", Image: img_emp1, DOB: '2024-08-18' },
        // { name: "New Employee 4", Roll: "Developer", email: "newemp4@gmail.com", phone: "+918888888887", Image: img_emp1, DOB: '2024-08-13' },
    ]);


    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('access_token');

    console.log('employees', employees)
    useEffect(() => {
        setLoading(true)
        axios.post('https://devstronauts.com/public/api/employee/health/details', {
           id:id
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {

                setLoading(false)
                setEmployees(response.data.result);
                // setFilteredEmployees(response.data.result); // filteredEmployees ko bhi sync karo
                console.log('response 🥳', response.data.result);
                // setLoading(false);
                // setSms()
            })
            .catch(error => {
                setEmployees('')
                console.error("Error fetching data: ", error);
                setLoading(false)

            })
    }, []);
    // list api


    // delete
    const [open, setOpen] = useState(false);

    const HandleDelete = () => {
        // confirm()
        setOpen(true)

    }
    const DelteConform = () => {
        if (id) {
            axios.post('https://devstronauts.com/public/api/employee/health/delete', { id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    // setDepartmentdetails(response.data.department);
                    // setDepartmentdetails2(response.data.department.enteredbyid)
                    console.log('⚠️ delete ❗', response)
                    // setLoading(false);
                    navigate('/health')

                })
                .catch(error => {
                    setLoading(false);
                    setError(true);
                    console.error("Error fetching designation details:", error);
                });
        }
    }
    // delete
    // Fetch  details based 
  
    if (loading) {
        return <div id='notFounPageID'><img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="" /></div>; // Loading state
    }

    if (!employees) {
        return <div className="not-found-container">
            <img src="https://cdn.dribbble.com/userupload/11708150/file/original-825be68b3517931ad747e0180a4116d3.png?resize=1200x900" alt="" />
            <h1 className="grey-text">No matching records found</h1>
            <p className="grey-text">Sorry, we couldn't find the data you're looking for.</p>
        </div>// Error handling if job not found
    }

    const Update = () => {
        navigate(`/update-employee-health/${id}`)
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
                    You want to delete this Department Detail
                </p>
                <div className="buttons">
                    <div onClick={DelteConform}>
                        <Button className="button" onClick={() => toast("Deleted!")}>
                            Delete
                        </Button>
                    </div>
                    <DialogDismiss className="button secondary">Cancel</DialogDismiss>
                </div>
            </Dialog>
            <div className="details">
                <div className="title_top">
                    <h2>Employee Health  Detail</h2>
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
                            <h3>{employees.employee_name || '-'}</h3>
                            <p>{employees.department_head || '-'}</p>
                            <div><h4></h4> <h5>{employees.covid_status || '-'}</h5></div>
                        </div>
                    </div>
                    <div className="action_card">
                        <div><RxReload /></div>
                        <div onClick={Update}><BiEditAlt /></div>
                        <div onClick={HandleDelete}><span><MdDeleteOutline /></span>Delete</div>
                    </div>
                </div>
                <div className="info-cards">
                    <div className="card">
                        <div className='top_head'> <h3> <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
                                <path d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11.992 8H12.001" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>Employee  Information</h3></div>
                        <div className='contentInformation'>
                            <div>
                                <h4>Department </h4>
                                <p>{employees.department_head || '-'}</p>
                            </div>
                        
                            <div>
                                <h4>Mobile no.</h4>
                                <p>{employees.mobile_no || '-'}</p>
                            </div>
                            <div>
                                <h4>Gender</h4>
                                <p>{employees.gender || '-'}</p>
                            </div>
                            <div>
                                <h4>Weight</h4>
                                <p>{employees.weight + ' kg' || '-'}</p>
                            </div>
                            <div>
                                <h4>Height</h4>
                                <p>{employees.height + ' cm' || '-'}</p>
                            </div>
                            <div>
                                <h4>Blood group</h4>
                                <p>{employees.blood_group || '-'}</p>
                            </div>

                        </div>
                        <div id='DescriptionJOB'>
                            <h4>Notes</h4>
                            <p className='paragra'>{employees.notes || '-'}</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className='top_head'> <h3> <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                <path d="M19.4626 3.99352C16.7809 2.3486 14.4404 3.01148 13.0344 4.06738C12.4578 4.50033 12.1696 4.7168 12 4.7168C11.8304 4.7168 11.5422 4.50033 10.9656 4.06738C9.55962 3.01148 7.21909 2.3486 4.53744 3.99352C1.01807 6.1523 0.221719 13.2742 8.33953 19.2827C9.88572 20.4272 10.6588 20.9994 12 20.9994C13.3412 20.9994 14.1143 20.4272 15.6605 19.2827C23.7783 13.2742 22.9819 6.1523 19.4626 3.99352Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                <path d="M12 9V15M9 12L15 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </span>Health Information</h3></div>
                        <div className='Health_Information'>
                            {/* <div>
                                <h4>Record Date : </h4>
                                <p>08-Mar-2024</p>
                            </div>
                            <div>
                                <h4>Health Check Type :</h4>
                                <p>Annual</p>
                            </div>
                            <div>
                                <h4>Results :</h4>
                                <p>Annual</p>
                            </div>
                            <div>
                                <h4>Doctor/Clinic :</h4>
                                <p>Dr.Satyam Bhosale</p>
                            </div>
                            <div>
                                <h4>Hospitalizations :</h4>
                                <p>Not Yet</p>
                            </div> */}
                            <div>
                                <h4>Overall Health Status</h4>
                                <p>{employees.checkup_result || '-'}</p>
                            </div>
                            <div>
                                <h4>Last Health Check Date</h4>
                                <p>{employees.last_checkup_date}</p>
                            </div>
                            <div>
                                <h4>Next Health Check Date</h4>
                                <p>{employees.next_checkup_date}</p>
                            </div>
                            <div>
                                <h4>Allergies</h4>
                                <p>{employees.allergies || '-'}</p>
                            </div>
                            <div>
                                <h4>Chronic Conditions</h4>
                                <p>{employees.chronic_condition || '-'}</p>
                            </div>
                            <div>
                                <h4>Covid affected :</h4>
                                <p>{employees.covid_affected || '-'}</p>
                            </div>
                            <div>
                                <h4>Emergency Contact Name</h4>
                                <p>{employees.contact_name || '-'}</p>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default EmployeeHealthDetails;
