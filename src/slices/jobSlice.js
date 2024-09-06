// src/slices/jobSlice.js

import { createSlice } from '@reduxjs/toolkit';

const jobSlice = createSlice({
    name: 'job',
    initialState: {
        jobs: [], // Initial state is an empty array
    },
    reducers: {
        addJobForm: (state, action) => {
            state.jobs = [...state.jobs, action.payload]; // Append new job to existing jobs
        },
        // other reducers if any
    },
});

export const { addJobForm } = jobSlice.actions;
export default jobSlice.reducer;
