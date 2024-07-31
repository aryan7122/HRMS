import React from 'react';
import Navbar from './components/Navbar';
import EmployeeForm from './components/EmployeeForm';
import EmployeeOnboarding from './components/EmployeeOnboarding.jsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import './styles/App.scss';

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
            <Route path="/employee-onboarding" element={<EmployeeOnboarding />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
