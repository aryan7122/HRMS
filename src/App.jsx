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

import '../src/styles/EffectSroll.scss'

import './styles/App.scss';

// 
// import SignUp from './Views/SignUp/SignUp.jsx';
import ForgotPassword from './Views/ForgotPassword/ForgotPassword.jsx';
import SetNewPassword from './Views/ForgotPassword/SetNewPassword.jsx';
import SendOTP from './Views/ForgotPassword/SendOTP.jsx';

import ViewattendenceLogin from './Views/Login/ViewattendenceLogin.jsx'; // Import the new ViewattendenceLogin component
import TrackPerformance from './Views/Login/TrackPerformance.jsx'; // Import the new TrackPerformance component


// 
// import Department from './Pages/Employee_onboarding/EmployeeDetail /Department.jsx'

// 
import AllJobList from './Pages/Recruitment/List_view_all_job/AllJobList.jsx'
import AddNewJob from './Pages/Recruitment/Add Job/AddNewJob.jsx';
import JobDetails from './Pages/Recruitment/Job_details_page/JobDetails.jsx';
import UpdateJob from './Pages/Recruitment/UpdateJob/UpdateJob.jsx';
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

import UpdateEmployeeHealth from './Pages/EmployeeHealth/UpdateEmployeeHealth /UpdateEmployeeHealth.jsx';
// import EditUiDesignation from './Pages/Designation/EditDesignation/EditUiDesignation.jsx';



import { useSelector } from 'react-redux';
import All_leaves_List from './Pages/LeaveManagement/All_leaves_List/All_leaves_List.jsx';
import UpdateEmloyee from './Pages/Employee_onboarding/UpdateEmployee/UpdateEmloyee.jsx';
import Update_applicant from './Pages/Applicant_tracking/Update-applicant/Update_applicant.jsx';

import AddNewLeave from './Pages/LeaveManagement/Add_Leave/AddNewLeave.jsx';
import LeaveDetails from './Pages/LeaveManagement/LeaveDetails/LeaveDetails.jsx';
import UpdateLeave from './Pages/LeaveManagement/Update_Leave/UpdateLeave.jsx';
import All_leaves_List_Type from './Pages/LeaveManagement/All_leaves_List_Type/All_leaves_List_Type.jsx';

import AllShiftsList from './Pages/ShiftManagement/AllShiftsList/AllShiftsList.jsx';
import Shift from './Pages/Shift/Shift.jsx';
import NewShift from './Pages/Shift/NewShift/NewShift.jsx';
import SiftDetails from './Pages/Shift/NewShift/SiftDetail/SiftDetails.jsx';

import HolidayList from './Pages/Holiday/Holiday_List/HolidayList.jsx';
import HolidayDetail from './Pages/Holiday/HolidayDetail/HolidayDetail.jsx';

import Project from './Pages/Project_/Project_List /Project.jsx';
import AddProject from './Pages/Project_/Add_Project/AddProject.jsx';


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
          {/* <Route path="/sign-up" element={<SignUp />} /> */}
          <Route path="/login-attendance" element={<ViewattendenceLogin setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/track-performance' element={<TrackPerformance setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<SendOTP />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />
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
                  <Route path="/employee-details/:id" element={<EmployeeDetails />} />
                  <Route path="/UpdateEmloyee/:id" element={<UpdateEmloyee />} />

                  {/* recruitment */}
                  <Route path="/all-job-list" element={<AllJobList />} />
                  <Route path="/add-job" element={<AddNewJob />} />
                  <Route path="/job-details/:id" element={<JobDetails />} />

                  <Route path="/job-update/:id" element={<UpdateJob />} />

                  {/* {Update_applicant } */}
                  <Route path="/all-applicant-list" element={<All_Applicant_list />} />
                  <Route path="/add-applicant" element={<Add_applicant />} />
                  <Route path="/applicant-details/:id" element={<Applicant_detail />} />
                  <Route path="/update-applicant/:id" element={<Update_applicant />} />

                  {/* {AllAttendanceList } */}
                  <Route path="/all-attendance-list" element={<AllAttendanceList />} />
                  <Route path="/attendance-details/:id" element={<AttendanceDetails />} />
                  {/*  */}
                  <Route path="/department" element={<Department />} />
                  <Route path="/designation" element={<Designation />} />
                  {/* <Route path="/editUidesignation" element={<EditUiDesignation />} /> */}
                  <Route path="/health" element={<EmployeeHealth />} />
                  <Route path="/addemployeehealth" element={<AddEmployeeHealth />} />
                  <Route path="/departmentdetails/:id" element={<DepartmentDetails />} />
                  <Route path="/designationdeatils/:id" element={<DesignationDetails />} />
                  <Route path="/employeehealthdetails/:id" element={<EmployeeHealthDetails />} />
                  <Route path="/update-employee-health/:id" element={<UpdateEmployeeHealth />} />

                  <Route path="/birthday" element={<BirthdayList />} />
                  {/* {All_leaves_List } */}
                  <Route path="/all-leave" element={<All_leaves_List />} />
                  <Route path="/new-leave" element={<AddNewLeave />} />
                  <Route path="/leave-details/:id" element={<LeaveDetails />} />
                  <Route path="/update-leave/:id" element={<UpdateLeave />} />
                  <Route path="/leave-type" element={<All_leaves_List_Type />} />

                  {/* shift */}

                  <Route path="/shifts-list" element={<AllShiftsList />} />
                  <Route path="/shift" element={<Shift />} />
                  <Route path="/new-shift" element={<NewShift />} />
                  <Route path="/shift-details/:id" element={<SiftDetails />} />

                  {/* {HolidayList } */}
                    <Route path="/holiday" element={<HolidayList />} />
                    <Route path="/holiday-details" element={<HolidayDetail />} />
                    {/* {Project } */}
                    <Route path="/project" element={<Project />} />
                    <Route path="/add-project" element={<AddProject />} />

                    



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