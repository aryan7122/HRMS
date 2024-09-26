import { useEffect, useState } from 'react';
import './UpdateEmloyee.scss';
import './NavbarForm.scss';
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { GrCloudUpload } from "react-icons/gr";
import { IoMdAddCircleOutline, IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { OutsideClick } from './OutsideClick.jsx';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { number } from 'prop-types';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from 'react-router-dom';

const DocumentsForm = ({ onSubmit, update }) => {
    const [selectedDocuments, setSelectedDocuments] = useState([]);
    // console.log('selectedDocuments', selectedDocuments)
    const [fileName, setFileName] = useState('');

    const { isOpen: isEmploymentTypeOpen, ref: employmentTypeRef, buttonRef: employmentTypeButtonRef, handleToggle: toggleEmploymentType, setIsOpen: setEmploymentTypeOpen } = OutsideClick();
    const { isOpen: isEmploymentTypeOpen2, ref: employmentTypeRef2, buttonRef: employmentTypeButtonRef2, handleToggle: toggleEmploymentType2, setIsOpen: setEmploymentTypeOpen2 } = OutsideClick();
    const { isOpen: isEmploymentTypeOpen1, ref: employmentTypeRef1, buttonRef: employmentTypeButtonRef1, handleToggle: toggleEmploymentType1, setIsOpen: setEmploymentTypeOpen1 } = OutsideClick();

    const { isOpen: isEmploymentTypeOpen3, ref: employmentTypeRef3, buttonRef: employmentTypeButtonRef3, handleToggle: toggleEmploymentType3, setIsOpen: setEmploymentTypeOpen3 } = OutsideClick();
    const { isOpen: isEmploymentTypeOpen4, ref: employmentTypeRef4, buttonRef: employmentTypeButtonRef4, handleToggle: toggleEmploymentType4, setIsOpen: setEmploymentTypeOpen4 } = OutsideClick();
    const { isOpen: isEmploymentTypeOpen5, ref: employmentTypeRef5, buttonRef: employmentTypeButtonRef5, handleToggle: toggleEmploymentType5, setIsOpen: setEmploymentTypeOpen5 } = OutsideClick();

    const [isUploaded, setIsUploaded] = useState(false);

    const [searchQueryEmploymentType, setSearchQueryEmploymentType] = useState('');
    const handleSearchQueryChangeEmploymentType = (e) => setSearchQueryEmploymentType(e.target.value);
    // 
    const [educationForms, setEducationForms] = useState([
        {
            documentType: '',
            number: '',
            attachmentFront: '',
            attachmentBack: '',
        }
    ]);
    const [allDocumentsData, setAllDocumentsData] = useState({
        documents: [
            {
                document_name: '',
                document_id: '',
                attachment_1: '',
                attachment_2: ''
            }
        ]
    });
    console.log('educationForms', educationForms)
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
                    const data = response.data.result.documents;
                    // console.log('documents data', data);

                    if (data && data.length > 0) {
                        setAllDocumentsData({
                            documents: data.map(doc => ({
                                document_name: doc.document_name || '',
                                document_id: doc.document_id || '',
                                attachment_1: doc.attachment_1 || '',
                                attachment_2: doc.attachment_2 || ''
                            }))
                        });
                        if (data && data.length > 0) {
                            setEducationForms(data.map(doc => ({
                                documentType: doc.document_name || '',
                                number: doc.document_id || '',
                                attachmentFront: doc.attachment_1 || '',
                                attachmentBack: doc.attachment_2 || ''
                            })));
                        }
                    }
                })
                .catch(error => {
                    console.error("Error fetching documents:", error);
                    toast.error('Failed to fetch documents.', {
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

    // update(allDocumentsData)
    // select
 
    // img
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

        // Update specific document data
        updateDocumentData(index, { [name]: value });
    };



    // const handleRemoveEducation = (index) => {
    //     const newForms = educationForms.filter((_, i) => i !== index);
    //     setEducationForms(newForms);
    // };


    const [selectOneOp, setSelectOneOp] = useState()

    const [openIndex, setOpenIndex] = useState(null);

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
    // console.log('&&&&&&', educationForms[educationForms.length - 1].documentType)
    // console.log('setSelectOneOp❗',selectOneOp)
    useEffect(() => {
        setSelectOneOp(educationForms[educationForms.length - 1].documentType)
    }, [educationForms])
    const selectOption = (index, option) => {
        // setOpenIndex(openIndex === index ? null : index); // Toggle open/close
        setOpenIndex(null)
        const documentTypeToRemove = educationForms[index].documentType;
        const updatedSelectedDocuments = selectedDocuments.filter(docType => docType !== documentTypeToRemove);
        setSelectedDocuments([...updatedSelectedDocuments, option]);

        const newForms = [...educationForms];
        newForms[index].documentType = option;
        setEducationForms(newForms);
    };

    const updateDocumentData = (index, newData) => {
        const updatedDocuments = [...allDocumentsData.documents];
        updatedDocuments[index] = {
            ...updatedDocuments[index],
            ...newData,
            document_name: educationForms[index].documentType, // Sync document name
            document_id: educationForms[index].number // Sync document ID
        };

        setAllDocumentsData({ documents: updatedDocuments });
    };


    const handleSubmit = (event) => {
        event.preventDefault();
        // console.log('allDocumentsData', allDocumentsData.documents); // All document data printed here
        onSubmit(allDocumentsData)
    };

    // 


    const documentOptions = ['Aadhaar', 'PAN', 'UAN', 'Other'];

    return (
        <div id="Education_form">
            <form onSubmit={handleSubmit}>
                {/*  */}
                
                {/*  */}
                {educationForms.map((form, index) => (
                    <div key={index} id='form'>
                        <div className='div_heading add_exp'>
                            <h2 id='indexTitile'>Identity Information {index + 1}</h2>
                            {index === 0 ?
                                <div>
                                    {/* {console.log('form.documentType,', form.documentType)} */}
                                    {selectOneOp === '' ? ''
                                        :
                                        <div type="button" onClick={handleAddEducation}>
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
                            {form.documentType === '' && (
                                <>
                                    {console.log('form form: ', form)}
                                    <div className="form-group">
                                        <label> Document Name </label>
                                        <div className="dropdown">
                                            <div className="dropdown-button" ref={employmentTypeButtonRef} onClick={toggleEmploymentType}>
                                                <div>{form.documentType || "Select"}</div>
                                                <span id='toggle_selectIcon'>
                                                    {!isEmploymentTypeOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                                </span>
                                            </div>
                                            <div>
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
                                    </div>

                                    <div className="form-group">
                                        <label>Document Id</label>
                                        <input
                                            type="text"
                                            name="number"
                                            value={form.number}
                                            onChange={(e) => handleChange(index, e)}
                                            placeholder="Document Number"
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
                                            placeholder="Enter Document Number"
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
                                            placeholder="Enter Document Number"
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
                                            placeholder="Enter Document Number"
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
                    <div id='submitBtn' >
                        <div className='div'>
                            <button type="submit" >Update </button>
                            <span><CiCircleChevRight /></span>
                        </div>
                        <div className="lineBar"></div>
                        <div className='x'>
                            <span> <TfiClose /></span>
                        </div>
                    </div>
                    <div className="form">
                        {/* <p>Next Page</p>
                        <span className='not_active'><IoIosArrowDropleft /></span>
                        <button type="button" onClick={nextSumbit}>
                            <IoIosArrowDropright />
                        </button> */}
                    </div>
                </div>
            </form>
        </div>
    );
};

export default DocumentsForm;
