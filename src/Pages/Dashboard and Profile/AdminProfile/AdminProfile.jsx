// import React from 'react'
import './AdminProfile.scss'
import { HiUserPlus } from "react-icons/hi2";
import { TfiClose } from "react-icons/tfi";
import Admin_IMG from '../../../assets/user.png'
import { BiEditAlt } from "react-icons/bi";
// import { FaUserCircle, FaPhone, FaAddressCard, FaGraduationCap, FaBriefcase } from "react-icons/fa";
import iconUser from '../../../assets/icons/user.png'
import iconContect from '../../../assets/icons/contect.png'
import iconEdu from '../../../assets/icons/edu.png'
import imgCheck from '../../../assets/icons/check.png'
import imgFacbook from '../../../assets/icons/facbook.png'
import imgDropbox from '../../../assets/icons/dropbox.png'
import imgMailchimp from '../../../assets/icons/Mailchimp.png'
import imgIdentity from '../../../assets/icons/Identity.png'
import ImgPDF from '../../../assets/icons/pdf.png'
import ImgEye from '../../../assets/icons/eye.png'

const AdminProfile = () => {
  return (
    <div className='AdminProfile_main'>
      {/* patter top header */}
      <div className="top-bar">
        <h2><div className='span'><HiUserPlus /></div>My Profile</h2>
        <span className="close_nav"><TfiClose /></span>
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
      {/* second header */}
      <div className="mainContainers">
        <div className="Top_Head_Admin_Dashboard">
          {/* left */}
          <div className="Left_admin_hello">
            <img src={Admin_IMG} alt="Admin_image" />
            <div>
              <div>
                <h2>Mrs. Admin </h2>
                <div><h4>Active</h4></div>
              </div>
              <p>Admin@gmail.com</p>
            </div>
          </div>
          {/* right */}
          <div className="Right_Time">
            <div className="Check_in_time">
              <BiEditAlt />
              <h3> Edit</h3>
            </div>

          </div>
        </div>
        {/* data form cart */}
        <div className="containers">
          <div className='info'>
            {/* Basic details */}
            <div className="div_details">
              <div className="section_header">
                <img src={iconUser} alt="" className="icon" />
                <h2>Basic details</h2>
              </div>
              <div className="data">
                <div>
                  <h4>Employee ID</h4>
                  <span>:</span>
                  <p>EMP - 270015SC</p>
                </div>
                <div>
                  <h4>Date of Birth</h4>
                  <span>:</span>
                  <p>14-Apr-1996</p>
                </div>
                <div>
                  <h4>Age</h4>
                  <span>:</span>
                  <p>24</p>
                </div>
                <div>
                  <h4>Marital Status</h4>
                  <span>:</span>
                  <p>Married</p>
                </div>
                <div>
                  <h4>Department</h4>
                  <span>:</span>
                  <p>Engineer</p>
                </div>
                <div>
                  <h4>Designation</h4>
                  <span>:</span>
                  <p>Web Developer</p>
                </div>
                <div>
                  <h4>Employment Type</h4>
                  <span>:</span>
                  <p>Permanent</p>
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="div_details">
              <div className="section_header">
                <img src={iconContect} alt="" className="icon" />
                <h2>Contact Information</h2>
              </div>
              <div className="data">
                <div>
                  <h4>Work Contact Number</h4>
                  <span>:</span>
                  <p>+91-9764910135</p>
                </div>
                <div>
                  <h4>Personal Phone Number</h4>
                  <span>:</span>
                  <p>+91-9764910135</p>
                </div>
                <div>
                  <h4>Country</h4>
                  <span>:</span>
                  <p>INDIA</p>
                </div>
                <div>
                  <h4>State</h4>
                  <span>:</span>
                  <p>Maharashtra</p>
                </div>
                <div>
                  <h4>City</h4>
                  <span>:</span>
                  <p>Pune</p>
                </div>
                <div>
                  <h4>Present Address</h4>
                  <span>:</span>
                  <p>602, Mangalwar peth, Bwing</p>
                </div>
                <div>
                  <h4>Permanent Address</h4>
                  <span>:</span>
                  <p>602, Mangalwar peth, Bwing</p>
                </div>
                <div>
                  <h4>Zip Code</h4>
                  <span>:</span>
                  <p>415002</p>
                </div>
              </div>
            </div>

            {/* Identity Information */}
            <div className="div_details">
              <div className="section_header">
                <img src={imgIdentity} alt="" className="icon" />
                <h2>Identity Information</h2>
              </div>
              <div className="data DataIdentity">
                <div className='box_Identity'>
                  <div className='preview_pdf'>
                    <div className='img'>
                      <img src={ImgPDF} alt="pdf" />
                    </div>
                    <div className='text'>
                      <h3>Aadhar Card</h3>
                      <p>123450318</p>
                    </div>
                  </div>
                  <div className='preview_eye'>
                    <img src={ImgEye} alt="" />
                  </div>
                </div>
                <div className='box_Identity'>
                  <div className='preview_pdf'>
                    <div className='img'>
                      <img src={ImgPDF} alt="pdf" />
                    </div>
                    <div className='text'>
                      <h3>Aadhar Card</h3>
                      <p>123450318</p>
                    </div>
                  </div>
                  <div className='preview_eye'>
                    <img src={ImgEye} alt="" />
                  </div>
                </div>
                <div className='box_Identity'>
                  <div className='preview_pdf'>
                    <div className='img'>
                      <img src={ImgPDF} alt="pdf" />
                    </div>
                    <div className='text'>
                      <h3>Aadhar Card</h3>
                      <p>123450318</p>
                    </div>
                  </div>
                  <div className='preview_eye'>
                    <img src={ImgEye} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* Education Section */}
          <div className="education">
            <div className="section-header">
              {/* <FaGraduationCap className="icon" /> */}
              <img src={iconEdu} alt="" className='icon' />
              <h2>Education</h2>
            </div>
            <table>
              <thead>
                <tr>
                  <th>INSTITUTE NAME</th>
                  <th>DEGREE</th>
                  <th>SPECIALIZATION</th>
                  <th>FROM DATE</th>
                  <th>TO DATE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>M.S.B.T.E</td>
                  <td>Masters</td>
                  <td>Science</td>
                  <td>16-Jan-2024</td>
                  <td>16-Apr-2024</td>
                </tr>
                <tr>
                  <td>C.B.S.E</td>
                  <td>H.S.C</td>
                  <td>Maths</td>
                  <td>25-Mar-2022</td>
                  <td>25-Mar-2023</td>
                </tr>
                <tr>
                  <td>D.B.S.E</td>
                  <td>S.S.C</td>
                  <td>Economics</td>
                  <td>16-May-2018</td>
                  <td>16-May-2021</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Experience Section */}
          <div className="experience">
            <div className="section-header">
              <img src={imgCheck} alt="" className='icon' />
              <h2>Experience</h2>
            </div>
            <div className="experience-grid">
              <div className="experience-card">
                <div className='logo_title'>
                  <img src={imgFacbook} alt="Facebook" />
                  <div>
                    <h3>Web Developer</h3>
                    <p>04/02/2023 - 11/06/2023</p>
                  </div>
                </div>
                <h3>Facebook</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, thing here described adipiscing elit, thing here described.</p>
                <button>Image.png</button>
              </div>
              <div className="experience-card">
                <div className='logo_title'>
                  <img src={imgDropbox} alt="Facebook" />
                  <div>
                    <h3>Sr.Web developer</h3>
                    <p>04/02/2023 - 11/06/2023</p>
                  </div>
                </div>
                <h3>Dropbox</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, thing here described adipiscing elit, thing here described.</p>
                <button>Image.png</button>
              </div>
              <div className="experience-card">
                <div className='logo_title'>
                  <img src={imgMailchimp} alt="Facebook" />
                  <div>
                    <h3>Sr.Web developer</h3>
                    <p>04/02/2023 - 11/06/2023</p>
                  </div>
                </div>
                <h3>Mailchimp</h3>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, thing here described adipiscing elit, thing here described.</p>
                <button>Image.png</button>
              </div>


            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminProfile