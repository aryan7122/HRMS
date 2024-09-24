// Education.js
import React from 'react';
import iconEdu from '../../../assets/icons/edu.png';

const Education = ({ employeeData }) => {
    console.log('data', employeeData);

    return (
        <div>
            <div className="education">
                {/* <div className="section-header">
                    <img src={iconEdu} alt="" className='icon' />
                    <h2>Education</h2>
                </div> */}
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
                        {employeeData.map((edu) => (
                            <tr key={edu.id}>
                                <td>{edu.institute_name}</td>
                                <td>{edu.degree}</td>
                                <td>{edu.specialization}</td>
                                <td>{new Date(edu.from_date).toLocaleDateString()}</td>
                                <td>{new Date(edu.to_date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Education;
