// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import imageaccount2 from '../../assets/logo.png';
import { FaTimes } from 'react-icons/fa';

const SendOTP = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(new Array(4).fill("")); // 4-digit OTP

  // Handle input change and auto-focus
  const handleChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto focus to next input field
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }

    // Auto submit when all fields are filled
    if (newOtp.every((v) => v !== "")) {
      document.getElementById("Indexx").submit();
    }
  };

  // Handle backspace navigation and clearing input
  const handleBackspace = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];

      if (otp[index] === "") {
        if (index > 0) {
          document.getElementById(`otp-input-${index - 1}`).focus();
        }
      } else {
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("OTP Submitted: " + otp.join(""));
    navigate('/set-new-password');
  };

  const navigateClose = () => {
    navigate('/forgot-password');
  };

  return (
    <div className='PasswordNew'>
      <div className="forgot-password-container" id="verify">
        <div className="topHeads">
          <div className='accountimage2'>
            <img src={imageaccount2} alt="Sign Up" />
          </div>
          <div className="crossBtn" onClick={navigateClose} >
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
              </svg>
            </span>
          </div>
        </div>
        <h3>Enter Your Code</h3>
        <p className="recovery-message">
          Please enter the OTP sent to <span>Akashshinde@gmail.com</span>
        </p>

        <form onSubmit={handleSubmit} id="Indexx">
          <div className="otp-inputs" id="INputsss">
            {otp.map((value, index) => (
              <input
                key={index}
                id={`otp-input-${index}`}
                type="text"
                value={value}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleBackspace(e, index)}
                maxLength="1"
                className="otp-box"
              />
            ))}
          </div>
        </form>

        <p className="resend-container ">
          Didn't receive the email? <a href="#">Click to Resend</a>
        </p>
        <button className="codeOTP Otp" id="btn11" type="submit" onClick={handleSubmit}>Continue</button>
      </div>
    </div>
  );
};

export default SendOTP;
