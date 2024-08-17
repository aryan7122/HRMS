import { useState } from 'react';
import './AddEmloyee.scss';
import './NavbarForm.scss';
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { GrCloudUpload } from "react-icons/gr";
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";

const DocumentsForm = ({ onSubmit }) => {
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [educationForms, setEducationForms] = useState([
        {
            instituteName: '',
            degree: '',
            specialization: '',
            completionDate: '',
            fromDate: '',
            toDate: '',
            attachment: ''
        }
    ]);

    const handleFileChange = (index, event) => {
        const file = event.target.files[0];
        if (file) {
            const newForms = [...educationForms];
            newForms[index].attachment = file;
            setEducationForms(newForms);
            setFileName(file.name);
            setIsUploaded(true);
        }
    };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newForms = [...educationForms];
        newForms[index][name] = value;
        setEducationForms(newForms);
    };

    const handleAddEducation = () => {
        setEducationForms([
            ...educationForms,
            {
                instituteName: '',
                degree: '',
                specialization: '',
                completionDate: '',
                fromDate: '',
                toDate: '',
                attachment: ''
            }
        ]);
    };

    const handleRemoveEducation = (index) => {
        const newForms = educationForms.filter((_, i) => i !== index);
        setEducationForms(newForms);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(educationForms);
    };

    return (
        <div id="Education_form">
            <form onSubmit={handleSubmit}>
                <div id='form'>
                    <div className='div_heading'>
                        <h2>Identity Information</h2>
                    </div>
                    <div className="from1">
                        <div className="form-group">
                            <label>Aadhaar Number</label>
                            <input
                                type="text"
                                name="aadharNumber"
                                onChange={(e) => handleChange(0, e)}
                                required
                                placeholder='Aadhaar Number'
                            />
                        </div>
                        <div className="form-group">
                            <label>PAN Number</label>
                            <input
                                type="text"
                                name="panNumber"
                                onChange={(e) => handleChange(0, e)}
                                required
                                placeholder='PAN Number'
                            />
                        </div>
                        <div className="form-group">
                            <label>UAN Number</label>
                            <input
                                type="text"
                                name="uanNumber"
                                onChange={(e) => handleChange(0, e)}
                                required
                                placeholder='UAN Number'
                            />
                        </div>
                        <div className="form-group">
                            <label>Aadhar Attachment</label>
                            <div className="file-upload">
                                <input
                                    type="file"
                                    name='aadharAttachment'
                                    // accept="image/*"
                                    id="file"
                                    onChange={(e) => handleFileChange(0, e)}
                                    required
                                />
                                <label htmlFor="file" className="custom-file-upload">
                                    {!isUploaded && <GrCloudUpload className="upload-icon" />}
                                    {isUploaded ? fileName : 'Aadhar Attachment'}
                                </label>
                            </div>
                        </div>
                      
                        <div className="form-group">
                            <label>PAN Attachment</label>
                            <div className="file-upload">
                                <input
                                    type="file"
                                    name='panAttachment'
                                    // accept="image/*"
                                    id="file"
                                    onChange={(e) => handleFileChange(0, e)}
                                    required
                                />
                                <label htmlFor="file" className="custom-file-upload">
                                    {!isUploaded && <GrCloudUpload className="upload-icon" />}
                                    {isUploaded ? fileName : 'PAN Attachment'}
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>UAN Attachment</label>
                            <div className="file-upload">
                                <input
                                    type="file"
                                    name='uanAttachment'
                                    // accept="image/*"
                                    id="file"
                                    onChange={(e) => handleFileChange(0, e)}
                                    required
                                />
                                <label htmlFor="file" className="custom-file-upload">
                                    {!isUploaded && <GrCloudUpload className="upload-icon" />}
                                    {isUploaded ? fileName : 'UAN Attachment'}
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {educationForms.map((form, index) => (
                    <div key={index} id='form'>
                        <div className='div_heading add_exp'>
                            <h2>Relevant Document</h2>
                            {index === 0 ?
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
                                :
                                <div
                                    id='removeBtn'
                                    style={{ color: 'red', cursor: 'pointer' }}
                                    onClick={() => handleRemoveEducation(index)}
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
                        </div>

                        <div className="from1">
                            <div className="form-group">
                                <label>Document Name</label>
                                <input
                                    type="text"
                                    placeholder="Document Name"
                                    name="instituteName"
                                    value={form.instituteName}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Document ID</label>
                                <input
                                    type="text"
                                    name="degree"
                                    value={form.degree}
                                    onChange={(e) => handleChange(index, e)}
                                    required
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
                                        required
                                    />
                                    <label htmlFor="file" className="custom-file-upload">
                                        {!isUploaded && <GrCloudUpload className="upload-icon" />}
                                        {isUploaded ? fileName : 'Upload Document'}
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Expiry Date</label>
                                <input
                                    type="date"
                                    name="specialization"
                                    value={form.specialization}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>Issue Date</label>
                                <input
                                    type="date"
                                    name="completionDate"
                                    value={form.completionDate}
                                    onChange={(e) => handleChange(index, e)}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                ))}
                <div id='submitBtn'>
                    <div className='div'>
                        <button type="submit">Submit</button>
                        <span><CiCircleChevRight /></span>
                    </div>
                    <div className="lineBar"></div>
                    <div className='x'>
                        <span><TfiClose /></span>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DocumentsForm;
