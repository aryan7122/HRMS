import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import '../styles/Login.css';
import './Login.css'
import Confetti from 'react-confetti';

import axios from 'axios';
// import { BsGoogle, BsFacebook, BsTwitter, BsMicrosoft, BsLinkedin } from 'react-icons/bs';
// import { FaEye, FaEyeSlash } from 'react-icons/fa';
import imageaccount1 from '../../assets/logo.png';
import Slider from "react-slick";

import loginImage from '../../assets/loginImage1.png';
import loginImage2 from '../../assets/loginImage2.png'; // Add your second image here
import loginImage3 from '../../assets/loginImage3.png'; // Add your third image here

import ImgG from '../../assets/google.png'
import ImgM from '../../assets/microsoft.png'
import ImgL from '../../assets/LinkedIn.png'
import ImgT from '../../assets/tiwtter.png'
import ImgF from '../../assets/facebook.png'
const Login = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   const passwordIsValid = validatePassword(password);

  //   // if (email && passwordIsValid) {
  //   setIsLoggedIn(true);
  //   navigate('/admin-dashboard');
  //   // } else {
  //   //   if (!passwordIsValid) {
  //   //     alert('Password must be at least 8 characters long, contain at least one number, and one special character.');
  //   //   } else {
  //   //     alert('Please enter both email and password.');
  //   //   }
  //   // }
  // };
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertError, setShowAlertError] = useState(false);
  const [sms, setSms] = useState('')
  const [loading, setLoading] = useState(false);


  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true)
    setSms('')

    try {
      const response = await axios.post('https://devstronauts.com/public/api/login', {
        email,
        password,
      });

      if (response.data.message === "Login Successfully" || response.data.error === 'false') {
        // setShowAlert(true)
        setLoading(false)
        setTimeout(() => {
          setShowAlert(false)
        }, 1000);
        setSms('Login Successfully')
        localStorage.setItem('access_token', response.data.access_token);
        // alert("Login Successfully"); 
        console.log(response.data)
        setTimeout(() => {
          setIsLoggedIn(true);
          // setShowAlert(false);
          navigate('/');
        }, 1000);
      } else {
        // alert("Invalid login credentials"); 
        setLoading(false)
        // setShowAlertError(true)
        setSms('Invalid login credentials')
        setTimeout(() => {
          setShowAlertError(false)
        }, 3000);
      }
    } catch (error) {
      console.error('Error during login:', error);
      // alert("An error occurred during login. Please try again."); // Handle any error case
      // setShowAlertError(true)
      setLoading(false)
      setTimeout(() => {
        setShowAlertError(false)

      }, 3000);
      setSms('An error occurred during login. Please try again.')
    }
  };



  const validatePassword = (password) => {
    // const minLength = 8;
    // const hasNumber = /\d/;
    // const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/;

    // return password.length >= minLength && hasNumber.test(password) && hasSpecialChar.test(password);
    return password;
  };

  const navigateSignUP = () => {
    navigate('/sign-up');
  }

  const navigatePass = () => {
    navigate('/forgot-password');
  }

  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: loginImage,
      text1: "Access Personal Information",
      text2: "View and update your personal and employment details easily"
    },
    {
      image: loginImage2,
      text1: "View Attendance Records",
      text2: "Check employee daily, monthly, and annual attendance records and download reports"
    },
    {
      image: loginImage3,
      text1: "Track Performance",
      text2: "Access employee performance reviews, set goals, and monitor employee progress."
    }
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    beforeChange: (oldIndex, newIndex) => setCurrentSlide(newIndex),
    customPaging: (i) => (
      <div
        style={{
          width: i === currentSlide ? "21px" : "20px",
          // marginRight: i == currentSlide ? '20px' : '10px',
          // paddingLeft:"10px",
          height: "3px",
          background: i === currentSlide ? "#400F6F" : "white",
          borderRadius: "10px",
          transition: "all 2s ease",
          marginTop: '10px',
          gap: '20px'

        }}
      />
    ),
    dotsClass: "slick-dots slick-thumb custom-dots",
  };


  return (
    <div className="login-container">
      {showAlert ? <div> <div id='showAlert' ><p> {sms}</p></div> </div> : ''}
      {showAlertError ? <div> <div id='showAlertError' ><p>{sms}</p></div> </div> : ''}

      <div className="login-image">
        <div>
          <Slider {...settings}>
            {slides.map((slide, index) => (
              <div key={index} className="Img_main">
                <div className='roundBg'>
                  <img src={slide.image} alt={`Slide ${index + 1}`} />
                  <div className="overlay-text">
                    <p className="access-infoo">{slide.text1}</p>
                    <p className="details-info">{slide.text2}</p>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="login-form">
        <div>
          <div className='accountimage'>
            <img src={imageaccount1} alt="Sign Up" />
          </div>

          <h3 className='welcome'>Welcome Back!  <span className='wave'>👋</span></h3>
          <label className="name">Log In to Manage Your HR Task</label>
          <br /> <br />
          <form onSubmit={handleSubmit} className='loginAlignmentform' id="Formmm">
            <div id='emailform' className='input1'>
              <label className="address labelL">Email*</label>
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
            <div className='input1'>
              <label className='passwordform labelL'>Password*</label>
              <input
                className='valueform'
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <span className="eyeicon" onClick={togglePasswordVisibility}>
                {showPassword ?
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                    <path d="M19.439 15.439C20.3636 14.5212 21.0775 13.6091 21.544 12.955C21.848 12.5287 22 12.3155 22 12C22 11.6845 21.848 11.4713 21.544 11.045C20.1779 9.12944 16.6892 5 12 5C11.0922 5 10.2294 5.15476 9.41827 5.41827M6.74742 6.74742C4.73118 8.1072 3.24215 9.94266 2.45604 11.045C2.15201 11.4713 2 11.6845 2 12C2 12.3155 2.15201 12.5287 2.45604 12.955C3.8221 14.8706 7.31078 19 12 19C13.9908 19 15.7651 18.2557 17.2526 17.2526" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M9.85786 10C9.32783 10.53 9 11.2623 9 12.0711C9 13.6887 10.3113 15 11.9289 15C12.7377 15 13.47 14.6722 14 14.1421" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                    <path d="M3 3L21 21" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                  :
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                    <path d="M21.544 11.045C21.848 11.4713 22 11.6845 22 12C22 12.3155 21.848 12.5287 21.544 12.955C20.1779 14.8706 16.6892 19 12 19C7.31078 19 3.8221 14.8706 2.45604 12.955C2.15201 12.5287 2 12.3155 2 12C2 11.6845 2.15201 11.4713 2.45604 11.045C3.8221 9.12944 7.31078 5 12 5C16.6892 5 20.1779 9.12944 21.544 11.045Z" stroke="currentColor" stroke-width="1.5" />
                    <path d="M15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12Z" stroke="currentColor" stroke-width="1.5" />
                  </svg>
                }
              </span>
            </div>
            <div className="remember-forgot-container">
              <div className="remember-me">
                <input type="checkbox" id="rememberMe" className='checkbox' />
                <label className="rememberMe1">Remember Me</label>
              </div>
              <div className="forgot-password">
                <a style={{ fontSize: '13px', cursor: 'pointer' }} onClick={navigatePass}>
                  Forget Password?
                </a>
              </div>
            </div>
            <div className="button-container">
              <button type="submit" className='btnnn'>{loading ? <img style={{ width: '19px' }} src="https://i.pinimg.com/originals/4a/84/2b/4a842bb6a3db17b1a82bf1f14fdc1081.gif" alt="loading..." /> : "Login"}</button>
              {/* <div className="Underline2">
                <hr className="line1" />
                <span>Or</span>
                <hr className="line1" />
              </div> */}
            </div>
            <div className='distancelogin'>
              {/* <h6 className="login1">Login With</h6> */}
            </div>
            {/* <div className="social-media-container">
              <a href="/" className="social-icon">
                <img src={ImgG} alt="" />

              </a>
              <a href="/" className="social-icon">
                <img src="" alt="" />
              </a>
              <a href="/" className="social-icon">
                <img src={ImgF} alt="" />
              </a>
              <a href="/" className="social-icon">
                <img src={ImgT} alt="" />
              </a>
              <a href="/" className="social-icon">
                <img src={ImgM} alt="" />
              </a>
              <a href="/" className="social-icon">
                <img src={ImgL} alt="" />
              </a>
            </div> */}
            <div className='wholeaccount'>
              {/* <h6 className='accountant'>Do you have an account yet? <a style={{ cursor: 'pointer' }} onClick={navigateSignUP}>Sign Up</a></h6> */}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
