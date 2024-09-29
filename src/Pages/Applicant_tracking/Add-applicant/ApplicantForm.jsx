import { useState } from 'react';
import '../../Employee_onboarding/AddEmployee/AddEmloyee.scss';
import '../../Employee_onboarding/AddEmployee/NavbarForm.scss';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { GrCloudUpload } from "react-icons/gr";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { CountryDropdown, RegionDropdown } from 'react-country-region-selector';
import useLocationData from '../../../Snippet/UseLocationData.jsx';
import { OutsideClick } from '../../Employee_onboarding/AddEmployee/OutsideClick.jsx'

const ApplicantForm = ({ onSubmit }) => {
    const { isOpen: isCountryOpen, ref: countryRef, buttonRef: countryButtonRef, handleToggle: toggleCountry, setIsOpen: setCountryOpen } = OutsideClick();
    const { isOpen: isStateOpen, ref: stateRef, buttonRef: stateButtonRef, handleToggle: toggleState, setIsOpen: setStateOpen } = OutsideClick();
    const { isOpen: isCityOpen, ref: cityRef, buttonRef: cityButtonRef, handleToggle: toggleCity, setIsOpen: setCityOpen } = OutsideClick();
    const { isOpen: isSourceOpen, ref: sourceRef, buttonRef: sourceButtonRef, handleToggle: toggleCSource, setIsOpen: setSourceOpen } = OutsideClick();

    
    const { locationsapi, fetchStates, fetchCities } = useLocationData();
    console.log('locationsapi🌐', locationsapi)

    const [isUploaded, setIsUploaded] = useState(false);
    const [fileName, setFileName] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        contactNumber: '',
        jobOpening: '',
        resume: '',
        coverLetter: '',
        country: '',
        state: '',
        city: '',
        zipCode: '',
        source: '',
        availabilityDate: '',
        expectedSalary: '',
        referredPerson: ''
    });

    console.log('formData', formData)
    const handleFileChange = (event) => {
        const { name, files } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files[0] ? files[0].name : ''
        }));
    };
    const [dropdowns, setDropdowns] = useState({
        department: false
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate if file input is provided
        // if (!formData.resume || !formData.coverLetter) {
        //     alert("Please upload both Resume and Cover Letter");
        //     return;
        // }

        console.log("add-applicant Form Data:", formData);

        // Reset form after submission
        setFormData({
            fullName: '',
            email: '',
            contactNumber: '',
            jobOpening: '',
            resume: '',
            coverLetter: '',
            country: '',
            state: '',
            city: '',
            zipCode: '',
            source: '',
            availabilityDate: '',
            expectedSalary: '',
            referredPerson: ''
        });
    };


    const toggleDropdown = (dropdown) => {
        setDropdowns(prevState => ({
            ...prevState,
            [dropdown]: !prevState[dropdown]
        }));
    };

    const selectOption = (dropdown, value, id) => {
        setFormData(prevState => ({
            ...prevState,
            [dropdown]: value
        }));
        // setDropdowns(prevState => ({
        //     ...prevState,
        //     [dropdown]: false
        // }));

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
        }
        setSourceOpen(false)
        setSearchQuery(''); 
        setCityOpen(false);
        setCountryOpen(false);
        setStateOpen(false);

    };
    const handleSearchQueryChange = (e) => setSearchQuery(e.target.value);

    return (
        <>
            <div className="">
                <form onSubmit={handleSubmit}>
                    <div id='form'>
                        <div className="from1">
                            <div className="form-group">
                                <label className='starred'>Full Name*</label>
                                <input
                                    type="text"
                                    placeholder="Enter Full Name"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className='starred'>Email ID*</label>
                                <input
                                    type="text"
                                    placeholder="Enter Email ID"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className='starred'>Contact Number*</label>
                                <input
                                    type="number"
                                    placeholder="Enter Contact Number"
                                    name="contactNumber"
                                    value={formData.contactNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className='starred'>Job Opening*</label>
                                <input
                                    type="text"
                                    placeholder="Enter Job Opening"
                                    name="jobOpening"
                                    value={formData.jobOpening}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label className='starred'>Resume*</label>
                                <div className="file-upload">
                                    <input
                                        type="file"
                                        name='resume'
                                        id="file"
                                        onChange={handleFileChange}
                                        required
                                    />
                                    <label htmlFor="file" className="custom-file-upload">
                                        {!formData.resume && <GrCloudUpload size={20} />}
                                        <span>{formData.resume || 'Upload Doc'}</span>
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label >Cover Letter</label>
                                <div className="file-upload">
                                    <input
                                        type="file"
                                        name='coverLetter'
                                        id="file"
                                        onChange={handleFileChange}

                                    />
                                    <label htmlFor="file" className="custom-file-upload">
                                        {!formData.coverLetter && <GrCloudUpload size={20} />}
                                        <span>{formData.coverLetter || 'Upload Doc'}</span>
                                    </label>
                                </div>
                            </div>

                            {/* <div className="form-group">
                                <label className='starred'>Country/Region</label>
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
                            </div> */}

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
                                <label>Zip Code</label>
                                <input
                                    type="number"
                                    placeholder="Enter Zip Code"
                                    name="zipCode"
                                    value={formData.zipCode}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="form-group">
                                <label>Source</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" onClick={toggleCSource} ref={sourceButtonRef}>
                                        <div>{formData.department || "Select Department"}</div>
                                        <span id='toggle_selectIcon'> {!dropdowns.department ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                    </div>

                                    {isSourceOpen && (
                                        <div className="dropdown-menu" ref={sourceRef}>
                                            <div className="dropdown-item" onClick={() => selectOption('department', 'Data Analysis')}>Data Analysis</div>
                                            <div className="dropdown-item" onClick={() => selectOption('department', 'Software Architect')}>Software Architect</div>
                                            <div className="dropdown-item" onClick={() => selectOption('department', 'App Developer')}>App Developer</div>
                                            <div className="dropdown-item" onClick={() => selectOption('department', 'Web Developer')}>Web Developer</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Availability Date</label>
                                <input
                                    type="date"
                                    name="availabilityDate"
                                    value={formData.availabilityDate}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="form-group">
                                <label>Expected Salary</label>
                                <input
                                    type="number"
                                    placeholder="Enter Expected Salary"
                                    name="expectedSalary"
                                    value={formData.expectedSalary}
                                    onChange={handleChange}

                                />
                            </div>
                            <div className="form-group">
                                <label>Referred Person</label>
                                <input
                                    type="text"
                                    placeholder="Enter Referred Person"
                                    name="referredPerson"
                                    value={formData.referredPerson}
                                    onChange={handleChange}

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

export default ApplicantForm;
