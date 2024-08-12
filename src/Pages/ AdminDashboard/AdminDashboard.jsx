import { useState, useEffect } from 'react';
import Admin_IMG from '../../assets/user.png'
import { GiAlarmClock } from "react-icons/gi";
import { FaAngleDown, FaChevronRight } from "react-icons/fa";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import img_emp1 from '../../assets/emp1.png'


import './AdminDashboard.scss'
const AdminDashboard = () => {
    const [time, setTime] = useState('');

    //   Live (*) time  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    useEffect(() => {
        const updateTime = () => {
            const currentTime = new Date();
            const hours = currentTime.getHours();
            const minutes = currentTime.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            const formattedHours = hours % 12 || 12;
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
            setTime(formattedTime);
        };

        updateTime();
        const intervalId = setInterval(updateTime, 1000);

        return () => clearInterval(intervalId);
    }, []);
    //   Live (*) time ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    // 
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Today');

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const selectOption = (option) => {
        setSelectedOption(option);
        setIsOpen(false);
    };
    // 

    // all employees json data
    const [employees, setEmployees] = useState([
        { name: "Akash Shinde", Roll: "Lead Design", email: "Akashhrms@gmail.com", phone: "+918555031082", Image: img_emp1, DOB: '2024-08-12' },
        { name: "Ravi Kumar", Roll: "Developer", email: "ravikumar@gmail.com", phone: "+918888888881", Image: img_emp1, DOB: '2023-07-11' },
        { name: "Sita Sharma", Roll: "Designer", email: "sitasharma@gmail.com", phone: "+918888888882", Image: img_emp1, DOB: '2024-08-01' },
        { name: "Mohan Verma", Roll: "Tester", email: "mohanverma@gmail.com", phone: "+918888888883", Image: img_emp1, DOB: '2024-06-15' },
        { name: "New Employee 1", Roll: "HR", email: "newemp1@gmail.com", phone: "+918888888884", Image: img_emp1, DOB: '2024-08-10' },
        { name: "New Employee 2", Roll: "Manager", email: "newemp2@gmail.com", phone: "+918888888885", Image: img_emp1, DOB: '2024-08-01' },
        { name: "New Employee 3", Roll: "Support", email: "newemp3@gmail.com", phone: "+918888888886", Image: img_emp1, DOB: '2024-08-18' },
        { name: "New Employee 4", Roll: "Developer", email: "newemp4@gmail.com", phone: "+918888888887", Image: img_emp1, DOB: '2024-08-13' },
    ]);
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('en-US', { month: 'short' });
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // const today = new Date().toISOString().split('T')[0];
    const today = '2024-08-12'
    // all employees json data

    // new join

    const getTopNewEmployees = employees.slice(0, 4);
    // new join

    return (
        <div>
            <div className="Top_Head_Admin_Dashboard">
                {/* left */}
                <div className="Left_admin_hello">
                    <img src={Admin_IMG} alt="Admin_image" />
                    <div>
                        <h2>Hello Admin 👋</h2>
                        <p>Welcome back, Track your team progress here</p>
                    </div>
                </div>
                {/* right */}
                <div className="Right_Time">
                    <div className="Check_in_time">
                        <h3>CHECK IN TIME</h3>
                        <span><GiAlarmClock /></span>
                        <h2>{time}</h2>
                    </div>
                    <div className="check_out_time">
                        <h3>CHECK OUT TIME</h3>
                        <button>Check Out</button>
                    </div>
                </div>
            </div>
            {/* center Cart */}
            <div className="content_emp_three">
                <div className="Left_cart">
                    <div className="Attendance_Overview">
                        <div className="head">
                            <h3>Attendance Overview</h3>
                            <div className="dropdown">
                                <div className="dropdown-button" onClick={toggleDropdown}>
                                    <div>{selectedOption}</div>
                                    <div><FaAngleDown /></div>
                                </div>
                                {isOpen && (
                                    <div className="dropdown-menu">
                                        <div className="dropdown-item" onClick={() => selectOption('Today')}>Today</div>
                                        <div className="dropdown-item" onClick={() => selectOption('Week')}>Week</div>
                                        <div className="dropdown-item" onClick={() => selectOption('Month')}>Month</div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='Left_right'>
                            <div className="left">
                                <div>
                                    <span className="present"></span>
                                    <h3>Present</h3>
                                </div>
                                <div>
                                    <span className="absent"></span>
                                    <h3>Absent</h3>
                                </div>
                                <div>
                                    <span className="halfday"></span>
                                    <h3>Half Day</h3>
                                </div>
                            </div>
                            <div className="right">
                                <div className="span1"></div>
                                <div className="span2"></div>
                                <div className="gauge">
                                    <span>Total Employees</span>
                                    <h1>256</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="left_Bottom_cart">
                        <div className="header_Birthday">
                            <h3>Employee Birthday Today</h3>
                            <div>
                                <LiaBirthdayCakeSolid />
                            </div>
                        </div>
                        <div className="top_border"></div>
                        <div className="Emp">
                            {employees.map((emp, i) => (
                                emp.DOB === today && (
                                    <div key={i} className='div_dob'>
                                        <div className='img_dob_name'>
                                            <img src={emp.Image} alt={emp.name} />
                                            <div>
                                                <h3>{emp.name}</h3>
                                                <p> {formatDate(emp.DOB)}</p>
                                            </div>
                                        </div>
                                        <p>{emp.email}</p>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                </div>
                <div className="center_Cart">
                    <div className="newEmployee">
                        <div className="header_newEmp">
                            <div className='number_new_hire'>
                                <h3>New Employee </h3>
                                <div>
                                    <h2>04</h2>
                                    <h3>New Hires</h3>
                                </div>
                            </div>
                            <div className='newEmp_img'>
                                {getTopNewEmployees.map((emp, i) => (
                                    <div key={i} className='div_newEmp_img'>
                                        <img src={emp.Image} alt={emp.name} />
                                    </div>
                                ))}
                                <div className="img_add">
                                    +
                                </div>
                            </div>
                        </div>
                        <div className="top_border"></div>
                        <div className="Emp">
                            {getTopNewEmployees.map((emp, i) => (
                                <div key={i} className='div_dob'>
                                    <div className='img_dob_name'>
                                        <img src={emp.Image} alt={emp.name} />
                                        <div>
                                            <h3>{emp.name}</h3>
                                            <p> {emp.Roll}</p>
                                        </div>
                                    </div>
                                    <p>{emp.phone}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="Right_cart">
                    <div className="employeesOnLeave">
                        <div className="newEmployee">
                            <div className="header_newEmp">
                                <div className='number_new_hire'>
                                    <h3>New Employee </h3>
                                    <div>
                                        <p>Monday,15th April</p>
                                    </div>
                                </div>
                                <button>See All</button>
                            </div>
                            <div className="top_border"></div>
                            <div className="Emp">
                                {getTopNewEmployees.map((emp, i) => (
                                    <div key={i} className='div_dob'>
                                        <div className='img_dob_name'>
                                            <img src={emp.Image} alt={emp.name} />
                                            <div>
                                                <h3>{emp.name}</h3>
                                                {/* <p> {emp.Roll}</p> */}
                                                <p>15April-17April</p>
                                                <div><p className='content_dot_red'> Sick Leave </p></div>
                                            </div>
                                        </div>
                                        <p> <FaChevronRight /> </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;
