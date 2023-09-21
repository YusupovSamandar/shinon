import { createSlice } from "@reduxjs/toolkit";
import axios from '@/app/axiosInstance';
import { API_URL } from "@/app/apiConfig";

let allPTS = [];

const initialState = {
    value: allPTS
}


export const patientsList = createSlice({
    name: "patientsList",
    initialState,
    reducers: {
        updateValue: (state, action) => {
            let currentKey = action.payload.toLowerCase();

            state.value = allPTS.filter(pt => pt.fullName.toLowerCase().includes(currentKey) || pt.nameOfDonor.toLowerCase().includes(currentKey));
        },
        updateByStatus: (state, action) => {
            const filterState = action.payload
            state.value = allPTS.filter((pt) => pt.currentStatus === filterState);
        },
        updatePatientsList: (state, action) => {
            state.value = action.payload
            // return tempDT
        }
    }
});



export const fetchPatients = () => async (dispatch) => {
    const { data } = await axios.get(`${API_URL}/api/patients`);
    allPTS = data
    dispatch(patientsList.actions.updatePatientsList(data));
}

export const { updateValue, updateByStatus, updatePatientsList } = patientsList.actions
export default patientsList.reducer;