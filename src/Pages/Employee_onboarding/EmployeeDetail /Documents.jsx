// Documents.js
// import React from 'react';
import iconEdu from '../../../assets/icons/edu.png'
import { GoEye } from "react-icons/go";

const Documents = (employeeData) => {
    console.log('Documents', employeeData)
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
                            <th>Document Name</th>
                            <th>DOcument ID</th>
                            <th>View Document</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                            <td>Aadhaar Card</td>
                            <td>5336 9548 6589</td>
                            <td><GoEye/></td>
                            
                        </tr> */}
                        {employeeData.employeeData.map((doc,index) => (
                            <tr key={index}>
                                <td>{doc.document_name || '-'}</td>
                                <td>{doc.document_id || '-'}</td>
                                <td><GoEye /></td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Documents;
