import { useState } from 'react';
import '../../Employee_onboarding/AddEmployee/AddEmloyee.scss';
import '../../Employee_onboarding/AddEmployee/NavbarForm.scss';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { GrCloudUpload } from "react-icons/gr";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const JobForm = ({ onSubmit }) => {
    const [formData, setFormData] = useState({
        jobTitle: '',
        designation: '',
        department: '',
        jobLocation: [],
        jobStatus: '',
        noOfPositions: '',
        employmentType: '',
        experience: '',
        requiredSkills: '',
        description: ''
    });

    const [dropdowns, setDropdowns] = useState({
        designation: false,
        department: false,
        jobStatus: false,
        employmentType: false,
        experience: false,
        requiredSkills: false
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleCheckboxChange = (event) => {
        const { value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            jobLocation: [value]
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        setFormData({
            jobTitle: '',
            designation: '',
            department: '',
            jobLocation: [],
            jobStatus: '',
            noOfPositions: '',
            employmentType: '',
            experience: '',
            requiredSkills: '',
            description: ''
        });
    };

    const toggleDropdown = (dropdown) => {
        // Reset all dropdowns to false, then toggle the selected one
        setDropdowns({
            designation: false,
            department: false,
            jobStatus: false,
            employmentType: false,
            experience: false,
            requiredSkills: false,
            [dropdown]: !dropdowns[dropdown]
        });
    };

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
                    <div id='form'>
                        <div className="from1">
                            <div className="form-group">
                                <label className='starred'>Job Title*</label>
                                <input
                                    type="text"
                                    placeholder="Enter Job title"
                                    name="jobTitle"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Designation Dropdown */}
                            <div className="form-group">
                                <label className='starred'>Designation*</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" onClick={() => toggleDropdown('designation')}>
                                        <div>{formData.designation || "Select Designation"}</div>
                                        <span id='toggle_selectIcon'> {!dropdowns.designation ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                    </div>

                                    {dropdowns.designation && (
                                        <div className="dropdown-menu">
                                            <div className="dropdown-item" onClick={() => selectOption('designation', 'Chief Technology Officer (CTO)')}>Chief Technology Officer (CTO)</div>
                                            <div className="dropdown-item" onClick={() => selectOption('designation', 'Chief Information Officer (CIO)')}>Chief Information Officer (CIO)</div>
                                            <div className="dropdown-item" onClick={() => selectOption('designation', 'Manager')}>Manager</div>
                                            <div className="dropdown-item" onClick={() => selectOption('designation', 'HR')}>HR</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Department Dropdown */}
                            <div className="form-group">
                                <label className='starred'>Department*</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" onClick={() => toggleDropdown('department')}>
                                        <div>{formData.department || "Select Department"}</div>
                                        <span id='toggle_selectIcon'> {!dropdowns.department ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                    </div>

                                    {dropdowns.department && (
                                        <div className="dropdown-menu">
                                            <div className="dropdown-item" onClick={() => selectOption('department', 'Data Analysis')}>Data Analysis</div>
                                            <div className="dropdown-item" onClick={() => selectOption('department', 'Software Architect')}>Software Architect</div>
                                            <div className="dropdown-item" onClick={() => selectOption('department', 'App Developer')}>App Developer</div>
                                            <div className="dropdown-item" onClick={() => selectOption('department', 'Web Developer')}>Web Developer</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Job Location Checkboxes */}
                            <div className="form-group" >
                                <label>Job Location*</label>
                                <div id='checkbox' className='checkbox'>
                                    <div className='checkboxDivJob'>
                                        <input
                                            type="checkbox"
                                            value="In Office"
                                            name="JobLocation"
                                            checked={formData.jobLocation.includes("In Office")}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className='checkboxLable'> In Office </label>
                                    </div>
                                    <div className='checkboxDivJob'>
                                        <input
                                            type="checkbox"
                                            value="Hybrid"
                                            name='JobLocation'
                                            checked={formData.jobLocation.includes("Hybrid")}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className='checkboxLable'> Hybrid</label>
                                    </div>
                                    <div className='checkboxDivJob'>
                                        <input
                                            type="checkbox"
                                            value="Remote"
                                            name="JobLocation"
                                            checked={formData.jobLocation.includes("Remote")}
                                            onChange={handleCheckboxChange}
                                        />
                                        <label className='checkboxLable' > Remote</label>
                                    </div>
                                </div>
                            </div>

                            {/* Job Status Dropdown */}
                            <div className="form-group">
                                <label>Job Status*</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" onClick={() => toggleDropdown('jobStatus')}>
                                        <div>{formData.jobStatus || "Select Job Status"}</div>
                                        <span id='toggle_selectIcon'> {!dropdowns.jobStatus ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                    </div>

                                    {dropdowns.jobStatus && (
                                        <div className="dropdown-menu">
                                            <div className="dropdown-item" onClick={() => selectOption('jobStatus', 'Open')}>Open</div>
                                            <div className="dropdown-item" onClick={() => selectOption('jobStatus', 'Draft')}>Draft</div>
                                            <div className="dropdown-item" onClick={() => selectOption('jobStatus', 'Filled')}>Filled</div>
                                            <div className="dropdown-item" onClick={() => selectOption('jobStatus', 'Cancelled')}>Cancelled</div>
                                            <div className="dropdown-item" onClick={() => selectOption('jobStatus', 'On Hold')}>On Hold</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>No. of Positions*</label>
                                <input
                                    type="number"
                                    placeholder="Enter No. of Positions"
                                    name="noOfPositions"
                                    value={formData.noOfPositions}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            {/* Employment Type Dropdown */}
                            <div className="form-group">
                                <label>Employment Type*</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" onClick={() => toggleDropdown('employmentType')}>
                                        <div>{formData.employmentType || "Select Employment Type"}</div>
                                        <span id='toggle_selectIcon'> {!dropdowns.employmentType ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                    </div>

                                    {dropdowns.employmentType && (
                                        <div className="dropdown-menu">
                                            <div className="dropdown-item" onClick={() => selectOption('employmentType', 'Full-time')}>Full-time</div>
                                            <div className="dropdown-item" onClick={() => selectOption('employmentType', 'Part-time')}>Part-time</div>
                                            <div className="dropdown-item" onClick={() => selectOption('employmentType', 'Contract')}>Contract</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Experience*</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" onClick={() => toggleDropdown('experience')}>
                                        <div>{formData.experience || "Select Experience"}</div>
                                        <span id='toggle_selectIcon'> {!dropdowns.experience ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                    </div>

                                    {dropdowns.experience && (
                                        <div className="dropdown-menu">
                                            <div className="dropdown-item" onClick={() => selectOption('experience', 'Fresher')}>Fresher</div>
                                            <div className="dropdown-item" onClick={() => selectOption('experience', 'Experienced')}>Experienced</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Required Skills*</label>
                                <div className="dropdown">
                                    <div className="dropdown-button" onClick={() => toggleDropdown('requiredSkills')}>
                                        <div>{formData.requiredSkills || "Select Required Skills"}</div>
                                        <span id='toggle_selectIcon'> {!dropdowns.requiredSkills ? <IoIosArrowDown /> : <IoIosArrowUp />} </span>
                                    </div>

                                    {dropdowns.requiredSkills && (
                                        <div className="dropdown-menu">
                                            <div className="dropdown-item" onClick={() => selectOption('requiredSkills', 'Communication Skills')}>Communication Skills</div>
                                            <div className="dropdown-item" onClick={() => selectOption('requiredSkills', 'Software Development')}>Software Development</div>
                                            <div className="dropdown-item" onClick={() => selectOption('requiredSkills', 'Leadership Skills')}>Leadership Skills</div>
                                            <div className="dropdown-item" onClick={() => selectOption('requiredSkills', 'Team Collaboration')}>Team Collaboration</div>
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                            <div id='Description' className='DescriptionJob'>
                                <div className="form-group">
                                    <label>Description*</label>
                                    <textarea
                                        placeholder="Enter Description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
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

export default JobForm;
