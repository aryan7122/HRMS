import { useState, useEffect } from 'react';
import './TicketDetails.scss';
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
const TicketDetails = () => {
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
            axios.post('https://hrms.dragnilifecare.in/public/api/designation/details', { id }, {
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
            axios.post('https://hrms.dragnilifecare.in/public/api/get-user', {
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
            axios.post('https://hrms.dragnilifecare.in/public/api/designation/delete', { id }, {
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
        navigate('/ticket')
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
        axios.post('https://hrms.dragnilifecare.in/public/api/designation/create/update', {
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
                    <h2>Ticket Detail</h2>
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
                            <h3>Ramesh Gupta</h3>
                            <p>Web Developer / Full-Time</p>
                            <div><h4></h4> <h5>Active</h5></div>
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
                        <div className='top_head head2col'>
                            <h3>
                                <span>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9013fe" fill="none">
                                        <path d="M22 8.87895C21.9331 7.33687 21.7456 6.33298 21.2203 5.53884C20.9181 5.08196 20.5428 4.68459 20.1112 4.36468C18.9447 3.5 17.299 3.5 14.0078 3.5H9.99305C6.70178 3.5 5.05614 3.5 3.88962 4.36468C3.45805 4.68459 3.08267 5.08196 2.78047 5.53884C2.25526 6.33289 2.06776 7.33665 2.00083 8.87843C1.98938 9.14208 2.21648 9.34375 2.46531 9.34375C3.85109 9.34375 4.97449 10.533 4.97449 12C4.97449 13.467 3.85109 14.6562 2.46531 14.6562C2.21648 14.6562 1.98938 14.8579 2.00083 15.1216C2.06776 16.6634 2.25526 17.6671 2.78047 18.4612C3.08267 18.918 3.45805 19.3154 3.88962 19.6353C5.05614 20.5 6.70178 20.5 9.99306 20.5H14.0078C17.299 20.5 18.9447 20.5 20.1112 19.6353C20.5428 19.3154 20.9181 18.918 21.2203 18.4612C21.7456 17.667 21.9331 16.6631 22 15.1211V8.87895Z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                        <path d="M13 12L17 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                        <path d="M9 16L17 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </span>Ticket  Information
                            </h3>
                            <span className="button_Resolve">
                                Resolve
                            </span>
                        </div>

                        <div className='contentInformation'>
                            <div>
                                <h4>Requested to</h4>
                                {/* <p>{designationDetails.designation_name}</p> */}
                            </div>

                            <div>
                                <h4>Priority</h4>
                                {/* <p>{designationDetails2}</p> */}
                            </div>
                            <div>
                                <h4>Created at</h4>
                                {/* <p>   {`${new Date(designationDetails.created_at).getDate()}-${new Date(designationDetails.created_at).toLocaleString('en-US', { month: 'short' })}-${new Date(designationDetails.created_at).getFullYear()}`}</p> */}
                            </div>
                            <div>
                                <h4>Ticket type</h4>
                                {/* <p>{designationDetails.department_id} </p> */}
                            </div>
                            <div>
                                <h4>Status</h4>
                            </div>
                            <div>
                                <h4>Created by</h4>
                                {/* <p>{designationDetails2}</p> */}
                            </div>
                            <div>
                                <h4>Assigned to</h4>
                            </div>
                            <div>
                                <h4>Attachment</h4>
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
                        </span>Description</h3></div>
                        <div className='contentInformation'>
                        </div>
                        <div id='DescriptionJOB' style={{ marginTop: '-25px' }}>
                            <h4>Lorem ipsum dolor sit amet consectetur. Lobortis venenatis neque fames vitae id vel amet quam. Sem diam lacus aliquet tincidunt proin nec massa adipiscing.vitae id vel amet quam. Sem diam lacus aliquet tincidunt proin nec massa adipiscing.</h4>
                            {/* <p className='paragra'>{designationDetails.description}</p> */}
                        </div>
                    </div>
                </div>
                {/* table */}

            </div>

        </div>

    );
};

export default TicketDetails;
//