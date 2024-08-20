import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
// import AddEmployee from './Pages/Employee onboarding/AddEmployee/NavbarForm.jsx';


const App = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      {!isLoggedIn ? (
        <Login setIsLoggedIn={setIsLoggedIn}/>
      ) : (
        <>
          {/* nav bar */}
          <div id="app_">
              <Navbar setIsLoggedIn={setIsLoggedIn} />
            <div className="app">
              {/* side bar */}
              <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
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
