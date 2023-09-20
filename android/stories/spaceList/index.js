import { createSlice } from "@reduxjs/toolkit";

const spaceList = createSlice({
    name : "spaceList",
    initialState:[],
    reducers:{
        setSpaceList(_ , action){ return action.payload}
    }
})

export const { setSpaceList } = spaceList.actions
export default spaceList.reducer