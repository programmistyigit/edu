import { configureStore } from "@reduxjs/toolkit";
import whoami from "./template/whoami";
import themes from "./themes";
import role from "./role";

const store = configureStore({
    reducer : {
        whoami,
        themes,
        role
    }
})

export default store