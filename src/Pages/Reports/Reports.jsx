import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportsPage.scss'; // Import the SCSS file
import OrganizationalReports from './OrganizationalReports';
import { HiUserPlus } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
const Reports = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('My');  // Default Tab

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };



  const JobList = () => {
    navigate('/settings')
  }


  return (
    <>
      <div className="setting_nav_">
        <div className="top-bar">
          <h2><div className='span'><HiUserPlus /></div>Reports </h2>
          <span className="close_nav" onClick={JobList}><TfiClose /></span>
          <div className="">
            <span className="1"></span>
            <span className="2"></span>
            <span className="3"></span>
            <span className="4"></span>
            <span className="5"></span>
            <span className="6"></span>
            <span className="7"></span>
            <span className="8"></span>
            <span className="9"></span>
            <span className="10"></span>
            {/* <span className="11"></span> */}

          </div>
        </div>
      </div>
      <div className="reports-page-main">
        <div className="tabs-container-button">
          <button
            className={`tab-button-swich ${activeTab === 'My' ? 'active-swich' : ''}`}
            onClick={() => handleTabClick('My')}
          >
            My Reports
          </button>
          <button
            className={`tab-button-swich ${activeTab === 'Organizational' ? 'active-swich' : ''}`}
            onClick={() => handleTabClick('Organizational')}
          >
            Organizational Reports
          </button>
        </div>


        {/* Content */}
        <div className="">
          {activeTab === 'Organizational' && (
          <OrganizationalReports /> 
          )}
          {activeTab === 'M y' && (
            <OrganizationalReports />
          )}
        </div>
      </div>

    </>
  );
};

export default Reports;
