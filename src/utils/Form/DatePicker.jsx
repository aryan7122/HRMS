import React, { useState, useEffect } from 'react';
import { DemoItem } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import Box from '@mui/material/Box';
import dayjs from 'dayjs';

const DatePicker = ({ label, onDateChange, initialDate }) => {
    const [selectedStartDate, setSelectedStartDate] = useState(initialDate ? dayjs(initialDate) : null);

    useEffect(() => {
        if (initialDate) {
            setSelectedStartDate(dayjs(initialDate));
        }
    }, [initialDate]);

    const handleDateChange = (newDate) => {
        const formattedDate = newDate.format('YYYY-MM-DD');
        setSelectedStartDate(newDate);
        onDateChange(formattedDate);
    };

    return (
        <div className="form-group grupdate2">
            <label htmlFor="">{label}</label>
            <div className="dropdown-content date-h" id=''>
                <div className='date_tittle'>
                    <div className='title__show__d'>
                        {!selectedStartDate ? <span> Enter {label}</span> : selectedStartDate.format('YYYY-MM-DD')}
                    </div>
                    <div className='date_icon'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#9b9b9b" fill="none">
                            <path d="M18 2V4M6 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M11.9955 13H12.0045M11.9955 17H12.0045M15.991 13H16M8 13H8.00897M8 17H8.00897" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3.5 8H20.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2.5 12.2432C2.5 7.88594 2.5 5.70728 3.75212 4.35364C5.00424 3 7.01949 3 11.05 3H12.95C16.9805 3 18.9958 3 20.2479 4.35364C21.5 5.70728 21.5 7.88594 21.5 12.2432V12.7568C21.5 17.1141 21.5 19.2927 20.2479 20.6464C18.9958 22 16.9805 22 12.95 22H11.05C7.01949 22 5.00424 22 3.75212 20.6464C2.5 19.2927 2.5 17.1141 2.5 12.7568V12.2432Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 8H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <Box>
                        <DemoItem>
                            <DesktopDatePicker
                                value={selectedStartDate}
                                onChange={handleDateChange}
                                renderInput={(params) => <input {...params} />}
                            />
                        </DemoItem>
                    </Box>
                </LocalizationProvider>
            </div>
        </div>
    );
};

export default DatePicker;
