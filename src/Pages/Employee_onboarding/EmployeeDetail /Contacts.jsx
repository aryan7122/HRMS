import iconEdu from '../../../assets/icons/edu.png';
import { MdDeleteOutline } from "react-icons/md";
import { MdWorkHistory } from "react-icons/md";
import useLocationData from '../../../Snippet/UseLocationData.jsx';
import { useState, useEffect } from 'react';

const Contacts = ({ employeeData }) => {

    console.log('data', employeeData);
    const { locationsapi, fetchStates, fetchCities, fetchCountriesName } = useLocationData();
    const presentAddress = employeeData.find(contact => contact.address_type === "Present") || {};
    const permanentAddress = employeeData.find(contact => contact.address_type === "Permanent") || {};
    console.log('locationsapi', locationsapi);
    const [cun, setCun] = useState(null); // Initialize state
    const countriesname = JSON.stringify(cun)
    // Fetch country name based on the country id
    useEffect(() => {
        if (presentAddress.country_id) {
            fetchCountriesName(presentAddress.country_id);
        }
    }, [presentAddress.country_id]);

    useEffect(() => {
        if (locationsapi.countries) {
            setCun(locationsapi.countries); // Set countries data once fetched
            // alert(typeof JSON.stringify(locationsapi.countries))
        }
    }, [locationsapi.countries]);

    useEffect(() => {
        if (typeof presentAddress.state_id == 'number') {
            fetchStates(presentAddress.state_id)
        }
    }, [presentAddress.state_id])

    return (
        <div>
            <div className="info_cardsEmp">
                {/* Present Address Card */}
                <div className="card">
                    <div className='top_head'><h3><span></span>Present Address</h3></div>
                    <div className='contentInformation'>
                        <div>
                            <h4>Country</h4>
                            {countriesname &&
                                <>
                                    <p>
                                        {countriesname}
                                    </p>
                                </>
                            }
                        </div>
                        <div>
                            <h4>State</h4>
                            <p>{presentAddress.state_id || '-'}</p>
                        </div>
                        <div>
                            <h4>City</h4>
                            <p>{presentAddress.city_id || '-'}</p>
                        </div>
                        <div>
                            <h4>Street 1</h4>
                            <p>{presentAddress.street_1 || '-'}</p>
                        </div>
                        <div>
                            <h4>Street 2</h4>
                            <p>{presentAddress.street_2 || '-'}</p>
                        </div>
                        <div>
                            <h4>Zip Code</h4>
                            <p>{presentAddress.zip_code || '-'}</p>
                        </div>
                        <div>
                            <h4>Personal Contact</h4>
                            <p>{presentAddress.personal_contact_no || '-'}</p>
                        </div>
                        <div>
                            <h4>Emergency Contact</h4>
                            <p>{presentAddress.emergency_contact_no || '-'}</p>
                        </div>
                        <div>
                            <h4>Personal Email</h4>
                            <p>{presentAddress.personal_email_id || '-'}</p>
                        </div>
                    </div>
                </div>

                {/* Permanent Address Card */}
                <div className="card card222">
                    <div className='top_head'><h3><span></span>Permanent Address</h3></div>
                    <div className='contentInformation'>
                        <div>
                            <h4>Country</h4>
                            <p>{permanentAddress.country_id || '-'}</p>
                        </div>
                        <div>
                            <h4>State</h4>
                            <p>{permanentAddress.state_id || '-'}</p>
                        </div>
                        <div>
                            <h4>City</h4>
                            <p>{permanentAddress.city_id || '-'}</p>
                        </div>
                        <div>
                            <h4>Street 1</h4>
                            <p>{permanentAddress.street_1 || '-'}</p>
                        </div>
                        <div>
                            <h4>Street 2</h4>
                            <p>{permanentAddress.street_2 || '-'}</p>
                        </div>
                        <div>
                            <h4>Zip Code</h4>
                            <p>{permanentAddress.zip_code || '-'}</p>
                        </div>
                        <div>
                            <h4>Personal Contact</h4>
                            <p>{permanentAddress.personal_contact_no || '-'}</p>
                        </div>
                        <div>
                            <h4>Emergency Contact</h4>
                            <p>{permanentAddress.emergency_contact_no || '-'}</p>
                        </div>
                        <div>
                            <h4>Personal Email</h4>
                            <p>{permanentAddress.personal_email_id || '-'}</p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Contacts;
