import { useState, useEffect } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Select from 'react-select';
import './UpdateEmloyee.scss';
import './NavbarForm.scss';
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from 'react-router-dom';

const ContactsForm = ({ onSubmit, next }) => {
    const [formData, setFormData] = useState({
        country: '',
        state: '',
        city: '',
        street1: '',
        street2: '',
        zipCode: '',
        personalContactNumber: '',
        emergencyContactNumber: '',
        personalEmail: '',
        permanentCountry: '',
        permanentState: '',
        permanentCity: '',
        permanentStreet1: '',
        permanentStreet2: '',
        permanentZipCode: '',
        permanentPersonalContactNumber: '',
        permanentEmergencyContactNumber: '',
        permanentPersonalEmail: ''
    });

    // const EmployeeCreateID = localStorage.getItem('EmployeeCreateID');
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
                    const data = response.data.result;

                    // Present और Permanent address contact data
                    const presentAddress = data.contacts.find(contact => contact.address_type === "Present") || {};
                    const permanentAddress = data.contacts.find(contact => contact.address_type === "Permanent") || {};
                    console.log('presentAddress', permanentAddress)
                    setFormData({
                        // Present Address Data
                        country: presentAddress.country_id || '',
                        state: presentAddress.state_id || '',
                        city: presentAddress.city_id || '',
                        street1: presentAddress.street_1 || '',
                        street2: presentAddress.street_2 || '',
                        zipCode: presentAddress.zip_code || '',
                        personalContactNumber: presentAddress.personal_contact_no || '',
                        emergencyContactNumber: presentAddress.emergency_contact_no || '',
                        personalEmail: presentAddress.personal_email_id || '',

                        // Permanent Address Data
                        permanentCountry: permanentAddress.country_id || '',
                        permanentState: permanentAddress.state_id || '',
                        permanentCity: permanentAddress.city_id || '',
                        permanentStreet1: permanentAddress.street_1 || '',
                        permanentStreet2: permanentAddress.street_2 || '',
                        permanentZipCode: permanentAddress.zip_code || '',
                        permanentPersonalContactNumber: permanentAddress.personal_contact_no || '',
                        permanentEmergencyContactNumber: permanentAddress.emergency_contact_no || '',
                        permanentPersonalEmail: permanentAddress.personal_email_id || ''
                    });
                    console.log('Employee details fetched successfully:', data);
                })
                .catch(error => {
                    console.error("Error fetching employee details:", error);
                    toast.error('Failed to fetch employee details.', {
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

    const [sameAsPresent, setSameAsPresent] = useState(false);

    useEffect(() => {
        if (sameAsPresent) {
            setFormData(prevState => ({
                ...prevState,
                permanentCountry: prevState.country,
                permanentState: prevState.state,
                permanentCity: prevState.city,
                permanentStreet1: prevState.street1,
                permanentStreet2: prevState.street2,
                permanentZipCode: prevState.zipCode,
                permanentPersonalContactNumber: prevState.personalContactNumber,
                permanentEmergencyContactNumber: prevState.emergencyContactNumber,
                permanentPersonalEmail: prevState.personalEmail
            }));
        }
    }, [sameAsPresent]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCityChange = (selectedOption, field) => {
        setFormData(prevState => ({
            ...prevState,
            [field]: selectedOption.value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        event.preventDefault();
        console.log('contact form', formData)
        onSubmit(formData)

        setSameAsPresent(false);
    };
    const nextSumbit = (event) => {
        event.preventDefault();
        console.log('onSubmit', formData)
        next(formData)
    }


    return (
        <>
            <div className="" onSubmit={handleSubmit}>
                <form >
                    <div id='form'>
                        <div className='div_heading'>
                            <h2>Present Address</h2>
                        </div>
                        <div className="from1">
                            <div className="form-group">
                                <label>Country/Region</label>
                                <CountryDropdown
                                    value={formData.country}
                                    onChange={(val) => setFormData(prevState => ({ ...prevState, country: val }))}

                                />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <RegionDropdown
                                    country={formData.country}
                                    value={formData.state}
                                    onChange={(val) => setFormData(prevState => ({ ...prevState, state: val }))}

                                />
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    placeholder="Enter City"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="form-group">
                                <label>Street 1</label>
                                <input
                                    type="text"
                                    placeholder="Enter street 1"
                                    name="street1"
                                    value={formData.street1}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="form-group">
                                <label>Street 2</label>
                                <input
                                    type="text"
                                    placeholder="Enter street 2"
                                    name="street2"
                                    value={formData.street2}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="form-group">
                                <label>Zip Code</label>
                                <input
                                    type="text"
                                    placeholder="Enter zip code"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="form-group">
                                <label>Personal Contact Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter personal contact number"
                                    name="personalContactNumber"
                                    value={formData.personalContactNumber}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="form-group">
                                <label>Emergency Contact Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter emergency contact number"
                                    name="emergencyContactNumber"
                                    value={formData.emergencyContactNumber}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="form-group">
                                <label>Personal Email ID</label>
                                <input
                                    type="email"
                                    placeholder="Enter personal email ID"
                                    name="personalEmail"
                                    value={formData.personalEmail}
                                    onChange={handleChange}

                                />
                            </div>
                        </div>
                    </div>

                    <div id='form'>
                        <div className='div_heading' id='div_headingBit'>
                            <h2>Permanent Address</h2>
                            <div className='SameAddress'>
                                <input
                                    type="checkbox"
                                    checked={sameAsPresent}
                                    onChange={() => setSameAsPresent(prev => !prev)}
                                />
                                <p>Same as present address</p>
                            </div>
                        </div>
                        <div className="from1">
                            <div className="form-group">
                                <label>Country/Region</label>
                                <CountryDropdown
                                    value={formData.permanentCountry}
                                    onChange={(val) => setFormData(prevState => ({ ...prevState, permanentCountry: val }))}
                                    // required={!sameAsPresent}
                                    disabled={sameAsPresent}
                                />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <RegionDropdown
                                    country={formData.permanentCountry}
                                    value={formData.permanentState}
                                    onChange={(val) => setFormData(prevState => ({ ...prevState, permanentState: val }))}
                                    // required={!sameAsPresent}
                                    disabled={sameAsPresent}
                                />
                            </div>
                            <div className="form-group">
                                <label>City</label>
                                <input
                                    type="text"
                                    placeholder="Enter City"
                                    name="permanentCity"
                                    value={formData.permanentCity}
                                    onChange={handleChange}
                                    // required={!sameAsPresent}
                                    disabled={sameAsPresent}
                                />
                            </div>
                            <div className="form-group">
                                <label>Street 1</label>
                                <input
                                    type="text"
                                    placeholder="Enter street 1"
                                    name="permanentStreet1"
                                    value={formData.permanentStreet1}
                                    onChange={handleChange}
                                    // required={!sameAsPresent}
                                    disabled={sameAsPresent}
                                />
                            </div>
                            <div className="form-group">
                                <label>Street 2</label>
                                <input
                                    type="text"
                                    placeholder="Enter street 2"
                                    name="permanentStreet2"
                                    value={formData.permanentStreet2}
                                    onChange={handleChange}
                                    disabled={sameAsPresent}
                                />
                            </div>
                            <div className="form-group">
                                <label>Zip Code</label>
                                <input
                                    type="text"
                                    placeholder="Enter zip code"
                                    name="permanentZipCode"
                                    value={formData.permanentZipCode}
                                    onChange={handleChange}
                                    // required={!sameAsPresent}
                                    disabled={sameAsPresent}
                                />
                            </div>
                            <div className="form-group">
                                <label>Personal Contact Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter personal contact number"
                                    name="permanentPersonalContactNumber"
                                    value={formData.permanentPersonalContactNumber}
                                    onChange={handleChange}
                                    // required={!sameAsPresent}
                                    disabled={sameAsPresent}
                                />
                            </div>
                            <div className="form-group">
                                <label>Emergency Contact Number</label>
                                <input
                                    type="text"
                                    placeholder="Enter emergency contact number"
                                    name="permanentEmergencyContactNumber"
                                    value={formData.permanentEmergencyContactNumber}
                                    onChange={handleChange}
                                    // required={!sameAsPresent}
                                    disabled={sameAsPresent}
                                />
                            </div>
                            <div className="form-group">
                                <label>Personal Email ID</label>
                                <input
                                    type="email"
                                    placeholder="Enter personal email ID"
                                    name="permanentPersonalEmail"
                                    value={formData.permanentPersonalEmail}
                                    onChange={handleChange}
                                    // required={!sameAsPresent}
                                    disabled={sameAsPresent}
                                />
                            </div>
                        </div>
                    </div>

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
                            <p>Next Page</p>
                            <span className='not_active'><IoIosArrowDropleft /></span>
                            <button type="button" onClick={nextSumbit}>
                                <IoIosArrowDropright />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ContactsForm;
