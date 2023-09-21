import { createSlice } from "@reduxjs/toolkit";
import axios from '@/app/axiosInstance';
import { API_URL } from "@/app/apiConfig";
let users_data = [];

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

export const fetchAllUsers = () => async (dispatch) => {
    const { data } = await axios.get(`${API_URL}/api/users`);
    // console.log(data);
    users_data = data
    // console.log(data);
    dispatch(patientsList.actions.saveNewData(data));
}

export const { saveNewData } = patientsList.actions
export default patientsList.reducer;