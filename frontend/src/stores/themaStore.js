import {createSlice} from "@reduxjs/toolkit"

const themaReducer = createSlice({
    name:"thema",
    initialState:{
        bg:"light",
        text:"dark"
    },
    reducers:{
        replase(state){
            return {bg:state.bg === "dark"?"light":"dark" , text:state.text === "light"?"dark":"light"}
        }
    }
})

export const {replase} = themaReducer.actions
export default themaReducer.reducer