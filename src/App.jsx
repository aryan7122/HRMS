import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './styles/App.scss';
import _404 from './components/_404.jsx';
import Login from './components/Login';
{/* dashboard & Profile Page */ }
import AdminDashboard from './Pages/Dashboard and Profile/ AdminDashboard/AdminDashboard.jsx';
import AdminProfile from './Pages/Dashboard and Profile/AdminProfile/AdminProfile.jsx';
import EmployeeDashboard from './Pages/Dashboard and Profile/EmployeeDashboard/EmployeeDashboard.jsx';
{/* {Employee onboarding } */ }
import AllEmployeeList from './Pages/Employee onboarding/AllEmployeeList/AllEmployeeList.jsx';
import AddEmloyee from './Pages/Employee onboarding/AddEmployee/AddEmloyee.jsx';
import EmployeeDetails from './Pages/Employee onboarding/EmployeeDetail /EmployeeDetails.jsx';


import SignUp from './components/SignUp';
import ViewattendenceLogin from './components/ViewattendenceLogin'; // Import the new ViewattendenceLogin component
import TrackPerformance from './components/TrackPerformance'; // Import the new TrackPerformance component
import SendOTP from './components/SendOTP'; // Import OTPVerification component
import './styles/App.scss';
import ForgotPassword from './components/ForgotPassword'; // Import the ForgotPassword component
import SetNewPassword from './components/SetNewPassword'; // Import the SetNewPassword component

// 
import Department from './Pages/Employee onboarding/EmployeeDetail /Department.jsx'

// 
import AllJobList from './Pages/Recruitment/List view all job/AllJobList.jsx'


const App = () => {
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
          <Route path="/sign-up" element={<SignUp />} />
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
            <Navbar setIsLoggedIn={setIsLoggedIn} />
            <div className="app">
              {/* side bar */}
              <div className="sideBar_app">
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
                  <Route path="/all-employee-list" element={<AllEmployeeList />} />
                  <Route path="/add-employee" element={<AddEmloyee />} />
                  <Route path="/employee-details" element={<EmployeeDetails />} />
                  <Route path="/department" element={<Department />} />
                  {/* recruitment */}
                    <Route path="/all-job-list" element={<AllJobList />} />
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