import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './styles/App.scss';
import _404 from './components/_404.jsx';
import Login from './Views/Login/Login.jsx';

{/* Dashboard & Profile Page Imports */ }

import AdminDashboard from './Pages/Dashboard_and_Profile/ AdminDashboard/AdminDashboard.jsx';
import AdminProfile from './Pages/Dashboard_and_Profile/AdminProfile/AdminProfile.jsx';
import EmployeeDashboard from './Pages/Dashboard_and_Profile/EmployeeDashboard/EmployeeDashboard.jsx';
import EmployeeProfile from './Pages/Dashboard_and_Profile/EmployeeProfile/EmployeeProfile.jsx';

{/* Employee Onboarding Imports */ }
import AllEmployeeList from './Pages/Employee_onboarding/AllEmployeeList/AllEmployeeList.jsx';
import AddEmloyee from './Pages/Employee_onboarding/AddEmployee/AddEmloyee.jsx';
import EmployeeDetails from './Pages/Employee_onboarding/EmployeeDetail /EmployeeDetails.jsx';
import UpdateEmloyee from './Pages/Employee_onboarding/UpdateEmployee/UpdateEmloyee.jsx';

{/* Recruitment Imports */ }
import AllJobList from './Pages/Recruitment/List_view_all_job/AllJobList.jsx';
import AddNewJob from './Pages/Recruitment/Add Job/AddNewJob.jsx';
import JobDetails from './Pages/Recruitment/Job_details_page/JobDetails.jsx';
import UpdateJob from './Pages/Recruitment/UpdateJob/UpdateJob.jsx';

{/* Applicant Tracking Imports */ }
import All_Applicant_list from './Pages/Applicant_tracking/All_Applicant_list.jsx';
import Applicant_detail from './Pages/Applicant_tracking/Applicant_detail/Applicant_detail.jsx';
import Add_applicant from './Pages/Applicant_tracking/Add-applicant/Add_applicant.jsx';
import Update_applicant from './Pages/Applicant_tracking/Update-applicant/Update_applicant.jsx';

{/* Attendance Tracking Imports */ }
import AllAttendanceList from './Pages/Attedance_tracking/AllAttendanceList.jsx';
import AttendanceDetails from './Pages/Attedance_tracking/AttendanceDetails/AttendanceDetails.jsx';

{/* Department, Designation, and Employee Health Imports */ }
import Department from './Pages/Department/DepartmentList/Department.jsx';
import Designation from './Pages/Designation/DesignationList/Designation.jsx';
import EmployeeHealth from './Pages/EmployeeHealth/EmployeeHealthList/EmployeeHealth.jsx';
import AddEmployeeHealth from './Pages/EmployeeHealth/AddEmployeeHealth/AddEmployeeHealth.jsx';
import UpdateEmployeeHealth from './Pages/EmployeeHealth/UpdateEmployeeHealth /UpdateEmployeeHealth.jsx';
import DepartmentDetails from './Pages/Department/DepartmentDetails/DepartmentDetails.jsx';
import DesignationDetails from './Pages/Designation/DesignationDetail/DesignationDetails.jsx';
import EmployeeHealthDetails from './Pages/EmployeeHealth/EmployeeHealthDetails/EmployeeHealthDetails.jsx';

{/* Leave Management Imports */ }
import All_leaves_List from './Pages/Leave/All_leaves_List/All_leaves_List.jsx';
import AddNewLeave from './Pages/Leave/Add_Leave/AddNewLeave.jsx';
import LeaveDetails from './Pages/Leave/LeaveDetails/LeaveDetails.jsx';
import UpdateLeave from './Pages/Leave/Update_Leave/UpdateLeave.jsx';
import All_leaves_List_Type from './Pages/Leave/All_leaves_List_Type/All_leaves_List_Type.jsx';

{/* Shift Management Imports */ }
import AllShiftsList from './Pages/ShiftManagement____None/AllShiftsList/AllShiftsList.jsx';
import Shift from './Pages/Shift/Shift.jsx';
import NewShift from './Pages/Shift/NewShift/NewShift.jsx';
import SiftDetails from './Pages/Shift/NewShift/SiftDetail/SiftDetails.jsx';

