import { DarkTheme } from "@react-navigation/native";
import { createSlice } from "@reduxjs/toolkit";

const theme = createSlice({
    name:"theme",
    initialState:{ bg: DarkTheme , text : "cyan"},
    reducers:{
        setTheme(state , action){
            return {...state , ...action.payload}
        }
    }
})


export const { setTheme } = theme.actions
export default theme.reducer