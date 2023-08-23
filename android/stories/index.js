import { configureStore } from "@reduxjs/toolkit";
import whoami from "./template/whoami";
import themes from "./themes";
import role from "./role";
import cityList from "./cityList";
import spaceList from "./spaceList";

const store = configureStore({
    reducer : {
        whoami,
        themes,
        role,
        cityList,
        spaceList
    }
})

export default store