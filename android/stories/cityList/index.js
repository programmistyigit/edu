import { createSlice } from "@reduxjs/toolkit";

const cityList = createSlice({
    name:"cityList",
    initialState:[],
    reducers:{
        setCityList(_ , action) { 
            return action.payload
        }
    }
})

export const { setCityList } = cityList.actions
export default cityList.reducer