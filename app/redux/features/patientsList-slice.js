import { createSlice } from "@reduxjs/toolkit";

const tempDT = [
    {
        id: 1,
        name: 'Samandar Yusupov',
        secondary: "Post Surgery",
        progressNumber: 20
    },
    {
        id: 2,
        name: 'Abdurashid Abdullayev',
        secondary: `Pre-Work up`,
        progressNumber: 30
    },
    {
        id: 3,
        name: 'Bekzod Jumayev',
        secondary: 'Post tx follow up updates',
        progressNumber: 90
    },
    {
        id: 4,
        name: 'Sayyara Aliboyeva',
        secondary: 'Pre-Work up',
        progressNumber: 0
    },
    {
        id: 5,
        name: "Zamira Rasulova",
        secondary: 'Post Surgery',
        progressNumber: 16
    },
    {
        id: 6,
        name: 'Yokubjon Kadirov',
        secondary: 'Surgery',
        progressNumber: 48
    },
    {
        id: 7,
        name: 'Azamat Yadgarov',
        secondary: `Post tx follow up updates`,
        progressNumber: 78
    },
    {
        id: 8,
        name: 'Samandar Yusupov',
        secondary: "Post Surgery",
        progressNumber: 53
    },
    {
        id: 9,
        name: 'Abdurashid Abdullayev',
        secondary: `Pre-Work up`,
        progressNumber: 31
    },
    {
        id: 10,
        name: 'Bekzod Jumayev',
        secondary: 'Post tx follow up updates',
        progressNumber: 10
    },
    {
        id: 11,
        name: 'Sayyara Aliboyeva',
        secondary: 'Pre-Work Up',
        progressNumber: 100

    },
    {
        id: 12,
        name: "Zamira Rasulova",
        secondary: 'Post Surgery',
        progressNumber: 50
    },
    {
        id: 13,
        name: 'Yokubjon Kadirov',
        secondary: 'Surgery',
        progressNumber: 5
    },
    {
        id: 14,
        name: 'Azamat Yadgarov',
        secondary: `Post tx follow up updates`,
        progressNumber: 60
    }
];

const initialState = {
    value: tempDT
}

export const patientsList = createSlice({
    name: "patientsList",
    initialState,
    reducers: {
        updateValue: (state, action) => {
            let currentKey = action.payload.toLowerCase();

            state.value = tempDT.filter(pt => pt.name.toLowerCase().includes(currentKey));
        },
        updateByStatus: (state, action) => {
            const filterState = action.payload
            state.value = tempDT.filter((pt) => pt.secondary === filterState);
        }
    }
});

export const { updateValue, updateByStatus } = patientsList.actions
export default patientsList.reducer;