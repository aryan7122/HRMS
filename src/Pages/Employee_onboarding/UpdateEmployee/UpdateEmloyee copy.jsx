import { useState, useRef } from 'react';
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
            // image: formData.photo || '',
            contacts: [
                {
                    address_type: "Present",
                    street_1: formData.street1 || '',
                    street_2: formData.street2 || '',
                    zip_code: formData.zipCode || '',
                    city_id: formData.city || '',
                    state_id: formData.state || '',
                    country_id: formData.country || '',
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
                    city_id: formData.permanentCity || '',
                    state_id: formData.permanentState || '',
                    country_id: formData.permanentCountry || '',
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

        if (!validateFormData(formDataApi)) {
            setLoading(false);
            return;
        }
        if (id && token && formDataApi) {
            try {
                // console.log("Request URL: ", url);
                console.log("Request Body: ", formDataApi);

                const response = await axios.post('https://devstronauts.com/public/api/employee/create/update', {
                    id: "15",
        first_name: "rav@",
        last_name: "rav",
        email: "rav@gmail.com",
        mobile_no: "1234567890",
        date_of_birth: "1990-05-15",
        age: "34",
        marital: "Single",
        gender: "Male",
        joining_date: "2020-01-10",
        designation_id: "1",
        department_id: "1",
        reporting_manager: "Jane Smith",
        date_of_exit: "",
        employment_type: "Full-Time",
        employee_status: "Active",
        source_of_hire: "LinkedIn",
        image: "john_doe_image.jpg",
        contacts: [
            {
                address_type: "Present",
                street_1: "alwar",
                street_2: "Apt 4B",
                zip_code: "12345",
                city_id: "5454",
                state_id: "254",
                country_id: "101",
                personal_contact_no: "9876543210",
                emergency_contact_no: "9123456789",
                personal_email_id: "john.doe@personalmail.com",
                is_present_address: "1"
            },
            {
                address_type: "Permanent",
                street_1: "123 Main St",
                street_2: "Apt 4B",
                zip_code: "12345",
                city_id: "5454",
                state_id: "254",
                country_id: "101",
                personal_contact_no: "9876543210",
                emergency_contact_no: "9123456789",
                personal_email_id: "john.doe@personalmail.com",
                is_present_address: "0"
            }
        ],
        experiences: [
            {
                company_name: "",
                industry: "",
                job_title: "",
                duration: "",
                from_date: "",
                to_date: "",
                description: ""
            }
        ],
        educations: [
            {
                institute_name: "XYZ University",
                degree: "Bachelor of Science",
                specialization: "Computer Science",
                attachment: "degree_certificate.pdf",
                date_of_completion: "2017-05-15",
                from_date: "2013-08-01",
                to_date: "2017-05-15"
            }
        ],
        documents: [
            {
                document_name: "a",
                document_id: "",
                attachment_1: "",
                attachment_2: ""
            }
        ]

                }, {
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
                    // navigate('/all-employee-list');
                }, 2300);
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
        };
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
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnHover draggable />
            <div className="employee-form">
                <div className="top-bar">
                    <h2><HiUserPlus /> Update Employee</h2>
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
                    {activeFormIndex === 4 && <DocumentsForm onSubmit={handleFormData} />}
                </div>
            </div>
        </>
    );
};

export default UpdateEmployee;
