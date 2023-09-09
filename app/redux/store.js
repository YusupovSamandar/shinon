import { configureStore } from "@reduxjs/toolkit";
import patientsListReducer from "./features/patientsList-slice";
import UsersListReducer from "./features/users-slice";
export const store = configureStore({
    reducer: {
        patientsList: patientsListReducer,
        usersList: UsersListReducer
    }
});