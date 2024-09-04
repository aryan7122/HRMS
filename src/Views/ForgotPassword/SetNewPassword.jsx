// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SetNewPassword.css';
import { FaTimes } from 'react-icons/fa';
import imageaccount4 from '../../assets/logo.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // You'll need to install react-icons if you haven't already
const SetNewPassword = () => {
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        // Handle password update logic here
        alert('Password updated successfully.');
        navigate('/login'); // Redirect to login page after password update
      } else {
        alert('Passwords do not match.');
      }
    } else {
      alert('Please fill in both password fields.');
    }
  };

  return (
    <div className="set-new-password-container" id="Contents">
      <div className="crossBtn3" id="Circlebtn">

        <FaTimes />

      </div>
      <div className='accountimage2'>
        <img src={imageaccount4} alt="Sign Up" />
      </div>
      <h3>Set New Password</h3>
      <div className='char'>
        <p>
          Must be at least 8 characters
        </p>
      </div>
      <form onSubmit={handleSubmit} >
        <div>
          <label>New Password*</label>
          <input
            type={showPassword1 ? 'text' : 'password'}
            placeholder="Enter New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className='Textt'
          />
          <span className="eye-icon1" id='eyeeee11' onClick={togglePasswordVisibility1}>
            {showPassword1 ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <div>
          <label>Re-enter Password*</label>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className='textt2'
          />
          <span className="eye-icon2" id='eyeeee22' onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        <button className='BTNNNN' id="bt22" type="submit">Reset Password</button>
      </form>
    </div>
  );
};

export default SetNewPassword;
