

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

    const passwordIsValid = validatePassword(password);

    if (email && passwordIsValid) {
      setIsLoggedIn(true);
      navigate('/admin-dashboard');
    } else {
      if (!passwordIsValid) {
        alert('Password must be at least 8 characters long, contain at least one number, and one special character.');
      } else {
        alert('Please enter both email and password.');
      }
    }
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/;
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    return password.length >= minLength && hasNumber.test(password) && hasSpecialChar.test(password);
  };

  const navigateSignUP = () => {
    navigate('/sign-up');
  }
  const navigatePass = () => {
    navigate('/forgot-password');
  }

  return (
    <div className="login-container">

      <div className="login-image">
        <div className="Img_main">
          <img src={loginImage} alt="Login" />
        </div>
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

        <h3 className='welcome'>Welcome Back!👋</h3>
        <label className="name">Log In to Manage Your HR Task</label>
        <form onSubmit={handleSubmit} className='loginAlignmentform' id="Formmm">
          <div id='emailform'>
            <label className="address">Email*</label>
            <input
              className='valueform'
              type="email"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ color: '#b0acac' }}
              required
            />
          </div>
          <div >
            <label className='passwordform'>Password*</label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span className="eyeicon0" id="icon100" onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
          <div className="remember-forgot-container">
            <div className="remember-me">
              <input type="checkbox" id="rememberMe" />
              <label className="rememberMe1">Remember Me</label>
            </div>
            <div className="forgot-password">
              <a style={{ fontSize: '13px', cursor: 'pointer' }} onClick={navigatePass}>
                Forget Password?
              </a>
            </div>
          </div>
          <div className="button-container">
            <button type="submit" className='btnnn'>Login</button>
            <div className="or-divider">
              <hr className="line" />
              <span>Or</span>
              <hr className="line" />
            </div>
          </div>
          <div className='distancelogin'>
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
          <div className='wholeaccount'>
            <h6 className='accountant'>Do you have an account yet? <a style={{ cursor: 'pointer' }} onClick={navigateSignUP}>Sign Up</a></h6>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
