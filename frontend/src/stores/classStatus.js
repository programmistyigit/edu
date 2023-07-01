import { createSlice } from "@reduxjs/toolkit";

const classStatus = createSlice({
    name:"classStatus",
    initialState:[
        {status:"success" , text:"started"},
        {status:"danger" , text:"initializing"}
    ],
    reducers:{
        replaseStatus(state , actions){
            return actions.payload
        }
    }
})

export const {replaseStatus} = classStatus.actions
export default classStatus.reducer