import { useState, useEffect } from 'react';
import './AnnouncementsDetails.scss';
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
const AnnouncementsDetails = () => {

    // const [activeTab, setActiveTab] = useState('experience');
    const [departmentdetails, setDepartmentdetails] = useState(null);
    const [departmentdetails2, setDepartmentdetails2] = useState('');
    const [departmentdetails3, setDepartmentdetails3] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0); // State to track current slide
    const { isOpen: isDepartmentOpen, ref: departmentRef, buttonRef: departmentButtonRef, handleToggle: toggleDepartment, setIsOpen: setDepartmentOpen } = OutsideClick2();
    const { isOpen: isDepartmentOpen2, ref: departmentRef2, buttonRef: departmentButtonRef2, handleToggle: toggleDepartment2, setIsOpen: setDepartmentOpen2 } = OutsideClick2();

    const [employees, setEmployees] = useState([
        { name: "Akash Shinde", Roll: "Lead Design", email: "Akashhrms@gmail.com", phone: "+918555031082", Image: img_emp1, DOB: '2024-08-12' },
        { name: "Ravi Kumar", Roll: "Developer", email: "ravikumar@gmail.com", phone: "+918888888881", Image: img_emp1, DOB: '2023-07-11' },
        { name: "Sita Sharma", Roll: "Designer", email: "sitasharma@gmail.com", phone: "+918888888882", Image: img_emp1, DOB: '2024-08-12' },
        { name: "Mohan Verma", Roll: "Tester", email: "mohanverma@gmail.com", phone: "+918888888883", Image: img_emp1, DOB: '2024-06-15' },
        { name: "New Employee 1", Roll: "HR", email: "newemp1@gmail.com", phone: "+918888888884", Image: img_emp1, DOB: '2024-08-10' },
        { name: "New Employee 2", Roll: "Manager", email: "newemp2@gmail.com", phone: "+918888888885", Image: img_emp1, DOB: '2024-08-12' },
        { name: "New Employee 3", Roll: "Support", email: "newemp3@gmail.com", phone: "+918888888886", Image: img_emp1, DOB: '2024-08-18' },
        { name: "New Employee 4", Roll: "Developer", email: "newemp4@gmail.com", phone: "+918888888887", Image: img_emp1, DOB: '2024-08-13' },
        { name: "New Employee 5", Roll: "HR", email: "newemp1@gmail.com", phone: "+918888888884", Image: img_emp1, DOB: '2024-08-10' },
        { name: "New Employee 6", Roll: "Manager", email: "newemp2@gmail.com", phone: "+918888888885", Image: img_emp1, DOB: '2024-08-12' },
        { name: "New Employee 7", Roll: "Support", email: "newemp3@gmail.com", phone: "+918888888886", Image: img_emp1, DOB: '2024-08-18' },
        { name: "New Employee 8", Roll: "Developer", email: "newemp4@gmail.com", phone: "+918888888887", Image: img_emp1, DOB: '2024-08-13' },

    ]);

    const [searchQueryDepartment, setSearchQueryDepartment] = useState('');
    const [searchQueryDepartment2, setSearchQueryDepartment2] = useState('');
    const projects = [
        // {
        //     name: "Amsterdam",
        //     manager: "28/10/2012",
        //     contact: "28/10/2012",
        //     createdDate: "Lorem ipsum dolor si..",
        //     status: "Approved"
        // },
        // {
        //     name: "Learning Platform Development",
        //     manager: "Adarsh Pal",
        //     contact: "919555502041",
        //     createdDate: "12/06/2020",
        //     status: "Approved"
        // },
        // {
        //     name: "Marketing Campaign",
        //     manager: "Akanksha Tewatia",
        //     contact: "919555502041",
        //     createdDate: "12/06/2020",
        //     status: "Approved"
        // },
        // {
        //     name: "User Interface Improvements",
        //     manager: "Abishek Tiwari",
        //     contact: "919555502041",
        //     createdDate: "12/06/2020",
        //     status: "Approved"
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
    const [showPopup, setShowPopup] = useState(false);

    const initialFormDetails_2 = {
        departmentName_2: '',
        departmentHead_2: '',
        parentDepartment_2: '',
    };

    const [formDetails_2, setFormDetails_2] = useState(initialFormDetails_2);
    const [dropdownVisibility_2, setDropdownVisibility_2] = useState({
        departmentDropdownOpen_2: false,
    });
    const [searchQuery_2, setSearchQuery_2] = useState('');

    const handleInputChangeForm_2 = (event) => {
        const { name, value } = event.target;
        setFormDetails_2((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSearchQueryChange_2 = (event) => {
        setSearchQuery_2(event.target.value);
    };

    const toggleDropdownVisibility_2 = (dropdownKey) => {
        setDropdownVisibility_2((prevState) => ({
            ...prevState,
            [dropdownKey]: !prevState[dropdownKey],
        }));
    };

    const handleDepartmentHeadSelection_2 = (head) => {
        setFormDetails_2((prevState) => ({
            ...prevState,
            departmentHead_2: head,
        }));
        toggleDropdownVisibility_2('departmentDropdownOpen_2');
    };
    // pop

    console.log('departmentdetails2::', departmentdetails2)

    const [loading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false);

    const [error, setError] = useState(false);
    const { id } = useParams();
    // alert(id)
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');

    const handleRefresh = () => {
        setRefresh(!refresh)
    };

    console.log('departmentdetails::', departmentdetails)
    useEffect(() => {
        if (id) {
            axios.post('https://devstronauts.com/public/api/department/details', { id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setDepartmentdetails(response.data.department);
                    setDepartmentdetails2(response.data.department.enteredbyid)
                    // console.log('response.data.designation', response.data.department)
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

    // HandleDelete
    const HandleDelete = () => {
        // confirm()
        setOpen(true)

    }
    const DelteConform = () => {
        if (id) {
            axios.post('https://devstronauts.com/public/api/department/delete', { id }, {
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
                        navigate('/department')
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
    // HandleDelete
    useEffect(() => {
        // if (departmentdetails) {  // Ensure jobData is available before making this call
        axios.post('https://devstronauts.com/public/api/get-user', {
            enteredbyid: departmentdetails2
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // setJobData2(response.data.created_by);
                console.log('👉👉👉👉', response.data.created_by)
                setDepartmentdetails3(response.data.created_by)
            })
            .catch(error => {
                console.error("Error fetching user data: ", error);
            });
        // }
    }, [id, token, refresh, departmentdetails2]);

    const AllEmp = () => {
        navigate('/announcements')
    }
    // const AllEmpPage = () => {
    //     navigate('/department')
    // }
    // if (loading) {
    //     return <div id="notFounPageID"><img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="Loading..." /></div>;
    // }

    // if (error || !departmentdetails) {
    //     return <div id="notFounPageID"><img src="https://miro.medium.com/v2/resize:fit:996/1*C5oq4FeTlcpNXrXfnPpxTQ.gif" alt="Error loading data" /></div>;
    // }


    // popup 
    // const getTopNewEmployees = employees.slice(0, 4);


    // Slider settings



    // popup
    const PopUpUpdate = () => {
        setShowPopup(true)
        setFormDetails_2({
            departmentName_2: departmentdetails?.department_name || '',
            departmentHead_2: departmentdetails?.department_head || '',
            parentDepartment_2: departmentdetails?.parent_department || '',
        });
    }

    const closePopup = () => {
        setShowPopup(false);
    };
    // const EmployeeSlider = ({ employees }) => {
    // Helper function to chunk the employees array
    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    // Chunk the employees array into groups of 4
    const employeeChunks = chunkArray(employees, 4);


    // Slider Component



    const handleSubmitForm_2 = (event) => {
        event.preventDefault();
        // setFilteredEmployees(employees);

        // Reset form fields
        // Reset search query
        // toggleDropdownVisibility_2('departmentDropdownOpen_2'); // Close dropdown
        axios.post('https://devstronauts.com/public/api/department/create/update', {
            id,
            department_name: formDetails_2.departmentName_2,  // Email ko formData se lo
            department_head: formDetails_2.departmentHead_2, // Department ID ko formData se lo
            parent_department: formDetails_2.parentDepartment_2   // Description ko formData se lo
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                toast.success('Department updated successfully', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                setRefresh(!refresh)
                console.log("Form Submitted:", formDetails_2);
                setFormDetails_2(initialFormDetails_2);
                setSearchQuery_2('');
                console.log('response parent_department', initialFormDetails_2);
                // Data create/update ho gaya, ab loading false karo
                // setLoading(false);
                // Employees ko update karo ya response ke according set karo
                setShowPopup(false);
                setEmployees(prevEmployees => [...prevEmployees, response.data.department]);
                // Optional: Form reset kar sakte ho
                // setFormData_3(initialFormDetails_2);
                formDetails_2.departmentName_2 = ''  // Email ko formData se lo
                formDetails_2.departmentHead_2 = '' // Department ID ko formData se lo
                formDetails_2.parentDepartment_2 = ''
            })
            .catch(error => {
                toast.error('Designation Update Failed', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
                console.error("Error during create/update:", error);
            });
    };

    const selectOption = (field, option) => {
        setFormDetails_2((prevState) => ({
            ...prevState,
            [field]: option, // Correctly update the field
        }));
        if (field === 'parentDepartment_2') {
            setDepartmentOpen(false); // Close parent department dropdown
        } else if (field === 'departmentHead_2') {
            setDepartmentOpen2(false); // Close department head dropdown
        }
    };

    // popup
    const handleSearchQueryChangeDepartment = (e) => setSearchQueryDepartment(e.target.value);

    const handleSearchQueryChangeDepartment2 = (e) => setSearchQueryDepartment2(e.target.value);

    const getTopNewEmployees = employees.slice(0, 4);


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
                        You want to delete this Department Detail
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
            </div>
            {/* <ToastContainer className="toast-container" /> */}
            <div className="details">
                <div className="title_top">
                    <h2>Announcement Detail</h2>
                    <div className='close_btn' onClick={AllEmp}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#7f7f7f" fill="none">
                            <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                    </div>
                </div>
                <div className="profile_card">
                    <div className="img_card">
                        <div className='icon_svg_round'>
                            <div>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="44" height="44" color="#9013fe" fill="none">
                                    <path d="M14.9263 2.91103L8.27352 6.10452C7.76151 6.35029 7.21443 6.41187 6.65675 6.28693C6.29177 6.20517 6.10926 6.16429 5.9623 6.14751C4.13743 5.93912 3 7.38342 3 9.04427V9.95573C3 11.6166 4.13743 13.0609 5.9623 12.8525C6.10926 12.8357 6.29178 12.7948 6.65675 12.7131C7.21443 12.5881 7.76151 12.6497 8.27352 12.8955L14.9263 16.089C16.4534 16.8221 17.217 17.1886 18.0684 16.9029C18.9197 16.6172 19.2119 16.0041 19.7964 14.778C21.4012 11.4112 21.4012 7.58885 19.7964 4.22196C19.2119 2.99586 18.9197 2.38281 18.0684 2.0971C17.217 1.8114 16.4534 2.17794 14.9263 2.91103Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M11.4581 20.7709L9.96674 22C6.60515 19.3339 7.01583 18.0625 7.01583 13H8.14966C8.60978 15.8609 9.69512 17.216 11.1927 18.197C12.1152 18.8012 12.3054 20.0725 11.4581 20.7709Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M7.5 12.5V6.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                        </div>
                        <div className="about_user">
                            <h3>Upcoming Comapny</h3>
                            <p>Notify to All</p>
                            {/* <div><h4></h4> <h5>Active</h5></div> */}
                        </div>
                    </div>
                    <div className="action_card">
                        <div onClick={handleRefresh} ><RxReload /></div>
                        <div onClick={PopUpUpdate}><span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#400f6f" fill="none">
                                <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11 20H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </span> Edit</div>
                        <div onClick={HandleDelete}><span><MdDeleteOutline /></span>Delete</div>
                    </div>
                </div>
                <div className="info-cards">
                    <div className="card  ">
                        <div className='top_head'> <h3> <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9013fe" fill="none">
                                <path d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z" stroke="currentColor" stroke-width="1.5" />
                                <path d="M12.2422 17V12C12.2422 11.5286 12.2422 11.2929 12.0957 11.1464C11.9493 11 11.7136 11 11.2422 11" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11.992 8H12.001" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>Announcement Information</h3></div>
                        <div className='contentInformation'>
                            <div>
                                <h4>Department</h4>
                                {/* <p>{departmentdetails.department_name}</p> */}
                            </div>
                            <div>
                                <h4>Employee ID</h4>
                                {/* <p>{departmentdetails.parent_department}</p> */}
                            </div>
                            <div>
                                <h4>Reporting to</h4>
                                {/* <p>{departmentdetails.parent_department}</p> */}
                            </div>

                            <div>
                                <h4>Joining Date</h4>
                            </div>
                            <div>
                                <h4>Travel Status</h4>
                            </div>


                            <div>
                                {/* <h4>Created at</h4> */}
                                {/* {`${new Date(departmentdetails.created_at).getDate()}-${new Date(departmentdetails.created_at).toLocaleString('en-US', { month: 'short' })}-${new Date(departmentdetails.created_at).getFullYear()}`} */}
                            </div>



                            <div>
                                {/* <h4>Created by</h4> */}
                                <p>
                                </p>

                            </div>

                        </div>
                        <div id='DescriptionJOB'>
                            <h4>Purpose of Travel</h4>
                            <p className='paragra'>Lorem ipsum dolor sit amet consectetur. Ultrices nunc at sollicitudin leo nunc
                                Lorem ipsum dolor sit amet consectetur.
                            </p>
                        </div>
                    </div>
                    <div className="card">
                        <div className='top_head'> <h3> <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9013fe" fill="none">
                                <path d="M9 22C9.35984 22 10.6908 21.3926 12.0494 20.1778M12.0494 20.1778C13.2078 19.1419 14.3863 17.6643 15 15.7452C16.3333 11.5753 8.33333 15.7452 11 19.2201C11.3281 19.6476 11.6815 19.9601 12.0494 20.1778ZM12.0494 20.1778C13.6521 21.1259 15.5311 20.274 16.8041 19.2944C17.1932 18.995 17.3877 18.8453 17.5038 18.8919C17.62 18.9385 17.6878 19.2064 17.8236 19.7422C18.2581 21.4569 19.5415 22.841 21 20.6105" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M20 13L20 7.89072C20 6.17637 20 5.31919 19.732 4.63459C19.3013 3.53399 18.3902 2.66585 17.2352 2.25535C16.5168 2 15.6173 2 13.8182 2C10.6698 2 9.09563 2 7.83836 2.44686C5.81714 3.16523 4.22281 4.68448 3.46894 6.61052C3 7.80859 3 9.30864 3 12.3088L3 14.8859C3 17.9936 3 19.5474 3.8477 20.6265C4.09058 20.9356 4.37862 21.2101 4.70307 21.4416C5.07016 21.7034 5.48961 21.8804 6 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M3 12C3 10.159 4.49238 8.66667 6.33333 8.66667C6.99912 8.66667 7.78404 8.78333 8.43137 8.60988C9.00652 8.45576 9.45576 8.00652 9.60988 7.43136C9.78333 6.78404 9.66667 5.99912 9.66667 5.33333C9.66667 3.49238 11.1591 2 13 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>Announcement Description</h3></div>
                        <div className='contentInformation'>

                        </div>
                        <div id='DescriptionJOB' style={{ marginTop: '-25px' }}>
                            <h4>Lorem ipsum dolor sit amet consectetur. Neque dui ipsumsectetur. Neque dui ipsum. Lorem ipsum dolor sit amet consectetur. Neque dui ipsumsectetur. Neque dui ipsum. Lorem ipsum dolor sit amet consectetur. Neque dui ipsumsectetur. Neque dui ipsum. Lorem ipsum dolor sit amet consectetur. Neque dui ipsumsectetur. Neque dui ipsum. Lorem ipsum dolor sit amet consectetur. Neque dui ipsumsectetur. Neque dui ipsum. Lorem ipsum dolor sit amet consectetur. Neque dui ipsumsectetur. Neque dui ipsum. Lorem ipsum dolor sit amet consectetur. Neque dui ipsumsectetur. Neque dui ipsum. Lorem ipsum dolor sit amet consectetur. Neque dui ipsumsectetur. Neque dui ipsum</h4>
                            {/* <p className='paragra'>{designationDetails.description}</p> */}
                        </div>
                    </div>
                </div>
                {/* table */}
                <div className="contents">
                    <div>
                        <div className="ProjectList">
                            <div className="section-header">
                                {/* <FaGraduationCap className="icon" /> */}
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9013fe" fill="none">
                                    <path d="M13 21H12C7.28595 21 4.92893 21 3.46447 19.5355C2 18.0711 2 15.714 2 11V7.94427C2 6.1278 2 5.21956 2.38032 4.53806C2.65142 4.05227 3.05227 3.65142 3.53806 3.38032C4.21956 3 5.1278 3 6.94427 3C8.10802 3 8.6899 3 9.19926 3.19101C10.3622 3.62712 10.8418 4.68358 11.3666 5.73313L12 7M8 7H16.75C18.8567 7 19.91 7 20.6667 7.50559C20.9943 7.72447 21.2755 8.00572 21.4944 8.33329C21.9796 9.05942 21.9992 10.0588 22 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M21 15.4615V17.9231C21 19.6224 19.6569 21 18 21C16.3431 21 15 19.6224 15 17.9231V14.5385C15 13.6888 15.6716 13 16.5 13C17.3284 13 18 13.6888 18 14.5385V17.9231" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                                <h2 style={{ marginLeft: '10px' }}>Attachments</h2>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            {/* {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <div className="popup-header">
                            <h3>Update Department</h3>
                            <div className="close_btn" onClick={closePopup}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                    <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                                </svg>
                            </div>
                        </div>
                        <div className="popup-body">
                            <form className='upfom' onSubmit={handleSubmitForm_2}>
                                <label className='redcolor'>Department Name*</label>
                                <input
                                    type="text"
                                    name="departmentName_2"
                                    placeholder="Enter Department Name"
                                    value={formDetails_2.departmentName_2}
                                    onChange={handleInputChangeForm_2}
                                    required
                                />
                                <label className='blackcolor1'>Parent Department</label>
                                <input
                                    type="text"
                                    name="parentDepartment_2"
                                    placeholder="Enter Parent Department Name"
                                    value={formDetails_2.parentDepartment_2}
                                    onChange={handleInputChangeForm_2} // Use handleInputChangeForm_2
                                />

                                <div className="form-group">
                                    <label>Department Head</label>
                                    <div className="dropdown1">
                                        <div className="dropdown-button1" onClick={() => toggleDropdownVisibility_2('departmentDropdownOpen_2')}>
                                            <div className='downbtn'>{formDetails_2.departmentHead_2 || "Choose or search head"}</div>
                                            <span id='toggle_selectIcon'>
                                                {!dropdownVisibility_2.departmentDropdownOpen_2 ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                            </span>
                                        </div>

                                        {dropdownVisibility_2.departmentDropdownOpen_2 && (
                                            <div className="dropdown-menu1">
                                                <input
                                                    type="search"
                                                    className='search22'
                                                    placeholder="Search head of Department"
                                                    value={searchQuery_2}
                                                    onChange={handleSearchQueryChange_2}
                                                    id="searchDepartmentHead_2"
                                                />
                                                <div className="dropdown-item1" onClick={() => handleDepartmentHeadSelection_2('Akash Shinde')}>Akash Shinde</div>
                                                <div className="dropdown-item1" onClick={() => handleDepartmentHeadSelection_2('Rajat Munde')}>Rajat Munde</div>
                                                <div className="dropdown-item1" onClick={() => handleDepartmentHeadSelection_2('Arman Singh')}>Arman Singh</div>
                                                <div className="dropdown-item1" onClick={() => handleDepartmentHeadSelection_2('Arman Singh')}>Arman Singh</div>
                                                <div className="dropdown-item1" onClick={() => handleDepartmentHeadSelection_2('Arman Singh')}>Arman Singh</div>

                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className='popupbtn' id="submitDepartmentFormButton_2">
                                    <button type="submit">Update
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9b9b9b" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M10.5 8C10.5 8 13.5 10.946 13.5 12C13.5 13.0541 10.5 16 10.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                </div>
            )} */}
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup">
                        <div className="popup-header">
                            <h3>Add New Department</h3>
                            <div className="close_btn" onClick={closePopup}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                    <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                                </svg>
                            </div>
                        </div>
                        <div className="popup-body">
                            <form className="upfom" onSubmit={handleSubmitForm_2}>
                                <label className="redcolor">Department Name*</label>
                                <input
                                    type="text"
                                    name="departmentName_2"
                                    placeholder="Enter Department Name"
                                    value={formDetails_2.departmentName_2}
                                    onChange={handleInputChangeForm_2}
                                    required
                                />

                                <label className="blackcolor1">Parent Department</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" ref={departmentButtonRef} onClick={toggleDepartment}>
                                        <div className='divselect'>{formDetails_2.parentDepartment_2 || "Select department"}</div>
                                        <span id="toggle_selectIcon"> {!isDepartmentOpen ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                    </div>
                                    {isDepartmentOpen && (
                                        <div className="dropdown-menu" ref={departmentRef}>
                                            <input
                                                type="search"
                                                className="search22"
                                                placeholder="Search department"
                                                value={searchQueryDepartment}
                                                id="searchDepartmentHead"
                                                onChange={handleSearchQueryChangeDepartment}
                                            />
                                            <div className="dropdown_I">
                                                {['Management', 'Development', 'HR', 'Sales', 'Finance'].filter(option =>
                                                    option.toLowerCase().includes(searchQueryDepartment.toLowerCase())
                                                ).map(option => (
                                                    <div className="dropdown-item" onClick={() => selectOption('parentDepartment_2', option)} key={option}>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <label>Department Head</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" ref={departmentButtonRef2} onClick={toggleDepartment2}>
                                        <div className='divselect'>{formDetails_2.departmentHead_2 || "Select department head"}</div>
                                        <span id="toggle_selectIcon"> {!isDepartmentOpen2 ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                    </div>
                                    {isDepartmentOpen2 && (
                                        <div className="dropdown-menu" ref={departmentRef2}>
                                            <input
                                                type="search"
                                                className="search22"
                                                placeholder="Search head of Department"
                                                value={searchQueryDepartment2}
                                                id="searchDepartmentHead"
                                                onChange={handleSearchQueryChangeDepartment2}
                                            />
                                            <div className="dropdown_I">
                                                {['Arman Singh', 'Akash Shinde', 'Rajat Munde', 'Priya Patel', 'Niharika Rao'].filter(option =>
                                                    option.toLowerCase().includes(searchQueryDepartment2.toLowerCase())
                                                ).map(option => (
                                                    <div className="dropdown-item" onClick={() => selectOption('departmentHead_2', option)} key={option}>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="popupbtn" id="submitDepartmentFormButton_2">
                                    <button type="submit">Update
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9b9b9b" fill="none">
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                            <path d="M10.5 8C10.5 8 13.5 10.946 13.5 12C13.5 13.0541 10.5 16 10.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AnnouncementsDetails;
