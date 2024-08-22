// components/ForgotPassword.jsx

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/ForgotPassword.css';
import imageaccount2 from '../assets/logo.png';
import { FaTimes } from 'react-icons/fa';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

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
    <div className="forgot-password-container" id="forgotten">
      <div className="crossBtn">

        <FaTimes />

      </div>


      <div className='accountimage2'>
        <img src={imageaccount2} alt="Sign Up" />
      </div>
      <h3>Forget Password ?</h3>
      <p className="recovery-message">
        Don’t worry! Enter your registration email, We will send OTP for password recovery
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email*</label>
          <input className='entermail'
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Send OTP</button>
        <div>
          <h6 className='account'>Do you have an account yet? <a style={{ cursor: 'pointer' }} onClick={navigateSignUP}>Sign Up</a></h6>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
