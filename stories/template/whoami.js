import { createSlice } from "@reduxjs/toolkit";

const whoami = createSlice({
    name : "whoami" , 
    initialState : {_id : null , role : null},
    reducers : {
        replaceWhoami(_ , action){
            return action.payload
        }
    }
})


export const { replaceWhoami } = whoami.actions
export default whoami.reducer