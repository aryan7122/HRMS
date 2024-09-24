import { useState,useEffect } from 'react';
import './UpdateEmloyee.scss';
import './NavbarForm.scss';
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { GrCloudUpload } from "react-icons/gr";
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from 'react-router-dom';

const EducationForm = ({ onSubmit, next }) => {
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);

    // Education forms state, nested under "educations" array
    const [educationForms, setEducationForms] = useState({
        educations: [
            {
                institute_name: "",
                degree: "",
                specialization: "",
                attachment: "",
                date_of_completion: "",
                from_date: "",
                to_date: ""
            }
        ]
    });
    const { id } = useParams();
    const token = localStorage.getItem('access_token');


    useEffect(() => {
        if (id) {
            axios.post('https://devstronauts.com/public/api/employee/details', {
                user_id: id
            }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    const data = response.data.result.educations;

                    console.log('data', data);

                    if (data && data.length > 0) {
                        setEducationForms({
                            educations: data.map(edu => ({
                                institute_name: edu.institute_name || "",
                                degree: edu.degree || "",
                                specialization: edu.specialization || "",
                                attachment: edu.attachment || "",
                                date_of_completion: edu.date_of_completion || "",
                                from_date: edu.from_date || "",
                                to_date: edu.to_date || ""
                            }))
                        });
                    }
                })
                .catch(error => {
                    console.error("Error fetching employee details:", error);
                    toast.error('Failed to fetch employee details.', {
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

    // Handle file change
    const handleFileChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setIsUploaded(true);
            const newForms = [...educationForms.educations];
            newForms[index].attachment = file;
            setEducationForms({ educations: newForms });
        }
    };

    // Handle input change for education form fields
    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newForms = [...educationForms.educations];
        newForms[index][name] = value;
        setEducationForms({ educations: newForms });
    };

    // Add a new education form
    const handleAddEducation = () => {
        const newForms = [
            ...educationForms.educations,
            {
                institute_name: "",
                degree: "",
                specialization: "",
                attachment: "",
                date_of_completion: "",
                from_date: "",
                to_date: ""
            }
        ];
        setEducationForms({ educations: newForms });
    };

    // Remove an education form
    const handleRemoveEducation = (index) => {
        const newForms = educationForms.educations.filter((_, i) => i !== index);
        setEducationForms({ educations: newForms });
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(educationForms);  // Send only the educations array
    };

    // Handle "Next" button click
    const nextSubmit = (event) => {
        event.preventDefault();
        next(educationForms);
    };

    return (
        <div onSubmit={handleSubmit} id="Education_form">
            <form>
                {educationForms.educations.map((form, index) => (
                    <div key={index} id='form'>
                        <div className='div_heading add_exp'>
                            <h2>Education {index + 1}</h2>
                            {index === 0 ? (
                                <div
                                    type="button"
                                    onClick={handleAddEducation}
                                >
                                    <li className='li_add_emp'>
                                        <IoMdAddCircleOutline />
                                        <div id='hover_P'>
                                            <p id='remove_p'>Add More</p>
                                            <div></div>
                                        </div>
                                    </li>
                                </div>
                            ) : (
                                <div
                                    id='removeBtn'
                                    style={{ color: 'red', cursor: 'pointer' }}
                                    onClick={() => handleRemoveEducation(index)}
                                >
                                    <li className='li_add_emp'>
                                        <IoMdCloseCircleOutline />
                                        <div id='hover_P'>
                                            <p id='remove_p'>Remove</p>
                                            <div></div>
                                        </div>
                                    </li>
                                </div>
                            )}
                        </div>

                        <div className="from1">
                            <div className="form-group">
                                <label>Institute Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Institute Name"
                                    name="institute_name"
                                    value={form.institute_name}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Degree</label>
                                <input
                                    type="text"
                                    name="degree"
                                    placeholder='Enter Degree'
                                    value={form.degree}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>

                            <div className="form-group">
                                <label>Specialization</label>
                                <input
                                    type="text"
                                    name="specialization"
                                    value={form.specialization}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder='Enter Specialization'
                                />
                            </div>

                            <div className="form-group">
                                <label>Attachment</label>
                                <div className="file-upload">
                                    <input
                                        type="file"
                                        name='attachment'
                                        accept="image/*"
                                        id="file"
                                        onChange={(e) => handleFileChange(index, e)}
                                    />
                                    <label htmlFor="file" className="custom-file-upload">
                                        {!isUploaded && <GrCloudUpload className="upload-icon" />}
                                        {isUploaded ? fileName : 'Upload Document'}
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Date of Completion</label>
                                <input
                                    type="date"
                                    name="date_of_completion"
                                    value={form.date_of_completion}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div className="form-group" id='form_group_Duration'>
                                <div id='div_Duration'>
                                    <label> From</label>
                                    <label>To</label>
                                </div>
                                <div className='divDate'>
                                    <input
                                        type="date"
                                        name="from_date"
                                        value={form.from_date}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                    <input
                                        type="date"
                                        name="to_date"
                                        value={form.to_date}
                                        onChange={(e) => handleChange(index, e)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div id='submitBtn_next_main'>
                    <div id='submitBtn' >
                        <div className='div'>
                            <button type="submit">Update </button>
                            <span><CiCircleChevRight /></span>
                        </div>
                        <div className="lineBar"></div>
                        <div className='x'>
                            <span> <TfiClose /></span>
                        </div>
                    </div>
                    <div className="form">
                        <p>Next Page</p>
                        <span className='not_active'><IoIosArrowDropleft /></span>
                        <button type="button" onClick={nextSubmit}>
                            <IoIosArrowDropright />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EducationForm;
