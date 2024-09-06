import { useState, useEffect } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Select from 'react-select';
import './AddEmloyee.scss';
import './NavbarForm.scss';
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const ContactsForm = ({ onSubmit }) => {
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
    }, [sameAsPresent, formData]);

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

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);

        // Handle form submission
        // Show success message or alert if needed
        setShowAlert(true);
        setTimeout(() => {
            setShowAlert(false);
        }, 4300);

        // Reset form fields
        setFormData({
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
        setSameAsPresent(false);
    };

    return (
        <>
            <div className="" onSubmit={onSubmit}>
                <form onSubmit={handleSubmit}>
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
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <RegionDropdown
                                    country={formData.country}
                                    value={formData.state}
                                    onChange={(val) => setFormData(prevState => ({ ...prevState, state: val }))}
                                    required
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
                                    required
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
                                    required
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
                                    required
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
                                    required
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
                                    required
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
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    <div id='form'>
                        <div className='div_heading'>
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
                                    required={!sameAsPresent}
                                    disabled={sameAsPresent}
                                />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <RegionDropdown
                                    country={formData.permanentCountry}
                                    value={formData.permanentState}
                                    onChange={(val) => setFormData(prevState => ({ ...prevState, permanentState: val }))}
                                    required={!sameAsPresent}
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
                                    required={!sameAsPresent}
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
                                    required={!sameAsPresent}
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
                                    required={!sameAsPresent}
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
                                    required={!sameAsPresent}
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
                                    required={!sameAsPresent}
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
                                    required={!sameAsPresent}
                                    disabled={sameAsPresent}
                                />
                            </div>
                        </div>
                    </div>

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
        </>
    );
};

export default ContactsForm;
