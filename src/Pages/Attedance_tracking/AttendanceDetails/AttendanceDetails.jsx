// import { useState } from 'react';
// import '../../Employee_onboarding/EmployeeDetail /EmployeeDetails.scss';
// import Img_user from '../../../assets/user.png'
import './AttendanceDetails.scss'
import { useState, useRef, useEffect } from 'react';
import { BiEditAlt } from "react-icons/bi";
import { useNavigate, useParams } from 'react-router-dom';
import { MdDeleteOutline } from "react-icons/md";
import axios from 'axios';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import './Calendar.scss';
import { Button, Dialog, DialogDismiss, DialogHeading } from "@ariakit/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateAttendance from '../UpdateAttendance/UpdateAttendance';

const AttendanceDetails = (ClosePop) => {
    const navigate = useNavigate()
    const { id } = useParams(); // Get the job ID from the URL
    const [attendanceData, setAttendanceData] = useState('')
    const JobList = () => {
        navigate('/all-attendance-list')
    }
    const [togglNewAdd, setTogglNewAdd] = useState(false)
    const NewAttendanceClick = () => {
        setTogglNewAdd(true)
    }

    const NewAttendanceClosePop = () => {
        setTogglNewAdd(false);
    };
    const calendarRef = useRef(null);
    const [calendarDate, setCalendarDate] = useState(new Date());

    const handleDateChange = (increment) => {
        const newDate = new Date(calendarDate.setMonth(calendarDate.getMonth() + increment));
        setCalendarDate(newDate);
    };

    const handleMonthYearChange = (e, type) => {
        const newDate = new Date(calendarDate);
        if (type === 'month') {
            newDate.setMonth(parseInt(e.target.value));
        } else {
            newDate.setFullYear(parseInt(e.target.value));
        }
        setCalendarDate(newDate);
        calendarRef.current.getApi().gotoDate(newDate);
    };

    const events = [
        { title: 'Present', start: '2024-09-01', shift: '9:00 - 6:00' },
        { title: 'Present', start: '2024-09-02', shift: '9:00 - 6:00' },
        { title: 'Absent', start: '2024-09-03', shift: '9:00 - 6:00' },
        { title: 'Present', start: '2024-09-04', shift: '9:00 - 6:00' },
        { title: 'Present', start: '2024-09-05', shift: '9:00 - 6:00' },
        { title: 'Present', start: '2024-09-06', shift: '9:00 - 6:00' },
        { title: 'Off', start: '2024-09-07' },
        { title: 'Present', start: '2024-09-08', shift: '9:00 - 6:00' },
        { title: 'Present', start: '2024-09-09', shift: '9:00 - 6:00' },
        { title: 'Absent', start: '2024-09-21', shift: '9:00 - 6:00' },
        { title: 'Present', start: '2024-09-26', shift: '9:00 - 6:00' },
        { title: 'Off', start: '2024-09-27' },
        { title: 'Present', start: '2024-09-28', shift: '9:00 - 6:00' },
        { title: 'Present', start: '2024-09-29', shift: '9:00 - 6:00' },
        { title: 'Absent', start: '2024-09-20', shift: '9:00 - 6:00' },
        { title: 'Off', start: '2024-09-15' }, // Sunday Off
        // ... Add more events as needed
    ];
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('access_token');
   
    console.log('data 👋', attendanceData)

    const HandleDelete = () => {
        // confirm()
        setOpen(true)

    }
    const DelteConform = () => {
        if (id) {
            axios.post('https://devstronauts.com/public/api/attendance/delete', { id }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => {
                    // setDepartmentdetails(response.data.department);
                    // setDepartmentdetails2(response.data.department.enteredbyid)
                    console.log('⚠️ delete ❗', response)
                    // setLoading(false);
                    toast.success('Deleted  successfully.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    // setLoading(false);
                    setTimeout(() => {
                        navigate('/all-attendance-list')
                    }, 2000);
                })
                .catch(error => {
                    toast.error('Deleted  Failed.', {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                    });
                    setLoading(false);
                    // setError(true);
                    console.error("Error fetching designation details:", error);
                });
        }
    }
    // Fetch  details based 
    useEffect(() => {
        axios.post('https://devstronauts.com/public/api/attendance/details', { id:id}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => {
                // Find the specific job based on jobId
                // const job = response.data.job_opening.find(job => job.id == id);
                console.log('data 👋', response.data.result)
                setAttendanceData(response.data.result)
                // setJobData(job);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching job data: ", error);
            });
    }, [id, token]);
    const convertTo12HourFormat = (time) => {
        const [hours, minutes] = time.split(":");
        const period = +hours >= 12 ? 'PM' : 'AM';
        let newHours = +hours % 12 || 12; // Convert 0 to 12 for midnight
        return `${newHours}:${minutes} ${period}`;
    };
    const calculateTotalHours = (start, end) => {
        const startTime = new Date(`1970-01-01T${start}:00`);
        const endTime = new Date(`1970-01-01T${end}:00`);

        // Adjust for cases where end time is on the next day (e.g., 12 AM to 8 AM)
        if (endTime < startTime) {
            endTime.setDate(endTime.getDate() + 1);
        }

        const totalHours = (endTime - startTime) / (1000 * 60 * 60); // Total working hours
        let overtime = 0;

        // Overtime calculation, if total working hours are more than 8
        if (totalHours > 8) {
            overtime = totalHours - 8;
        }

        return overtime.toFixed(2); // Return overtime hours as a string with 2 decimal places
    };

    // Example usage
    // const overtime = calculateOvertime("09:00", "19:30"); // Assuming 9 AM to 7:30 PM
    // console.log("Overtime:", overtime, "hours");
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


    return (
        <div className="profile-page">
            {togglNewAdd && <UpdateAttendance ClosePop={NewAttendanceClosePop} id={id} attendanceDataProp={attendanceData} />}
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover
                draggable
                theme="error"
            />
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                getPersistentElements={() => document.querySelectorAll(".Toastify")}
                backdrop={<div className="backdrop" />}
                className="dialog"
            >
                <DialogHeading className="heading">Are you sure?</DialogHeading>
                <p className="description">
                    You want to delete this Job Detail
                </p>
                <div className="buttons">
                    <div onClick={DelteConform}>
                        <Button className="button">
                            Delete
                        </Button>
                    </div>
                    <DialogDismiss className="button secondary">Cancel</DialogDismiss>
                </div>
            </Dialog>
            <div className="details">
                <div className="title_top">
                    <h2>Attendance Details</h2>
                    <div className='close_btn' onClick={JobList}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#7f7f7f" fill="none">
                            <path d="M14.9994 15L9 9M9.00064 15L15 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5" />
                        </svg>
                    </div>
                </div>
                <div className="profile_card">
                    <div className="img_card">
                        <div className="progress-circle" >
                            <img src="https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
                        </div>
                        <div className="about_user">
                            <h3>{attendanceData.user_name || ''}</h3>
                            {/* <p>Web Developer / Full-Time</p> */}
                            <div className=''><h4></h4> <h5>{attendanceData.status == 1 ? 'Absent' : attendanceData.status == 0 ? 'Present' : 'Half Day' }</h5></div>
                        </div>
                    </div>
                    <div className="action_card">
                        {/* <div><RxReload /></div> */}
                        <div onClick={NewAttendanceClick} ><span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" color="#400f6f" fill="none">
                                <path d="M15.2141 5.98239L16.6158 4.58063C17.39 3.80646 18.6452 3.80646 19.4194 4.58063C20.1935 5.3548 20.1935 6.60998 19.4194 7.38415L18.0176 8.78591M15.2141 5.98239L6.98023 14.2163C5.93493 15.2616 5.41226 15.7842 5.05637 16.4211C4.70047 17.058 4.3424 18.5619 4 20C5.43809 19.6576 6.94199 19.2995 7.57889 18.9436C8.21579 18.5877 8.73844 18.0651 9.78375 17.0198L18.0176 8.78591M15.2141 5.98239L18.0176 8.78591" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M11 20H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                            </svg>
                        </span>  Edit</div>
                        <div onClick={HandleDelete}><span><MdDeleteOutline /></span>Delete</div>
                    </div>
                </div>
                <div className="info_cards_at" style={{ paddingBottom: '30px' }}>
                    <div className="card_at">
                        <div className='top_head'> <h3>
                            <span>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#7f7f7f" fill="none">
                                    <path d="M14 8.99988H18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M14 12.4999H17" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
                                    <rect x="2" y="2.99988" width="20" height="18" rx="5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" />
                                    <path d="M5 15.9999C6.20831 13.4188 10.7122 13.249 12 15.9999" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    <path d="M10.5 8.99988C10.5 10.1044 9.60457 10.9999 8.5 10.9999C7.39543 10.9999 6.5 10.1044 6.5 8.99988C6.5 7.89531 7.39543 6.99988 8.5 6.99988C9.60457 6.99988 10.5 7.89531 10.5 8.99988Z" stroke="currentColor" stroke-width="1.5" />
                                </svg>
                            </span>
                            Personal Information</h3></div>
                        <div className='contentInformation'>
                            <div>
                                <h4>Department</h4>
                                <p>{attendanceData.employee?.department_id || ''}</p>
                            </div>
                            <div>
                                <h4>Designation</h4>
                                <p>{attendanceData.employee?.designation_id || ''}</p>
                            </div>
                            <div>
                                <h4>Employee ID</h4>
                                <p>{attendanceData.employee?.employee_id || ''}</p>
                            </div>
                            <div>
                                <h4>Shift</h4>
                                <p>{attendanceData.shift_name || ''}</p>
                            </div>
                            <div>
                                <h4>Employee Type</h4>
                                <p>Permanent-Full time</p>
                            </div>



                        </div>
                    </div>
                    <div className="card_at">
                        <div className='top_head'> <h3> <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                <path d="M14.2618 3.59937C13.1956 2.53312 12.6625 2 12 2C11.3375 2 10.8044 2.53312 9.73815 3.59937C9.09832 4.2392 8.46427 4.53626 7.55208 4.53626C6.7556 4.53626 5.62243 4.38178 5 5.00944C4.38249 5.63214 4.53628 6.76065 4.53628 7.55206C4.53628 8.46428 4.2392 9.09832 3.59935 9.73817C2.53312 10.8044 2.00001 11.3375 2 12C2.00002 12.6624 2.53314 13.1956 3.59938 14.2618C4.31616 14.9786 4.53628 15.4414 4.53628 16.4479C4.53628 17.2444 4.38181 18.3776 5.00949 19C5.63218 19.6175 6.76068 19.4637 7.55206 19.4637C8.52349 19.4637 8.99128 19.6537 9.68457 20.347C10.2749 20.9374 11.0663 22 12 22C12.9337 22 13.7251 20.9374 14.3154 20.347C15.0087 19.6537 15.4765 19.4637 16.4479 19.4637C17.2393 19.4637 18.3678 19.6175 18.9905 19M20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19M18.9905 19H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8 10.3077C8 10.3077 10.25 10 12 14C12 14 17.0588 4 22 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>Attendance Statistics</h3></div>
                        <div className='contentInformation'>
                            <div>
                                <h4>Created at</h4>
                                <p> {`${new Date(attendanceData.created_at).getDate()}-${new Date(attendanceData.created_at).toLocaleString('en-US', { month: 'short' })}-${new Date(attendanceData.created_at).getFullYear()}`}</p>
                            </div>
                            <div>
                                <h4>Day</h4>
                                <p>{`${daysOfWeek[new Date(attendanceData.created_at).getDay()]}`}</p>
                            </div>
                            <div>
                                <h4>Scheduled hours</h4>
                                <p>08Hrs</p>
                            </div>
                            <div>
                                <h4>Punch in</h4>
                                <p>{attendanceData?.punch_in ? convertTo12HourFormat(attendanceData?.punch_in) : ''}</p>
                            </div>
                            <div>
                                <h4>Punch out</h4>
                                <p>{attendanceData?.punch_out ? convertTo12HourFormat(attendanceData?.punch_out) : ''}</p>
                            </div>
                            <div>
                                <h4>Total Hours Worked</h4>
                                <p>{attendanceData.total_hours_worked || ''}</p>
                            </div>
                            <div>
                                <h4>Overtime</h4>
                                <p>{attendanceData?.punch_in ? calculateTotalHours(attendanceData?.punch_in, attendanceData?.punch_out) : ''} {attendanceData?.punch_in ? 'Hours' : ''} </p>
                            </div>
                        </div>
                        {/* Personal information content */}
                    </div>
                </div>
                {/* lll */}
                <div className="calendar_card">
                    <div className="calendar-container">
                        <div className='top_head'> <h3> <span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                <path d="M14.2618 3.59937C13.1956 2.53312 12.6625 2 12 2C11.3375 2 10.8044 2.53312 9.73815 3.59937C9.09832 4.2392 8.46427 4.53626 7.55208 4.53626C6.7556 4.53626 5.62243 4.38178 5 5.00944C4.38249 5.63214 4.53628 6.76065 4.53628 7.55206C4.53628 8.46428 4.2392 9.09832 3.59935 9.73817C2.53312 10.8044 2.00001 11.3375 2 12C2.00002 12.6624 2.53314 13.1956 3.59938 14.2618C4.31616 14.9786 4.53628 15.4414 4.53628 16.4479C4.53628 17.2444 4.38181 18.3776 5.00949 19C5.63218 19.6175 6.76068 19.4637 7.55206 19.4637C8.52349 19.4637 8.99128 19.6537 9.68457 20.347C10.2749 20.9374 11.0663 22 12 22C12.9337 22 13.7251 20.9374 14.3154 20.347C15.0087 19.6537 15.4765 19.4637 16.4479 19.4637C17.2393 19.4637 18.3678 19.6175 18.9905 19M20.4006 9.73817C21.4669 10.8044 22 11.3375 22 12C22 12.6624 21.4669 13.1956 20.4006 14.2618C19.6838 14.9786 19.4637 15.4414 19.4637 16.4479C19.4637 17.2444 19.6182 18.3776 18.9905 19M18.9905 19H19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M8 10.3077C8 10.3077 10.25 10 12 14C12 14 17.0588 4 22 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </span>Attendance summary</h3></div>

                        <div className="calendar-header">
                            <div className="C_Left">

                                <select value={calendarDate.getMonth()} onChange={(e) => handleMonthYearChange(e, 'month')}>
                                    {['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'].map((month, index) => (
                                        <option key={index} value={index}>
                                            {month}
                                        </option>
                                    ))}
                                </select>

                                <select value={calendarDate.getFullYear()} onChange={(e) => handleMonthYearChange(e, 'year')}>
                                    {[2023, 2024, 2025].map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                                <button className="apply-btn" onClick={() => calendarRef.current.getApi().gotoDate(calendarDate)}>Apply</button>
                            </div>

                            <div className="C_right">
                                <button onClick={() => handleDateChange(-1)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                        <path d="M15 6C15 6 9.00001 10.4189 9 12C8.99999 13.5812 15 18 15 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                    Previous Month</button>
                                <button onClick={() => calendarRef.current.getApi().today()}>Current Month</button>
                                <button onClick={() => handleDateChange(1)}>Next Month
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                                        <path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <FullCalendar
                            ref={calendarRef}
                            plugins={[dayGridPlugin, interactionPlugin]}
                            initialView="dayGridMonth"
                            events={events}
                            eventContent={renderEventContent}
                            headerToolbar={false}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
    function renderEventContent(eventInfo) {
        return (
            <>
                <div className="events">
                    {/* <b>{eventInfo.timeText}</b> */}
                    <h2 className={` ${eventInfo.event.title.toLowerCase()}`}
                    >
                        {/* {eventInfo.event.title} */}
                        {eventInfo.event.title.toLowerCase()}

                    </h2>
                    <p className='Shift'>Shift: {eventInfo.event.extendedProps.shift}</p>
                </div>
            </>
        );
    }
};

export default AttendanceDetails;
// 
