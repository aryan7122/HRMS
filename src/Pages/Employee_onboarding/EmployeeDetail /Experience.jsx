// Experience.js
// import React from 'react';
import imgFacbook from '../../../assets/icons/facbook.png'
import imgDropbox from '../../../assets/icons/dropbox.png'
import imgMailchimp from '../../../assets/icons/Mailchimp.png'
import imgPaypal from '../../../assets/icons/paypal.png'

import './EmployeeDetails.scss';

const Experience = () => {
    return (
        <div>
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
                <div className="experience-card">
                    <div className='logo_title'>
                        <img src={imgPaypal} alt="Facebook" />
                        <div>
                            <h3>Sr.Web developer</h3>
                            <p>04/02/2023 - 11/06/2023</p>
                        </div>
                    </div>
                    <h3>Paypal</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, thing here described adipiscing elit, thing here described.</p>
                    <button>Image.png</button>
                </div>
            </div>
        </div>
    );
};

export default Experience;
