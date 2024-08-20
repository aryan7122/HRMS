import { useState } from 'react';
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
            photo: ''
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

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newForms = [...experienceForms];
        newForms[index][name] = value;
        setExperienceForms(newForms);
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
                photo: ''
            }
        ]);
    };

    const handleRemoveExperience = (index) => {
        const newForms = experienceForms.filter((_, i) => i !== index);
        setExperienceForms(newForms);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(experienceForms);
        // handle form submission logic here
        // Reset forms or show a success message
    };

    return (
        <div onSubmit={onSubmit} id="Experience_form">

            <form onSubmit={handleSubmit}>
                {experienceForms.map((form, index) => (
                    <div key={index} id='form' >
                        <div className='div_heading add_exp'>
                            <h2>Experience {index + 1}</h2>
                            {!index > 0 ?
                                <div
                                    type="button"
                                    // id="add-experience-button"
                                    onClick={handleAddExperience}
                                >
                                    <li className='li_add_emp'>
                                        <IoMdAddCircleOutline />
                                        <div id='hover_P'>
                                            <p id='remove_p'>Add More</p>
                                            <div>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                                :
                                <div
                                    id='removeBtn'
                                    style={{ color: 'red', cursor: 'pointer' }}
                                    onClick={() => handleRemoveExperience(index)}
                                >
                                    {/* {index + 1} */}
                                    <li className='li_add_emp '>
                                        <IoMdCloseCircleOutline />
                                        <div id='hover_P'>
                                            <p id='remove_p'>Remove</p>
                                            <div>
                                            </div>
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
                                    name="jobTitle"
                                    value={form.description}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                    disabled
                                    // placeholder={form.d}
                                />
                            </div>
                            <div className="form-group " id='form_group_Duration'>
                                <div id='div_Duration'>
                                    <label> From</label>
                                    <label>To</label>
                                </div>
                                <div>
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
                                        // accept="image/*"
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
                            <div className="form-group" >
                                <label>Description</label> <br />
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

