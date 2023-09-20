import { createSlice } from "@reduxjs/toolkit";

const user_data = createSlice({
    name: "user_data",
    initialState:null,
    reducers:{
        setUserData (_ , action){return action.payload}
    }
})

export const { setUserData } = user_data.actions
export default user_data.reducer