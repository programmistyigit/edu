import { createSlice } from "@reduxjs/toolkit"


const classesInfo = createSlice({
    name: "classes",
    initialState: [],
    reducers: {
        add(state, action) {
            return [...state, ...action.payload]
        },
    }
})

export const {add} = classesInfo.actions
export default classesInfo.reducer