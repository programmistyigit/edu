import { createSlice } from "@reduxjs/toolkit";

const notification = createSlice({
    name:"notification",
    initialState:[{id:"1"} , {id:"2"} , {id:"3"}],
    reducers:{
        addNotification(state , action){
            return [...state , action.payload]
        }
        ,
        removeNotification(state , action){
            return state.filter(e=> e.id !== action.payload)
        }
    }
})

export const {addNotification , removeNotification} = notification.actions
export default notification.reducer