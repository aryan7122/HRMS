import { useState } from 'react';
import './AddEmloyee.scss';
import './NavbarForm.scss';
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { GrCloudUpload } from "react-icons/gr";
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { OutsideClick } from './OutsideClick.jsx';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const DocumentsForm = ({ onSubmit }) => {
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    const [educationForms, setEducationForms] = useState([
        {
            documentType: '',
            number: '',
            attachmentFront: '',
            attachmentBack: '',
        }
    ]);

    const handleFileChange = (index, event, type) => {
        const file = event.target.files[0];
        if (file) {
            const newForms = [...educationForms];
            if (type === 'front') {
                newForms[index].attachmentFront = file;
            } else if (type === 'back') {
                newForms[index].attachmentBack = file;
            }
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
                documentType: '',
                number: '',
                attachmentFront: '',
                attachmentBack: '',
            }
        ]);
    };

    const handleRemoveEducation = (index) => {
        const newForms = educationForms.filter((_, i) => i !== index);
        setEducationForms(newForms);

        // Re-enable the previously selected document type
        const removedType = educationForms[index].documentType;
        if (removedType) {
            setSelectedDocuments(selectedDocuments.filter(doc => doc !== removedType));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(educationForms);
    };

    const selectOption = (index, option) => {
        const newForms = [...educationForms];
        newForms[index].documentType = option;
        setEducationForms(newForms);
        setSelectedDocuments([...selectedDocuments, option]);
    };

    const { isOpen: isEmploymentTypeOpen, ref: employmentTypeRef, buttonRef: employmentTypeButtonRef, handleToggle: toggleEmploymentType, setIsOpen: setEmploymentTypeOpen } = OutsideClick();

    const [searchQueryEmploymentType, setSearchQueryEmploymentType] = useState('');

    const handleSearchQueryChangeEmploymentType = (e) => setSearchQueryEmploymentType(e.target.value);

    const documentOptions = ['Aadhaar', 'PAN', 'UAN', 'Other'];
    const filteredDocumentOptions = documentOptions.filter(option =>
        option.toLowerCase().includes(searchQueryEmploymentType.toLowerCase())
    );

    return (
        <div id="Education_form">
            <form onSubmit={handleSubmit}>
                {educationForms.map((form, index) => (
                    <div key={index} id='form'>
                        <div className='div_heading add_exp'>
                            <h2>Identity Information</h2>
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
                            {form.documentType === '' ? (
                                <div className="form-group">
                                    <label>Select Document Type</label>
                                    <div className="dropdown">
                                        <div className="dropdown-button" ref={employmentTypeButtonRef} onClick={toggleEmploymentType}>
                                            <div>{form.documentType || "Select document type"}</div>
                                            <span id='toggle_selectIcon'>
                                                {!isEmploymentTypeOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                            </span>
                                        </div>
                                        {isEmploymentTypeOpen && (
                                            <div className="dropdown-menu" ref={employmentTypeRef}>
                                                <input
                                                    type="search"
                                                    className="search22"
                                                    placeholder="Search document type"
                                                    value={searchQueryEmploymentType}
                                                    onChange={handleSearchQueryChangeEmploymentType}
                                                    id="searchDepartmentHead"
                                                />
                                                <div className="dropdown_I">
                                                    {filteredDocumentOptions.map(option => (
                                                        <div
                                                            key={option}
                                                            className={`dropdown-item ${selectedDocuments.includes(option) ? 'disabled' : ''}`}
                                                            onClick={() => !selectedDocuments.includes(option) && selectOption(index, option)}
                                                        >
                                                            {option}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {form.documentType === 'Other' ? (
                                        <div className="form-group">
                                            <label>Other Document Type</label>
                                            <input
                                                type="text"
                                                name="documentType"
                                                onChange={(e) => handleChange(index, e)}
                                                required
                                                placeholder="Enter document type"
                                            />
                                        </div>
                                    ) : null}
                                    <div className="form-group">
                                        <label>{form.documentType} Number</label>
                                        <input
                                            type="text"
                                            name="number"
                                            onChange={(e) => handleChange(index, e)}
                                            required
                                            placeholder={`${form.documentType} Number`}
                                        />
                                    </div>
                                    {form.documentType === 'Aadhaar' && (
                                        <>
                                            <div className="form-group">
                                                <label>Front Image of Aadhaar</label>
                                                    <div className="file-upload">
                                                        <input
                                                            type="file"
                                                            name='attachment'
                                                            id="file"
                                                            onChange={(e) => handleFileChange(index, e)}
                                                            required
                                                        />
                                                        <label htmlFor="file" className="custom-file-upload">
                                                            {!isUploaded && <GrCloudUpload className="upload-icon" />}
                                                            {isUploaded ? fileName : `${form.documentType} Attachment`}
                                                        </label>
                                                    </div>
                                            </div>
                                            <div className="form-group">
                                                <label>Back Image of Aadhaar</label>
                                                    <div className="file-upload">
                                                        <input
                                                            type="file"
                                                            name='attachment'
                                                            id="file"
                                                            onChange={(e) => handleFileChange(index, e)}
                                                            required
                                                        />
                                                        <label htmlFor="file" className="custom-file-upload">
                                                            {!isUploaded && <GrCloudUpload className="upload-icon" />}
                                                            {isUploaded ? fileName : `${form.documentType} Attachment`}
                                                        </label>
                                                    </div>
                                            </div>
                                        </>
                                    )}
                                    {form.documentType !== 'Aadhaar' && (
                                            <div className="form-group">
                                                <label>{form.documentType} Attachment</label>
                                                <div className="file-upload">
                                                    <input
                                                        type="file"
                                                        name='attachment'
                                                        id="file"
                                                        onChange={(e) => handleFileChange(index, e)}
                                                        required
                                                    />
                                                    <label htmlFor="file" className="custom-file-upload">
                                                        {!isUploaded && <GrCloudUpload className="upload-icon" />}
                                                        {isUploaded ? fileName : `${form.documentType} Attachment`}
                                                    </label>
                                                </div>
                                            </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                ))}
                <div id='submitBtn_next_main'>
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

export default DocumentsForm;
