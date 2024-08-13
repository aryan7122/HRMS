import React from 'react';
import Navbar from './components/Navbar';
import EmployeeForm from './components/EmployeeForm';
import EmployeeOnboarding from './components/EmployeeOnboarding.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './styles/App.scss';
import _404 from './components/_404.jsx';
import AdminDashboard from './Pages/ AdminDashboard/AdminDashboard.jsx';
import EmployeeDashboard from './Pages/EmployeeDashboard/EmployeeDashboard.jsx';

const App = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Router>
      <Navbar />
      <div className="app">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className="content">
          <Routes>
            {/* <Route path="/*" element={<_404 />} /> */}
            <Route path="/" element={<EmployeeForm />} />
            <Route path="/admin-dashboard" element={<AdminDashboard/>}></Route>
            <Route path='/*' element={<_404 />} />
            <Route path='/employee-onboarding' element={<EmployeeOnboarding />} />

            <Route path="/employee-dashboard" element={<EmployeeDashboard />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