{/* Holiday and Project Management Imports */ }
import HolidayList from './Pages/Holiday/Holiday_List/HolidayList.jsx';
import HolidayDetail from './Pages/Holiday/HolidayDetail/HolidayDetail.jsx';
import Project from './Pages/Project/Project_List /Project.jsx';
import AddProject from './Pages/Project/Add_Project/AddProject.jsx';
import ProjectDetails from './Pages/Project/Project_Details/ProjectDetails.jsx';

{/* Client Imports */ }
import Client from './Pages/Client/Client_List/Client.jsx';
import AddClient from './Pages/Client/Add_Client/AddClient.jsx';
import ClientDetails from './Pages/Client/Client_Details/ClientDetails.jsx';

{/*Ticket Import*/ }
import Ticket from './Pages/Ticket/Ticket_List/Ticket.jsx';
import TicketDetails from './Pages/Ticket/Ticket_details/TicketDetails.jsx';
import AddTicket from './Pages/Ticket/Add_Ticket/AddTicket.jsx';

{/*Trainers Import*/ }
import Trainers from './Pages/Training_Trainers/Trainers/Trainers.jsx';
import AddTrainers from './Pages/Training_Trainers/Trainers/Add_Trainers/AddTrainers.jsx';
import TrainerDetails from './Pages/Training_Trainers/Trainers/Trainer_Details/TrainerDetails.jsx';

{/*Trainers Import*/ }
import Training from './Pages/Training_Trainers/Training /Training.jsx';
import AddTraining from './Pages/Training_Trainers/Training /Add_Training /AddTraining.jsx';
import TrainingDetails from './Pages/Training_Trainers/Training /Training _Details/TrainingDetails.jsx';

{/*Travel Import*/ }
import Travel from './Pages/Travel/Travel.jsx';
import TravelDetails from './Pages/Travel/Travel_Details/TravelDetails.jsx';
import AddTravel from './Pages/Travel/Add_Travel/AddTravel.jsx';

{/*Announcements*/ }
import Announcements from './Pages/Announcements/Announcements.jsx';
import AnnouncementsDetails from './Pages/Announcements/Announcements_Details/AnnouncementsDetails.jsx';
import AddAnnouncements from './Pages/Announcements/Add_Announcements/AddAnnouncements.jsx';

{/*BirthdayList*/ }
import BirthdayList from './Pages/Birthday/BirthdayList/BirthdayList.jsx';

{/*Performance*/ }
import Performance from './Pages/Performance/Performance_List/Performance.jsx';
import PerformanceDetails from './Pages/Performance/Performance_Details/PerformanceDetails.jsx';


import '../src/styles/EffectSroll.scss';
import './styles/App.scss';

