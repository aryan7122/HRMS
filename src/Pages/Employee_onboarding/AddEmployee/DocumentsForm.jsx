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
    const [educationForms, setEducationForms] = useState([
        {
            documentType: '',
            number: '',
            attachmentFront: '',
            attachmentBack: '',
        }
    ]);

    const [allDocumentsData, setAllDocumentsData] = useState({
        aadhaar: {
            number: '',
            frontAttachment: '',
            backAttachment: '',
        },
        pan: {
            number: '',
            attachment: '',
        },
        uan: {
            number: '',
            attachment: '',
        },
        other: {
            number: '',
            attachment: '',
        }
    });
    // select
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    console.log('selectedDocuments', selectedDocuments)
    const [fileName, setFileName] = useState('');
   
    const { isOpen: isEmploymentTypeOpen, ref: employmentTypeRef, buttonRef: employmentTypeButtonRef, handleToggle: toggleEmploymentType, setIsOpen: setEmploymentTypeOpen } = OutsideClick();
    const { isOpen: isEmploymentTypeOpen2, ref: employmentTypeRef2, buttonRef: employmentTypeButtonRef2, handleToggle: toggleEmploymentType2, setIsOpen: setEmploymentTypeOpen2 } = OutsideClick();
    const { isOpen: isEmploymentTypeOpen1, ref: employmentTypeRef1, buttonRef: employmentTypeButtonRef1, handleToggle: toggleEmploymentType1, setIsOpen: setEmploymentTypeOpen1 } = OutsideClick();

    const { isOpen: isEmploymentTypeOpen3, ref: employmentTypeRef3, buttonRef: employmentTypeButtonRef3, handleToggle: toggleEmploymentType3, setIsOpen: setEmploymentTypeOpen3 } = OutsideClick();
    const { isOpen: isEmploymentTypeOpen4, ref: employmentTypeRef4, buttonRef: employmentTypeButtonRef4, handleToggle: toggleEmploymentType4, setIsOpen: setEmploymentTypeOpen4 } = OutsideClick();
    const { isOpen: isEmploymentTypeOpen5, ref: employmentTypeRef5, buttonRef: employmentTypeButtonRef5, handleToggle: toggleEmploymentType5, setIsOpen: setEmploymentTypeOpen5 } = OutsideClick();


    const [searchQueryEmploymentType, setSearchQueryEmploymentType] = useState('');

    const handleSearchQueryChangeEmploymentType = (e) => setSearchQueryEmploymentType(e.target.value);

    // 
    // img
    const [isUploaded, setIsUploaded] = useState(false);

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
    // img
    // const handleFileChange = (index, event, type) => {
    //     const file = event.target.files[0];
    //     if (file) {
    //         const newForms = [...educationForms];
    //         if (type === 'front') {
    //             newForms[index].attachmentFront = file;
    //         } else if (type === 'back') {
    //             newForms[index].attachmentBack = file;
    //         } else {
    //             newForms[index].attachment = file;
    //         }
    //         setEducationForms(newForms);

    //         // Update specific document data
    //         updateDocumentData(index, { attachment: file });
    //     }
    // };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newForms = [...educationForms];
        newForms[index][name] = value;
        setEducationForms(newForms);

        // Update specific document data
        updateDocumentData(index, { [name]: value });
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

    // const handleRemoveEducation = (index) => {
    //     const newForms = educationForms.filter((_, i) => i !== index);
    //     setEducationForms(newForms);
    // };
    const handleRemoveEducation = (index) => {
        // Find the document type to be removed
        const documentTypeToRemove = educationForms[index].documentType;

        // Remove the document type from the selectedDocuments array
        const updatedSelectedDocuments = selectedDocuments.filter(docType => docType !== documentTypeToRemove);

        // Update the educationForms array by filtering out the removed index
        const newForms = educationForms.filter((_, i) => i !== index);

        // Update state
        setEducationForms(newForms);
        setSelectedDocuments(updatedSelectedDocuments);
    };
    const selectOption = (index, option) => {
        setEmploymentTypeOpen(false)
        setEmploymentTypeOpen1(false)

        setEmploymentTypeOpen2(false)
        setEmploymentTypeOpen3(false)
        setEmploymentTypeOpen4(false)
        setEmploymentTypeOpen5(false)
        const documentTypeToRemove = educationForms[index].documentType;
        const updatedSelectedDocuments = selectedDocuments.filter(docType => docType !== documentTypeToRemove);
        setSelectedDocuments(updatedSelectedDocuments);

        setSelectedDocuments([...updatedSelectedDocuments, option]);
      

        const newForms = [...educationForms];
        newForms[index].documentType = option;
        setEducationForms(newForms);
    };

    const updateDocumentData = (index, newData) => {
        const form = educationForms[index];
        let updatedData = { ...allDocumentsData };

        switch (form.documentType) {
            case 'Aadhaar':
                updatedData.aadhaar = { ...updatedData.aadhaar, ...newData };
                break;
            case 'PAN':
                updatedData.pan = { ...updatedData.pan, ...newData };
                break;
            case 'UAN':
                updatedData.uan = { ...updatedData.uan, ...newData };
                break;
            case 'Other':
                updatedData.other = { ...updatedData.other, ...newData };
                break;
            default:
                break;
        }

        setAllDocumentsData(updatedData);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(allDocumentsData); // All document data printed here
    };

    const documentOptions = ['Aadhaar', 'PAN', 'UAN', 'Other'];

    return (
        <div id="Education_form">
            <form onSubmit={handleSubmit}>
                {educationForms.map((form, index) => (
                    <div key={index} id='form'>
                        <div className='div_heading add_exp'>
                            <h2 id='indexTitile'>Identity Information {index +1}</h2>
                            {index === 0 ?
                                <div type="button" onClick={handleAddEducation}>
                                    <li className='li_add_emp'>
                                        <IoMdAddCircleOutline />
                                        <div id='hover_P'>
                                            <p id='remove_p'>Add More</p>
                                            <div></div>
                                        </div>
                                    </li>
                                </div>
                                :
                                <div id='removeBtn' style={{ color: 'red', cursor: 'pointer' }} onClick={() => handleRemoveEducation(index)}>
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
                            {/* <div className="form-group">
                                <label>Select Document Name</label>
                                <select
                                    name="documentType"
                                    value={form.documentType}
                                    onChange={(e) => handleChange(index, e)}
                                >
                                    <option value="">Select document type</option>
                                    {documentOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                <div>
                                </div>
                            </div> */}
                            {/* {index === 0 && */}
                            {/* <div className="form-group">
                                    <label>Select Document Type</label>
                                    <div className="dropdown">
                                        <div className="dropdown-button" ref={employmentTypeButtonRef1} onClick={toggleEmploymentType1}>
                                            <div>{form.documentType || "Select document type"}</div>
                                            <span id='toggle_selectIcon'>
                                                {!isEmploymentTypeOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                            </span>
                                        </div>
                                        {isEmploymentTypeOpen1 && (
                                            <div className="dropdown-menu" ref={employmentTypeRef1}>
                                                <input
                                                    type="search"
                                                    className="search22"
                                                    placeholder="Search document type"
                                                    value={searchQueryEmploymentType}
                                                    onChange={handleSearchQueryChangeEmploymentType}
                                                    id="searchDepartmentHead"
                                                />
                                                <div className="dropdown_I">
                                                    {documentOptions.filter(option => option.toLowerCase().includes(searchQueryEmploymentType.toLowerCase()))
                                                        .map(option => (
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
                                </div> */}
                            {/* } */}


                            {form.documentType === '' && (
                                <>
                                    <div className="form-group">
                                        <label> Document Name</label>
                                        <div className="dropdown">
                                            <div className="dropdown-button" ref={employmentTypeButtonRef} onClick={toggleEmploymentType}>
                                                <div>{form.documentType || "Select"}</div>
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
                                                        {documentOptions.filter(option => option.toLowerCase().includes(searchQueryEmploymentType.toLowerCase()))
                                                            .map(option => (
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
                                    <div className="form-group">
                                        <label>Document Id</label>
                                        <input
                                            type="text"
                                            name="number"
                                            value={form.number}
                                            onChange={(e) => handleChange(index, e)}
                                            placeholder="Enter PAN Number"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Attacment</label>
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

                            {form.documentType === 'Aadhaar' && (
                                <>
                                    <div className="form-group">
                                        <label> Document Name</label>
                                        <div className="dropdown">
                                            <div className="dropdown-button" ref={employmentTypeButtonRef2} onClick={toggleEmploymentType2}>
                                                <div>{form.documentType || "Select document type"}</div>
                                                <span id='toggle_selectIcon'>
                                                    {!isEmploymentTypeOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                                </span>
                                            </div>
                                            {isEmploymentTypeOpen2 && (
                                                <div className="dropdown-menu" ref={employmentTypeRef2}>
                                                    <input
                                                        type="search"
                                                        className="search22"
                                                        placeholder="Search document type"
                                                        value={searchQueryEmploymentType}
                                                        onChange={handleSearchQueryChangeEmploymentType}
                                                        id="searchDepartmentHead"
                                                    />
                                                    <div className="dropdown_I">
                                                        {documentOptions.filter(option => option.toLowerCase().includes(searchQueryEmploymentType.toLowerCase()))
                                                            .map(option => (
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
                                    <div className="form-group">
                                        <label>Document Id</label>
                                        <input
                                            type="text"
                                            name="number"
                                            value={form.number}
                                            onChange={(e) => handleChange(index, e)}
                                            placeholder="Enter Aadhaar Number"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Front  Attachment</label>
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
                                        <label>Back Attachment</label>
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

                            {form.documentType === 'PAN' && (
                                <>
                                    <div className="form-group">
                                        <label> Document Name</label>
                                        <div className="dropdown">
                                            <div className="dropdown-button" ref={employmentTypeButtonRef3} onClick={toggleEmploymentType3}>
                                                <div>{form.documentType || "Select document type"}</div>
                                                <span id='toggle_selectIcon'>
                                                    {!isEmploymentTypeOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                                </span>
                                            </div>
                                            {isEmploymentTypeOpen3 && (
                                                <div className="dropdown-menu" ref={employmentTypeRef3}>
                                                    <input
                                                        type="search"
                                                        className="search22"
                                                        placeholder="Search document type"
                                                        value={searchQueryEmploymentType}
                                                        onChange={handleSearchQueryChangeEmploymentType}
                                                        id="searchDepartmentHead"
                                                    />
                                                    <div className="dropdown_I">
                                                        {documentOptions.filter(option => option.toLowerCase().includes(searchQueryEmploymentType.toLowerCase()))
                                                            .map(option => (
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
                                    <div className="form-group">
                                        <label>Document Id</label>
                                        <input
                                            type="text"
                                            name="number"
                                            value={form.number}
                                            onChange={(e) => handleChange(index, e)}
                                            placeholder="Enter PAN Number"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label> Attachment</label>
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
                            {form.documentType === 'UAN' && (
                                <>
                                    <div className="form-group">
                                        <label> Document Name</label>
                                        <div className="dropdown">
                                            <div className="dropdown-button" ref={employmentTypeButtonRef4} onClick={toggleEmploymentType4}>
                                                <div>{form.documentType || "Select document type"}</div>
                                                <span id='toggle_selectIcon'>
                                                    {!isEmploymentTypeOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                                </span>
                                            </div>
                                            {isEmploymentTypeOpen4 && (
                                                <div className="dropdown-menu" ref={employmentTypeRef4}>
                                                    <input
                                                        type="search"
                                                        className="search22"
                                                        placeholder="Search document type"
                                                        value={searchQueryEmploymentType}
                                                        onChange={handleSearchQueryChangeEmploymentType}
                                                        id="searchDepartmentHead"
                                                    />
                                                    <div className="dropdown_I">
                                                        {documentOptions.filter(option => option.toLowerCase().includes(searchQueryEmploymentType.toLowerCase()))
                                                            .map(option => (
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
                                    <div className="form-group">
                                        <label>Document Id</label>
                                        <input
                                            type="text"
                                            name="number"
                                            value={form.number}
                                            onChange={(e) => handleChange(index, e)}
                                            placeholder="Enter UAN Number"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label> Attachment</label>
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
                            {form.documentType === 'Other' && (
                                <>
                                    <div className="form-group">
                                        <label> Document Name</label>
                                        <div className="dropdown">
                                            <div className="dropdown-button" ref={employmentTypeButtonRef5} onClick={toggleEmploymentType5}>
                                                <div>{form.documentType || "Select document type"}</div>
                                                <span id='toggle_selectIcon'>
                                                    {!isEmploymentTypeOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                                </span>
                                            </div>
                                            {isEmploymentTypeOpen5 && (
                                                <div className="dropdown-menu" ref={employmentTypeRef5}>
                                                    <input
                                                        type="search"
                                                        className="search22"
                                                        placeholder="Search document type"
                                                        value={searchQueryEmploymentType}
                                                        onChange={handleSearchQueryChangeEmploymentType}
                                                        id="searchDepartmentHead"
                                                    />
                                                    <div className="dropdown_I">
                                                        {documentOptions.filter(option => option.toLowerCase().includes(searchQueryEmploymentType.toLowerCase()))
                                                            .map(option => (
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
                                    <div className="form-group">
                                        <label>Document Id</label>
                                        <input
                                            type="text"
                                            name="number"
                                            value={form.number}
                                            onChange={(e) => handleChange(index, e)}
                                            placeholder="Enter other Document Number"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label> Attachment</label>
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
