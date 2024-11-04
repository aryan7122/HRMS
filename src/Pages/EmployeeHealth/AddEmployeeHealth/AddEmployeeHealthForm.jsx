import { useState, useEffect } from 'react';
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
import axios from 'axios';
import DatePicker from '../../../utils/Form/DatePicker';

import './AddEmployeeHealthForm.scss'; // Update with the correct path if necessary
import { OutsideClick } from '../../Employee_onboarding/AddEmployee/OutsideClick'
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { MultiImageUpload } from '../../../components/MultiImageUpload';

const AddEmployeeHealthForm = ({ onSubmit }) => {
    const { isOpen: isDepartmentOpen, ref: departmentRef, buttonRef: departmentButtonRef, handleToggle: toggleDepartment, setIsOpen: setDepartmentOpen } = OutsideClick();
    const { isOpen: isGenderOpen, ref: genderRef, buttonRef: genderButtonRef, handleToggle: toggleGender, setIsOpen: setGenderOpen } = OutsideClick();
    const { isOpen: isBloodGroupOpen, ref: bloodGroupRef, buttonRef: bloodGroupButtonRef, handleToggle: toggleBloodGroup, setIsOpen: setBloodGroupOpen } = OutsideClick();
    const { isOpen: isHealthCheckResultsOpen, ref: healthCheckResultsRef, buttonRef: healthCheckResultsButtonRef, handleToggle: toggleHealthCheckResults, setIsOpen: setHealthCheckResultsOpen } = OutsideClick();
    const { isOpen: isCOVIDAffectedOpen, ref: COVIDAffectedRef, buttonRef: COVIDAffectedButtonRef, handleToggle: toggleCOVIDAffected, setIsOpen: setCOVIDAffectedOpen } = OutsideClick();
    const { isOpen: isVaccinationStatusOpen, ref: VaccinationStatusRef, buttonRef: VaccinationStatusButtonRef, handleToggle: toggleVaccinationStatus, setIsOpen: setVaccinationStatusOpen } = OutsideClick();
    const { isOpen: isEmployeeNameOpen, ref: EmployeeNameRef, buttonRef: EmployeeNameButtonRef, handleToggle: toggleEmployeeName, setIsOpen: setEmployeeNameOpen } = OutsideClick();




    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);
    // filter
    const [searchQueryDepartment, setSearchQueryDepartment] = useState('');
    const [searchQueryBloodGroup, setSearchQueryBloodGroup] = useState('');
    const [searchQueryHealthCheckResults, setSearchQueryHealthCheckResults] = useState('');
    const [searchQueryEmployeeName, setSearchQueryEmployeeName] = useState('');
    const token = localStorage.getItem('access_token');

    const [loading, setLoading] = useState(true);

    // filter
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
        attachment: [],
        user_id: '',
        notes: ''
    });
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [totalDays, setTotalDays] = useState(null);

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };
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
                attachment: file
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
    const handleChange2 = (event) => {
        const { name, value } = event.target;

        if (name === 'weight') {
            // Validate weight for numbers and floating-point
            const weightRegex = /^-?\d*\.?\d*$/;
            if (weightRegex.test(value) || value === '') {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        } else if (name === 'height') {
            // Validate height for integers only
            const heightRegex = /^-?\d*\.?\d*$/;
            if (heightRegex.test(value) || value === '') {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        }
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = {
            user_id: formData.user_id, // user_id from formData
            employee_name: formData.employeeName, // employee name
            department_head: formData.department, // department head id
            gender: formData.gender, // gender
            mobile_no: formData.mobileNumber, // mobile number
            contact_name: formData.emergencyContactName, // emergency contact name
            blood_group: formData.bloodGroup, // blood group
            weight: formData.weight, // weight
            height: formData.height, // height
            allergies: formData.allergies, // allergies
            chronic_condition: formData.chronicConditions, // chronic condition
            current_medications: formData.currentMedications, // medications
            last_checkup_date: formData.lastHealthCheckupDate, // last checkup date
            next_checkup_date: formData.nextHealthCheckupDate, // next checkup date
            checkup_result: formData.healthCheckResults, // health checkup result
            covid_affected: formData.covidAffected, // covid affected
            covid_status: formData.covidVaccinationStatus, // covid status
            notes: formData.notes, // additional notes
            attachment: formData.attachment // attachment, e.g., a file
        };

        // Make the POST request
        axios.post('https://hrms.dragnilifecare.in/public/api/employee/health/create/update', payload, {
            headers: {
                'Authorization': `Bearer ${token}`, // If needed, provide the token here
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                toast.success(response.data.message, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                console.log('Success:', response);
                // Handle success response (e.g., show a success message)
                // Reset form fields
                if (response.status === 200) {

                    // setFormData({
                    //     employeeName: '',
                    //     emergencyContactNumber: '',
                    //     emergencyContactName: '',
                    //     bloodGroup: '',
                    //     weight: '',
                    //     height: '',
                    //     allergies: '',
                    //     chronicConditions: '',
                    //     currentMedications: '',
                    //     lastHealthCheckupDate: '',
                    //     nextHealthCheckupDate: '',
                    //     healthCheckResults: '',
                    //     covidAffected: '',
                    //     covidVaccinationStatus: '',
                    //     attachment: [],
                    //     notes: '',
                    //     user_id: ''
                    // });
                    // navigator('/health')
                }
                // setFileName('');
                // setIsUploaded(false);
            })
            .catch(error => {
                console.error('Error:', error);
                // Handle error response (e.g., show an error message)
                toast.error(error.message || 'Error during create', {
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

        // Handle form data submission

    };
    console.log('formData', formData);

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

        if (dropdown === 'employeeName') {
            // Full name ko store karo aur user_id ko bhi alag se store karo
            setFormData(prevState => ({
                ...prevState,
                employeeName: `${value.first_name} ${value.last_name}`, // Full name
                user_id: value.user_id // user_id ko alag se store karo
            }));
        }

        setGenderOpen(false)
        setDepartmentOpen(false)
        setBloodGroupOpen(false)
        setHealthCheckResultsOpen(false)
        setCOVIDAffectedOpen(false)
        setVaccinationStatusOpen(false)
        setEmployeeNameOpen(false)
    };

    // filter
    const handleSearchQueryChangeDepartment = (e) => setSearchQueryDepartment(e.target.value);
    const handleSearchQueryChangeBloodGroup = (e) => setSearchQueryBloodGroup(e.target.value);
    const handleSearchQueryChangeEmployeeName = (e) => setSearchQueryEmployeeName(e.target.value);

    // const handleSearchQueryChangeHealthCheckResults = (e) => setSearchQueryHealthCheckResults(e.target.value);

    // filter

    // api emp list
    const [departmentHead, setDepartmentHead] = useState([]);
    // console.log('departmentHead❗',)

    useEffect(() => {
        if (departmentHead.length > 0) {
            return
        }
        axios.post('https://hrms.dragnilifecare.in/public/api/employee/list', {
        }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                const employees = response.data.result;

                // Department heads ko extract karo
                // const EmpName = employees.map(emp => `${emp.first_name} ${emp.last_name}`); // Full name bana rahe hain
                // const EmpID = employees.map(emp => `${emp.user_id} `); // Full name bana rahe hain
                setDepartmentHead(employees); // Department heads ko store kar rahe hain
                // setDepartmentHead(EmpID)
                console.log('❗', EmpID);

                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data: ", error);
                setLoading(false);
            });
    }, []);

    // api emp list

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="error"
            />
            <div className="" onSubmit={onSubmit}>
                <form onSubmit={handleSubmit}>
                    <div className="from1">
                        <h3 className='titleForm_h3'>Personal Information</h3>
                        <div></div>
                        <div></div>
                        {/* <div className="form-group">
                            <label className='starred'>Employee Name*</label>
                            <div className="dropdown">
                                <div className="dropdown-button" ref={EmployeeNameButtonRef} onClick={toggleEmployeeName}>
                                    <div className='divselect'>{formData.employeeName || "Select department head"}</div>
                                    <span id="toggle_selectIcon"> {!isEmployeeNameOpen ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                </div>
                                {isEmployeeNameOpen && (
                                    <div className="dropdown-menu" ref={EmployeeNameRef}>
                                        <input
                                            type="search"
                                            className="search22"
                                            placeholder="Search head of Department"
                                            value={searchQueryEmployeeName}
                                            id="searchDepartmentHead"
                                            onChange={handleSearchQueryChangeEmployeeName}
                                        />
                                        <div className="dropdown_I">
                                            {departmentHead.filter(option =>
                                                option.toLowerCase().includes(searchQueryEmployeeName.toLowerCase())
                                            ).map(option => (
                                                <div className="dropdown-item" onClick={() => selectOption('employeeName', option.first_name)} key={option.user_id}>
                                                    {option.first_name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                        </div> */}
                        <div className="form-group">
                            <label className='starred'>Employee Name*</label>
                            <div className="dropdown">
                                <div className="dropdown-button" ref={EmployeeNameButtonRef} onClick={toggleEmployeeName}>
                                    <div className='divselect'>{formData.employeeName || "Select Employee Name"}</div>
                                    <span id="toggle_selectIcon">
                                        {!isEmployeeNameOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                    </span>
                                </div>
                                {isEmployeeNameOpen && (
                                    <div className="dropdown-menu" ref={EmployeeNameRef}>
                                        <input
                                            type="search"
                                            className="search22"
                                            placeholder="Search Employee Name"
                                            value={searchQueryEmployeeName}
                                            id="searchDepartmentHead"
                                            onChange={handleSearchQueryChangeEmployeeName}
                                        />
                                        <div className="dropdown_I">
                                            {departmentHead.filter(option =>
                                                (`${option.first_name} ${option.last_name}`).toLowerCase().includes(searchQueryEmployeeName.toLowerCase())
                                            ).map(option => (
                                                <div
                                                    className="dropdown-item"
                                                    onClick={() => selectOption('employeeName', option)}
                                                    key={option.user_id}
                                                >
                                                    {option.first_name} {option.last_name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Department Dropdown */}
                        <div className="form-group">
                            <label>Department</label>
                            <div className="dropdown">
                                <div className="dropdown-button" ref={departmentButtonRef} onClick={toggleDepartment}>
                                    <div>{formData.department || "Select department"}</div>
                                    <span id='toggle_selectIcon'> {!isDepartmentOpen ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                </div>
                                {isDepartmentOpen && (
                                    <div className="dropdown-menu" ref={departmentRef}>
                                        <input
                                            type="search"
                                            className='search22'
                                            placeholder="Search department"
                                            value={searchQueryDepartment}
                                            id='searchDepartmentHead'
                                            onChange={handleSearchQueryChangeDepartment}
                                        />
                                        <div className="dropdown_I">
                                            {['Management', 'Sales', 'HR', 'IT'].filter(option =>
                                                option.toLowerCase().includes(searchQueryDepartment.toLowerCase())
                                            ).map(option => (
                                                <div className="dropdown-item" onClick={() => selectOption('department', option)} key={option}>
                                                    {option}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {/* Gender Dropdown */}
                        <div className="form-group">
                            <label>Gender</label>
                            <div className="dropdown">
                                <div className="dropdown-button" ref={genderButtonRef} onClick={toggleGender}>
                                    <div>{formData.gender || "Select gender"}</div>
                                    <span id='toggle_selectIcon'>{!isGenderOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</span>
                                </div>

                                {isGenderOpen && (
                                    <div className="dropdown-menu" ref={genderRef}>
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

                            />
                        </div>
                    </div>
                    <div id='form'>


                        <div className="from1 form2">
                            <h3 className='titleForm_h3'>Health Information</h3>
                            <div></div>
                            <div></div>
                            {/* Department Dropdown */}
                            <div className="form-group">
                                <label className='starred'>Blood Group</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" onClick={toggleBloodGroup} ref={bloodGroupButtonRef}>
                                        <div>{formData.bloodGroup || "Select Blood Group"}</div>
                                        <span id='toggle_selectIcon'>
                                            {!dropdowns.bloodGroup ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                        </span>
                                    </div>
                                    {isBloodGroupOpen && (
                                        <div className="dropdown-menu" ref={bloodGroupRef}>

                                            <input
                                                type="search"
                                                className='search22'
                                                placeholder="Search Blood Group"
                                                value={searchQueryBloodGroup}
                                                id='searchDepartmentHead'
                                                onChange={handleSearchQueryChangeBloodGroup}
                                            />
                                            <div className="dropdown_I">
                                                {['A+', 'A-', 'B+', ' B-', 'O+', 'O-', 'AB+', 'AB-'].filter(option =>
                                                    option.toLowerCase().includes(searchQueryBloodGroup.toLowerCase())
                                                ).map(option => (
                                                    <div className="dropdown-item" onClick={() => selectOption('bloodGroup', option)} key={option}>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Weight</label>
                                <input
                                    type="text"
                                    placeholder="Enter Weight"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange2}
                                    className='weight-input'
                                />
                                <span className="unit-label">kg</span>
                            </div>
                            <div className="form-group">
                                <label>Height</label>
                                <input
                                    type="text"
                                    placeholder="Enter Height"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange2}
                                    className='weight-input'

                                />
                                <span className="unit-label">cm</span>

                            </div>
                            <div className="form-group">
                                <label>Allergies</label>
                                <input
                                    type="text"
                                    placeholder="Enter Allergies"
                                    name="allergies"
                                    className='In_inputRightTitle'

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

                            <DatePicker label="Last Health Checkup Date" onDateChange={handleStartDateChange} />
                            <DatePicker label="Next Scheduled Check-Up Date" onDateChange={handleEndDateChange} />
                            <div className="form-group">
                                <label>Health Check Results</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" onClick={toggleHealthCheckResults} ref={healthCheckResultsButtonRef}>
                                        <div>{formData.healthCheckResults || "Select Results"}</div>
                                        <span id='toggle_selectIcon'>
                                            {!dropdowns.healthCheckResults ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                        </span>
                                    </div>
                                    {isHealthCheckResultsOpen && (
                                        <div className="dropdown-menu" ref={healthCheckResultsRef}>
                                            {/* <div className="dropdown-item" onClick={() => selectOption('healthCheckResults', 'Normal')}>Normal</div>
                                        <div className="dropdown-item" onClick={() => selectOption('healthCheckResults', 'Requires Attention')}>Requires Attention</div> */}
                                            {/* <input
                                            type="search"
                                            className='search22'
                                            placeholder="Search department"
                                            value={searchQueryHealthCheckResults}
                                            id='searchDepartmentHead'
                                            onChange={handleSearchQueryChangeHealthCheckResults}
                                        /> */}
                                            <div className="dropdown_I">
                                                {['Healthy', 'UnHealthy'].filter(option =>
                                                    option.toLowerCase().includes(searchQueryHealthCheckResults.toLowerCase())
                                                ).map(option => (
                                                    <div className="dropdown-item" onClick={() => selectOption('healthCheckResults', option)} key={option}>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="form-group">
                                <label className='starred'>COVID Affected*</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" onClick={toggleCOVIDAffected} ref={COVIDAffectedButtonRef}>
                                        <div>{formData.covidAffected || "Select Status"}</div>
                                        <span id='toggle_selectIcon'>
                                            {!dropdowns.covidAffected ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                        </span>
                                    </div>
                                    {isCOVIDAffectedOpen && (
                                        <div className="dropdown-menu" ref={COVIDAffectedRef}>
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
                                    <div className="dropdown-button" onClick={toggleVaccinationStatus} ref={VaccinationStatusButtonRef}>
                                        <div>{formData.covidVaccinationStatus || "Select Status"}</div>
                                        <span id='toggle_selectIcon'>
                                            {!dropdowns.covidVaccinationStatus ? <IoIosArrowDown /> : <IoIosArrowUp />}
                                        </span>
                                    </div>
                                    {isVaccinationStatusOpen && (
                                        <div className="dropdown-menu" ref={VaccinationStatusRef}>
                                            <div className="dropdown-item" onClick={() => selectOption('covidVaccinationStatus', 'Fully Vaccinated')}>Fully Vaccinated</div>
                                            <div className="dropdown-item" onClick={() => selectOption('covidVaccinationStatus', 'Partially Vaccinated')}>Partially Vaccinated</div>
                                            <div className="dropdown-item" onClick={() => selectOption('covidVaccinationStatus', 'Not Vaccinated')}>Not Vaccinated</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {/* <div className="form-group">
                            <label>Attachment</label>
                            <div className="file-upload">
                                <input
                                    type="file"
                                    name='photo'
                                    // accept="image/*"
                                    id="file"
                                    onChange={handleFileChange}
                                // required
                                />
                                <label htmlFor="file" className="custom-file-upload">
                                    {!isUploaded && <GrCloudUpload size={20} />}
                                    <span>{isUploaded ? fileName : 'Attachment'}</span>
                                </label>
                            </div>
                        </div> */}
                            <div className="form-group">
                                <MultiImageUpload
                                    formData={formData}
                                    setFormData={setFormData}
                                />
                            </div>
                        </div>
                        <div id='Description' className='DescriptionJob'>
                            <div className="form-group">
                                <label>Notes</label>
                                <textarea
                                    placeholder="Enter Notes"
                                    name="notes"
                                    value={formData.notes}
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
export default AddEmployeeHealthForm;