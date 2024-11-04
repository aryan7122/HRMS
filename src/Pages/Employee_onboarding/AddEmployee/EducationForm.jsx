import { useState,useEffect } from 'react';
import './AddEmloyee.scss';
import './NavbarForm.scss';
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { GrCloudUpload } from "react-icons/gr";
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { MultiImageUploaders } from '../../../components/MultiImageUpload';
import DatePicker from '../../../utils/Form/DatePicker';

const EducationForm = ({ onSubmit, next }) => {
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);

    // Education forms state, nested under "educations" array
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [completionDate, setCompletionDate] = useState(null);

    const handleCompletionDateChange = (date) => {
        setCompletionDate(date);
    };
    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };
    const [educationForms, setEducationForms] = useState({
        educations: [
            {
                institute_name: "",
                degree: "",
                specialization: "",
                attachment: [],
                date_of_completion: completionDate,
                from_date: startDate,
                to_date: endDate
            }
        ]
    });
    const [formData, setFormData] = useState({
    });
    console.log('formData educationForms', formData)
    console.log('educationForms :::', educationForms)
    useEffect(() => {
        // Loop through formData and update experienceForms based on index
        Object.keys(formData).forEach((key) => {
            if (key.startsWith('attachment_')) {
                const index = parseInt(key.split('_')[1]); // Extract index from key (experience_letter_X)
                const newForms = [...educationForms.educations];

                // Set the experience_letter for the specific form
                newForms[index].attachment = formData[key];

                setEducationForms({ educations: newForms });
            }
        });
    }, [formData]);

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
                attachment: [],
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

                            {/* <div className="form-group">
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
                            </div> */}
                            <div className="form-group">
                                <label>Attachment</label>
                                <MultiImageUploaders
                                    formData={formData}
                                    setFormData={setFormData}
                                    fieldName={`attachment_${index}`}
                                />
                            </div>
                            <div className="form-group">
                                <DatePicker label="Date of Completion" onDateChange={handleCompletionDateChange} />

                            </div>
                            <div className="form-group" id='form_group_Duration'>
                                <div className='divDate'>
                                    <DatePicker label="From" onDateChange={handleStartDateChange} />
                                    <DatePicker label="to" onDateChange={handleEndDateChange} />
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <div id='submitBtn_next_main'>
                    <div id='submitBtn' >
                        <div className='div'>
                            <button type="submit">Submit </button>
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
