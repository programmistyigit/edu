import { createSlice } from "@reduxjs/toolkit";

const cityList = createSlice({
    name:"cityList",
    initialState:[],
    reducers:{
        setCityList(state , action) { 
            return [...state , ...action.payload]
        }
    }
})

export const { setCityList } = cityList.actions
export default cityList.reducer