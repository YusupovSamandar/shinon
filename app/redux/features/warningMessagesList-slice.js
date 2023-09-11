import { createSlice } from "@reduxjs/toolkit";

const warning_messages = [
    {
        patient: "Samandar Yusupov",
        message: "Visa is About to Expire",
        goto: "/patient/2",
        messageSeverity: "warning"
    }
];

const initialState = {
    value: warning_messages
}

export const patientsList = createSlice({
    name: "warningMessagesList",
    initialState,
    reducers: {
        updateState: (state, action) => {
            // state.value = action.payload;
            // update state
        }
    }
});

export const { updateState } = patientsList.actions
export default patientsList.reducer;