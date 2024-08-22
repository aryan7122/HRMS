// components/OTPVerification.jsx

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SendOTP.css';
import imageaccount3 from '../assets/logo.png';
import { FaTimes } from 'react-icons/fa';
const SendOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(['', '', '', '']);





  const handleChange = (event, index) => {
    const value = event.target.value;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input field automatically
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };



  const handleSubmit = (event) => {
    event.preventDefault();
    if (otp) {
      // Handle OTP verification logic here
      alert('OTP verified successfully.');
      navigate('/set-new-password'); // Redirect to login page after verification
    } else {
      alert('Please enter the OTP.');
    }
  };

  return (
    <div className="otp-verification-container" id="verify">
      <div className="crossBtn1">

        <FaTimes />

      </div>
      <div className='accountimage2'>
        <img src={imageaccount3} alt="Sign Up" />
      </div>
      <h3>Enter Your Code</h3>
      <p className="otp-message-container">
        <span className="otp-message">Please Enter the OTP send to</span>
        <span className="email-address">Akshshbs@gmail.com</span>
      </p>

      <form onSubmit={handleSubmit} id="Indexx">
        <div className="otp-inputs" id='INputsss'>
          {otp.map((value, index) => (
            <input
              key={index}
              id={`otp-input-${index}`}
              type="text"
              value={value}
              onChange={(e) => handleChange(e, index)}
              maxLength="1"
              className="otp-box"
            />
          ))}
        </div>
        {/* <div>
        
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />
        </div> */}
        <p className="resend-container">
          Didn't receive the email? <a href="#">Click to Resend</a>
        </p>
        <button className="codeOTP" id="btn11" type="submit">Continue</button>
      </form>
    </div>
  );
};

export default SendOTP;
