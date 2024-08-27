import { useState } from 'react';
import './AddEmloyee.scss';
import { HiUserPlus } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import Confetti from 'react-confetti';
import BasicDetailsForm from './BasicDetailsForm';
import ContactsForm from './ContactsForm.jsx';
import ExperienceForm from './ExperienceForm.jsx';
import EducationForm from './EducationForm.jsx';
import DocumentsForm from './DocumentsForm.jsx';

const AddEmloyee = () => {

    const [formData, setFormData] = useState({
        employeeId: '',
        firstName: '',
        lastName: '',
        photo: '',
        dob: '',
        age: '',
        gender: '',
        email: '',
        contactNumber: '',
        reportingManager: '',
        department: '',
        designation: '',
        doj: '',
        maritalStatus: '',
        doe: '',
        employmentType: '',
        employeeStatus: '',
        sourceOfHire: ''
    });

    const [showAlert, setShowAlert] = useState(false);
    const formNames = ['Basic Details', 'Contacts', 'Experience', 'Education', 'Documents'];
    const [activeFormIndex, setActiveFormIndex] = useState(0);
    const [filledForms, setFilledForms] = useState({
        'Basic Details': false,
        'Contacts': false,
        'Experience': false,
        'Education': false,
        'Documents': false,
    });

   
    const handleSubmit = (event) => {
        event.preventDefault();
        const currentForm = formNames[activeFormIndex];

        setFilledForms((prevState) => ({
            ...prevState,
            [currentForm]: true,
        }));

        if (activeFormIndex < formNames.length - 1) {
            setActiveFormIndex(activeFormIndex + 1);
        }

        event.preventDefault();
        console.log(formData);
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 4300);
    };


    return (
        <>
            {showAlert ? <div><Confetti /> <div id='showAlert'><p>Form Submit Successfully</p></div> </div> : ''}
            <div className="employee-form">
                <div className="top-bar">
                    <h2><div className='span'><HiUserPlus /></div>Add Employee</h2>
                    <span className="close_nav"><TfiClose /></span>
                    <div className="">
                        <span className="1"></span>
                        <span className="2"></span>
                        <span className="3"></span>
                        <span className="4"></span>
                        <span className="5"></span>
                        <span className="6"></span>
                        <span className="7"></span>
                        <span className="8"></span>
                        <span className="9"></span>
                        <span className="10"></span>
                    </div>
                </div>

                <div className="navbar-items">
                    {formNames.map((formName, index) => (
                        <span
                            key={formName}
                            className={`${index === activeFormIndex ? 'active' : ''} ${filledForms[formName] ? 'filled' : ''}`}
                            onClick={() => setActiveFormIndex(index)}
                        >
                            {formName}
                        </span>
                    ))}
                </div>

                <div className="form-content">
                    {activeFormIndex === 0 && (
                        <BasicDetailsForm onSubmit={handleSubmit} />
                    )}
                    {activeFormIndex === 1 && (
                        <ContactsForm onSubmit={handleSubmit} />
                    )}
                    {activeFormIndex === 2 && (
                        <ExperienceForm onSubmit={handleSubmit} />
                    )}
                    {activeFormIndex === 3 && (
                        <EducationForm onSubmit={handleSubmit} />
                    )}
                    {activeFormIndex === 4 && (
                        <DocumentsForm onSubmit={handleSubmit} />
                    )}
                </div>
            </div>
        </>
    );
};

export default AddEmloyee;
