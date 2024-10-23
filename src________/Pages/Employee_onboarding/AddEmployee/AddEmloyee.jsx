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
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
const AddEmployee = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
    })
    const prepareFormData = (formData) => {
        return {
            // id: 18,
            first_name: formData.firstName || '',
            last_name: formData.lastName || '',
            email: formData.email || '',
            mobile_no: formData.contactNumber || '',
            date_of_birth: formData.dob || '',
            age: formData.age || '',
            marital: formData.maritalStatus || '',
            gender: formData.gender || '',
            joining_date: formData.doj || '',
            designation_id: formData.designation || '',
            department_id: formData.department || '',
            reporting_manager: formData.reportingManager || '',
            date_of_exit: formData.doe || '',
            employment_type: formData.employmentType || '',
            employee_status: formData.employeeStatus || '',
            source_of_hire: formData.sourceOfHire || '',
            image: formData.attachment || '', //
            experience: formData.employeeId || '',
            contacts: [
                {
                    address_type: "Present",
                    street_1: formData.street1 || '',
                    street_2: formData.street2 || '',
                    zip_code: formData.zipCode || '',
                    city_id: formData.cityId || '',
                    state_id: formData.stateId || '',
                    country_id: formData.countryId || '',
                    personal_contact_no: formData.personalContactNumber || '',
                    emergency_contact_no: formData.emergencyContactNumber || '',
                    personal_email_id: formData.personalEmail || '',
                    is_present_address: "1"
                },
                {
                    address_type: "Permanent",
                    street_1: formData.permanentStreet1 || '',
                    street_2: formData.permanentStreet2 || '',
                    zip_code: formData.permanentZipCode || '',
                    city_id: formData.p_stateId || '',
                    state_id: formData.p_stateId || '',
                    country_id: formData.p_cityId || '',
                    personal_contact_no: formData.permanentPersonalContactNumber || '',
                    emergency_contact_no: formData.permanentEmergencyContactNumber || '',
                    personal_email_id: formData.permanentPersonalEmail || '',
                    is_present_address: "0"
                }
            ],
            experiences: formData.experiences,
            educations: formData.educations,
            documents: formData.documents
        };
    };

    const clonedFormData = JSON.parse(JSON.stringify(formData));
    const token = localStorage.getItem('access_token');
    const formDataApi = prepareFormData({ ...clonedFormData });
    console.log('formDataApi❗', formDataApi)
    console.log('formData❗', formData)

    console.log('clonedFormData', clonedFormData)

    const handleFormData = async (newData) => {
        setFormData((prevData) => ({
            ...prevData,
            ...newData,
        }));

        const formDataApi = prepareFormData({
            ...formData, // Ensure latest form data here
            ...newData,  // Combine with newData
        });

        // console.log('formDataApi❗', JSON.stringify(formDataApi));

        if (!validateFormData(formDataApi)) {
            return;
        }
        if (token && formDataApi) {
            try {
                const response = await axios.post('https://devstronauts.com/public/api/employee/create/update',
                    // JSON.stringify(formDataApi),
                    formDataApi,
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    }
                );

                console.log('response', response)
                if (response.status == 200) {
                    toast.success(response.data.message, {
                        position: "top-right",
                        autoClose: 3000,
                        theme: "light",
                    });

                    if (response.data.message == 'Employee Created Successfully') {
                        setTimeout(() => {
                            navigate('/all-employee-list');
                        }, 2300);
                    }
                }
            } catch (error) {
                console.error("Error message: ", error.message);
                toast.error(error.message || 'Failed sending data to API', {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "light",
                });
            }
        }
    };

    const validateFormData = (formDataApi) => {
        if (!formDataApi.first_name || !formDataApi.email) {
            toast.error('First Name and Email are required!', { position: "top-right", autoClose: 3000 });
            return false;
        }
        if (!formDataApi.contacts.length) {
            toast.error('At least one contact is required.', { position: "top-right", autoClose: 3000 });
            return false;
        }
        return true;
    };

    const formNames = ['Basic Details', 'Contacts', 'Experience', 'Education', 'Documents'];
    const [activeFormIndex, setActiveFormIndex] = useState(0);
    const [filledForms, setFilledForms] = useState({
        'Basic Details': false,
        'Contacts': false,
        'Experience': false,
        'Education': false,
        'Documents': false,
    });

    const handleNext = (newData) => {
        console.log('formDataApi❗', formDataApi)

        setFormData((prevData) => ({
            ...prevData,
            ...newData,
        }));
        const currentForm = formNames[activeFormIndex];
        setFilledForms((prevState) => ({
            ...prevState,
            [currentForm]: true,
        }));
        setActiveFormIndex(activeFormIndex + 1);
    };

    const AllEmp = () => {
        navigate('/all-employee-list');
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />

            <div className="employee-form">
                <div className="top-bar">
                    <h2><HiUserPlus /> Add Employee</h2>
                    <span className="close_nav" onClick={AllEmp}><TfiClose /></span>
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
                    {activeFormIndex === 0 && <BasicDetailsForm onSubmit={handleFormData} next={handleNext} />}
                    {activeFormIndex === 1 && <ContactsForm onSubmit={handleFormData} next={handleNext} />}
                    {activeFormIndex === 2 && <ExperienceForm onSubmit={handleFormData} next={handleNext} />}
                    {activeFormIndex === 3 && <EducationForm onSubmit={handleFormData} next={handleNext} />}
                    {activeFormIndex === 4 && <DocumentsForm onSubmit={handleFormData} next={handleNext} />}
                </div>
            </div>
        </>
    );
};

export default AddEmployee;
