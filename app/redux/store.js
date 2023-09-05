import { configureStore } from "@reduxjs/toolkit";
import patientsListReducer from "./features/patientsList-slice";
export const store = configureStore({
    reducer: {
        patientsList: patientsListReducer
    }
});