import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        sidebarW: false,  // Sidebar की existing state
        liHover: false,   // नई state liHover जोड़ी गई है
    },
    reducers: {
        setSidebarW: (state, action) => {
            state.sidebarW = action.payload;  // Sidebar की state को update किया जा रहा है
        },
        setLiHover: (state, action) => {
            state.liHover = action.payload;  // liHover state को update किया जा रहा है
        }
    },
});

export const { setSidebarW, setLiHover } = userSlice.actions; // नए action को export करें
export default userSlice.reducer;
