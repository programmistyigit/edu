import { createSlice } from "@reduxjs/toolkit";

const allStudents = createSlice({
    name:"students",
    initialState:[],
    reducers:{
        addStudent(state , action){
            return [...state , ...action.payload]
        },
        removeStudent(state , action){
            return state.filter(e=> e.id !== action.payload)
        }
    }
})

export const {removeStudent , addStudent} = allStudents.actions
export default allStudents.reducer