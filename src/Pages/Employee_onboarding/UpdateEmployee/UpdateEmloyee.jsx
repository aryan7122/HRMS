import { useState, useRef, useEffect } from 'react';
import './UpdateEmloyee.scss';
import { HiUserPlus } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import BasicDetailsForm from './BasicDetailsForm.jsx';
import ContactsForm from './ContactsForm.jsx';
import ExperienceForm from './ExperienceForm.jsx';
import EducationForm from './EducationForm.jsx';
import DocumentsForm from './DocumentsForm.jsx';

const UpdateEmployee = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);
    const formDataRef = useRef(formData); // useRef for storing latest form data
    const token = localStorage.getItem('access_token');

    const prepareFormData = (formData) => {
        return {
            id: id,
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
            image: formData.photo || '',
            contacts: [
                {
                    address_type: "Present",
                    street_1: formData.street1 || '',
                    street_2: formData.street2 || '',
                    zip_code: formData.zipCode || '',
                    city_id: formData.cityId || '',
                    state_id: formData.stateId || '',
                    country_id: formData.countryId || '',
                    personal_contact_no: formData.personalContactNo || '',
                    emergency_contact_no: formData.emergencyContactNumber || '',
                    personal_email_id: formData.personalEmailId || '',
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


    const updateFill = (newData) => {
        const updatedData = { ...formDataRef.current, ...newData }; // Update ref
        setFormData(updatedData); // Update state
        formDataRef.current = updatedData; // Keep ref in sync

    };

    const handleNext = (newData) => {
        const updatedData = { ...formDataRef.current, ...newData }; // Update ref
        setFormData(updatedData); // Update state
        formDataRef.current = updatedData; // Keep ref in sync
        // 
        const currentForm = formNames[activeFormIndex];
        setFilledForms((prevState) => ({
            ...prevState,
            [currentForm]: true,
        }));
        setActiveFormIndex(activeFormIndex + 1);

    };

    const handleFormData = async (newData) => {
        const updatedData = { ...formDataRef.current, ...newData };
        setFormData(updatedData);
        formDataRef.current = updatedData;

        const formDataApi = prepareFormData(updatedData);
        // console.log('formDataApi❗', formDataApi);

        setLoading(true);

        // if (!validateFormData(formDataApi)) {
        //     setLoading(false);
        //     return;
        // }
        if (id && token && formDataApi) {
            try {
                // console.log("Request URL: ", url);
                console.log("Request Body: ", formDataApi);

                const response = await axios.post('https://devstronauts.com/public/api/employee/create/update',
                    formDataApi
                    , {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });

                // if (response.data && response.data.success) {
                toast.success(response.data.message || 'Employee updated successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "light",
                });

                setTimeout(() => {
                    navigate(`/employee-details/${id}`)
                }, 2300);
                // if (response.data.message == 'Employee updated successfully!'){
                // }

            } catch (error) {
                console.error("Error message: ", error.message);
                toast.error('Failed sending data to API', {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "light",
                });
            } finally {
                setLoading(false);
            }
        }
    }
    const validateFormData = (formDataApi) => {
        if (!formDataApi.first_name || formDataApi.first_name.trim() === '') {
            toast.error('First Name is required!', { position: "top-right", autoClose: 3000 });
            return false;
        }
        if (!formDataApi.email || formDataApi.email.trim() === '') {
            toast.error('Email is required!', { position: "top-right", autoClose: 3000 });
            return false;
        }
        if (!formDataApi.contacts || formDataApi.contacts.length === 0) {
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

    const AllEmp = () => {
        navigate('/all-employee-list');
    };

    return (
        <>
            {/* {loading && <div className="loader">Loading...</div>} */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnHover draggable />

            <div className="employee-form">
                <div className="top-bar">
                    <h2><HiUserPlus /> Update Employee</h2>
                    <span className="close_nav" onClick={() => navigate(`/employee-details/${id}`)}><TfiClose /></span>
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
                    {activeFormIndex === 0 && <BasicDetailsForm onSubmit={handleFormData} next={handleNext} update={updateFill} />}
                    {activeFormIndex === 1 && <ContactsForm onSubmit={handleFormData} next={handleNext} update={updateFill} />}
                    {activeFormIndex === 2 && <ExperienceForm onSubmit={handleFormData} next={handleNext} update={updateFill} />}
                    {activeFormIndex === 3 && <EducationForm onSubmit={handleFormData} next={handleNext} update={updateFill} />}
                    {activeFormIndex === 4 && <DocumentsForm onSubmit={handleFormData} update={updateFill} />}
                </div>
            </div>
        </>
    );
};

export default UpdateEmployee;
