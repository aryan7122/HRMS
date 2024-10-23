import { useState, useEffect } from 'react';
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
import { MultiImageUploaders } from '../../../components/MultiImageUpload.jsx';

const ExperienceForm = ({ onSubmit, next, update }) => {
    // Using the 'experiences' key inside the state as per your suggestion
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [experienceForms, setExperienceForms] = useState({
        experiences: [
            {
                company_name: "",
                industry: "",
                job_title: "",
                duration: "",
                from_date: "",
                to_date: "",
                description: "",
                experience_letter: [],
            }
        ]
    });

    const [formData, setFormData] = useState({
    });
    console.log('formData 👋', formData)
    console.log('❗', experienceForms)
    useEffect(() => {
        // Loop through formData and update experienceForms based on index
        Object.keys(formData).forEach((key) => {
            if (key.startsWith('experience_letter_')) {
                const index = parseInt(key.split('_')[2]); // Extract index from key (experience_letter_X)
                const newForms = [...experienceForms.experiences];

                // Set the experience_letter for the specific form
                newForms[index].experience_letter = formData[key];

                setExperienceForms({ experiences: newForms });
            }
        });
    }, [formData]);
    // 
    // Sample data structure for testing
    // attacment in update img

    useEffect(() => {
        const updatedFormData = {};

        // Loop through each experience in experienceForms
        experienceForms.experiences.forEach((experience, index) => {
            const experienceLetterKey = `experience_letter_${index}`;

            // Set experience letter directly if it exists
            updatedFormData[experienceLetterKey] = experience.experience_letter || {};
        });

        setFormData(updatedFormData); 
    }, [next]); 
    // attacment in update img


    console.log('Updated formData:', formData);


    // 
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
                    const data = response.data.result.experiences;

                    console.log('data👉', data);

                    if (data && data.length > 0) {
                        setExperienceForms({
                            experiences: data.map(exp => ({
                                company_name: exp.company_name || "",
                                industry: exp.industry || "",
                                job_title: exp.job_title || "",
                                duration: exp.duration || "",
                                from_date: exp.from_date || "",
                                to_date: exp.to_date || "",
                                description: exp.description || "",
                                experience_letter: exp.experience_letter
                                    ? JSON.parse(exp.experience_letter).map(item => ({
                                        name: item.name, // Image name
                                        url: item.url   // Image URL
                                    }))
                                    : []
                            }))  // Assuming photo field exists

                        });
                        // setFormData({
                        //     experiences: data.map((exp, index) => ({
                        //         experience_letter: exp.experience_letter
                        //             ? JSON.parse(exp.experience_letter).map(item => ({
                        //                 name: item.name, // Image name
                        //                 url: item.url    // Image URL
                        //             }))
                        //             : [] // Default to empty array if no experience_letter
                        //     }))
                        // });
                        update(experienceForms)
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
    const handleFileChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setIsUploaded(true);
            const newForms = [...experienceForms.experiences];
            newForms[index].photo = file;
            setExperienceForms({ experiences: newForms });
        }
    };

    const calculateDuration = (from_date, to_date) => {
        if (!from_date || !to_date) return '';

        const from = new Date(from_date);
        const to = new Date(to_date);

        if (to < from) return 'Invalid date range';

        const diffTime = Math.abs(to - from);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const years = Math.floor(diffDays / 365);
        const months = Math.floor((diffDays % 365) / 30);
        const days = diffDays % 30;

        let durationStr = '';
        if (years > 0) durationStr += `${years} year${years > 1 ? 's' : ''} `;
        if (months > 0) durationStr += `${months} month${months > 1 ? 's' : ''} `;
        if (days > 0) durationStr += `${days} day${days > 1 ? 's' : ''}`;

        return durationStr.trim();
    };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newForms = [...experienceForms.experiences];
        newForms[index][name] = value;

        if (name === 'from_date' || name === 'to_date') {
            const duration = calculateDuration(newForms[index].from_date, newForms[index].to_date);
            newForms[index].duration = duration;
        }

        setExperienceForms({ experiences: newForms });
        console.log('experienceForms', newForms);  // Print the updated forms with duration
    };

    const handleAddExperience = () => {
        setExperienceForms({
            experiences: [
                ...experienceForms.experiences,
                {
                    company_name: "",
                    industry: "",
                    job_title: "",
                    duration: "",
                    from_date: "",
                    to_date: "",
                    description: "",
                    photo: ''  // Add photo field for new form
                }
            ]
        });
    };

    const handleRemoveExperience = (index) => {
        const newForms = experienceForms.experiences.filter((_, i) => i !== index);
        setExperienceForms({ experiences: newForms });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('experienceForms', experienceForms);  // Print the final forms with duration
        onSubmit(experienceForms);
    };

    const nextSumbit = (event) => {
        event.preventDefault();
        next(experienceForms);
    };

    return (
        <div id="Experience_form">
            <form onSubmit={handleSubmit}>
                {experienceForms.experiences.map((form, index) => (
                    <div key={index} id='form'>
                        <div className='div_heading add_exp'>
                            <h2>Experience {index + 1}</h2>
                            {index > 0 &&
                                <div
                                    id='removeBtn'
                                    style={{ color: 'red', cursor: 'pointer' }}
                                    onClick={() => handleRemoveExperience(index)}
                                >
                                    <li className='li_add_emp'>
                                        <IoMdCloseCircleOutline />
                                        <div id='hover_P'>
                                            <p id='remove_p'>Remove</p>
                                            <div></div>
                                        </div>
                                    </li>
                                </div>
                            }
                            {index === 0 &&
                                <div type="button" onClick={handleAddExperience}>
                                    <li className='li_add_emp'>
                                        <IoMdAddCircleOutline />
                                        <div id='hover_P'>
                                            <p id='remove_p'>Add More</p>
                                            <div></div>
                                        </div>
                                    </li>
                                </div>
                            }
                        </div>

                        <div className="from1">
                            <div className="form-group">
                                <label>Company Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter Company name"
                                    name="company_name"
                                    value={form.company_name}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Industry</label>
                                <input
                                    type="text"
                                    name="industry"
                                    placeholder='Enter Industry Name'
                                    value={form.industry}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Job Title</label>
                                <input
                                    type="text"
                                    name="job_title"
                                    placeholder='Enter Job Title'
                                    value={form.job_title}
                                    onChange={(e) => handleChange(index, e)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Duration</label>
                                <input
                                    type="text"
                                    name="duration"
                                    value={form.duration}  // Display calculated duration
                                    readOnly
                                    placeholder="Duration"
                                />
                            </div>
                            <div className="form-group" id='form_group_Duration'>
                                <div id='div_Duration'>
                                    <label>From</label>
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
                            {/* <div className="form-group">
                                <label>Experience Letter</label>
                                <div className="file-upload">
                                    <input
                                        type="file"
                                        name='photo'
                                        id="file"
                                        onChange={(e) => handleFileChange(index, e)}
                                    />
                                    <label htmlFor="file" className="custom-file-upload">
                                        {!isUploaded && <GrCloudUpload className="upload-icon" />}
                                        {isUploaded ? fileName : 'Upload Doc'}
                                    </label>
                                </div>
                            </div> */}
                            <div className="form-group">
                                <label className=''>Experience Letter</label>
                                <MultiImageUploaders
                                    formData={formData}
                                    setFormData={setFormData}
                                    fieldName={`experience_letter_${index}`}
                                />
                            </div>
                        </div>
                        <div id='Description'>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea
                                    name="description"
                                    value={form.description}
                                    onChange={(e) => handleChange(index, e)}
                                    placeholder='Enter Description'
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <div id='submitBtn_next_main'>
                    <div id='submitBtn'>
                        <div className='div'>
                            <button type="submit">Update</button>
                            <span><CiCircleChevRight /></span>
                        </div>
                        <div className="lineBar"></div>
                        <div className='x'>
                            <span><TfiClose /></span>
                        </div>
                    </div>
                    <div className="form">
                        <p>Next Page</p>
                        <span className='not_active'><IoIosArrowDropleft /></span>
                        <button type="button" onClick={nextSumbit}>
                            <IoIosArrowDropright />
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ExperienceForm;
