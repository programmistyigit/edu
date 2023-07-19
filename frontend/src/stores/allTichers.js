import { createSlice } from "@reduxjs/toolkit";

const allTeachers = createSlice({
    name:"teachers",
    initialState:[],
    reducers:{
        addTeacher(state , action){
            return [...state , ...action.payload]
        },
        removeTeacher(state , action){
            return state.filter(e=> e.id !== action.payload)
        }
    }
})

export const {addTeacher , removeTeacher} = allTeachers.actions
export default allTeachers.reducer