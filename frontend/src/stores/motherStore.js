import { createSlice } from "@reduxjs/toolkit";

const motherStore = createSlice({
    name:"mother",
    initialState:[],
    reducers:{
        addMother(state , actions){
            return [...state , ...actions.payload]
        },
        removeMother(state , actions){
            return state.filter(st=>st.id !== actions.payload)
        }
    }
})

export const {addMother , removeMother} = motherStore.actions
export default motherStore.reducer