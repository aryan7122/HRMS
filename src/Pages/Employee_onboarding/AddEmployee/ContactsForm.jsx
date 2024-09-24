import { useState, useEffect } from 'react';
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import Select from 'react-select';
import './AddEmloyee.scss';
import './NavbarForm.scss';
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import axios from 'axios';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { OutsideClick } from './OutsideClick.jsx'
import useLocationData from '../../../Snippet/UseLocationData.jsx';

const ContactsForm = ({ onSubmit, next }) => {

    const { isOpen: isCountryOpen, ref: countryRef, buttonRef: countryButtonRef, handleToggle: toggleCountry, setIsOpen: setCountryOpen } = OutsideClick();
    const { isOpen: isStateOpen, ref: stateRef, buttonRef: stateButtonRef, handleToggle: toggleState, setIsOpen: setStateOpen } = OutsideClick();
    const { isOpen: isCityOpen, ref: cityRef, buttonRef: cityButtonRef, handleToggle: toggleCity, setIsOpen: setCityOpen } = OutsideClick();
    const { isOpen: isPermanentCountryOpen, ref: permanentCountryRef, buttonRef: permanentCountryButtonRef, handleToggle: togglePermanentCountry, setIsOpen: setPermanentCountryOpen } = OutsideClick();
    const { isOpen: isPermanentStateOpen, ref: permanentStateRef, buttonRef: permanentStateButtonRef, handleToggle: togglePermanentState, setIsOpen: setPermanentStateOpen } = OutsideClick();
    const { isOpen: isPermanentCityOpen, ref: permanentCityRef, buttonRef: permanentCityButtonRef, handleToggle: togglePermanentCity, setIsOpen: setPermanentCityOpen } = OutsideClick();
    const { locationsapi, fetchStates, fetchCities, loading, error } = useLocationData();

    // console.log('locationsapi🌐', locationsapi.states.map((country) => (country)))
    console.log('locationsapi🌐', locationsapi)

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

    console.log('formData.countryId', formData.countryId)
    console.log('form', formData)

    const EmployeeCreateID = localStorage.getItem('EmployeeCreateID');

    const [sameAsPresent, setSameAsPresent] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

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

    // const selectOption = (dropdown, value, id) => {
    //     setGetapi(!getapi)
    //     setFormData(prevState => ({
    //         ...prevState,
    //         [dropdown]: value // Set the name in formData
    //     }));

    //     // Set the ID separately based on dropdown
    //     if (dropdown === 'country') {
    //         setFormData(prevState => ({
    //             ...prevState,
    //             countryId: id // Save the country ID in a separate field
    //         }));
    //     } else if (dropdown === 'state') {
    //         setFormData(prevState => ({
    //             ...prevState,
    //             stateId: id // Save the state ID in a separate field
    //         }));
    //     } else if (dropdown === 'city') {
    //         setFormData(prevState => ({
    //             ...prevState,
    //             cityId: id // Save the city ID in a separate field
    //         }));
    //     }
    //     else if (dropdown === 'permanentCountry') {
    //         setFormData(prevState => ({
    //             ...prevState,
    //             p_cityId: id // Save the city ID in a separate field
    //         }));
    //     }
    //     else if (dropdown === 'permanentState') {
    //         setFormData(prevState => ({
    //             ...prevState,
    //             p_stateId: id // Save the city ID in a separate field
    //         }));
    //     } else if (dropdown === 'permanentCity') {
    //         setFormData(prevState => ({
    //             ...prevState,
    //             p_cityId: id // Save the city ID in a separate field
    //         }));
    //     }
    //     setSearchQuery('')

    //     // Clear the search input for that dropdown
    //     setPermanentCountryOpen(false);
    //     setPermanentCityOpen(false);
    //     setPermanentStateOpen(false);
    //     setCityOpen(false);
    //     setCountryOpen(false);
    //     setStateOpen(false);
    // };


    // const token = localStorage.getItem('access_token');


    const selectOption = (dropdown, value, id) => {
        setFormData(prevState => ({
            ...prevState,
            [dropdown]: value // Set the name in formData
        }));

        // Set the ID separately based on dropdown
        if (dropdown === 'country') {
            setFormData(prevState => ({
                ...prevState,
                countryId: id // Save the country ID in a separate field
            }));
            fetchStates(id); // Directly fetch states when country is selected
        } else if (dropdown === 'state') {
            setFormData(prevState => ({
                ...prevState,
                stateId: id // Save the state ID in a separate field
            }));
            fetchCities(id); // Directly fetch cities when state is selected
        } else if (dropdown === 'city') {
            setFormData(prevState => ({
                ...prevState,
                cityId: id // Save the city ID in a separate field
            }));
        } else if (dropdown === 'permanentCountry') {
            setFormData(prevState => ({
                ...prevState,
                p_countryId: id // Save the permanent country ID in a separate field
            }));
            fetchStates(id); // Directly fetch states for permanent country
        } else if (dropdown === 'permanentState') {
            setFormData(prevState => ({
                ...prevState,
                p_stateId: id // Save the permanent state ID in a separate field
            }));
            fetchCities(id); // Directly fetch cities for permanent state
        } else if (dropdown === 'permanentCity') {
            setFormData(prevState => ({
                ...prevState,
                p_cityId: id // Save the permanent city ID in a separate field
            }));
        }

        setSearchQuery('');  // Clear the search query after selection

        // Close all dropdowns
        setPermanentCountryOpen(false);
        setPermanentCityOpen(false);
        setPermanentStateOpen(false);
        setCityOpen(false);
        setCountryOpen(false);
        setStateOpen(false);
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
        // console.log('onSubmit', formData)
        next(formData)
    }

    const locations = {
        countries: ['India', 'United States', 'Canada'],
        states: ['Delhi', 'California', 'Ontario'],
        cities: ['New Delhi', 'Los Angeles', 'Toronto']
    };


    // const [searchQuery, setSearchQuery] = useState('');



    const handleSearchQueryChange = (e) => setSearchQuery(e.target.value);


    return (
        <>
            <useLocationData />
            <div className="" onSubmit={handleSubmit}>
                <form >
                    <div id='form'>
                        <div className='div_heading'>
                            <h2>Present Address</h2>
                        </div>
                        <div className="from1">
                            {/* Country Dropdown with Search */}
                            <div className="form-group">
                                <label>Country/Region</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" ref={countryButtonRef} onClick={toggleCountry}>
                                        <div>{formData.country || "Select Country"}</div>
                                        <span>{!isCountryOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                    </div>
                                    {isCountryOpen && (
                                        <div className="dropdown-menu" ref={countryRef}>
                                            <input
                                                type="search"
                                                className="search-input"
                                                placeholder="Search country"
                                                value={searchQuery}
                                                id='searchDepartmentHead'
                                                onChange={handleSearchQueryChange}
                                            />
                                            {locationsapi.countries
                                                .filter(country =>
                                                    country.name.toLowerCase().includes(searchQuery.toLowerCase())
                                                )
                                                .map(country => (
                                                    <div
                                                        className="dropdown-item"
                                                        onClick={() => selectOption('country', country.name, country.id)} // Pass name and id
                                                        key={country.id}
                                                    >
                                                        {country.name}
                                                    </div>
                                                ))}


                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* State Dropdown with Search */}
                            <div className="form-group">
                                <label>State</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" ref={stateButtonRef} onClick={toggleState}>
                                        <div>{formData.state || "Select State"}</div>
                                        <span>{!isStateOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                    </div>
                                    {isStateOpen && locationsapi.states && (
                                        <div className="dropdown-menu" ref={stateRef}>
                                            <input
                                                type="search"
                                                className="search-input"
                                                placeholder="Search state"
                                                value={searchQuery}
                                                id='searchDepartmentHead'
                                                onChange={handleSearchQueryChange}
                                            />

                                            {locationsapi.states
                                                .filter(state =>
                                                    state.name.toLowerCase().includes(searchQuery.toLowerCase())
                                                ).map(state => (
                                                    <div className="dropdown-item" onClick={() => selectOption('state', state.name, state.id)} key={state.id}>
                                                        {state.name}
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* City Dropdown with Search */}
                            <div className="form-group">
                                <label>City</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" ref={cityButtonRef} onClick={toggleCity}>
                                        <div>{formData.city || "Enter City"}</div>
                                        <span>{!isCityOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                    </div>
                                    {isCityOpen && locationsapi.cities && (
                                        <div className="dropdown-menu" ref={cityRef}>
                                            <input
                                                type="search"
                                                className="search-input"
                                                placeholder="Search city"
                                                value={searchQuery}
                                                id='searchDepartmentHead'
                                                onChange={handleSearchQueryChange}
                                            />
                                            {locationsapi.cities
                                                .filter(city =>
                                                    city.name.toLowerCase().includes(searchQuery.toLowerCase())
                                                ).map(city => (
                                                    <div className="dropdown-item" onClick={() => selectOption('city', city.name, city.id)} key={city.id}>
                                                        {city.name}
                                                    </div>
                                                ))}

                                        </div>
                                    )}
                                </div>
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

                            {/*  */}
                            {/* Country Dropdown with Search */}
                            {/* Country Dropdown with Search */}
                            <div className="form-group">
                                <label>Country/Region</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" ref={permanentCountryButtonRef} onClick={togglePermanentCountry}>
                                        <div>{formData.permanentCountry || "Select Country"}</div>
                                        <span>{!isPermanentCountryOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                    </div>
                                    {isPermanentCountryOpen && locationsapi.countries && (
                                        <div className="dropdown-menu" ref={permanentCountryRef}>
                                            <input
                                                type="search"
                                                className="search-input"
                                                placeholder="Search country"
                                                value={searchQuery}
                                                id='searchDepartmentHead'
                                                onChange={handleSearchQueryChange}
                                            />

                                            {locationsapi.countries
                                                .filter(country =>
                                                    country.name.toLowerCase().includes(searchQuery.toLowerCase())
                                                )
                                                .map(country => (
                                                    <div
                                                        className="dropdown-item"
                                                        onClick={() => selectOption('permanentCountry', country.name, country.id)} // Pass name and id
                                                        key={country.id}
                                                    >
                                                        {country.name}
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* State Dropdown with Search */}
                            {/* State Dropdown with Search */}
                            <div className="form-group">
                                <label>State</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" ref={permanentStateButtonRef} onClick={togglePermanentState}>
                                        <div>{formData.permanentState || "Select State"}</div>
                                        <span>{!isPermanentStateOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                    </div>
                                    {isPermanentStateOpen && locationsapi.states && (
                                        <div className="dropdown-menu" ref={permanentStateRef}>
                                            <input
                                                type="search"
                                                className="search-input"
                                                placeholder="Search state"
                                                value={searchQuery}
                                                id='searchDepartmentHead'
                                                onChange={handleSearchQueryChange}
                                            />

                                            {locationsapi.states
                                                .filter(state =>
                                                    state.name.toLowerCase().includes(searchQuery.toLowerCase())
                                                ).map(state => (
                                                    <div className="dropdown-item" onClick={() => selectOption('permanentState', state.name, state.id)} key={state.id}>
                                                        {state.name}
                                                    </div>
                                                ))}

                                        </div>
                                    )}
                                </div>
                            </div>


                            {/* City Dropdown with Search */}
                            {/* City Dropdown with Search */}
                            <div className="form-group">
                                <label>City</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" ref={permanentCityButtonRef} onClick={togglePermanentCity}>
                                        <div>{formData.permanentCity || "Enter City"}</div>
                                        <span>{!isPermanentCityOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                    </div>
                                    {isPermanentCityOpen && locationsapi.cities && (
                                        <div className="dropdown-menu" ref={permanentCityRef}>
                                            <input
                                                type="search"
                                                className="search-input"
                                                placeholder="Search city"
                                                value={searchQuery}
                                                id='searchDepartmentHead'
                                                onChange={handleSearchQueryChange}
                                            />

                                            {locationsapi.cities
                                                .filter(city =>
                                                    city.name.toLowerCase().includes(searchQuery.toLowerCase())
                                                ).map(city => (
                                                    <div className="dropdown-item" onClick={() => selectOption('permanentCity', city.name, city.id)} key={city.id}>
                                                        {city.name}
                                                    </div>
                                                ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/*  */}

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
