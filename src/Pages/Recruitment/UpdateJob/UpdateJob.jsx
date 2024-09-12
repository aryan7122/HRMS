import './AddNewJob.scss';
import { useNavigate, useParams } from 'react-router-dom';

// import '../../Employee onboarding/AddEmployee/NavbarForm.scss';
import { useState } from 'react';
// import './AddEmloyee.scss';
import { HiUserPlus } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import Confetti from 'react-confetti';
// import JobForm from './JobForm';
import JobUpdateForm from './JobUpdateForm'

const UpdateJob = () => {
    const { id } = useParams(); // Get the job ID from the URL

    const navigate = useNavigate()


    const [showAlert, setShowAlert] = useState(false);
    const formNames = ['Basic Details', 'Contacts', 'Experience', 'Education', 'Documents'];
    const [activeFormIndex, setActiveFormIndex] = useState(0);
    const [filledForms, setFilledForms] = useState({
        'Basic Details': false,
        'Contacts': false,
        'Experience': false,
        'Education': false,
        'Documents': false,
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        const currentForm = formNames[activeFormIndex];

        setFilledForms((prevState) => ({
            ...prevState,
            [currentForm]: true,
        }));

        if (activeFormIndex < formNames.length - 1) {
            setActiveFormIndex(activeFormIndex + 1);
        }

        event.preventDefault();
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);
        }, 4300);
    };

    const JobList = () => {
        navigate('/all-job-list')
    }

    return (
        <>
            {/* {showAlert ? <div><Confetti /> <div id='showAlert'><p>Form Submit Successfully</p></div> </div> : ''} */}
            <div className="employee-form">
                <div className="top-bar">
                    <h2><div className='span'><HiUserPlus /></div>Update Job Id: {id} </h2>
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
                <div className="form-content">
                    {/* <JobForm onSubmit={handleSubmit} /> */}
                    <JobUpdateForm onSubmit={handleSubmit} />
                </div>
            </div>
        </>
    );
};

export default UpdateJob;


// 

