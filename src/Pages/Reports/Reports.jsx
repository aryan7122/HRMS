import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ReportsPage.scss'; // Import the SCSS file
import OrganizationalReports, { OrganizationalData } from './OrganizationalReports';
import { HiUserPlus } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import MyReports, { MyData } from './MyReports';
import { useLocation } from 'react-router-dom';
import Dashboard from './Organizational_Reports/dashboard/Dashboard';

const Reports = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('My');  // Default Tab
  const location = useLocation();

  const handleTabClick = (tabName) => {
    setActiveTab(tabName);
  };

  const JobList = () => {
    navigate('/')
  }

  const currentURL = window.location.pathname;

  let updatedURL = currentURL.replace(/^\/reports/, '');

  // Extract the first word from the URL
  let firstWord = updatedURL.split('/').filter(Boolean)[0];

  console.log('First Word:', firstWord);



  useEffect(() => {

    if (currentURL === '/reports') {
      return
    } else {
      setActiveTab(currentURL)
    }
  }, [currentURL]);



  return (
    <>
      <div className="setting_nav_">
        <div className="top-bar">
          <h2>
            <div className='span' style={{ marginLeft: '-15px', marginRight: '10px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#30005a" fill="none">
                <path d="M6.5 17.5L6.5 14.5M11.5 17.5L11.5 8.5M16.5 17.5V13.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                <path d="M21.5 5.5C21.5 7.15685 20.1569 8.5 18.5 8.5C16.8431 8.5 15.5 7.15685 15.5 5.5C15.5 3.84315 16.8431 2.5 18.5 2.5C20.1569 2.5 21.5 3.84315 21.5 5.5Z" stroke="currentColor" stroke-width="1.5" />
                <path d="M21.4955 11C21.4955 11 21.5 11.3395 21.5 12C21.5 16.4784 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4784 2.5 12C2.5 7.52169 2.5 5.28252 3.89124 3.89127C5.28249 2.50003 7.52166 2.50003 12 2.50003L13 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>Reports </h2>
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
            className={`tab-button-swich ${currentURL === '/reports/my' ? 'active-swich' : (firstWord == 'my') ? 'active-swich' : ''}`}
            onClick={() => handleTabClick('My') + navigate('/reports/my')}
          >
            My Reports
          </button>
          <button
            className={`tab-button-swich ${currentURL === '/reports/organizational' ? 'active-swich' : (firstWord == 'organizational') ? 'active-swich' : ''}`}
            onClick={() => handleTabClick('Organizational') + navigate('/reports/organizational')}
          >
            Organizational Reports
          </button>
        </div>
        {/* Content */}
        <div className="">
          {currentURL === '/reports/organizational' && (
            <OrganizationalReports />
          )}
          {currentURL === '/reports/my' && (
            <MyReports />
          )}
          {currentURL === '/reports/organizational/dashboard' && (
            <Dashboard />
          )}

        </div>
      </div>
    </>
  );
};
export default Reports;
