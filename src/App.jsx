import React from 'react';
import Navbar from './components/Navbar';
// import EmployeeForm from './components/EmployeeForm';
import EmployeeOnboarding from './components/EmployeeOnboarding.jsx';


import Sidebar from './components/Sidebar';
import './styles/App.scss';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar />
      <div className="app">
        <Sidebar isOpen={isOpen} OnClick={toggleSidebar} />
        <div className="content">
          {/* <EmployeeForm /> */}
          <EmployeeOnboarding/>
        </div>
      </div>
    </>
  );
};

export default App;
//