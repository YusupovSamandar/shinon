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

export const warningMessagesList = createSlice({
    name: "warningMessagesList",
    initialState,
    reducers: {
        updateWarningMSGState: (state, action) => {
            const newValueForMSGs = []
            const currentDate = new Date();
            for (let i = 0; i < action.payload.length; i++) {
                const currPt = action.payload[i];
                const eachGivenDate = new Date(currPt.dateOfVisaExpiry);
                const timeDifferenceInDays = Math.floor((eachGivenDate - currentDate) / (24 * 60 * 60 * 1000));
                const tempMessage = timeDifferenceInDays === 0 ? 'visa expires today' :
                    timeDifferenceInDays < 0 ? 'visa is expired !!' : `visa is ${timeDifferenceInDays} ${timeDifferenceInDays === 1 ? 'day' : 'days'} before expiry`;

                const newMsg = {
                    patient: currPt.fullName,
                    goto: `/patient/edit/${currPt._id}`,
                    message: tempMessage
                }

                if (timeDifferenceInDays <= 3) {
                    newValueForMSGs.push({ ...newMsg, messageSeverity: 'error' });
                } else if (timeDifferenceInDays <= 7) {
                    newValueForMSGs.push({ ...newMsg, messageSeverity: 'warning' });
                }
            }
            state.value = newValueForMSGs
            // update state
        }
    }
});

export const { updateWarningMSGState } = warningMessagesList.actions
export default warningMessagesList.reducer;