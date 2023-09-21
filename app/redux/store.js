import { configureStore } from "@reduxjs/toolkit";
import patientsListReducer from "./features/patientsList-slice";
import usersListReducer from "./features/users-slice";
import userAuthReduder from "./features/auth-slice";
import warningMessagesListReducer from "./features/warningMessagesList-slice";
export const store = configureStore({
    reducer: {
        patientsList: patientsListReducer,
        usersList: usersListReducer,
        warningMessagesList: warningMessagesListReducer,
        userAuth: userAuthReduder
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});