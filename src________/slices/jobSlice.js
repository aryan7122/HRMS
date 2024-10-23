// src/slices/jobSlice.js

// Redux toolkit ke functions ko import kar rahe hain
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'; // API calls ke liye axios ko import kar rahe hain

// ** List API (GET) **
// fetchJobs function ko createAsyncThunk se create kar rahe hain, jo API se data fetch karega
//'Jobs/fetchList': Ye ek string hai jo action type ko define karta hai. Isse Redux ko pata chalta hai ki ye action kis slice se related hai (yaha "Jobs") aur kis action ko indicate karta hai (yaha "fetchList"). Iska use logging aur debugging ke liye hota hai.
export const fetchJobs = createAsyncThunk('Jobs/fetchList', async () => {
    // Axios ka post request bhej rahe hain job list ko fetch karne ke liye
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/jobopening/list`, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Token ko localStorage se uthakar request header me bhej rahe hain
        }
    });
    // Response se job_opening data ko return kar rahe hain
    return response.data.job_opening;
});

// ** Detail API (GET) **
// fetchJobDetail function ko createAsyncThunk se create kar rahe hain, jo specific job detail fetch karega
export const fetchJobDetail = createAsyncThunk('Jobs/fetchDetail', async (id) => {
    // Axios ka get request bhej rahe hain specific job id se data ko fetch karne ke liye
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/jobopening`, id,{
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Token ko localStorage se uthakar request header me bhej rahe hain
        }
    });
    // Response se job detail ko return kar rahe hain
    return response.data;
});

// ** Form API (POST) **
// createJob function ko createAsyncThunk se create kar rahe hain, jo naya job create karega
export const createJob = createAsyncThunk('Jobs/create', async (data) => {
    // Axios ka post request bhej rahe hain naya job create karne ke liye
    const response = await axios.post(`${import.meta.env.VITE_REACT_APP_API_URL}/jobopening`, data, {
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Token ko localStorage se uthakar request header me bhej rahe hain
        }
    });
    // Response se newly created job data ko return kar rahe hain
    return response.data;
});

// ** Update Form API (PUT or PATCH) **
// updateJob function ko createAsyncThunk se create kar rahe hain, jo job ko update karega
export const updateJob = createAsyncThunk('Jobs/update', async ({ id, data }) => {
    // Axios ka put request bhej rahe hain specific job ko update karne ke liye
    const response = await axios.put(`${import.meta.env.VITE_REACT_APP_API_URL}/jobopening`, data, { // data: Ye woh data hai jo aap POST request ke body mein bhej rahe hain. Ye naya job ka information hota hai, jaise title, description, etc. Is data ko server process karega aur naya job create karega.
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Token ko localStorage se uthakar request header me bhej rahe hain
        }
    });
    // Response se updated job data ko return kar rahe hain
    return response.data;
});

// ** Slice Creation **
// createSlice se job slice create kar rahe hain jo jobs ke liye state aur actions define karega
const jobSlice = createSlice({
    name: 'Jobs', // Slice ka naam define kar rahe hain
    initialState: { // Initial state define kar rahe hain
        list: [], // Jobs ki list ko empty array se initialize kar rahe hain
        detail: {}, // Specific job detail ko object se initialize kar rahe hain
        status: 'idle', // API call ka status track karne ke liye
        error: null, // Error state ko initialize kar rahe hain
    },
    reducers: { // Reducers ko define kar rahe hain
        // addJobForm reducer jo new job ko list me add karega
        addJobForm: (state, action) => {
            state.list.push(action.payload); // Action se job data ko list me push kar rahe hain
        },
    },
    extraReducers: (builder) => { // Async thunk actions ke liye extra reducers define kar rahe hain
        builder
            .addCase(fetchJobs.pending, (state) => { // Jab fetchJobs pending hai
                state.status = 'loading'; // Status ko loading set kar rahe hain
            })
            .addCase(fetchJobs.fulfilled, (state, action) => { // Jab fetchJobs successful hota hai
                state.status = 'succeeded'; // Status ko succeeded set kar rahe hain
                state.list = action.payload; // Fetched jobs ko state me set kar rahe hain
            })
            .addCase(fetchJobs.rejected, (state, action) => { // Jab fetchJobs fail hota hai
                state.status = 'failed'; // Status ko failed set kar rahe hain
                state.error = action.error.message; // Error message ko state me set kar rahe hain
            })
            .addCase(fetchJobDetail.fulfilled, (state, action) => { // Jab fetchJobDetail successful hota hai
                state.detail = action.payload; // Fetched job detail ko state me set kar rahe hain
            })
            .addCase(createJob.fulfilled, (state, action) => { // Jab createJob successful hota hai
                state.list.push(action.payload); // Newly created job ko list me push kar rahe hain
            })
            .addCase(updateJob.fulfilled, (state, action) => { // Jab updateJob successful hota hai
                const index = state.list.findIndex((item) => item.id === action.payload.id); // Job ka index dhoond rahe hain
                state.list[index] = action.payload; // Updated job ko list me replace kar rahe hain
            });
    }
});

// Action ko export kar rahe hain
export const { addJobForm } = jobSlice.actions;
// Job slice ka reducer ko export kar rahe hain
export default jobSlice.reducer;


// createAsyncThunk aapko asynchronous action create karne me help karta hai.
// async keyword se aap asynchronous behavior ko manage karte hain.
//     axios.post() server ko data bhejne ke liye use hota hai.
// data woh information hai jo server ko bhejni hoti hai(naya job details).
