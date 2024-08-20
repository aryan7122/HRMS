import { useState } from 'react';
import './AddEmloyee.scss';
import './NavbarForm.scss';
import { CiCircleChevRight } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { GrCloudUpload } from "react-icons/gr";
import {  IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

const BasicDetailsForm = ({ onSubmit }) => {
    const [fileName, setFileName] = useState('');
    const [isUploaded, setIsUploaded] = useState(false);

    const [formData, setFormData] = useState({
        employeeId: '',
        firstName: '',
        lastName: '',
        photo: '',
        dob: '',
        age: '',
        gender: '',
        email: '',
        contactNumber: '',
        reportingManager: '',
        department: '',
        designation: '',
        doj: '',
        maritalStatus: '',
        doe: '',
        employmentType: '',
        employeeStatus: '',
        sourceOfHire: ''
    });

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            setIsUploaded(true);
            setFormData(prevState => ({
                ...prevState,
                photo: file
            }));
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();


        event.preventDefault();
        console.log(formData);
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 4300);

        setFormData({
            employeeId: '',
            firstName: '',
            lastName: '',
            dob: '',
            age: '',
            gender: '',
            email: '',
            contactNumber: '',
            reportingManager: '',
            department: '',
            designation: '',
            doj: '',
            photo: '',
            maritalStatus: '',
            doe: '',
            employmentType: '',
            employeeStatus: '',
            sourceOfHire: ''
        });
    };

    return (
        <>
            <div className="" onSubmit={onSubmit}>
                {/* <form >
                    <button type="submit">next </button>
                </form> */}
                <form onSubmit={handleSubmit}>
                    <div className="from1">
                        <div className="form-group">
                            <label>Employee ID</label>
                            <input
                                type="text"
                                placeholder="Enter employee id"
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                placeholder="Enter first name"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                placeholder="Enter last name"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Date of Birth</label>
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Age</label>
                            <input
                                type="number"
                                placeholder="Enter age"
                                name="age"
                                value={formData.age}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Gender</label>
                            <select
                                name="gender"
                                value={formData.gender}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Email ID</label>
                            <input
                                type="email"
                                placeholder="Enter email id"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Contact Number</label>
                            <input
                                type="text"
                                placeholder="Enter contact number"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Reporting Manager</label>
                            <select
                                name="reportingManager"
                                value={formData.reportingManager}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select manager</option>
                                <option value="Johan Smith">Johan Smith</option>
                                <option value="Ram Jain">Ram Jain</option>
                                <option value="Yas Pall">Yas Pall</option>
                                <option value="Deepak Ji">Deepak Ji</option>
                            </select>
                        </div>
                    </div>

                    <div className="from1">
                        <div className="form-group">
                            <label>Department</label>
                            <select
                                name="department"
                                value={formData.department}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select department</option>
                                <option value="Management">Management</option>
                                <option value="Development">Development</option>
                                <option value="HR">HR</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Designation</label>
                            <select
                                name="designation"
                                value={formData.designation}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select designation</option>
                                <option value="Administration">Administration</option>
                                <option value="Developer">Developer</option>
                                <option value="Manager">Manager</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Date of Joining</label>
                            <input
                                type="date"
                                name="doj"
                                value={formData.doj}
                                onChange={handleChange}
                                required
                            />
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
                                    {!isUploaded && <GrCloudUpload className="upload-icon" />}
                                    {isUploaded ? fileName : 'Upload Photo'}
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Marital Status</label>
                            <select
                                name="maritalStatus"
                                value={formData.maritalStatus}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select status</option>
                                <option value="Single">Single</option>
                                <option value="Married">Married</option>
                                <option value="Divorced">Divorced</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Date of Exit</label>
                            <input
                                type="date"
                                name="doe"
                                value={formData.doe}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group">
                            <label>Employment Type</label>
                            <select
                                name="employmentType"
                                value={formData.employmentType}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select employment type</option>
                                <option value="Permanent">Permanent</option>
                                <option value="Contractual">Contractual</option>
                                <option value="Internship">Internship</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Employee Status</label>
                            <select
                                name="employeeStatus"
                                value={formData.employeeStatus}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                                <option value="On Leave">On Leave</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Source of Hire</label>
                            <select
                                name="sourceOfHire"
                                value={formData.sourceOfHire}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select source</option>
                                <option value="Naukri.com">Naukri.com</option>
                                <option value="LinkedIn">LinkedIn</option>
                                <option value="Indeed">Indeed</option>
                            </select>
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
                            <span className='not_active'><IoIosArrowDropleft/></span>
                            <button type='submit'><IoIosArrowDropright/></button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default BasicDetailsForm;