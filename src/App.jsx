import React from 'react';
import Navbar from './components/Navbar';
import EmployeeForm from './components/EmployeeForm';
import Sidebar from './components/Sidebar';
import './App.scss';

const App = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Navbar />
      <div className="app">
        <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
        <div className="content">
          <EmployeeForm />
        </div>
      </div>
    </>
  );
};

export default App;
//