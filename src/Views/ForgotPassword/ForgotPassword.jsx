// components/ForgotPassword.jsx

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.scss';

import imageaccount2 from '../../assets/logo.png';
import { FaTimes } from 'react-icons/fa';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const navigateClose = () => {
    navigate('/login');
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    if (email) {
      // Handle password reset logic here
      alert('Password reset link has been sent to your email.');
      navigate('/otp-verification'); // Redirect back to login page after submission
    } else {
      alert('Please enter your email.');
    }
  };
  const navigateSignUP = () => {
    navigate('/sign-up');
  }

  return (
    <section>

      <div className="PasswordNew">
        <div className="forgot-password-container" id="forgotten">
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
          <h3>Forget Password ?</h3>
          <p className="recovery-message">
            Don’t worry! Enter your registration email, We will send <span>OTP</span> for password recovery
          </p>
          <form onSubmit={handleSubmit}>
            <div>
              <label className='Elabel'>Email*</label>
              <input className='entermail'
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit" className='Otp'>Send OTP</button>
            <div className='acct'>
              {/* <h6 className='account'>Do you have an account yet? <a style={{ cursor: 'pointer' }} onClick={navigateSignUP}>Sign Up</a></h6> */}
            </div>
          </form>
        </div>
      </div>
    </section>

  );
};

export default ForgotPassword;
