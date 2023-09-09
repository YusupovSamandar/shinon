import { createSlice } from "@reduxjs/toolkit";

const users_data = [
    {
        fullName: 'sdfsc',
        password: 'xcv sdf sd'
    },
    {
        fullName: 'Murray',
        password: 'sam'
    },
    {
        fullName: 'Kentucky',
        password: 'sam'
    },
    {
        fullName: 'Branson',
        password: 'Daphne'
    },
    {
        fullName: 'Branson',
        password: 'sam'
    },
];

const initialState = {
    value: users_data
}

export const patientsList = createSlice({
    name: "usersList",
    initialState,
    reducers: {
        saveNewData: (state, action) => {
            state.value = action.payload;
        }
    }
});

export const { saveNewData } = patientsList.actions
export default patientsList.reducer;