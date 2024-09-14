import { useState, useEffect } from 'react';
import './DesignationDetails.scss';
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

// popup
const DesignationDetails = () => {
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
        // { name: "New Employee 4", Roll: "Developer", email: "newemp4@gmail.com", phone: "+918888888887", Image: img_emp1, DOB: '2024-08-13' },
    ]);
    console.log('designationDetails::', designationDetails)

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
    }, [id, token]);
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
    }, [designationDetails2,designationDetails]);



    const handleBackToDesignations = () => {
        navigate('/designation');
    };

    if (loading) {
        return <div id="notFounPageID"><img src="https://i.pinimg.com/originals/6a/59/dd/6a59dd0f354bb0beaeeb90a065d2c8b6.gif" alt="Loading..." /></div>;
    }

    if (error || !designationDetails) {
        return <div id="notFounPageID"><img src="https://media2.giphy.com/media/C21GGDOpKT6Z4VuXyn/200w.gif" alt="Error loading data" /></div>;
    }


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
                console.log(response);
                // Data create/update ho gaya, ab loading false karo
                setLoading(false);
                // Employees ko update karo ya response ke according set karo
                setEmployees(prevEmployees => [...prevEmployees, response.data.designation]);
                // Optional: Form reset kar sakte ho
                setFormData_3(initialFormData_3);
            })
            .catch(error => {
                console.error("Error during create/update:", error);
            });
    };

    // popup

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
                            <h3>{designationDetails.designation_name}</h3>
                            <p>{designationDetails.department_id}</p>
                            {/* <div><h4></h4> <h5>Active</h5></div> */}
                        </div>
                    </div>
                    <div className="action_card">
                        <div><RxReload /></div>
                        <div onClick={UpdatedesignationDetails}><BiEditAlt /></div>
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
                                <h4>description</h4>
                                <p>{designationDetails.designation_name}</p>
                            </div>

                            <div>
                                <h4>Created By</h4>
                                <p>{designationDetails2}</p>
                            </div>

                            <div>
                                <h4>Department</h4>
                                <p>{designationDetails.department_id} </p>
                            </div>
                            <div>
                                <h4>Created At</h4>
                                <p>                                {`${new Date(designationDetails.created_at).getDate()}-${new Date(designationDetails.created_at).toLocaleString('en-US', { month: 'short' })}-${new Date(designationDetails.created_at).getFullYear()}`}</p>
                            </div>                           
                        </div>
                        <div id='DescriptionJOB'>
                            <h4>Description</h4>
                            <p className='paragra'>{designationDetails.description}</p>
                        </div>
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
                                                <p className='p4'>{emp.date}</p>
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

            </div>
            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <div className="add-designation-header">
                            <h2>Update Designation</h2>
                            <button className="close_btn" onClick={closePopup}>
                                <IoIosCloseCircleOutline />
                            </button>
                        </div>
                        <div className="add-designation-body">
                            <form onSubmit={handleSubmitForm_3}>
                                <div className="side-by-side">
                                    <div className="form-group">
                                        <label className='starred'>Designation Name*</label>
                                        <input
                                            type="text"
                                            placeholder="Enter designation name"
                                            name="email_3"
                                            value={formData_3.email_3}
                                            onChange={handleInputChange_3}
                                            required
                                        />
                                    </div>

                                    <div className="form-group" id="depart">
                                        <label>Department</label>
                                        <div className="dropdown10">
                                            <div className="dropdown-button10" onClick={() => toggleDropdown_3('departmentOpen_3')}>
                                                <div className='choose1'>{formData_3.department_3 || "Choose department"}</div>
                                                <span id='toggle_selectIcon'>
                                                    {!dropdowns_3.departmentOpen_3 ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                                </span>
                                            </div>

                                            {dropdowns_3.departmentOpen_3 && (
                                                <div className="dropdown-menu10">
                                                    <div className="dropdown-item10" onClick={() => selectOption_3('department_3', 'Department1')}>Department1</div>
                                                    <div className="dropdown-item10" onClick={() => selectOption_3('department_3', 'Department2')}>Department2</div>
                                                    <div className="dropdown-item10" onClick={() => selectOption_3('department_3', 'Department3')}>Department3</div>
                                                    <div className="dropdown-item10" onClick={() => selectOption_3('department_3', 'Department4')}>Department4</div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className='despt'>
                                    <label>Description</label>
                                </div>

                                <textarea
                                    placeholder="Enter description"
                                    name="Description_3"
                                    value={formData_3.Description_3}
                                    onChange={handleInputChange_3}
                                ></textarea>

                                <button type="submit">Update
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" color="#9b9b9b" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
                                        <path d="M10.5 8C10.5 8 13.5 10.946 13.5 12C13.5 13.0541 10.5 16 10.5 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </button>
                            </form>

                        </div>
                    </div>
                </div>
            )}
        </div>

    );
};

export default DesignationDetails;
//