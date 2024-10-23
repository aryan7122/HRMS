import './Settings.scss';
import { HiUserPlus } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import { useNavigate } from 'react-router-dom';
import SettingsDashboard from './settingsData.jsx';

const Settings = () => {

    const navigate = useNavigate()



    const JobList = () => {
        navigate('/settings')
    }



    return (
        <>
            {/* {showAlert ? <div><Confetti /> <div id='showAlert'><p>Form Submit Successfully</p></div> </div> : ''} */}
            <div className="setting_nav_">
                <div className="top-bar">
                    <h2><div className='span'><HiUserPlus /></div>Settings </h2>
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
                    </div>
                </div>
            </div>
            <div className="">
                <SettingsDashboard />
            </div>
        </>
    );
};

export default Settings;


// 

