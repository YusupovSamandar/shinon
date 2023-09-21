import { createSlice } from "@reduxjs/toolkit";

const user = {};

const initialState = {
    value: user,
    isAuth: false
}

export const userAuth = createSlice({
    name: "userAuth",
    initialState,
    reducers: {
        updateState: (state, action) => {
            state.value = action.payload.value;
            state.isAuth = action.payload.isAuth;
            // update state
        }
    }
});

export const { updateState } = userAuth.actions
export default userAuth.reducer;