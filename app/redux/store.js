import { configureStore } from "@reduxjs/toolkit";
import patientsListReducer from "./features/patientsList-slice";
import usersListReducer from "./features/users-slice";
import warningMessagesListReducer from "./features/warningMessagesList-slice";
export const store = configureStore({
    reducer: {
        patientsList: patientsListReducer,
        usersList: usersListReducer,
        warningMessagesList: warningMessagesListReducer
    }
});