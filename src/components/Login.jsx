

// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import loginImage from '../assets/login.png';
import { BsGoogle, BsFacebook, BsTwitter, BsMicrosoft, BsLinkedin } from 'react-icons/bs';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // You'll need to install react-icons if you haven't already
import imageaccount1 from '../assets/logo.png';
// eslint-disable-next-line react/prop-types
const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password) {
      setIsLoggedIn(true);
      navigate('/admin-dashboard');
    } else {
      alert('Please enter both email and password.');
    }
  };
  const navigateSignUP = () => {
    navigate('/sign-up');
  }

  return (
    <div className="login-container">

      <div className="login-image">
        <img src={loginImage} alt="Login" />
        <div className="overlay-text">
          <p className="access-infoo">Access Personal Information</p>
          <p className="details-info">View and update your personal and employment </p>
          <p className='details-info1'>
            details easily
          </p>
        </div>

      </div>
      <div className="login-form">
      <div className='accountimage'>   
           <img src={imageaccount1} alt="Sign Up" />
           </div>
  
        <h3>Welcome Back!👋</h3>
        <label className="name">Log In to Manage Your HR Task</label>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="address">Email*</label>
            <input
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ color: '#b0acac' }}
              required
            />
          </div>
          <div>
            <label>Password*</label>
            <input
                   type={showPassword ? 'text' : 'password'}
                   placeholder="Enter Password"
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   required
                 />
                 <span className="eye-icon" onClick={togglePasswordVisibility}>
                   {showPassword ? <FaEyeSlash /> : <FaEye />}
                 </span>
          </div>
          <div className="remember-forgot-container">
            <div className="remember-me">
              <input type="checkbox" id="rememberMe" />
              <label className="rememberMe1">Remember Me</label>
            </div>
            <div className="forgot-password">
              <a href="/forgot-password" style={{ fontSize: '13px' }}>
              Forget Password? 
              </a>
            </div>
          </div>
          <div className="button-container">
            <button type="submit">Login</button>
            <div className="or-divider">
              <hr className="line" />
              <span>Or</span>
              <hr className="line" />
            </div>
          </div>
          <div>
            <h6 className="login1">Login With</h6>
          </div>
          <div className="social-media-container">
            <a href="https://www.google.com" className="social-icon">
              <BsGoogle />
            </a>
            <a href="https://www.facebook.com" className="social-icon">
              <BsFacebook />
            </a>
            <a href="https://twitter.com" className="social-icon">
              <BsTwitter />
            </a>
            <a href="https://www.microsoft.com" className="social-icon">
              <BsMicrosoft />
            </a>
            <a href="https://www.linkedin.com" className="social-icon">
              <BsLinkedin />
            </a>
          </div>
          <div>
            <h6 className='account'>Do you have an account yet? <a style={{cursor:'pointer'}} onClick={navigateSignUP}>Sign Up</a></h6>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
