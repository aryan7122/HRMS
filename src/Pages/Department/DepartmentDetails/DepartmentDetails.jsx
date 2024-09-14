import { useState, useEffect } from 'react';
import './DepartmentDetails.scss';
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

// popup
const DepartmentDetails = () => {

    // const [activeTab, setActiveTab] = useState('experience');
    const [departmentdetails, setDepartmentdetails] = useState(null);
    const [departmentdetails2, setDepartmentdetails2] = useState('');
    const [departmentdetails3, setDepartmentdetails3] = useState('');
    const [currentSlide, setCurrentSlide] = useState(0); // State to track current slide

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
    const [error, setError] = useState(false);
    const { id } = useParams();
    // alert(id)
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token');



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
                    console.log('response.data.designation', response.data.department)
                    setLoading(false);
                })
                .catch(error => {
                    setLoading(false);
                    setError(true);
                    console.error("Error fetching designation details:", error);
                });
        }
    }, [id, token]);

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
    }, [id, token, departmentdetails]);

    const AllEmp = () => {
        navigate('/department')
    }
    // const AllEmpPage = () => {
    //     navigate('/department')
    // }
    if (loading) {
        return <div id="notFounPageID"><img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="Loading..." /></div>;
    }

    if (error || !departmentdetails) {
        return <div id="notFounPageID"><img src="https://media2.giphy.com/media/C21GGDOpKT6Z4VuXyn/200w.gif" alt="Error loading data" /></div>;
    }


    // popup 
    // const getTopNewEmployees = employees.slice(0, 4);


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
                console.log("Form Submitted:", formDetails_2);
                setFormDetails_2(initialFormDetails_2);
                setSearchQuery_2('');
                console.log('response parent_department', initialFormDetails_2);
                // Data create/update ho gaya, ab loading false karo
                // setLoading(false);
                // Employees ko update karo ya response ke according set karo
                setEmployees(prevEmployees => [...prevEmployees, response.data.designation]);
                // Optional: Form reset kar sakte ho
                // setFormData_3(initialFormDetails_2);
            })
            .catch(error => {
                console.error("Error during create/update:", error);
            });
    };


 

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
                            <h3>{departmentdetails.department_name}</h3>
                            <p>{departmentdetails.parent_department}</p>
                            {/* <div><h4></h4> <h5>Active</h5></div> */}
                        </div>
                    </div>
                    <div className="action_card">
                        <div><RxReload /></div>
                        <div onClick={PopUpUpdate}><BiEditAlt /></div>
                        <div><span><MdDeleteOutline /></span>Delete</div>
                    </div>
                </div>
                <div className="info-cards">
                    <div className="card  ">
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
                                <h4> Department</h4>
                                <p>{departmentdetails.department_name}</p>
                            </div>
                            <div>
                                <h4>Parent Department</h4>
                                <p>{departmentdetails.parent_department}</p>
                            </div>

                            <div>
                                <h4>Department Head</h4>
                                <p>{departmentdetails.department_head}</p>
                            </div>

                            <div>
                                <h4>Created By</h4>
                                <p>{departmentdetails3}</p>
                            </div>

                            <div>
                                <h4>Created At</h4>
                                <p>
                                    {`${new Date(departmentdetails.created_at).getDate()}-${new Date(departmentdetails.created_at).toLocaleString('en-US', { month: 'short' })}-${new Date(departmentdetails.created_at).getFullYear()}`}
                                </p>

                            </div>
                        </div>
                        {/* <div id='DescriptionJOB'>
                            <h4>Description</h4>
                            <p className='paragra'>Lorem ipsum dolor sit amet consectetur. Ultrices nunc at sollicitudin leo nunc
                                Lorem ipsum dolor sit amet consectetur.
                            </p>
                        </div> */}
                    </div>
                    <div className="card4" >
                        <div className='top_head4'> <h3> <span>
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
                        
                        <div className="Emp4">
                            <Slider {...settings}>
                                {employeeChunks.map((chunk, index) => (
                                    <div key={index} className="slide-content">
                                        {chunk.map((emp, i) => (
                                            <div key={i} className="div_dob-item">
                                                <div className='img_dob_name'>
                                                    <img src={emp.Image} alt={emp.name} />
                                                    <div>
                                                        <h3>{emp.name}</h3>
                                                        <p>{emp.Roll}</p>
                                                    </div>
                                                </div>
                                                <p className='p4'>{emp.phone}</p>
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </Slider>
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
                                <h2>PROJECT</h2>
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
            {showPopup && (
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
            )}
        </div>
    );
};

export default DepartmentDetails;