// Other necessary imports for login and password functionality
import ForgotPassword from './Views/ForgotPassword/ForgotPassword.jsx';
import SetNewPassword from './Views/ForgotPassword/SetNewPassword.jsx';
import SendOTP from './Views/ForgotPassword/SendOTP.jsx';
import ViewattendenceLogin from './Views/Login/ViewattendenceLogin.jsx';
import TrackPerformance from './Views/Login/TrackPerformance.jsx';

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
        <Routes>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/login-attendance" element={<ViewattendenceLogin setIsLoggedIn={setIsLoggedIn} />} />
          <Route path='/track-performance' element={<TrackPerformance setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<SendOTP />} />
          <Route path="/set-new-password" element={<SetNewPassword />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
      ) : (
        <>
          {/* Nav Bar */}
          <div id="app_">
            <div className='NavBar'>
              <Navbar setIsLoggedIn={setIsLoggedIn} />
            </div>
            <div className="app">
              {/* Side Bar */}
              <div className={` ${sidebarW ? 'sideBar_app2' : 'sideBar_app'} ${liHover ? 'expanded' : ''} `}>
                <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
              </div>
              <div className="content">
                <Routes>
                  {/* 404 page */}
                  <Route path='/*' element={<_404 />} />

                  {/* Dashboard & Profile Routes */}
                  <Route path="/admin-dashboard" element={<AdminDashboard />} />
                  <Route path="/" element={<AdminDashboard />} />
                  <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
                  <Route path="/admin-profile" element={<AdminProfile />} />
                  <Route path="/employee-profile" element={<EmployeeProfile />} />

                  {/* Employee Onboarding Routes */}
                  <Route path="/all-employee-list" element={<AllEmployeeList />} />
                  <Route path="/add-employee" element={<AddEmloyee />} />
                  <Route path="/employee-details/:id" element={<EmployeeDetails />} />
                  <Route path="/UpdateEmloyee/:id" element={<UpdateEmloyee />} />

                  {/* Recruitment Routes */}
                  <Route path="/all-job-list" element={<AllJobList />} />
                  <Route path="/add-job" element={<AddNewJob />} />
                  <Route path="/job-details/:id" element={<JobDetails />} />
                  <Route path="/job-update/:id" element={<UpdateJob />} />

                  {/* Applicant Tracking Routes */}
                  <Route path="/all-applicant-list" element={<All_Applicant_list />} />
                  <Route path="/add-applicant" element={<Add_applicant />} />
                  <Route path="/applicant-details/:id" element={<Applicant_detail />} />
                  <Route path="/update-applicant/:id" element={<Update_applicant />} />

                  {/* Attendance Tracking Routes */}
                  <Route path="/all-Attendance-list" element={<AllAttendanceList />} />
                  <Route path="/attendance-details/:id" element={<AttendanceDetails />} />

                  {/* Department, Designation & Employee Health Routes */}
                  <Route path="/department" element={<Department />} />
                  <Route path="/designation" element={<Designation />} />
                  <Route path="/health" element={<EmployeeHealth />} />
                  <Route path="/addemployeehealth" element={<AddEmployeeHealth />} />
                  <Route path="/departmentdetails/:id" element={<DepartmentDetails />} />
                  <Route path="/designationdeatils/:id" element={<DesignationDetails />} />
                  <Route path="/employeehealthdetails/:id" element={<EmployeeHealthDetails />} />
                  <Route path="/update-employee-health/:id" element={<UpdateEmployeeHealth />} />

                  {/* Leave Management Routes */}
                  <Route path="/all-leave" element={<All_leaves_List />} />
                  <Route path="/new-leave" element={<AddNewLeave />} />
                  <Route path="/leave-details/:id" element={<LeaveDetails />} />
                  <Route path="/update-leave/:id" element={<UpdateLeave />} />
                  <Route path="/leave-type" element={<All_leaves_List_Type />} />

                  {/* Shift Management Routes */}
                  <Route path="/shifts-list" element={<AllShiftsList />} />
                  <Route path="/shift" element={<Shift />} />
                  <Route path="/new-shift" element={<NewShift />} />
                  <Route path="/shift-details/:id" element={<SiftDetails />} />

                  {/* Holiday & Project Management Routes */}
                  <Route path="/holiday" element={<HolidayList />} />
                  <Route path="/holiday-details" element={<HolidayDetail />} />
                  <Route path="/project" element={<Project />} />
                  <Route path="/add-project" element={<AddProject />} />
                  <Route path="/project-details" element={<ProjectDetails />} />

                  {/* Client Routes */}
                  <Route path="/client" element={<Client />} />
                  <Route path="/new-client" element={<AddClient />} />
                  <Route path="/client-details" element={<ClientDetails />} />

                  {/* Ticket Routes*/}
                  <Route path="/ticket" element={<Ticket />} />
                  <Route path="/ticket-details" element={<TicketDetails />} />
                  <Route path="/add-ticket" element={<AddTicket />} />

                  {/* Trainers Routes */}
                  <Route path="/trainers" element={<Trainers />} />
                  <Route path="/add-trainer" element={<AddTrainers />} />
                  <Route path="/trainer-details" element={<TrainerDetails />} />

                  {/* Training Routes */}
                  <Route path="/training" element={<Training />} />
                  <Route path="/add-training" element={<AddTraining />} />
                  <Route path="/training-details" element={<TrainingDetails />} />

                  {/* Travel Routes */}
                  <Route path="/travel" element={<Travel />} />
                  <Route path="/travel-details" element={<TravelDetails />} />
                  <Route path="/add-travel" element={<AddTravel />} />

                  {/* Announcements Routes */}
                  <Route path="/announcements" element={<Announcements />} />
                  <Route path="/announcements-details" element={<AnnouncementsDetails />} />
                  <Route path="/add-AddAnnouncements" element={<AddAnnouncements />} />


                  {/*BirthdayList Routes*/}
                  <Route path="/birthday" element={<BirthdayList />} />

                  {/*Performance Routes*/}
                  <Route path="/performance" element={<Performance />} />
                    <Route path="/performance-details" element={<PerformanceDetails />} />


                </Routes>
              </div>
            </div>
          </div>
        </>
      )}
    </Router>
  );
};

export default App;
