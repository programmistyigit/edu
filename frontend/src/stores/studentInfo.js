import { createSlice } from "@reduxjs/toolkit"



const studentInfoStore = createSlice({
    name:"studentStore",
    initialState:[],
    reducers:{
        replace(state , action){
            return action.payload
        }
    }
})



export const { replace } = studentInfoStore.actions
export default studentInfoStore.reducer