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


    const [startDates, setStartDates] = useState([]);
    const [endDates, setEndDates] = useState([]);
    const [completionDates, setCompletionDates] = useState([]);

    const handleCompletionDateChange = (index, date) => {
        const updatedCompletionDates = [...completionDates];
        updatedCompletionDates[index] = date;
        setCompletionDates(updatedCompletionDates);
    };

    const handleStartDateChange = (index, date) => {
        const updatedStartDates = [...startDates];
        updatedStartDates[index] = date;
        setStartDates(updatedStartDates);
    };

    const handleEndDateChange = (index, date) => {
        const updatedEndDates = [...endDates];
        updatedEndDates[index] = date;
        setEndDates(updatedEndDates);
    };

    const [educationForms, setEducationForms] = useState({
        educations: [
            {
                institute_name: "",
                degree: "",
                specialization: "",
                attachment: [],
                date_of_completion: null,
                from_date: null,
                to_date: null
            }
        ]
    });

    useEffect(() => {
        setEducationForms((prevEducationForms) => ({
            educations: prevEducationForms.educations.map((education, index) => ({
                ...education,
                date_of_completion: completionDates[index] || null,
                from_date: startDates[index] || null,
                to_date: endDates[index] || null,
            }))
        }));
    }, [startDates, endDates, completionDates]);




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
                                <DatePicker label="Date of Completion" onDateChange={(date) => handleCompletionDateChange(index, date)}
                                    initialDate={form.date_of_completion} />

                            </div>
                            <div className="form-group" id='form_group_Duration'>
                                <div className='divDate'>
                                    <DatePicker label="From" onDateChange={(date) => handleStartDateChange(index, date)}
                                        initialDate={form.from_date} />
                                    <DatePicker label="to" onDateChange={(date) => handleEndDateChange(index, date)} initialDate={form.to_date} />
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
