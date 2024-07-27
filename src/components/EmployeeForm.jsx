// import React from 'react';
import '../styles/EmployeeForm.scss';
import { HiUserPlus } from "react-icons/hi2";

const EmployeeForm = () => {
    return (
        <div className="employee-form">
            <div className="top-bar">
                <h2><span><HiUserPlus/></span>Add Employee</h2>
                {/* <div className="">
                    <span className=""></span>
                    <span className=""></span>
                    <span className=""></span>
                    <span className=""></span>
                </div> */}
            </div>

            <div className="navbar-items">
                <span className='active'>Basic Details</span>
                <span>Contacts</span>
                <span>Experience</span>
                <span>Education</span>
                <span>Documents</span>
            </div>
            <form>
                <div className="form-group">
                    <label>Employee ID</label>
                    <input type="text" placeholder="Enter employee id" required />
                </div>
                <div className="form-group">
                    <label>First Name</label>
                    <input type="text" placeholder="Enter first name" required />
                </div>
                <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" placeholder="Enter last name" required />
                </div>
                <div className="form-group">
                    <label>Email ID</label>
                    <input type="email" placeholder="Enter email id" required />
                </div>
                <div className="form-group">
                    <label>Contact Number</label>
                    <input type="text" placeholder="Enter contact number" required />
                </div>
                <div className="form-group">
                    <label>Date of Birth</label>
                    <input type="date" required />
                </div>
                <div className="form-group">
                    <label>Age</label>
                    <input type="number" placeholder="Enter age" required />
                </div>
                <div className="form-group">
                    <label>Gender</label>
                    <select required>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Department</label>
                    <select required>
                        <option>Management</option>
                        <option>Development</option>
                        <option>HR</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Designation</label>
                    <select required>
                        <option>Administration</option>
                        <option>Developer</option>
                        <option>Manager</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Date of Joining</label>
                    <input type="date" required />
                </div>
                <div className="form-group">
                    <label>Marital Status</label>
                    <select required>
                        <option>Single</option>
                        <option>Married</option>
                        <option>Divorced</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Employee Status</label>
                    <select required>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Upload Profile Picture</label>
                    <input type="file" required />
                </div>
                <div className="form-group">
                    <label>Employment Type</label>
                    <select required>
                        <option>Permanent</option>
                        <option>On Contract</option>
                        <option>Intern</option>
                        <option>Trainee</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Source of Hire</label>
                    <select required>
                        <option>Website</option>
                        <option>Referral</option>
                        <option>Direct</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Reporting Manager</label>
                    <input type="text" placeholder="Enter reporting manager" required />
                </div>
                <div className="form-group">
                    <label>Date of Exit</label>
                    <input type="date" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EmployeeForm;
