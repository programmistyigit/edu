import { createSlice } from "@reduxjs/toolkit";

const spaceList = createSlice({
    name : "spaceList",
    initialState:[],
    reducers:{
        setSpaceList(state , action){ return [...state , ...action.payload]}
    }
})

export const { setSpaceList } = spaceList.actions
export default spaceList.reducer