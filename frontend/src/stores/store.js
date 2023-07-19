import {configureStore} from "@reduxjs/toolkit"
import themaStore from "./themaStore"
import notifikation from "./notifikation"
import studentInfo from "./studentInfo"
import classes from "./classes"
import allSudents from "./allSudents"
import allTichers from "./allTichers"
import classStatus from "./classStatus"
import motherStore from "./motherStore"

const store = configureStore({
    reducer:{
        thema:themaStore,
        notification:notifikation,
        studentInfo: studentInfo,
        classes:classes,
        students:allSudents,
        teacher:allTichers,
        statusClass:classStatus,
        mother:motherStore
    }
})


export default store