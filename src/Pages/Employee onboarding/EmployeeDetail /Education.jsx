// Education.js
// import React from 'react';
import iconEdu from '../../../assets/icons/edu.png'

const Education = () => {
    return (
        <div>
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
        </div>
    );
};

export default Education;
