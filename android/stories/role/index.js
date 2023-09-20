import { createSlice } from "@reduxjs/toolkit";

const role = createSlice({
    name:"role",
    initialState:{status : null , role: null},
    reducers:{setRole(_ , action){return {..._ , ...action.payload}}}
})

export const { setRole } = role.actions
export default role.reducer