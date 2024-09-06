import { useState } from 'react';
// import '../../Employee_onboarding/AddEmployee/AddEmloyee.scss';
import '../../Employee_onboarding/AddEmployee/NavbarForm.scss';
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { GrCloudUpload } from "react-icons/gr";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import './AddEmployeeHealthForm.scss'
// import { useState } from 'react';
import '../../Employee_onboarding/AddEmployee/NavbarForm.scss';
// import { GrCloudUpload } from "react-icons/gr";
// import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
// import { CiCircleChevRight } from 'react-icons/ci'; // Ensure you have this icon

import './AddEmployeeHealthForm.scss'; // Update with the correct path if necessary

const AddEmployeeHealthForm = ({ onSubmit }) => {
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);

    const [formData, setFormData] = useState({
        employeeName: '',
        emergencyContactNumber: '',
        emergencyContactName: '',
        bloodGroup: '',
        weight: '',
        height: '',
        allergies: '',
        chronicConditions: '',
        currentMedications: '',
        lastHealthCheckupDate: '',
        nextHealthCheckupDate: '',
        healthCheckResults: '',
        covidAffected: '',
        covidVaccinationStatus: '',
        profilePicture: '',
    });

    const [dropdowns, setDropdowns] = useState({
        bloodGroup: false,
        healthCheckResults: false,
        covidAffected: false,
        covidVaccinationStatus: false
    });

    // Handle file change event
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setIsUploaded(true);
            setFormData(prevState => ({
                ...prevState,
                profilePicture: file
            }));
        }
    };

    // Handle input field changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form data submission
        console.log(formData);
        // Reset form fields
        setFormData({
            employeeName: '',
            emergencyContactNumber: '',
            emergencyContactName: '',
            bloodGroup: '',
            weight: '',
            height: '',
            allergies: '',
            chronicConditions: '',
            currentMedications: '',
            lastHealthCheckupDate: '',
            nextHealthCheckupDate: '',
            healthCheckResults: '',
            covidAffected: '',
            covidVaccinationStatus: '',
            profilePicture: ''
        });
        setFileName('');
        setIsUploaded(false);
    };

    const toggleDropdown = (dropdown) => {
        // setDropdowns(prevState => ({
        //     ...prevState,
        //     [dropdown]: !prevState[dropdown]
        // }));
        setDropdowns({
            bloodGroup: false,
            healthCheckResults: false,
            covidAffected: false,
            covidVaccinationStatus: false,
            [dropdown]: !dropdowns[dropdown]

        });
    };

    // Select option from dropdown
    const selectOption = (dropdown, value) => {
        setFormData(prevState => ({
            ...prevState,
            [dropdown]: value
        }));
        setDropdowns(prevState => ({
            ...prevState,
            [dropdown]: false
        }));
    };

    return (
        <>
            <div className="" onSubmit={onSubmit}>
                <form onSubmit={handleSubmit}>
                    <div className="from1">
                        <h3 className='titleForm_h3'>Personal Information</h3>
                        <div></div>
                        <div></div>
                        <div className="form-group">
                            <label className='starred'>Employee Name*</label>
                            <input
                                type="text"
                                placeholder="Enter Employee Name"
                                name="employeeName"
                                value={formData.employeeName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Department</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('department')}>
                                    <div>{formData.department || "Select department"}</div>
                                    <span id='toggle_selectIcon'> {!dropdowns.department ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>

                                </div>
                                {dropdowns.department && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('department', 'Management')}>Management</div>
                                        <div className="dropdown-item" onClick={() => selectOption('department', 'Development')}>Development</div>
                                        <div className="dropdown-item" onClick={() => selectOption('department', 'HR')}>HR</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('gender')}>
                                    <div>{formData.gender || "Select gender"}  </div>
                                    <span id='toggle_selectIcon'> {!dropdowns.gender ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                </div>

                                {dropdowns.gender && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('gender', 'Male')}>Male</div>
                                        <div className="dropdown-item" onClick={() => selectOption('gender', 'Female')}>Female</div>
                                        <div className="dropdown-item" onClick={() => selectOption('gender', 'Other')}>Other</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Emergency Contact Number</label>
                            <input
                                type="text"
                                placeholder="Enter Emergency Contact Number"
                                name="emergencyContactNumber"
                                value={formData.emergencyContactNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Emergency Contact Name</label>
                            <input
                                type="text"
                                placeholder="Enter Emergency Contact Name"
                                name="emergencyContactName"
                                value={formData.emergencyContactName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div className="from1 form2">
                        <h3 className='titleForm_h3'>Health Information</h3>
                        <div></div>
                        <div></div>
                        {/* Department Dropdown */}
                        <div className="form-group">
                            <label className='starred'>Blood Group*</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('bloodGroup')}>
                                    <div>{formData.bloodGroup || "Select Blood Group"}</div>
                                    <span id='toggle_selectIcon'>
                                        {!dropdowns.bloodGroup ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                    </span>
                                </div>
                                {dropdowns.bloodGroup && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('bloodGroup', 'A+')}>A+</div>
                                        <div className="dropdown-item" onClick={() => selectOption('bloodGroup', 'B+')}>B+</div>
                                        <div className="dropdown-item" onClick={() => selectOption('bloodGroup', 'O+')}>O+</div>
                                        {/* Add other blood groups as needed */}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Weight</label>
                            <input
                                type="number"
                                placeholder="Enter Weight"
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </div>
                        <div className="form-group">
                            <label>Height</label>
                            <input
                                type="number"
                                placeholder="Enter Height"
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                required
                                min="0"
                            />
                        </div>
                        <div className="form-group">
                            <label>Allergies</label>
                            <input
                                type="text"
                                placeholder="Enter Allergies"
                                name="allergies"
                                value={formData.allergies}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Chronic Conditions</label>
                            <input
                                type="text"
                                placeholder="Enter Chronic Conditions"
                                name="chronicConditions"
                                value={formData.chronicConditions}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Current Medications</label>
                            <input
                                type="text"
                                placeholder="Enter Current Medications"
                                name="currentMedications"
                                value={formData.currentMedications}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Health Checkup Date</label>
                            <input
                                type="date"
                                name="lastHealthCheckupDate"
                                value={formData.lastHealthCheckupDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Next Scheduled Check-Up Date</label>
                            <input
                                type="date"
                                name="nextHealthCheckupDate"
                                value={formData.nextHealthCheckupDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Health Check Results</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('healthCheckResults')}>
                                    <div>{formData.healthCheckResults || "Select Results"}</div>
                                    <span id='toggle_selectIcon'>
                                        {!dropdowns.healthCheckResults ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                    </span>
                                </div>
                                {dropdowns.healthCheckResults && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('healthCheckResults', 'Normal')}>Normal</div>
                                        <div className="dropdown-item" onClick={() => selectOption('healthCheckResults', 'Requires Attention')}>Requires Attention</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className='starred'>COVID Affected*</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('covidAffected')}>
                                    <div>{formData.covidAffected || "Select Status"}</div>
                                    <span id='toggle_selectIcon'>
                                        {!dropdowns.covidAffected ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                    </span>
                                </div>
                                {dropdowns.covidAffected && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('covidAffected', 'Yes')}>Yes</div>
                                        <div className="dropdown-item" onClick={() => selectOption('covidAffected', 'No')}>No</div>
                                        <div className="dropdown-item" onClick={() => selectOption('covidAffected', 'Not Sure')}>Not Sure</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label className='starred'>COVID Vaccination Status*</label>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={() => toggleDropdown('covidVaccinationStatus')}>
                                    <div>{formData.covidVaccinationStatus || "Select Status"}</div>
                                    <span id='toggle_selectIcon'>
                                        {!dropdowns.covidVaccinationStatus ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                    </span>
                                </div>
                                {dropdowns.covidVaccinationStatus && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('covidVaccinationStatus', 'Fully Vaccinated')}>Fully Vaccinated</div>
                                        <div className="dropdown-item" onClick={() => selectOption('covidVaccinationStatus', 'Partially Vaccinated')}>Partially Vaccinated</div>
                                        <div className="dropdown-item" onClick={() => selectOption('covidVaccinationStatus', 'Not Vaccinated')}>Not Vaccinated</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Upload Profile Picture</label>
                            <div className="file-upload">
                                <input
                                    type="file"
                                    name='photo'
                                    accept="image/*"
                                    id="file"
                                    onChange={handleFileChange}
                                    required
                                />
                                <label htmlFor="file" className="custom-file-upload">
                                    {!isUploaded && <GrCloudUpload size={20} />}
                                    <span>{isUploaded ? fileName : 'Upload photo'}</span>
                                </label>
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
export default AddEmployeeHealthForm;

// 