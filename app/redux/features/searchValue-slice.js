import { createSlice } from "@reduxjs/toolkit";

const searchValue = ""

const initialState = {
    value: searchValue
}

export const searchValueSlice = createSlice({
    name: "searchValue",
    initialState,
    reducers: {
        setValue: (state, action) => {
            state.value = action.payload.toLowerCase()
            // update state
        }
    }
});

export const { setValue } = searchValueSlice.actions
export default searchValueSlice.reducer;