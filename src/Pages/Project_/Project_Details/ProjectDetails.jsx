import { useState, useEffect } from 'react';
import './ProjectDetails.scss';
import iconEdu from '../../../assets/icons/edu.png';
import img_emp1 from '../../../assets/emp1.png';
import axios from 'axios';
import { IoMdCloseCircleOutline } from "react-icons/io";
import { MdWorkHistory, MdDeleteOutline } from "react-icons/md";
import { RxReload } from "react-icons/rx";
import { BiEditAlt } from "react-icons/bi";
import { useNavigate, useParams } from 'react-router-dom';
// popup
import { IoMdAdd, IoIosCloseCircleOutline } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { OutsideClick2 } from '../../Department/DepartmentList/OutsideClick2'

// popup
// 
import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import 'react-toastify/dist/ReactToastify.css';

// 
const ProjectDetails = () => {
    const { isOpen: isDepartmentOpen, ref: departmentRef, buttonRef: departmentButtonRef, handleToggle: toggleDepartment, setIsOpen: setDepartmentOpen } = OutsideClick2();

    // popup
    const initialFormData_3 = {
        email_3: '',
        department_3: '',
        Description_3: '',
    };
    const [showPopup, setShowPopup] = useState(false);
    const [formData_3, setFormData_3] = useState(initialFormData_3);
    const [dropdowns_3, setDropdowns_3] = useState({
        departmentOpen_3: false,
    });
    const closePopup = () => {
        setShowPopup(false);
    };



    const handleInputChange_3 = (event) => {
        const { name, value } = event.target;
        setFormData_3((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const toggleDropdown_3 = (dropdownKey) => {
        setDropdowns_3((prevState) => ({
            ...prevState,
            [dropdownKey]: !prevState[dropdownKey],
        }));
    };

    const selectOption_3 = (field, value) => {
        setFormData_3((prevState) => ({
            ...prevState,
            [field]: value,
        }));
        toggleDropdown_3('departmentOpen_3');
    };

    const [searchQueryDepartment, setSearchQueryDepartment] = useState('');

    // 
    const [currentSlide, setCurrentSlide] = useState(0); // State to track current slide


    const [designationDetails, setDesignationDetails] = useState(null);
    const [designationDetails2, setDesignationDetails2] = useState('');

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');
    const [employees, setEmployees] = useState([
        { name: "Akash Shinde", Roll: "UI/UX Design", email: "Akashhrms@gmail.com", date: "12-Jan-2024", Image: img_emp1, DOB: '2024-08-12' },
        { name: "Ravi Kumar", Roll: "UI/UX Design", email: "ravikumar@gmail.com", date: "12-Jan-2024", Image: img_emp1, DOB: '2023-07-11' },
        { name: "Sita Sharma", Roll: "UI/UX Design", email: "sitasharma@gmail.com", date: "12-Jan-2024", Image: img_emp1, DOB: '2024-08-12' },
        { name: "Mohan Verma", Roll: "UI/UX Design", email: "mohanverma@gmail.com", date: "12-Jan-2024", Image: img_emp1, DOB: '2024-06-15' },
        { name: "New Employee 1", Roll: "HR", email: "newemp1@gmail.com", phone: "+918888888884", Image: img_emp1, DOB: '2024-08-10' },
        { name: "New Employee 2", Roll: "Manager", email: "newemp2@gmail.com", phone: "+918888888885", Image: img_emp1, DOB: '2024-08-12' },
        { name: "New Employee 3", Roll: "Support", email: "newemp3@gmail.com", phone: "+918888888886", Image: img_emp1, DOB: '2024-08-18' },
        { name: "New Employee 4", Roll: "Developer", email: "newemp4@gmail.com", phone: "+918888888887", Image: img_emp1, DOB: '2024-08-13' },
    ]);
    console.log('designationDetails::', designationDetails)
    const [refresh, setRefresh] = useState(false);

    const handleRefresh = () => {
        setRefresh(!refresh)
    };

    useEffect(() => {
        if (id) {
            axios.post('https://devstronauts.com/public/api/designation/details', { id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    setDesignationDetails(response.data.designation);
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    setError(true);
                    console.error("Error fetching designation details:", error);
                });
        }
    }, [id, token, refresh]);

    useEffect(() => {
        if (designationDetails) {  // Ensure jobData is available before making this call
            axios.post('https://devstronauts.com/public/api/get-user', {
                enteredbyid: designationDetails.enteredbyid
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    // setJobData2(response.data.created_by);
                    console.log('👉', response.data.created_by)
                    setDesignationDetails2(response.data.created_by)
                })
                .catch(error => {
                    console.error("Error fetching user data: ", error);
                });
        }
    }, [designationDetails2, designationDetails]);

    // HandleDelete
    const [open, setOpen] = useState(false);

    const HandleDelete = () => {
        // confirm()
        setOpen(true)

    }
    const DelteConform = () => {
        if (id) {
            axios.post('https://devstronauts.com/public/api/designation/delete', { id }, {
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
                        navigate('/designation')
                    }, 2000);
                })
                .catch(error => {
                    setLoading(false);
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
                    setError(true);
                    console.error("Error fetching designation details:", error);
                });
        }
    }


    // HandleDelete

    const handleBackToDesignations = () => {
        navigate('/designation');
    };

    // if (loading) {
    //     return <div id="notFounPageID"><img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="Loading..." /></div>;
    // }

    // if (error || !designationDetails) {
    //     return <div id="notFounPageID"><img src="https://miro.medium.com/v2/resize:fit:996/1*C5oq4FeTlcpNXrXfnPpxTQ.gif" alt="Error loading data" /></div>;
    // }


    const AllEmp = () => {
        navigate('/designation')
    }
    const AllEmpPage = () => {
        navigate('/designation')
    }
    const UpdatedesignationDetails = () => {
        setShowPopup(true)
        // navigate(`/update-designation/${id}`);
        // useEffect(() => {
        // if (designationDetails) {
        setFormData_3({
            email_3: designationDetails?.designation_name || '',
            department_3: designationDetails?.department_id || '',
            Description_3: designationDetails?.description || '',
        });
        // }
        // }, [designationDetails]);


    }

    const selectOption = (field, option) => {
        setFormData_3((prevState) => ({
            ...prevState,
            [field]: option,
        }));
        setDepartmentOpen(false)
    };

    // popup 

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        beforeChange: (oldIndex, newIndex) => {
            setCurrentSlide(newIndex);
        },
        customPaging: (i) => (
            <div
                style={{
                    width: i === currentSlide ? "20px" : "15px",
                    height: "3px",
                    background: i === currentSlide ? "purple" : "gray",
                    borderRadius: "10px",
                    transition: "all 0.3s ease",
                }}
            />
        ),
        appendDots: (dots) => (
            <div style={{ marginBottom: "-10px", position: "absolute", bottom: "-20px", width: "100%", textAlign: "center" }}>
                {dots}
            </div>
        ),
    };
    const chunkArray = (arr, size) => {
        const result = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    };

    // Chunk the employees array into groups of 4
    const employeeChunks = chunkArray(employees, 4);
    // slider end



    const handleSubmitForm_3 = (event) => {
        event.preventDefault();

        // Sab fields bharne ke baad hi API ko call karo
        axios.post('https://devstronauts.com/public/api/designation/create/update', {
            id,
            designation_name: formData_3.email_3,  // Email ko formData se lo
            department_id: formData_3.department_3, // Department ID ko formData se lo
            description: formData_3.Description_3   // Description ko formData se lo
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                toast.success('Designation Updated successfully', {
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
                setShowPopup(false)

                console.log(response);
                // Data create/update ho gaya, ab loading false karo
                setLoading(false);
                // Employees ko update karo ya response ke according set karo
                setEmployees(prevEmployees => [...prevEmployees, response.data.designation]);
                // Optional: Form reset kar sakte ho
                setFormData_3(initialFormData_3);
            })
            .catch(error => {
                toast.error('Designation  Update Failed.', {
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
    const handleSearchQueryChangeDepartment = (e) => setSearchQueryDepartment(e.target.value);


    // popup

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
                    You want to delete this Designation Detail
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
            <div className="details">
                <div className="title_top">
                    <h2>Project  Detail</h2>
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
                            <h3>Hrms</h3>
                            <p>Raj dey</p>
                            <div><h4></h4> <h5>Ongoing</h5></div>
                        </div>
                    </div>
                    <div className="action_card">
                        <div onClick={handleRefresh}><RxReload /></div>
                        <div onClick={UpdatedesignationDetails}><span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#400f6f" fill="none">
                                <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11 20H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </span> Edit</div>
                        <div onClick={HandleDelete}><span><MdDeleteOutline /></span>Delete</div>
                    </div>
                </div>
                <div className="info-cards">
                    <div className="card">
                        <div className='top_head'> <h3> <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9013fe" fill="none">
                                <path d="M19 9.62069C19 12.1999 17.7302 14.1852 15.7983 15.4917C15.3483 15.796 15.1233 15.9482 15.0122 16.1212C14.9012 16.2942 14.8633 16.5214 14.7876 16.9757L14.7287 17.3288C14.5957 18.127 14.5292 18.526 14.2494 18.763C13.9697 19 13.5651 19 12.7559 19H10.1444C9.33528 19 8.93069 19 8.65095 18.763C8.3712 18.526 8.30469 18.127 8.17166 17.3288L8.11281 16.9757C8.03734 16.5229 7.99961 16.2965 7.88968 16.1243C7.77976 15.9521 7.55428 15.798 7.10332 15.4897C5.1919 14.1832 4 12.1986 4 9.62069C4 5.4119 7.35786 2 11.5 2C12.0137 2 12.5153 2.05248 13 2.15244" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M16.5 2L16.7579 2.69703C17.0961 3.61102 17.2652 4.06802 17.5986 4.40139C17.932 4.73477 18.389 4.90387 19.303 5.24208L20 5.5L19.303 5.75792C18.389 6.09613 17.932 6.26524 17.5986 6.59861C17.2652 6.93198 17.0961 7.38898 16.7579 8.30297L16.5 9L16.2421 8.30297C15.9039 7.38898 15.7348 6.93198 15.4014 6.59861C15.068 6.26524 14.611 6.09613 13.697 5.75792L13 5.5L13.697 5.24208C14.611 4.90387 15.068 4.73477 15.4014 4.40139C15.7348 4.06802 15.9039 3.61102 16.2421 2.69703L16.5 2Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                <path d="M13.5 19V20C13.5 20.9428 13.5 21.4142 13.2071 21.7071C12.9142 22 12.4428 22 11.5 22C10.5572 22 10.0858 22 9.79289 21.7071C9.5 21.4142 9.5 20.9428 9.5 20V19" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                            </svg>
                        </span>Project Information</h3></div>
                        <div className='contentInformation'>
                            <div>
                                <h4>Project ID</h4>
                                {/* <p>{designationDetails.designation_name}</p> */}
                            </div>

                            <div>
                                <h4>Project Name</h4>
                                {/* <p>{designationDetails2}</p> */}
                            </div>

                            <div>
                                <h4>Deadline</h4>
                                {/* <p>{designationDetails.department_id} </p> */}
                            </div>
                            <div>
                                <h4>Client Name</h4>
                                {/* <p>{designationDetails.department_id} </p> */}
                            </div>
                            <div>
                                <h4>Created date</h4>
                                {/* <p>   {`${new Date(designationDetails.created_at).getDate()}-${new Date(designationDetails.created_at).toLocaleString('en-US', { month: 'short' })}-${new Date(designationDetails.created_at).getFullYear()}`}</p> */}
                            </div>
                            <div>
                                <h4>Project Leader</h4>
                                {/* <p>   {`${new Date(designationDetails.created_at).getDate()}-${new Date(designationDetails.created_at).toLocaleString('en-US', { month: 'short' })}-${new Date(designationDetails.created_at).getFullYear()}`}</p> */}
                            </div>
                            <div>
                                <h4>Project Status</h4>
                                {/* <p>   {`${new Date(designationDetails.created_at).getDate()}-${new Date(designationDetails.created_at).toLocaleString('en-US', { month: 'short' })}-${new Date(designationDetails.created_at).getFullYear()}`}</p> */}
                            </div>
                            <div>
                                <h4>Priority</h4>
                                {/* <p>   {`${new Date(designationDetails.created_at).getDate()}-${new Date(designationDetails.created_at).toLocaleString('en-US', { month: 'short' })}-${new Date(designationDetails.created_at).getFullYear()}`}</p> */}
                            </div>
                            <div>
                                <h4>Duration</h4>
                                {/* <p>   {`${new Date(designationDetails.created_at).getDate()}-${new Date(designationDetails.created_at).toLocaleString('en-US', { month: 'short' })}-${new Date(designationDetails.created_at).getFullYear()}`}</p> */}
                            </div>
                        </div>
                        
                    </div>
                    <div className="card">
                        <div className='top_head'> <h3> <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9013fe" fill="none">
                                <path d="M9 22C9.35984 22 10.6908 21.3926 12.0494 20.1778M12.0494 20.1778C13.2078 19.1419 14.3863 17.6643 15 15.7452C16.3333 11.5753 8.33333 15.7452 11 19.2201C11.3281 19.6476 11.6815 19.9601 12.0494 20.1778ZM12.0494 20.1778C13.6521 21.1259 15.5311 20.274 16.8041 19.2944C17.1932 18.995 17.3877 18.8453 17.5038 18.8919C17.62 18.9385 17.6878 19.2064 17.8236 19.7422C18.2581 21.4569 19.5415 22.841 21 20.6105" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M20 13L20 7.89072C20 6.17637 20 5.31919 19.732 4.63459C19.3013 3.53399 18.3902 2.66585 17.2352 2.25535C16.5168 2 15.6173 2 13.8182 2C10.6698 2 9.09563 2 7.83836 2.44686C5.81714 3.16523 4.22281 4.68448 3.46894 6.61052C3 7.80859 3 9.30864 3 12.3088L3 14.8859C3 17.9936 3 19.5474 3.8477 20.6265C4.09058 20.9356 4.37862 21.2101 4.70307 21.4416C5.07016 21.7034 5.48961 21.8804 6 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M3 12C3 10.159 4.49238 8.66667 6.33333 8.66667C6.99912 8.66667 7.78404 8.78333 8.43137 8.60988C9.00652 8.45576 9.45576 8.00652 9.60988 7.43136C9.78333 6.78404 9.66667 5.99912 9.66667 5.33333C9.66667 3.49238 11.1591 2 13 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>Project Description</h3></div>
                        <div className='contentInformation'>
                           
                        </div>
                        <div id='DescriptionJOB'>
                            <h4>Lorem ipsum dolor sit amet consectetur. Neque dui ipsumsectetur. Neque dui ipsum. Lorem ipsum dolor sit amet consectetur. Neque dui ipsumsectetur. Neque dui ipsum. Lorem ipsum dolor sit amet consectetur. Neque dui ipsumsectetur. Neque dui ipsum. Lorem ipsum dolor sit amet consectetur. Neque dui ipsumsectetur. Neque dui ipsum. Lorem ipsum dolor sit amet consectetur. Neque dui ipsumsectetur. Neque dui ipsum. Lorem ipsum dolor sit amet consectetur. Neque dui ipsumsectetur. Neque dui ipsum. Lorem ipsum dolor sit amet consectetur. Neque dui ipsumsectetur. Neque dui ipsum. Lorem ipsum dolor sit amet consectetur. Neque dui ipsumsectetur. Neque dui ipsum</h4>
                            {/* <p className='paragra'>{designationDetails.description}</p> */}
                        </div>
                    </div>
                </div>
                <div className="info-cards">
                    <div className="card">
                        <div className='top_head'> <h3> <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9013fe" fill="none">
                                <path d="M20.4999 10.5V10C20.4999 6.22876 20.4999 4.34315 19.3284 3.17157C18.1568 2 16.2712 2 12.4999 2H11.5C7.72883 2 5.84323 2 4.67166 3.17156C3.50009 4.34312 3.50007 6.22872 3.50004 9.99993L3.5 14.5C3.49997 17.7874 3.49996 19.4312 4.40788 20.5375C4.57412 20.7401 4.75986 20.9258 4.96242 21.0921C6.06877 22 7.71249 22 10.9999 22" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7.5 7H16.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M7.5 12H13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M20.5 20L20.5 17C20.5 15.5706 19.1569 14 17.5 14C15.8431 14 14.5 15.5706 14.5 17L14.5 20.5C14.5 21.3284 15.1716 22 16 22C16.8284 22 17.5 21.3284 17.5 20.5V17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span> Attachments</h3></div>
                        <div className='contentInformation'>

                        </div>
                        <div id='DescriptionJOB'>
                            
                        </div>
                    </div>
                </div>
                {/* table */}

            </div>

        </div>

    );
};

export default ProjectDetails;
//