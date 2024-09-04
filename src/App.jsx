import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './styles/App.scss';
import _404 from './components/_404.jsx';
import Login from './Views/Login/Login.jsx';
{/* dashboard & Profile Page */ }
import AdminDashboard from './Pages/Dashboard_and_Profile/ AdminDashboard/AdminDashboard.jsx';
import AdminProfile from './Pages/Dashboard_and_Profile/AdminProfile/AdminProfile.jsx';
import EmployeeDashboard from './Pages/Dashboard_and_Profile/EmployeeDashboard/EmployeeDashboard.jsx';
{/* {Employee onboarding } */ }
import AllEmployeeList from './Pages/Employee_onboarding/AllEmployeeList/AllEmployeeList.jsx';
import AddEmloyee from './Pages/Employee_onboarding/AddEmployee/AddEmloyee.jsx';
import EmployeeDetails from './Pages/Employee_onboarding/EmployeeDetail /EmployeeDetails.jsx';


import './styles/App.scss';

// 
// import Department from './Pages/Employee_onboarding/EmployeeDetail /Department.jsx'

// 
import AllJobList from './Pages/Recruitment/List_view_all_job/AllJobList.jsx'
import AddNewJob from './Pages/Recruitment/Add Job/AddNewJob.jsx';
import JobDetails from './Pages/Recruitment/Job_details_page/JobDetails.jsx';
import EmployeeProfile from './Pages/Dashboard_and_Profile/EmployeeProfile/EmployeeProfile.jsx';

// All_Applicant
import All_Applicant_list from './Pages/Applicant_tracking/All_Applicant_list.jsx';
import Applicant_detail from './Pages/Applicant_tracking/Applicant_detail/Applicant_detail.jsx';
import Add_applicant from './Pages/Applicant_tracking/Add-applicant/Add_applicant.jsx';

import AllAttendanceList from './Pages/Attedance_tracking/AllAttendanceList.jsx'
import AttendanceDetails from './Pages/Attedance_tracking/AttendanceDetails/AttendanceDetails.jsx';

// 
import Department from './Pages/Department/DepartmentList/Department.jsx';
import Designation from './Pages/Designation/DesignationList/Designation.jsx';
import EmployeeHealth from './Pages/EmployeeHealth/EmployeeHealthList/EmployeeHealth.jsx'
import AddEmployeeHealth from './Pages/EmployeeHealth/AddEmployeeHealth/AddEmployeeHealth.jsx';
import BirthdayList from './Pages/Birthday/BirthdayList/BirthdayList.jsx';
import DepartmentDetails from './Pages/Department/DepartmentDetails/DepartmentDetails.jsx';
import DesignationDetails from './Pages/Designation/DesignationDetail/DesignationDetails.jsx';
import EmployeeHealthDetails from './Pages/EmployeeHealth/EmployeeHealthDetails/EmployeeHealthDetails.jsx';

// import EditUiDesignation from './Pages/Designation/EditDesignation/EditUiDesignation.jsx';



import { useSelector } from 'react-redux';


const App = () => {
  const liHover = useSelector((state) => state.user.liHover);
  const sidebarW = useSelector((state) => state.user.sidebarW);

  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => JSON.parse(localStorage.getItem('isLoggedIn')) || false
  );

  useEffect(() => {
    localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      {!isLoggedIn ? (
        // {/* <Login setIsLoggedIn={setIsLoggedIn} /> */ }
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          {/* <Route path="/sign-up" element={<SignUp />} />
          <Route path="/login-attendance" element={<ViewattendenceLogin setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/track-performance' element={<TrackPerformance setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<SendOTP />} />
          <Route path="/set-new-password" element={<SetNewPassword />} /> */}
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          {/* nav bar */}
          <div id="app_">
            <div className='NavBar'>
              <Navbar setIsLoggedIn={setIsLoggedIn} />
            </div>
            <div className="app">
              {/* side bar */}
                <div className={` ${sidebarW ? 'sideBar_app2' : 'sideBar_app'} ${liHover ? 'expanded' : ''} `}>
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
              </div>
              <div className="content">
                <Routes>
                  {/* 404 page */}
                  {/* dashboard & Profile Page */}
                  <Route path="/admin-dashboard" element={<AdminDashboard />}></Route>
                  <Route path="/" element={<AdminDashboard />}></Route>

                  <Route path='/*' element={<_404 />} />
                  <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                  {/* {Employee onboarding } */}
                  <Route path="/admin-profile" element={<AdminProfile />} />
                  <Route path="/Employee-profile" element={<EmployeeProfile />} />
                  <Route path="/all-employee-list" element={<AllEmployeeList />} />
                  <Route path="/add-employee" element={<AddEmloyee />} />
                  <Route path="/employee-details" element={<EmployeeDetails />} />
                  {/* recruitment */}
                  <Route path="/all-job-list" element={<AllJobList />} />
                  <Route path="/add-job" element={<AddNewJob />} />
                  <Route path="/job-details" element={<JobDetails />} />
                  {/* { } */}
                  <Route path="/all-applicant-list" element={<All_Applicant_list />} />
                  <Route path="/add-applicant" element={<Add_applicant />} />
                  <Route path="/applicant-details" element={<Applicant_detail />} />
                  {/* {AllAttendanceList } */}
                  <Route path="/all-attendance-list" element={<AllAttendanceList />} />
                  <Route path="/attendance-details" element={<AttendanceDetails />} />
                  {/*  */}
                  <Route path="/department" element={<Department />} />
                  <Route path="/designation" element={<Designation />} />
                  {/* <Route path="/editUidesignation" element={<EditUiDesignation />} /> */}
                  <Route path="/health" element={<EmployeeHealth />} />
                  <Route path="/addemployeehealth" element={<AddEmployeeHealth />} />
                  <Route path="/departmentdetails" element={<DepartmentDetails />} />
                  <Route path="/designationdeatils" element={<DesignationDetails />} />
                  <Route path="/employeehealthdetails" element={<EmployeeHealthDetails />} />
                  <Route path="/birthday" element={<BirthdayList />} />


                </Routes>


              </div>
            </div>
          </div>
        </>
      )
      }
    </Router>
  );
};

export default App;