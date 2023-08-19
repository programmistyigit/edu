import { configureStore } from "@reduxjs/toolkit";
import whoami from "./template/whoami";

const store = configureStore({
    reducer : {
        whoami
    }
})

export default store