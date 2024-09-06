import { useState, useEffect } from 'react';
import './AddEmloyee.scss';
import './NavbarForm.scss';
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { GrCloudUpload } from "react-icons/gr";
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const ExperienceForm = ({ onSubmit }) => {
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [experienceForms, setExperienceForms] = useState([
        {
            employeeId: '',
            companyName: '',
            industry: '',
            jobTitle: '',
            startDate: '',
            endDate: '',
            description: '',
            photo: '',
            duration: ''  // Add duration field
        }
    ]);

    const handleFileChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setIsUploaded(true);
            const newForms = [...experienceForms];
            newForms[index].photo = file;
            setExperienceForms(newForms);
        }
    };

    const calculateDuration = (startDate, endDate) => {
        if (!startDate || !endDate) return '';

        const from = new Date(startDate);
        const to = new Date(endDate);

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
        const newForms = [...experienceForms];
        newForms[index][name] = value;

        // Update duration whenever startDate or endDate changes
        if (name === 'startDate' || name === 'endDate') {
            const duration = calculateDuration(newForms[index].startDate, newForms[index].endDate);
            newForms[index].duration = duration;
        }

        setExperienceForms(newForms);
        console.log('experienceForms', newForms);  // Print the updated forms with duration
    };

    const handleAddExperience = () => {
        setExperienceForms([
            ...experienceForms,
            {
                employeeId: '',
                companyName: '',
                industry: '',
                jobTitle: '',
                startDate: '',
                endDate: '',
                description: '',
                photo: '',
                duration: ''  // Add duration field for new form
            }
        ]);
    };

    const handleRemoveExperience = (index) => {
        const newForms = experienceForms.filter((_, i) => i !== index);
        setExperienceForms(newForms);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('experienceForms', experienceForms);  // Print the final forms with duration
        // handle form submission logic here
        // Reset forms or show a success message
    };

    return (
        <div onSubmit={onSubmit}  id="Experience_form">
            <form onSubmit={handleSubmit}>
                {experienceForms.map((form, index) => (
                    <div key={index} id='form'>
                        <div className='div_heading add_exp'>
                            <h2>Experience {index + 1}</h2>
                            {index > 0 &&
                                <div
                                    id='removeBtn'
                                    style={{ color: 'red', cursor: 'pointer' }}
                                    onClick={() => handleRemoveExperience(index)}
                                >
                                    <li className='li_add_emp '>
                                        <IoMdCloseCircleOutline />
                                        <div id='hover_P'>
                                            <p id='remove_p'>Remove</p>
                                            <div></div>
                                        </div>
                                    </li>
                                </div>
                            }
                            {index === 0 &&
                                <div
                                    type="button"
                                    onClick={handleAddExperience}
                                >
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
                                    placeholder="Company name"
                                    name="companyName"
                                    value={form.companyName}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Industry</label>
                                <input
                                    type="text"
                                    name="industry"
                                    value={form.industry}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Job Title</label>
                                <input
                                    type="text"
                                    name="jobTitle"
                                    value={form.jobTitle}
                                    onChange={(e) => handleChange(index, e)}
                                    required
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
                                        name="startDate"
                                        value={form.startDate}
                                        onChange={(e) => handleChange(index, e)}
                                        required
                                    />
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={form.endDate}
                                        onChange={(e) => handleChange(index, e)}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Experience Letter</label>
                                <div className="file-upload">
                                    <input
                                        type="file"
                                        name='photo'
                                        id="file"
                                        onChange={(e) => handleFileChange(index, e)}
                                        required
                                    />
                                    <label htmlFor="file" className="custom-file-upload">
                                        {!isUploaded && <GrCloudUpload className="upload-icon" />}
                                        {isUploaded ? fileName : 'Upload Doc'}
                                    </label>
                                </div>
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
                    <div id='submitBtn' >
                        <div className='div'>
                            <button type="submit" >Submit </button>
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
                        <button type='submit'><IoIosArrowDropright /></button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ExperienceForm;
